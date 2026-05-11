// IncomingRequestsPage.jsx
// Creator dashboard — Incoming Requests page.

import { useState } from "react";
import IncomingRequestsNavBar from "./IncomingRequestsNavBar";
import IncomingRequestsFooter from "./IncomingRequestsFooter";
import StatTile from "./StatTile";
import RequestTabBar from "./RequestTabBar";
import RequestListItem from "./RequestListItem";
import RequestDetailPanel from "./RequestDetailPanel";

// ─── Static data ─────────────────────────────────────────────────────────────

const AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBy21VUd0W4mFlAFjapnyA9AzKqFqU5qkpBvJ4Hp_E_SXq7PFeU6KZW1HUZfxml65QPXdvpzV0d8F7MUc0ftLcNf0cisRgMT0E5lxkGcZ-VATamMfJScM4Z8yu-VyYUiNH5zEqBg2eDnn0dRYsX9eFqUNTOCyf2bwf_Ko_cMLfCnG2l4cESpF8HwycPlVpKYyXAyvF8Vft_Tco5bcfUyz3ZfpTAw7_rYzVCiKHAS_UFJ9_Q7OdOQ__b8e82164fF5VqKAKz9JK1XZpk";

const STATS = [
  { label: "Pending Requests",  value: "12", primary: true },
  { label: "Active Services",   value: "08" },
  { label: "Accepted Requests", value: "24" },
  { label: "Completed Requests",value: "142" },
];

