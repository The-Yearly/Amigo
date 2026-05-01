// MessagesPage.jsx
// Full messages / chat page. Composes all sub-components.

import { useState } from "react";
import MessagesTopAppBar from "@/components/MessagesTopAppBar";
import ConversationItem from "@/components/ConversationItem";
import ChatBubble from "@/components/ChatBubble";
import MessageInput from "@/components/MessageInput";
import MobileNavPill from "@/components/MobileNavPill";

// ─── Static data ─────────────────────────────────────────────────────────────

const USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBohTvM3aPMGGCdhxLDNKVqNs0exazYtVSWEOihNYaoVugb0TqkPfjoX4daJhGagxObfp40e1oUT-BX9ti7fDpZpmO_8LWlNjraaOymKbCriOHgah_KO1n1YeYYbbRSDzK8MEdf9lkNMCN0OAb-78WhlWahK0byJe5Ie_tZwdl9N0f2eiGNSFXJT1gjUwU8X6ymLYrLTVN0wruOoV3Q2aM-ja8RubIQFU5wWfl9SUHFlj6I2IVSWmdCgLtjl0YuEnkvinvLsRSnOc4";

const PENDING_REQUEST = {
  avatarSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBFUBRvQZ0p_3NtgCuMkAJgn7anOfGm8oZBPLYnz2vprGh5IojBK7120YGsfzWqU8gwGyr0MzkzWiwA4FJZv1Gre8hbjL00x-vSsb5EtIvAJ7LG0fuXjQt-o8rGjC-snwnqd0K1yhN1AhK8b3fC4OB8r4ybJ7aVuc_MG6bt5Gq_aw6PFpbaZ3R5qSMgFKft4mFX7sxyvTon6PRgHVDDDBvSX_auqi-CGjLi5VlI82DTWR7joni3HmISg6Pilv_xvlg45Qks1d3QZFY",
  avatarAlt: "Sarah Jenkins",
  name: "Sarah Jenkins",
  serviceLabel: "Walk request: Golden Retriever",
  preview: '"Hi! Are you available this Friday..."',
};

const CONVERSATIONS = [
  {
    id: 1,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKK54KlxIKOhy2G7LxsRuzEIRj3DnGCb1R-IttrNHAD3VS151au4cKAzVhTL01hBlkW5tzQ4Tch8HO6Wo--c6XLZmh2GfPswUf5uE9geGYVF0moQxGbz-5xRg-mvUw9jEpxhzg-wWLOedErAoLrxQ5inyvj3DO-8C5Zo2LKttDh9qlKvuxb7UxiUYYLFw8voUlQ_HjxR05s1HnP0TlZqwWDM-Jcw6YHU88LWGdHprJlpXGt4qDENQCb2rJ2JiGxNPoRgaPrBNC9_4",
    avatarAlt: "Marcus Chen",
    name: "Marcus Chen",
    preview: "That sounds perfect! See you then.",
    time: "2:45 PM",
    active: true,
  },
  {
    id: 2,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhQN-JZL3UjfJHi3_3LHP_NuIBIfayXiipQejYGI79c1amSPOsVs8i8YQoc_2qQ26aKwqYp0R_zW4ibWe45hbXhifrh0t-yHqLr0fqLyK3a8jnLjLWR2da7fV-D7rBGRDw_hf-zSWRvNWZWSpQt1c70N-dwPY_uKkFvqaj7tQ20cdRgjCS02pHbG-lXaMxFhMXAPs0te7cA7Hv7Qu5y6Lpge86ABlT2T_pAnEIauSrfOIjL8ZJimNd2uENi94z9QiI8cCfBIhO5OM",
    avatarAlt: "Elena Rodriguez",
    name: "Elena Rodriguez",
    preview: "Can we reschedule the groom?",
    time: "14:02",
    unread: true,
    online: true,
  },
  {
    id: 3,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCg12g66_q3qG4fmtPR4p9FvRTX_KMsSrSvt8cLKYZEGczgsr2f6WykmEwXwb2I9FWGCu4XAAukjt3nxkl4sqrSL_r5jI_eylvypONStK4KJkYGi4LQ50eEn6iMxM7p5DmkZa6Gmg9WMSjjUS-xr2JkVdTsjMlIgHcdGXmOjGrhhk7eMa5-jBkDyFkq291O_CqVRf3RExxzQumyZyCoeYnGKtmVwhnC_w8ASBGI99K7y5HNKK_qrgdwC9z_y1EV9CZSsNiMnLMxoJI",
    avatarAlt: "David Miller",
    name: "David Miller",
    preview: "Luna is doing great after the walk!",
    time: "Yesterday",
  },
];

