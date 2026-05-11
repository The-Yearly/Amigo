// IncomingRequestsPage.jsx
// Creator dashboard — Incoming Requests page.

import { useState } from "react";
import IncomingRequestsFooter from "@/Components/Landing/Footer";
import StatTile from "@/Components/Services/StatTile";
import RequestTabBar from "@/Components/Services/RequestTabBar";
import RequestListItem from "@/Components/Services/RequestListItem";
import RequestDetailPanel from "@/Components/Services/RequestDetailPanel";
import { useEffect } from "react";
import axios from "axios";

// ─── Component ────────────────────────────────────────────────────────────────

export default function IncomingRequestsPage() {
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRequests();
    fetchStats();
  }, [activeTab, search]);

  async function fetchRequests() {
    try {
      setLoading(true);

      const params = {};

      if (activeTab !== "All") {
        params.status = activeTab;
      }

      if (search) {
        params.search = search;
      }

      const res = await axios.get(
        "http://localhost:5000/api/requests/requests",
        {
          params,
          withCredentials: true,
        },
      );

      setRequests(res.data);

      if (res.data.length > 0) {
        const first = res.data[0];
        setSelectedId(first.id);
        fetchRequestDetail(first.id);
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await axios.get("http://localhost:5000/api/requests/stats", {
        withCredentials: true,
      });

      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  }

  async function fetchRequestDetail(id) {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/requests/requests/${id}`,
        {
          withCredentials: true,
        },
      );

      setSelectedRequest(res.data);
    } catch (err) {
      console.error("Failed to fetch request detail", err);
    }
  }

  async function updateRequestStatus(id, action) {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/requests/${id}/${action}`,
        {},
        {
          withCredentials: true,
        },
      );

      await fetchRequests();
      await fetchStats();
    } catch (err) {
      console.error(`Failed to ${action}`, err);
    }
  }

  return (
    <div className="bg-background font-body text-on-surface antialiased">
      <main className="max-w-[1440px] mx-auto px-12 py-10">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-primary-container font-display tracking-tight mb-3">
            Incoming Requests
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Review, manage, and coordinate requests for your curated services.
            Your professional dashboard for student-led excellence.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats &&
            [
              {
                label: "Pending Requests",
                value: stats.pending,
                primary: true,
              },
              {
                label: "Active Services",
                value: stats.activeServices,
              },
              {
                label: "Accepted Requests",
                value: stats.accepted,
              },
              {
                label: "Completed Requests",
                value: stats.completed,
              },
            ].map((stat) => <StatTile key={stat.label} {...stat} />)}
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
            {requests.map((req) => (
              <RequestListItem
                key={req.id}
                id={req.id}
                status={req.status.toLowerCase()}
                imageSrc={req.service.image}
                imageAlt={req.service.title}
                badgeLabel={req.service.category}
                title={req.service.title}
                price={`₹${req.service.price}`}
                requesterImg={req.requester.profileImage}
                requesterName={req.requester.name}
                requesterRole={`${req.requester.department} • Year ${req.requester.year}`}
                timeAgo={new Date(req.createdAt).toLocaleDateString()}
                excerpt={req.service.description}
                onClick={() => {
                  setSelectedId(req.id);
                  fetchRequestDetail(req.id);
                }}
                onAccept={() => updateRequestStatus(req.id, "accept")}
                onReject={() => updateRequestStatus(req.id, "reject")}
                onStartWork={() => updateRequestStatus(req.id, "start")}
                onComplete={() => updateRequestStatus(req.id, "complete")}
              />
            ))}
            {/* Skeleton placeholder */}
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <RequestListItem key={i} status="skeleton" />
              ))}
          </div>

          {/* Detail panel */}
          {selectedRequest && (
            <RequestDetailPanel
              title={selectedRequest.service.title}
              requestId={selectedRequest.id}
              description={selectedRequest.service.description}
              attachments={[]}
              timeline={[
                {
                  label: selectedRequest.status,
                  time: new Date(selectedRequest.createdAt).toLocaleString(),
                  done: true,
                },
              ]}
              requesterName={selectedRequest.requester.name}
              onClose={() => setSelectedRequest(null)}
              onSendMessage={() =>
                (window.location.href = `/messages?chat=${selectedRequest.id}`)
              }
            />
          )}
        </div>
      </main>

      <IncomingRequestsFooter />
    </div>
  );
}