const REQUESTS = [
  {
    id: "REQ-94210",
    status: "pending",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPc3x4K-180M71m3zXXP1D9B7sPVyHuDbki4LD1zXXmIdxMUvI0xw28Dx2CHkesmKdf1EpEAtD2Tb5NY8tM5cRFaRpISjjem4Q8JElyKXh0v9l7D8itU8mWUOLDWTKt0eGKQ2kRSYWYpOdZ8kxc0rMk8LDIjUi_c8Fzw-fUviHoEfyfDCZk4GmC7r40xp-yWYQfqU-9GyiEWJPyAYN8cC6z4GHCtLajJzfDywfKKPFCjCiy51HdDs6EIXaD2vlw6MovCMIroEZ8oi9",
    imageAlt: "UI/UX Mentorship",
    badgeLabel: "Design Mentorship",
    badgeVariant: "secondary",
    title: "Advanced UI/UX Mentorship",
    price: "$45.00",
    requesterImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGPMLPF5nXPfUmo5nq1eNYGMRzPb2crSbB7msik190fO2pzwDVHy3lBLRP3tSz6OAlKfymcIkmjTNf10ZzT0zORmdwLF431rf6ZYVF3P0QoFdKInfiDV6sP63J3w5Qdh30ZnRtieLIrLPxkU2EJHsptvR0AbU-8dwlDKuu22HQd8APIsK7RLRyBqCKndZ0reomcwL1fF4cfuappIodrXMTOLBGYSYfDJksAtTbmkB3sBn0VDVeA-1D3kG_BdqztqL8yzTp9CF5vvrx",
    requesterName: "Alex Rivera",
    requesterRole: "Computer Science Senior",
    timeAgo: "2h ago",
    excerpt: "I'm looking to refine my portfolio for summer internships and need a professional's perspective on my latest case studies...",
    description: "Hi! I'm currently finalizing my capstone project and I've reached a roadblock with the micro-interactions. I'm looking for a 1-hour session to go over my Figma files, specifically focusing on accessibility compliance and motion design curves. I've attached my current draft for review.",
    attachments: [
      { type: "file", name: "portfolio_draft_v2.pdf", icon: "description" },
      { type: "link", name: "figma.com/file/project-id...", icon: "link" },
    ],
    timeline: [
      { label: "Request Received", time: "Today at 10:45 AM", done: true },
      { label: "Review Pending",   time: "In queue",          done: false },
    ],
  },
  {
    id: "REQ-94211",
    status: "accepted",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3r9iX31qM_tawU56mG5pc1X49DKPi_yPrijgX1owXVIeVSt1BTlhz6ZsmYLjwnw0zMSQdaif2v0GaFvJQ4mSYYYan-Gq5nj6DAzzIqw5_fKhvf-4El6YY5BMadckXF0HPNXfm8Qn55J1IVlsNzBA9nIjs3oIc6p7rI7RWs54zdxwKDmn-K3gWKwABg0z5YiFkpfgntCiscAyBhISIP0_ntgc6zZWPiQjYR7tqGn88fYR-YhTzpD3DXmQaF0HWhGOhTTIZt6HFZ1Un",
    imageAlt: "Tutoring",
    badgeLabel: "Tutoring",
    badgeVariant: "primary",
    title: "Macroeconomics 101 Support",
    price: "$30.00",
    requesterImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOnL8KwQCTu2QfPOfxvZr24da03krOlqHoaclJajN2EuCs4KZxhASmAwdGYUb9qfz1uCxdAByzp_yEjtG4rlaJfpVkq6a2udihXye2MQMVgipBcFhTougN4aiVZvoiuQclF5wdJmsuGAOcbj5mP_bJNalgDBd_oHaFUboGP3kg55quYfpssuJ8PPy8Dlnh_H9bdkkewIrm1LAqfzq_fCJ8U9sYfW0PICNwF3Bib13udxeP5mZ0VPg0_dT_LszDlARwHJp6puuV0Yqt",
    requesterName: "Sophia Chen",
    requesterRole: "Economics Freshman",
    timeAgo: "5h ago",
    excerpt: "Struggling with the concepts of supply-side economics. Need someone to break down the models...",
    description: "Struggling with the concepts of supply-side economics. Need someone to break down the models in a clear and practical way.",
    attachments: [],
    timeline: [
      { label: "Request Received", time: "Today at 7:30 AM", done: true },
      { label: "Accepted",         time: "Today at 8:00 AM", done: true },
    ],
  },
  {
    id: "REQ-94209",
    status: "in-progress",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWtJFOIpdeWDog8EnUkwQ7xCpQ3vEsF9tHf3ruTqUfOkbUwUfsE_PKcNpV2K6oMAfZPmhDW22E8uy1Z0ikbLrPRwq_rX1zmnz-HxeIc--suKYoZ8fkzI0UP86b2gNAeN_dUtC8i8NP8ysKBdCcUvLsPkwpRxVc3wAo1VL4pw_L06Msz2fUiuB9pJUXb7aMqPemC8SHPF3-s9GMwX4lt4wiFuB9cN9zrNLY_lazi2a98sJlOxThU9GmtIgPZeLcoJ1J60JqW_CQ9MCi",
    imageAlt: "Research",
    badgeLabel: "Research",
    badgeVariant: "tertiary",
    title: "Archival Research Assistant",
    price: "$25.00/hr",
    requesterImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuByuEWbMh10j98Wmka1X38EHYSRVHg2mqS3mt84j-wAGK-fG3P1-G9jXACDoA3KJA1j8q9AgoRxHiLjjXbV3ULP7rkIK1QJFSSXUxE6Ankr95fHLNq8qjwFIcqZf6u0yaFPVU2-HquTS9awrJg4459Q-td2PkNp_1U70HGWvgRGwvAufP5QBuC1qpTPLZGd4QOX4xETtRmXPgLiJhWrG1g2bvgY45ge2y79jAyLxbcxi9xrbGUv19QK__E-x5EJTleydOjNcgoxnlLd",
    requesterName: "Julian Vane",
    requesterRole: "History Doctoral Candidate",
    timeAgo: "1d ago",
    excerpt: "Need assistance sourcing 19th-century archival material for my dissertation on colonial trade routes...",
    progress: 65,
    description: "Need assistance sourcing 19th-century archival material for my dissertation on colonial trade routes. Familiarity with university library databases required.",
    attachments: [],
    timeline: [
      { label: "Request Received", time: "Yesterday at 3:00 PM", done: true },
      { label: "Work Started",     time: "Yesterday at 4:00 PM", done: true },
      { label: "In Progress",      time: "Ongoing",              done: false },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IncomingRequestsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(REQUESTS[0].id);

  const selectedRequest = REQUESTS.find((r) => r.id === selectedId) ?? REQUESTS[0];

  const filtered = REQUESTS.filter((r) => {
    const tabMatch =
      activeTab === "All" ||
      (activeTab === "Pending"     && r.status === "pending") ||
      (activeTab === "Accepted"    && r.status === "accepted") ||
      (activeTab === "In Progress" && r.status === "in-progress");
    const searchMatch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.requesterName.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <div className="bg-background font-body text-on-surface antialiased">
      <IncomingRequestsNavBar avatarSrc={AVATAR} />

      <main className="max-w-[1440px] mx-auto px-12 py-10">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-primary-container font-display tracking-tight mb-3">
            Incoming Requests
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Review, manage, and coordinate requests for your curated services. Your professional
            dashboard for student-led excellence.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>

        {/* Tab bar + search */}
        <RequestTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
        />

        {/* Main content: list + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Request list */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {filtered.map((req) => (
              <RequestListItem
                key={req.id}
                {...req}
                onClick={() => setSelectedId(req.id)}
                onAccept={() => alert(`Accepted: ${req.title}`)}
                onReject={() => alert(`Rejected: ${req.title}`)}
                onStartWork={() => alert(`Started: ${req.title}`)}
                onComplete={() => alert(`Completed: ${req.title}`)}
              />
            ))}
            {/* Skeleton placeholder */}
            <RequestListItem status="skeleton" />
          </div>

          {/* Detail panel */}
          <RequestDetailPanel
            title={selectedRequest.title}
            requestId={selectedRequest.id}
            description={selectedRequest.description}
            attachments={selectedRequest.attachments}
            timeline={selectedRequest.timeline}
            requesterName={selectedRequest.requesterName}
            onClose={() => {}}
            onSendMessage={() => alert(`Message ${selectedRequest.requesterName}`)}
          />
        </div>
      </main>

      <IncomingRequestsFooter />
    </div>
  );
}
