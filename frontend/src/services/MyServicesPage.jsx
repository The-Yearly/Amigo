import Navbar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import StatCard from "@/Components/Services/StatCard";
import MyServiceCard from "@/Components/Services/MyServiceCard";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/lib/authProvider";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

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
  // Dummy stats - Keeping these as requested by your layout
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
  const [stats, setStats] = useState({});
  const [load, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      await api.delete(`/api/services/delete/${deleteTarget.id}`, {
        withCredentials: true,
      });
      api
        .get("/api/services/my")
        .then((res) => {
          setServices(res.data);
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Error deleting service:", err);
    } finally {
      setDeleteTarget(null);
    }
  };
  useEffect(() => {
    // Only fetching the services created by the logged-in user
    Promise.all([
      api.get("/api/services/my"),
      api.get("/api/services/my/stats"),
    ])
      .then(([servicesRes, statsRes]) => {
        setServices(servicesRes.data);
        setStats(statsRes.data);
        console.log("Fetched stats:", statsRes.data);
        // console.log("Fetched services:", servicesRes.data);
      })
      .catch((err) => {
        console.error("Error fetching services or stats:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const statsData = [
    {
      label: "Total Revenue",
      value: stats.totalRevenue,
    },
    {
      label: "Active Requests",
      value: stats.activeRequests,
    },
    {
      label: "Success Rate",
      value: stats.successRate,
    },
  ];

  return (
    <div className="bg-surface text-on-surface font-body antialiased">
      <style>{pulseStyles}</style>

      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-surface via-surface to-surface-dim/30 ">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tighter text-editorial-gradient">
                My Services
              </h1>
              <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
                Manage your active listings and curate your campus portfolio
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
            {load ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </>
            ) : (
              statsData.map((stat) => <StatCard key={stat.label} {...stat} />)
            )}
          </div>

          {/* Listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {load ? (
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
                    onView={() =>
                      (window.location.href = "/services/" + service.id)
                    }
                    onEdit={() =>
                      (window.location.href = "/services/edit/" + service.id)
                    }
                    onDelete={() => setDeleteTarget(service)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container border border-outline-variant bg-white rounded-2xl p-7 w-[360px] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-error">
                  delete
                </span>
              </div>
              <div>
                <p className="font-bold text-base">Delete service?</p>
                <p className="text-sm text-on-surface-variant">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant bg-surface-container-high rounded-xl p-3 mb-5 border-l-4 border-red-400">
              <span className="font-semibold text-on-surface">
                {deleteTarget.title}
              </span>{" "}
              will be permanently removed from your listings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-lg border border-outline text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5  transition-all rounded-lg bg-error-container text-error text-sm font-semibold"
              >
                Delete service
              </button>
            </div>
          </div>
        </div>
      )}
      <ExploreFooter />
    </div>
  );
}
