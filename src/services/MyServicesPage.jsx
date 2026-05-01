// MyServicesPage.jsx
// Creator dashboard — "My Services" page.
// Reuses Navbar, ExploreFooter, StatCard, MyServiceCard.

import Navbar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import StatCard from "@/Components/Services/StatCard";
import MyServiceCard from "@/Components/Services/MyServiceCard";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  {
    label: "Revenue Growth",
    value: "$1,240",
    badge: "+12% this month",
    variant: "default",
    wide: true,
  },
  {
    label: "Active Requests",
    value: "14",
    variant: "muted",
  },
  {
    label: "Success Rate",
    value: "98%",
    variant: "accent",
  },
];

const MY_SERVICES = [
  {
    id: 1,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBL8IvN5fp2-N5-EKvxPO0gbjCyusSAeT4KZNvGQkkxqGnYDlOcVYPxMhtfpgSnxVUEByQUPX3hWV9AAemM5dlyo2V7qcPwv9Y1DyrgzIPuV3MicOJ1W9p0xKJUPwRm4R3Ov7U-yJg2oD5h_iBYN0YdyIY2yhyLAQK3MttQPPGeoqbhPIeFPMiex05woR-frW8c3Lh6EQ7b3pgwkv9l982rh73_qeeGxNpblnRD4TRVx-IM3CZvZJXuxnafTS_pHh1CfsI5gvIbCHW",
    imageAlt: "Tutoring setup with laptop and coffee",
    status: "Active",
    title: "Advanced Calc III Peer Tutoring",
    price: "$45/hr",
    description:
      "Personalized 1-on-1 sessions focusing on vector calculus and differential equations. Guaranteed improvement.",
    stats: [
      { label: "Total Requests", value: "24" },
      { label: "Completion", value: "100%" },
    ],
  },
  {
    id: 2,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAtbCOBxh_eEzxN1qdjG2Um5g0V5g1aCxpMChDUGf3jjTPbI1j3_xHK-QohbQx2Lx_vvnDCraU-GrWuHhsUmajEPcIq4DunAYz6OfrB-MsYaT-wDYRh6lZjBW2TtsDeKrcZZnRxGHV82O9UpsUXJPPt5JkDpIhTI0sD3a-8LsDn9GpnwbVR1RRTwHF-H6xCO9hlf7C1Tc_BGj0yYrxUYEjYrLCB5B2vS8A4u8hmtRlSX6Oho7mar6jaHTGsfOJl6JcJuZyIi_PlEB2",
    imageAlt: "Graduation portrait photography session",
    status: "In Progress",
    title: "Graduation Portrait Package",
    price: "$120",
    description:
      "Full 2-hour outdoor session with 20 professionally edited high-res digital downloads included.",
    stats: [
      { label: "Total Requests", value: "8" },
      { label: "Delivery", value: "3 Days" },
    ],
  },
  {
    id: 3,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjNtScu5LgiOGlx-RDbczlamzA_9J40G-0oEuiwdFEVw9I3Axfi5IsjcQcO8rZOVZXSYDYN0oYz7AGDhmhAu6gB14kKyR-eoBUdS9PbkfsmsfFO0G9kCobih0VCOvMqmN44G8GFIziJyufI-vbW3zkaQ4qEw7xSLsb8Gv3iS7TAn10ec92ye-TtFpKAEN9Cs5ajsnRc1HrwTEEgAWU2uvfAphEyf4n_AltFnds2aDsBb4hcJvd-jc6gxSW98VAJRWUqrRWce_tm_gd",
    imageAlt: "Dorm moving service in hallway",
    status: "Completed",
    title: "Dorm Move-Out Assistant",
    price: "$30/hr",
    description:
      "Packing, lifting, and transport help for end-of-semester transitions. Reliable and efficient.",
    stats: [
      { label: "Total Requests", value: "42" },
      { label: "Rating", value: "5.0 ★" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MyServicesPage() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased">
      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-surface via-surface to-surface-dim/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tighter text-editorial-gradient">
                My Services
              </h1>
              <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
                Manage your active listings, track student requests, and curate your campus portfolio
                from one editorial command center.
              </p>
            </div>
            <Link to="/create-service">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-gradient text-on-primary rounded-lg font-bold shadow-lg shadow-primary-container/30 hover:scale-[1.02] active:scale-95 transition-all group text-white border border-primary/20">
                <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">
                  add
                </span>
                Create New Service
              </button>
            </Link>
          </div>

          {/* Stats bento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MY_SERVICES.map((service) => (
              <MyServiceCard
                key={service.id}
                {...service}
                onView={() => alert(`View: ${service.title}`)}
                onEdit={() => alert(`Edit: ${service.title}`)}
                onDelete={() => alert(`Delete: ${service.title}`)}
              />
            ))}
          </div>

        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
