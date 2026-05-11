import RequestNavBar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import ActiveRequestItem from "@/Components/Services/ActiveRequestItem";
import HistoryRow from "@/Components/Services/HistoryRow";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/lib/authProvider";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
// ─── Component ────────────────────────────────────────────────────────────────

export default function MyRequestsPage() {
  //dummy data
  const [requests, setRequests] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HE;l");
    api
      .get("http://localhost:5000/api/requests/my/" , {
        withCredentials: true,
      })
      .then((res) => setRequests(res.data));
  }, []);

  async function handleRequest(serviceId) {
    await api.post(
      "http://localhost:5000/api/requests",
      {
        serviceId,
      },
      {
        withCredentials: true,
      },
    );

    alert("Request sent!");
  }

  const activeRequests = requests.filter((r) => r.status !== "Completed");
  console.log(activeRequests)
  const historyRequests = requests.filter((r) => r.status === "Completed"||r.status === "Cancelled");
  console.log(activeRequests)
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed">

      <main className="pt-24 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Page header */}
          <header className="mb-16">
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-primary tracking-tight mb-4">
              My Requests
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              Manage your service inquiries and track progress. Your curated
              history of campus collaborations and academic support.
            </p>
          </header>

          {/* ── Active Requests ── */}
          <section className="mb-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-headline font-bold text-2xl text-primary tracking-tight">
                Active Requests
              </h2>
              <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-bold">
                {activeRequests.length} Ongoing
              </span>
            </div>
            <div className="space-y-6">
              {activeRequests.map((req) => (
                <ActiveRequestItem
                  key={req.id}
                  {...req}
                  onViewDetails={() =>navigate(`/services/${req.service}`)}
                  onOpenChat={() => navigate(`/messages?chat=${req.id}`)}
                  onCancel={async () => {
                    await api.patch(
                      `http://localhost:5000/api/requests/${req.id}/status`,
                      { status: "Cancelled" },
                    );
                  }}
                />
              ))}
            </div>
          </section>

          {/* ── History ── */}
          <section>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-headline font-bold text-2xl text-primary tracking-tight">
                History
              </h2>
              <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-bold">
                {historyRequests.length} Completed
              </span>
            </div>

            <div className="bg-surface-container-low rounded-lg overflow-hidden shadow-md border border-outline-variant/10">
              <div className="divide-y divide-outline-variant/10">
                {historyRequests.map((row) => (
                  <HistoryRow
                    key={row.id}
                    imageSrc={row.imageSrc}
                    imageAlt={row.imageAlt}
                    title={row.title}
                    provider={`${row.provider} • ${new Date(row.date).toLocaleDateString()}`}
                    price={row.price}
                    rated={false}
                    onRebook={() => alert(`Rebook: ${row.title}`)}
                    onRate={() => alert(`Rate: ${row.title}`)}
                  />
                ))}
              </div>
            </div>

          
          </section>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
