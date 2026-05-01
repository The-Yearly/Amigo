// MyRequestsPage.jsx
// "My Requests" page — active requests + history.
// Reuses RequestNavBar, ExploreFooter, ActiveRequestItem, HistoryRow.

import RequestNavBar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import ActiveRequestItem from "@/Components/Services/ActiveRequestItem";
import HistoryRow from "@/Components/Services/HistoryRow";

// ─── Data ────────────────────────────────────────────────────────────────────

const USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPzxdW5qWmsEOBexBMYpvHPEyh8HmxIg01wa37oIRxlWB1dVMfM151uPTrX3rVf7rA6TrbXsK_JtDms3w1k0ul-1mExzln5ZtVTU_zgkmmyM5XRDLFp4V36ytzxCVgXDxmzWaUd2_JCzrQSAvD9c2eALVeYMfXBgtWucp5Ey7A4z1Te64zx1X5zJ08oWrkUZwTQmqR_F_ZFgMJ4BBbD74DSMufEcN2vQgRH6J6Rvc3oTZp1vAjz3efXt6emstTDHoEPQFOTECyA64p";

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
  {
    id: 2,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3hEerL_Y31FfeFTyMYTdpdl6g8I0PAS4b2__9B4RGgB4BYr-unf6kwtw9git07vn83jp-dYv9Y4jP2e9zC3IaRySBRBqzcsZHaVrDIibdLZhqLnAqul2aum1KnznsFClIy6jqQyoxwgK-Si8ycBuXT3lFmT9J6nc_fd8kBnoceEcW3mlOwo9HIw8TbtqMvS8dblQUXW_wBeGGsV0PwwnwFgOEz4q5oGjjT5sAwOy4Ovd-5Cgd17-k_qYMwC1dXHOhDKzpJ7YT1jaE",
    imageAlt: "Calculus textbooks on marble desk",
    status: "Accepted",
    title: "Calculus II Tutoring Series",
    provider: "James Miller",
    date: "Requested Oct 21, 2024",
    price: "$120.00 Total",
  },
  {
    id: 3,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDccY0swFsuLVrE5yQtS6RyWwdSDzqedscOFhENia5pyS9kGrE7OaqswJp7XlWqxHUkQDtoMfHudrX4495db-8v_9rEU1FnkfLNBZ7Zxsf5J4pilXegvhW51nXMXRP2E25e5uHUSaZPI4s1dzEQcVeQ_2kaWsOO61R-aK3ED7p8_22Nz95wxSO25m1A91ShHuF4bta-VohePTsv9e86mYqK83naW2vVZJHg-cS8eZafJ2ZWjP7cmMGBtXFVrQVfFPZpNySrI4WzWl6I",
    imageAlt: "Modern office conference room",
    status: "Pending",
    title: "Resume Review & Career Coaching",
    provider: "Elena Rodriguez",
    date: "Sent Oct 22, 2024",
    price: "$30.00 Fixed",
  },
];

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
  {
    id: 2,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmVqSkDhUm8UuJ6c8cXo5-7tIPeLRUkInaf3-kKce65VV07JrtERIbtwdGNfVzRk_eSbBHXTl3lRWG1wFgnowreZcv-3QuQ2KG7P23UU64YnM01mv2_DY0_nBYghGjobPKyoKE_oVGAv6gwzfO_G8644yDsmLkc5IIe18y5pjatq1oZ_BRaVKmEk0RJTycYdb-ol9HnylV6gvarDfyndQOCZXFI895Qa8iz5NtRhHpGTNlbrQcmZYr12ZB3iWUm2U_kMjVvi8mgiWh",
    imageAlt: "Students collaborating in library",
    title: "Essay Editing: Modern History",
    provider: "Professor Alistair • Aug 30, 2024",
    price: "$55.00",
    rated: true,
    ratingValue: "5.0",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MyRequestsPage() {
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
            Manage your service inquiries and track progress. Your curated history of campus
            collaborations and academic support.
          </p>
        </header>

        {/* ── Active Requests ── */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-headline font-bold text-2xl text-primary tracking-tight">
              Active Requests
            </h2>
            <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-bold">
              {ACTIVE_REQUESTS.length} Ongoing
            </span>
          </div>
          <div className="space-y-6">
            {ACTIVE_REQUESTS.map((req) => (
              <ActiveRequestItem
                key={req.id}
                {...req}
                onViewDetails={() => alert(`View: ${req.title}`)}
                onOpenChat={() => alert(`Chat: ${req.title}`)}
                onCancel={() => alert(`Cancel: ${req.title}`)}
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
              12 Completed
            </span>
          </div>

          <div className="bg-surface-container-low rounded-lg overflow-hidden shadow-md border border-outline-variant/10">
            <div className="divide-y divide-outline-variant/10">
              {HISTORY_ROWS.map((row) => (
                <HistoryRow
                  key={row.id}
                  {...row}
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
