// ServicePage.jsx
// Main service detail page. Composes all sub-components.

import TopAppBar from "@/components/TopAppBar";
import BottomNavBar from "@/components/BottomNavBar";
import BookingCard from "@/components/BookingCard";
import RequirementCard from "@/components/RequirementCard";
import ReviewCard from "@/components/ReviewCard";
import { ChevronRight } from "lucide-react";

// ─── Static data ────────────────────────────────────────────────────────────

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCx5i7nHIW7NB8EoFRtOl4Exyai2KQutI_inbXmSBgo_BCu2WdL5idGWoxmn_yPiLq40D5WY5_QfZihqIs8Eux0qz26bBMbaGseZnWU72G9tkA_lc5FIPvWVUfSkXH2s90aLKEGzGmrZqVdcHvqlIgi2yCqAX51GWC9dmlp2PId3Pb3BAugjm6jh4aiZu2lx5Xlf94XPI_kDaoHqp8xbgxsmZp_NiOEl_-G33Ya7NL0fnC_Cw_9iV5TykmyizHxVRIG8S0L-xgLlEU";

const GALLERY_IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTa8hrHkN5BG0bSJ27mdSnAONA25PHI8pfGHw3JwGwGyYPxAgLRMYDmVJpPBsAvdBcONkbGmx6Gz3-HFPTvKcQnFPUcCpZyFlqJaTJlxSY8ZsjBY0xu1PEls4OZpATsMr9bC906JkzUDG04yFmXGioywvb_87GZexVCXz0nSCFQoVU-coGWz9Nw62rxSv1-wqLVZBtK28L8ONtfDH6ZmwspVHcpnE4HJYlR0trejKSExDIN41WLHKk4uaba6ZQpvkBdFHa9qSTAdg",
    alt: "Graduate throwing cap in the air",
    className: "col-span-4 row-span-2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm46jG8YjP_FzcMjl5OJPvgUdkuSQ1-4SCOGmvm-OKSaLrejlPSPnRnFcKrctNmqQRCVM3fM8NmN1winUtXjORu6_lnzkPE9viZD_qMcYabty5e_K6f4k4y1i7Psq8HH6lzFOkeFaodXJanst59HmxbUMOiHAlJLYg4ualsQWS01wY4V2M-fTZsrfwShLy95epLCrFTIVNHVzXII1NXJuhkX_CvR_VNTornV7W-KjpGRWQlBRGXKn-bLvAE0xb5gs3kuZcmwuUrc4",
    alt: "Student holding diploma",
    className: "col-span-2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDDBwhGEhkI0u7wGRFaDkz9fVd_MMjiZlo68yFENWJywLtzG5eGWmuVGU48ZiPHLJfR19_xAqYLZY6IMF4lQmIcVuglRw_FyWQ98lGCIZKwu0aBicTT9MlNpNnMIEbm7c3hD6ONmHv4dSG6-NZWsXe_7k1uOSFwobRmIVOkNQp7DwRn-pG5Sd3FmVvnuu2-9T9IwBXQyTOpnNii38H0q2iqGgWLdnz9M_FdRdN-5-N-OiqMAD375ApuLcFrxzA5vgZJfUb-IyzdSE",
    alt: "Graduates laughing on campus lawn",
    className: "col-span-2",
  },
];

const BOOKING_FEATURES = [
  { icon: "verified_user", label: "Top Rated Student Creator" },
  { icon: "shutter_speed", label: "48-hour digital delivery" },
  { icon: "image", label: "35+ professionally edited photos" },
];

const REQUIREMENTS = [
  {
    icon: "school",
    title: "Attire",
    description:
      "Please bring your own cap, gown, and tassel. We recommend steaming them prior to arrival.",
  },
  {
    icon: "groups",
    title: "Group Limit",
    description:
      "Up to 2 additional friends can join for a few shots at no extra charge. Large groups require custom pricing.",
  },
  {
    icon: "calendar_month",
    title: "Booking Notice",
    description:
      "Minimum 48-hour notice required for rescheduling to ensure campus access permits.",
  },
  {
    icon: "location_on",
    title: "Meeting Point",
    description:
      "Typically the Main Quad entrance, unless otherwise specified during booking.",
  },
];

const REVIEWS = [
  {
    initials: "SJ",
    avatarBg: "bg-secondary-fixed",
    avatarText: "text-on-secondary-fixed",
    name: "Sarah Jenkins",
    meta: "Class of 2024 • 2 weeks ago",
    rating: 5,
    review:
      "Absolutely incredible experience! They knew all the secret spots on campus where the lighting was perfect. I got my photos back in just 24 hours and they looked like they belong in a magazine.",
  },
  {
    initials: "MW",
    avatarBg: "bg-primary-fixed",
    avatarText: "text-on-primary-fixed",
    name: "Marcus Wong",
    meta: "Class of 2023 • 1 month ago",
    rating: 4,
    review:
      "Great session. Very professional and helpful with posing since I'm usually awkward in front of cameras. Highly recommend for any senior!",
  },
];

