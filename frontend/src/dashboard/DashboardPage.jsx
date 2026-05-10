import { Link } from "react-router-dom";
import TopAppBar from "@/components/TopAppBar";

const USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBohTvM3aPMGGCdhxLDNKVqNs0exazYtVSWEOihNYaoVugb0TqkPfjoX4daJhGagxObfp40e1oUT-BX9ti7fDpZpmO_8LWlNjraaOymKbCriOHgah_KO1n1YeYYbbRSDzK8MEdf9lkNMCN0OAb-78WhlWahK0byJe5Ie_tZwdl9N0f2eiGNSFXJT1gjUwU8X6ymLYrLTVN0wruOoV3Q2aM-ja8RubIQFU5wWfl9SUHFlj6I2IVSWmdCgLtjl0YuEnkvinvLsRSnOc4";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <TopAppBar avatarSrc={USER_AVATAR} />

      <main className="pt-24 pb-10 max-w-5xl mx-auto px-6">
        <section className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Welcome to Amigo
          </h1>
          <p className="text-tertiary max-w-2xl">
            Explore services and stay connected with your chats from one place.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/service"
            className="bg-surface-container border border-outline-variant/20 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-tertiary mb-3">
              Service
            </p>
            <h2 className="text-2xl font-bold mb-2">Graduation Photography</h2>
            <p className="text-sm text-tertiary">
              Open the full service details, requirements, and booking card.
            </p>
          </Link>

          <Link
            to="/messages"
            className="bg-surface-container border border-outline-variant/20 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-tertiary mb-3">
              Messages
            </p>
            <h2 className="text-2xl font-bold mb-2">Chat Inbox</h2>
            <p className="text-sm text-tertiary">
              Jump into your conversations and continue chatting instantly.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
