import TopAppBar from "@/Components//Landing/Navbar";
import BottomNavBar from "@/Components/Landing/Footer";
import BookingCard from "@/Components/Services/BookingCard";
import RequirementCard from "@/Components/Services/RequirementCard";
import ReviewCard from "@/Components/Services/ReviewCard";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";


// ─── Component ───────────────────────────────────────────────────────────────

export default function ServicePage() {

  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`/api/services/${id}`).then((res) => setService(res.data));
  }, [id]);
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
