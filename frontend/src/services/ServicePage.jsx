import TopAppBar from "@/Components//Landing/Navbar";
import BottomNavBar from "@/Components/Landing/Footer";
import BookingCard from "@/Components/Services/BookingCard";
import RequirementCard from "@/Components/Services/RequirementCard";
import ReviewCard from "@/Components/Services/ReviewCard";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// ─── Component ───────────────────────────────────────────────────────────────

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_HEM2GFeH0UHpQL_e796s5ZOBlbqE7PThOMkCm6w9dnfKSyOayFLOTPBDDoQsjrdpHMYrfhpbm34zqaekNMBqCZ-OelJXPI5neA7EwaC3sus9-NfyqytdnnYrvqu1MUnVj8VPvEcoepN5ba5eOEi2i2D-bLRBvvfqdSYrh-MWT2_0MFS-4Pxv69B4Vwh4Pvo9_cZWKC9WvNE6XVtvS0TMZB981G9EqgQRH7dixf_Z9Qe6B-pvrce1gWDNjJWFfHap6Z4EqBmKdet";

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    alt: "Graduate smiling portrait",
    className: "w-full col-span-5",
  },
];

export const BOOKING_FEATURES = [
  {
    icon: "schedule",
    label: "90 minute guided session",
  },
  {
    icon: "photo_camera",
    label: "50+ edited HD photos included",
  },
  {
    icon: "location_on",
    label: "Multiple campus locations",
  },
  {
    icon: "bolt",
    label: "Instant booking confirmation",
  },
  {
    icon: "download",
    label: "Digital delivery within 48 hours",
  },
];

export const REQUIREMENTS = [
  {
    icon: "checkroom",
    title: "Graduation Outfit",
    description:
      "Please arrive wearing your graduation gown or formal attire for the best results.",
  },
  {
    icon: "schedule",
    title: "Be On Time",
    description:
      "Arrive at least 10 minutes early so we can start the session smoothly.",
  },
  {
    icon: "wb_sunny",
    title: "Weather Ready",
    description:
      "Outdoor shoots may be rescheduled in case of heavy rain or bad weather.",
  },
  {
    icon: "groups",
    title: "Friends & Family",
    description:
      "You may bring friends or family members for a few group shots during the session.",
  },
];
export const REVIEWS = [
  {
    _id: "1",
    name: "Sarah Chen",
    rating: 5,
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    review:
      "Absolutely amazing experience. The photos turned out incredible and the poses felt super natural.",
  },
  {
    _id: "2",
    name: "Michael Torres",
    rating: 5,
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    review:
      "Very professional and knew all the best campus locations. Delivery was fast too.",
  },
  {
    _id: "3",
    name: "Emily Johnson",
    rating: 4.8,
    date: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    review:
      "Made me feel comfortable throughout the shoot. The edited pictures looked cinematic.",
  },
];
export const MAP_SRC =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b";
export const CREATOR_SRC =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b";
export const CREATOR = {
  name: "Alex Rivero",
  role: "Visual Arts Senior",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  bio: `"I've shot over 300 graduation sessions in the last three years. My goal is to make you feel like the main character of your college story."`,
  portfolioLink: "/portfolio/alex-rivero",
};
export default function ServicePage() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`/api/services/${id}`).then((res) => setService(res.data));
  }, [id]);
  return (
    <div className="bg-surface text-on-surface antialiased ">
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
          <div className="lg:col-span-8 min-h-[200px] md:min-h-[600px]">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.alt}
                className={`w-full overflow-hidden rounded-xl bg-surface-container shadow-sm border border-outline-variant/10`}
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
