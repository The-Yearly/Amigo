import Navbar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import StatCard from "@/Components/Services/StatCard";
import MyServiceCard from "@/Components/Services/MyServiceCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ─── Pulsating Animation ──────────────────────────────────────────────────────

const pulseStyles = `
  @keyframes intensePulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .animate-intense-pulse {
    animation: intensePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

// ─── Skeleton Components ──────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-md overflow-hidden">
      <div className="h-4 bg-surface-container-highest rounded w-24 mb-4 animate-intense-pulse" />
      <div className="h-8 bg-surface-container-highest rounded w-32 mb-2 animate-intense-pulse" />
      <div className="h-3 bg-surface-container-highest rounded w-20 animate-intense-pulse" />
    </div>
  );
}

function MyServiceCardSkeleton() {
  return (
    <div className="bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-md">
      <div className="h-48 bg-surface-container-highest animate-intense-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-surface-container-highest rounded w-3/4 animate-intense-pulse" />
        <div className="h-4 bg-surface-container-highest rounded w-full animate-intense-pulse" />
        <div className="h-10 bg-surface-container-highest rounded w-full animate-intense-pulse" />
      </div>
    </div>
  );
}

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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/services/my"),
      axios.get("http://localhost:5000/api/requests/provider"),
    ])
      .then(([sRes, rRes]) => {
        setServices(sRes.data);
        setRequests(rRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const requestsByService = Array.isArray(requests)
    ? requests.reduce((acc, r) => {
        if (!acc[r.serviceId]) acc[r.serviceId] = [];
        acc[r.serviceId].push(r);
        return acc;
      }, {})
    : {};

  async function updateStatus(id, status) {
    await axios.patch(`http://localhost:5000/api/requests/${id}/status`, {
      status,
    });

    // refresh UI optimistically
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased">
      <style>{pulseStyles}</style>
      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-surface via-surface to-surface-dim/30 ">
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
            {loading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </>
            ) : (
              STATS.map((stat) => <StatCard key={stat.label} {...stat} />)
            )}
          </div>

          {/* Listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <MyServiceCardSkeleton />
                  </div>
                ))}
              </>
            ) : (
              services.map((service) => (
                <div key={service.id}>
                  <MyServiceCard
                    {...service}
                    onView={() => console.log("view", service.id)}
                    onEdit={() => console.log("edit", service.id)}
                    onDelete={() => console.log("delete", service.id)}
                  />
                  <div className="mt-4 space-y-3">
                    {(requestsByService[service.id] || []).length === 0 ? (
                      <p className="text-sm text-tertiary/60">
                        No requests yet
                      </p>
                    ) : (
                      (requestsByService[service.id] || []).map((req) => (
                        <div
                          key={req.id}
                          className="p-4 border-2 border-primary rounded-lg shadow-md flex justify-between items-center bg-surface-container hover:shadow-lg transition-shadow"
                        >
                          <div>
                            <p className="font-semibold text-on-surface">
                              {req.requesterName}
                            </p>
                            <p className="text-xs text-tertiary font-medium uppercase tracking-wide">
                              {req.status}
                            </p>
                          </div>

                          {req.status === "Pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStatus(req.id, "Accepted")}
                                className="px-4 py-2 bg-gradient-to-tr from-primary to-primary-container text-on-primary rounded-lg font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all text-sm"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() => updateStatus(req.id, "Rejected")}
                                className="px-4 py-2 bg-error/20 text-error rounded-lg font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all text-sm border border-error/30"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