const MARCUS_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-yQ_LDg5259NiG3Ha-tuNT0wUcjmghEAq3hHFQ4Z8ts7mQRQ2vq3ISxjkvMc0Gy948MpOxsfdxiWs-YLyCg3JOUK_SVn9I509yckPJ7uXpBujXUJGM1PXYaNFi4sONIQVLoel-fQUYoTXDk391Kf4-eJBkg0mnow4aaoSsB7T5qUKK5uIiZkydVF8u3yGBFOPE2OW_EZ6bgeNVviBWMb5h9vFoq5XWunDNt6bTA9bTBsR8j3q0d3Ny9TpM22J3W_KUeFP4RlEMUU";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sent: false,
    messages: [
      "Hi there! I'm reaching out about the grooming session for Buddy next Tuesday.",
      "Is 10:00 AM still a good time for you? I have a slight delay in the morning slot before yours.",
    ],
    time: "14:30",
  },
  {
    id: 2,
    sent: true,
    messages: [
      "Hey Marcus! No problem at all. 10:30 AM would actually work better for me if that's possible?",
    ],
    time: "14:42",
    read: true,
  },
  {
    id: 3,
    sent: false,
    messages: ["That sounds perfect! See you then."],
    time: "14:45",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sent: true,
        messages: [text],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      },
    ]);
    setInputValue("");
  }

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden">
      <MessagesTopAppBar avatarSrc={USER_AVATAR} />

      <main className="pt-16 h-screen flex overflow-hidden">
        {/* ── Left Pane: Conversations List ── */}
        <aside className="w-full md:w-96 flex flex-col bg-surface-container z-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-6">Messages</h1>
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full bg-surface-container-low rounded-full py-2.5 pl-10 pr-4 border-none focus:ring-2 focus:ring-secondary/20 placeholder:text-tertiary/60 text-sm transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-3 pb-24 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-surface-container-highest [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {/* Pending */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-3 mb-2 block">
                Pending Requests
              </span>
              <ConversationItem isPending {...PENDING_REQUEST} />
            </div>

            {/* All messages */}
            <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary px-3 mb-2 block">
              All Messages
            </span>
            <div className="space-y-1">
              {CONVERSATIONS.map((conv) => (
                <ConversationItem key={conv.id} {...conv} />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right Pane: Chat Detail ── */}
        <section className="hidden md:flex flex-1 flex-col bg-surface relative overflow-hidden">
          {/* Chat Header */}
          <header className="h-20 px-8 flex items-center justify-between bg-surface/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={CONVERSATIONS[0].avatarSrc}
                  alt="Marcus Chen"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-on-surface">Marcus Chen</h2>
                <p className="text-[10px] font-semibold text-tertiary uppercase tracking-widest">
                  Online • Local Groomer
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-on-surface text-xl">call</span>
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-on-surface text-xl">more_vert</span>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-surface-container-highest [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-widest text-tertiary">
                Today
              </span>
            </div>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                sent={msg.sent}
                messages={msg.messages}
                avatarSrc={MARCUS_AVATAR}
                avatarAlt="Marcus Chen"
                time={msg.time}
                read={msg.read}
              />
            ))}
          </div>

          {/* Input */}
          <MessageInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={handleSend}
          />
        </section>
      </main>

      <MobileNavPill activeTab="chat" />
    </div>
  );
}
