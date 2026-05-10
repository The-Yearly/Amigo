// MessagesPage.jsx
// Full messages / chat page. Composes all sub-components.

import { useCallback, useContext, useEffect, useState } from "react";
import MessagesTopAppBar from "@/Components/Landing/Navbar";
import ConversationItem from "@/components/ConversationItem";
import ChatBubble from "@/components/ChatBubble";
import MessageInput from "@/Components/Chat/MessageInput";
import MobileNavPill from "@/components/MobileNavPill";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "@/lib/authProvider";

// ─── Static data ─────────────────────────────────────────────────────────────

const USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBohTvM3aPMGGCdhxLDNKVqNs0exazYtVSWEOihNYaoVugb0TqkPfjoX4daJhGagxObfp40e1oUT-BX9ti7fDpZpmO_8LWlNjraaOymKbCriOHgah_KO1n1YeYYbbRSDzK8MEdf9lkNMCN0OAb-78WhlWahK0byJe5Ie_tZwdl9N0f2eiGNSFXJT1gjUwU8X6ymLYrLTVN0wruOoV3Q2aM-ja8RubIQFU5wWfl9SUHFlj6I2IVSWmdCgLtjl0YuEnkvinvLsRSnOc4";

// ─── Component ────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const isChatAllowed = true; // later: check status
  const [searchParams] = useSearchParams();
  const chatIdFromUrl = searchParams.get("chat");
  const { user, loading } = useContext(AuthContext);
  console.log(user, "TAke A Look At M<y");
  const currentUserId = user.uid;
  console.log("Current user ID from cookies:", currentUserId);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages", {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data);
        console.log("Fetched conversations:", res.data);
        if (chatIdFromUrl) {
          setActiveChat(chatIdFromUrl);
        } else if (res.data.length > 0) {
          setActiveChat(res.data[0].id);
        }
        console.log("conversations:", res.data);
      });
  }, []);

  async function sendMessage(content) {
    await axios.post(
      "http://localhost:5000/api/messages",
      {
        serviceRequestId: activeChat,
        content,
      },
      {
        withCredentials: true,
      },
    );

    fetchMessages();
    const convRes = await axios.get("http://localhost:5000/api/messages", {
      withCredentials: true,
    });
    setConversations(convRes.data);
  }

  // 1. Fetching logic encapsulated
  const fetchMessages = useCallback(async () => {
    if (!activeChat) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${activeChat}`,
        {
          withCredentials: true,
        },
      );
      setMessages(res.data);
      console.log("Fetched messages for chat", activeChat, res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  }, [activeChat]);

  useEffect(() => {
    if (!activeChat) return;

    const markRead = async () => {
      try {
        await axios.patch(
          `http://localhost:5000/api/messages/${activeChat}/read`,
          {},
          { withCredentials: true },
        );
        // Refresh the conversation list to remove the "NEW" badge immediately
        const convRes = await axios.get("http://localhost:5000/api/messages", {
          withCredentials: true,
        });
        setConversations(convRes.data);
        console.log("Marked chat as read:", activeChat);
      } catch (err) {
        console.error("Error marking as read:", err);
      }
    };

    markRead();
  }, [activeChat]);

  // 2. Single effect for Polling
  useEffect(() => {
    fetchMessages(); // Initial fetch

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  async function handleSend() {
    const text = inputValue.trim();
    if (!text) return;

    await sendMessage(text);

    setInputValue("");
  }

  const formattedMessages = messages.map((m) => {
    // Add a console.log here to debug the comparison in your browser console
    // console.log("Comparing:", m.senderId, "with:", currentUserId);
    // console.log(
    //   "Message senderId:",
    //   m.senderId,
    //   "Current userId:",
    //   currentUserId,
    // );

    return {
      id: m.id,
      // Use toString() to ensure you aren't comparing a string to an objectId
      sent: m.senderId?.toString() === currentUserId?.toString(),
      messages: [m.content],
      time: new Date(m.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const activeConversation = conversations.find((c) => c.id === activeChat);

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col">
      <MessagesTopAppBar avatarSrc={USER_AVATAR} />

      <main className="flex-1 flex overflow-hidden">
        {/* ── Left Pane: Conversations List ── */}
        <aside className="w-full md:w-96 flex flex-col bg-surface-container z-10 border-r border-outline-variant shadow-sm">
          <div className="p-6 border-b border-outline-variant/30 bg-surface-container">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-6">
              Messages
            </h1>
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full bg-surface-container-low rounded-full py-2.5 pl-10 pr-4 border-2 border-primary shadow-md focus:ring-2 focus:ring-primary/20 focus:shadow-lg placeholder:text-tertiary/60 text-sm transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-3 pb-24 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-surface-container-highest [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent border-t border-outline-variant/30">
            {/* All messages */}
            <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary px-3 mb-2 block">
              All Messages
            </span>
            <div className="space-y-1">
              {conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  name={conv.otherUser}
                  preview={conv.preview} // Use conv.preview instead of conv.title for the last msg
                  avatar={conv.avatarSrc}
                  active={activeChat === conv.id}
                  // CRITICAL: Pass these props to trigger the "NEW" UI
                  isPending={conv.isPending}
                  serviceLabel={conv.title}
                  time={conv.time}
                  onClick={() => setActiveChat(conv.id)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right Pane: Chat Detail ── */}
        <section className="hidden md:flex flex-1 flex-col bg-surface relative overflow-hidden">
          {/* Chat Header */}
          <header className="h-20 px-8 flex items-center justify-between bg-surface/50 backdrop-blur-md z-10 border-b border-outline-variant shadow-md">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={activeConversation?.avatarSrc}
                  alt={activeConversation?.otherUser}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-on-surface">
                  {activeConversation?.otherUser || "Select a chat"}
                </h2>
                <p className="text-[10px] font-semibold text-tertiary uppercase tracking-widest">
                  Online • Local Groomer
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-on-surface text-xl">
                  call
                </span>
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-on-surface text-xl">
                  more_vert
                </span>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-surface-container-highest [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent border-b border-outline-variant/50">
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-widest text-tertiary">
                Today
              </span>
            </div>
            {formattedMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                sent={msg.sent} // This must be true for the message to move to the right
                messages={msg.messages}
                // Only pass the other user's avatar if you didn't send the message
                avatarSrc={
                  msg.sent ? USER_AVATAR : activeConversation?.avatarSrc
                }
                avatarAlt={msg.sent ? "Me" : activeConversation?.otherUser}
                time={msg.time}
              />
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-outline-variant/50 bg-surface p-1">
            <MessageInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSend={handleSend}
              disabled={!isChatAllowed}
            />
          </div>
        </section>
      </main>

      <MobileNavPill activeTab="chat" />
    </div>
  );
}
