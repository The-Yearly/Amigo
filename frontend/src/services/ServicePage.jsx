import TopAppBar from "@/Components/Landing/Navbar";
import BottomNavBar from "@/Components/Landing/Footer";
import BookingCard from "@/Components/Services/BookingCard";
import RequirementCard from "@/Components/Services/RequirementCard";
import ReviewCard from "@/Components/Services/ReviewCard";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/authProvider";

export default function ServicePage() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  console.log(serviceId,useParams(),"Sds")
  const {user,loading}=useAuth()
  console.log(user,service,"Payphone")
  const book=async()=>{
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/requests/newRequest`,{serviceId:serviceId,requesterId:user.uid,providerId:service.creatorId},{withCredentials:true})
    c
  }
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/services/${serviceId}`).then((res) => {
      setService(res.data);
      console.log(res.data,"huh")
    });
  }, [serviceId]);

  if (!service) {
    return <div className="p-12 text-center font-bold">Loading service...</div>;
  }
  console.log("Creator Data Check:", service.creator);
  return (
    <div className="bg-surface text-on-surface antialiased">
   

      <main className="pt-20 md:pt-24 pb-32 max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-tertiary overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <span className="uppercase font-semibold tracking-wider text-[10px] md:text-sm">
              Services
            </span>
            <span className="material-symbols-outlined text-[14px] md:text-[16px]">
              <ChevronRight size={14} />
            </span>
            <span className="uppercase font-semibold tracking-wider text-[10px] md:text-sm text-on-surface truncate">
              {service.title}
            </span>
          </div>
        </div>

        {/* Hero: Gallery + Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Image Gallery */}
          <div className={`${user.uid!==service.creatorId?"lg:col-span-8":"lg:col-span-12"}`}>
            <div className="w-full aspect-[4/3] md:aspect-auto md:h-[600px] overflow-hidden rounded-xl bg-surface-container shadow-sm border border-outline-variant/10">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Booking Card - Reordered on mobile if needed, but keeping original structure */}
          {user.uid!==service.creatorId&&
          <div className="lg:col-span-4">
            <BookingCard
              title={service.title}
              rating={service.creator?.rating || 0}
              reviewCount={service.reviews?.length || 0}
              price={`$${service.price}`}
              duration={service.estimatedTime}
              features={service.features || []}
              onBook={book}
            />
          
          </div>}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-12 md:space-y-16">
            {/* Description */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-on-surface">
                Service Description
              </h2>
              <div className="prose prose-stone max-w-none text-tertiary leading-relaxed text-sm md:text-base">
                <p>{service.description}</p>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-on-surface">
                  Student Reviews
                </h2>
                <button className="text-secondary font-bold text-xs md:text-sm hover:underline">
                  See all
                </button>
              </div>
              <div className="space-y-4 md:space-y-6">
                {service.reviews?.map((review) => (
                  <ReviewCard key={review._id} {...review} />
                ))}
              </div>
            </section>
          </div>

          {/* Right: Metadata Sidebar */}
          <div className="order-1 lg:order-2 lg:col-span-4 space-y-6 md:space-y-8">
            {/* Location card */}
            <div className="bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant/10">
              <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-tertiary mb-4 md:mb-6">
                Service Location
              </h3>
              <p className="text-sm font-bold text-on-surface">
                {service.location}
              </p>
              <p className="text-xs text-tertiary mt-1">
                {service.locationDetails || "Available campus-wide"}
              </p>
            </div>

            {/* Creator card */}
            <div className="bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant/10">
              <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-tertiary mb-4">
                About the Creator
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={service.creator?.profileImage}
                  alt={service.creator?.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm md:text-base font-bold text-on-surface">
                    {service.creator?.name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-tertiary">
                    {service.creator?.department} • {service.creator?.year}
                  </p>
                </div>
              </div>
              <p className="text-xs text-tertiary leading-relaxed mb-6">
                {service.creator?.bio}
              </p>
              
              {/* Change this line in ServicePage.jsx */}
              <Link
                to={`/portfolio/${service.creator?._id || service.creator?.id || service.creator?.uid}`}
                className="block w-full py-2 border border-outline-variant text-on-surface rounded-full text-sm font-bold hover:bg-surface-container-highest transition-colors text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}