const MAP_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjDdGsIoen-mfUoRX3UNU-FEamgFzNBe2bVCwZwFJ_aluSNnOgNUbH67yo6mAHjVLHMahKT9G5rF4YbnaA9VTCqlTPFaI1X4TCOSWycv72daqNZbl2sSspfTeblcnlg0Gw1pPypNBfIBFirWWxDs_Zh0R__Y4KoJ6vLHnMbF1PQki3DoSLqN6qjGOCPjxlW1pLK1_sXljmZ-MN1_kXEh3lLZKP2KaXvhRGLmn8LlU0sodwd-DrOIy_l8BQ7FvNSkpKXVvWZhB-LE";

const CREATOR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlgH77lWUHnpcpXDqsoPZjdx-du7JaJGSCnv2svg87FUvzQOaFpp5sS97TiECb6JtTDsMTQB4nf510sZZmkFDZEZSIg8UxL9PB5Ub3dMvh4WXTdG26qELWM2fQZvdU9FI3DfGxQYIKnA45GHViJoQxfv3t3iXgJC4U2bwdV1JfecgQYL2200o7x9t1CZuk-mPuGKwiEdDCJxaK_jcOeil7rnXHrkeGV6YQ-J_9KmKErV9i5TfIzgfMc12VQVcc-6rTxDoAumyfMOI";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServicePage() {
  return (
    <div className="bg-surface text-on-surface antialiased">
      <TopAppBar avatarSrc={AVATAR_SRC} />

      <main className="pt-24 pb-32 max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="uppercase font-semibold tracking-wider text-sm">
              Services
            </span>
            <span className="material-symbols-outlined text-[16px]">
              <ChevronRight />
            </span>
            <span className="uppercase font-semibold tracking-wider text-sm text-on-surface">
              Graduation Photography
            </span>
          </div>
          <div className="bg-primary-fixed text-on-primary-fixed-variant px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Instant Booking Available
          </div>
        </div>

        {/* Hero: Gallery + Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Image Gallery */}
          <div className="lg:col-span-8 grid grid-cols-6 gap-4 h-[600px]">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.alt}
                className={`${img.className} overflow-hidden rounded-xl bg-surface-container shadow-sm border border-outline-variant/10`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-4 sticky top-24 h-fit">
            <BookingCard
              title="Graduation Photography"
              rating={4.9}
              reviewCount={124}
              price="$149"
              duration="90 min session"
              features={BOOKING_FEATURES}
              onBook={() => alert("Booking flow triggered!")}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Main Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-on-surface">
                Service Description
              </h2>
              <div className="prose prose-stone max-w-none text-tertiary leading-relaxed">
                <p className="mb-4">
                  Capture your crowning achievement with a session designed by
                  students, for students. I understand the best spots on
                  campus—from the iconic clocktower to the hidden ivy-covered
                  archways that make for the perfect Instagram-worthy portraits.
                </p>
                <p>
                  This session includes a personalized walkthrough of up to 3
                  locations on campus. I provide professional lighting equipment
                  for outdoor shoots and creative direction to ensure you look
                  natural and confident in every frame.
                </p>
              </div>
            </section>

            {/* Requirements Bento */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-on-surface">
                What's Required
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REQUIREMENTS.map((req) => (
                  <RequirementCard
                    key={req.title}
                    icon={req.icon}
                    title={req.title}
                  >
                    {req.description}
                  </RequirementCard>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-on-surface">
                  Student Reviews
                </h2>
                <button className="text-secondary font-bold text-sm hover:underline">
                  See all reviews
                </button>
              </div>
              <div className="space-y-6">
                {REVIEWS.map((review) => (
                  <ReviewCard key={review.name} {...review} />
                ))}
              </div>
            </section>
          </div>

          {/* Right: Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Location card */}
            <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-tertiary mb-6">
                Service Location
              </h3>
              <div className="aspect-video bg-surface-container-highest rounded-lg mb-4 overflow-hidden">
                <img
                  src={MAP_SRC}
                  alt="Campus map"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-bold text-on-surface">
                University of Washington - Main Campus
              </p>
              <p className="text-xs text-tertiary mt-1">
                Seattle, WA • Service available campus-wide
              </p>
            </div>

            {/* Creator card */}
            <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-tertiary mb-4">
                About the Creator
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={CREATOR_SRC}
                  alt="Alex Rivero"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-on-surface">Alex Rivero</h4>
                  <p className="text-xs text-tertiary">Visual Arts Senior</p>
                </div>
              </div>
              <p className="text-xs text-tertiary leading-relaxed mb-6">
                "I've shot over 300 graduation sessions in the last three years.
                My goal is to make you feel like the main character of your
                college story."
              </p>
              <button className="w-full py-2 border border-outline-variant text-on-surface rounded-full text-sm font-bold hover:bg-surface-container-highest transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
