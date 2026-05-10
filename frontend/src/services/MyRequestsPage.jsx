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
  const USER_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCPzxdW5qWmsEOBexBMYpvHPEyh8HmxIg01wa37oIRxlWB1dVMfM151uPTrX3rVf7rA6TrbXsK_JtDms3w1k0ul-1mExzln5ZtVTU_zgkmmyM5XRDLFp4V36ytzxCVgXDxmzWaUd2_JCzrQSAvD9c2eALVeYMfXBgtWucp5Ey7A4z1Te64zx1X5zJ08oWrkUZwTQmqR_F_ZFgMJ4BBbD74DSMufEcN2vQgRH6J6Rvc3oTZp1vAjz3efXt6emstTDHoEPQFOTECyA64p";

  const HISTORY_ROWS = [
    {
      id: 1,
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCkSe2ocRpQAk8W4FV3R7huBPlbkmXilWijqKUkeM-IppzjbLY1cle_3VrTPlNFwHgs6oH4ejYlJpV4GlsdnBE-THC7gmOuk3B_CDeQXDYX5fM9RwW6l0l9le-OAWXPV5ouvJvkQjKSb2Lr9w2o_aXFUkdnhosswIPHRx1zW4prZhjVBXCAMyABokCrhAtdykG4ugnCHiQuOfJoYt-zpwzTpmC5otFoGyLQVzc0V24aLDSXxOzu1CGP0qDEQzAPAJlCLJTD7sOJZ7hJ",
      imageAlt: "Minimalist laptop workspace",
      title: "Webflow Portfolio Development",
      provider: "Marcus Thorne • Sep 12, 2024",
      price: "$250.00",
      rated: false,
    },
  ];

  const ACTIVE_REQUESTS = [
    {
      id: 1,
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCK1yxJRsEEHu_JRngs-yOD0-WWDJg1Dc2TbYLAi5MI9ccGQFbULbOLUP0Zpx63Q9KYeaq5DQ9zhm6AlJArX-_0_ifLrm65wjXIu_IN-lXE9p_c8jQ0fJfGH6vw31fkkF1zgSp4tpYH5FNDftO9OT521c74rGXs4Fl5mmkQv9e0K-NIQUOMsvxxh-_rBDvbog4OmgCuRrt5IoZBVhkbdHJgcsVknyO8oBnCkdt6VlqBlGZnXZQlBSQ6VDecnOaEtsouPDgskswO93M9",
      imageAlt: "UI/UX mentorship laptop screen",
      status: "In Progress",
      title: "Advanced UI/UX Mentorship",
      provider: "Sarah Chen",
      date: "Scheduled for Oct 24, 2024",
      price: "$45.00 / hr",
    },
  ];

  const [requests, setRequests] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HE;l");
    api
      .get("http://localhost:5000/api/requests/my/" + user.uid, {
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

  const historyRequests = requests.filter((r) => r.status === "Completed");

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <RequestNavBar avatarSrc={USER_AVATAR} />

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
                  onViewDetails={() => console.log("view", req.id)}
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

            <div className="mt-12 text-center">
              <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold shadow-md hover:bg-primary hover:text-on-primary hover:shadow-lg active:scale-95 transition-all font-label">
                Load More History
              </button>
            </div>
          </section>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
