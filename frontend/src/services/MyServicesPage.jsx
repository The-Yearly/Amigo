import Navbar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import StatCard from "@/Components/Services/StatCard";
import MyServiceCard from "@/Components/Services/MyServiceCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ─── Component ────────────────────────────────────────────────────────────────

export default function MyServicesPage() {
  //dummy stats
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
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services/my")
      .then((res) => setServices(res.data));
  }, []);
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
                Manage your active listings, track student requests, and curate
                your campus portfolio from one editorial command center.
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
            {services.map((service) => (
              <MyServiceCard
                key={service.id}
                {...service}
                onView={() => console.log("view", service.id)}
                onEdit={() => console.log("edit", service.id)}
                onDelete={() => console.log("delete", service.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
