import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Landing/Navbar";

const Portfolio = () => {
  const { creatorId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${creatorId}`
        );
        const data = res.data;
        setProfile({
          name: data.name,
          role: data.department,
          bio: data.bio,
          image: data.profileImage,
          year: data.year,
          rating: data.rating || 5.0,
          // If your backend doesn't send these yet, we'll use your placeholders
          completedGigs: data.completedGigs || 0,
        });
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreatorData();
  }, [creatorId]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <p className="text-gray-400 font-medium">Loading Portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return <div className="text-center mt-20 font-bold">User not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              {profile.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-bold border border-gray-200 shadow-sm uppercase tracking-tight">
                🎓 {profile.role}
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-bold border border-gray-100 shadow-sm uppercase tracking-tight">
                📅 {profile.year || "Student"}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-2xl text-sm md:text-base">
              {profile.bio || "No bio available for this creator."}
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#053317] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs opacity-70 mb-1 font-bold uppercase tracking-widest">Gigs Completed</p>
              <h2 className="text-5xl font-black">{profile.completedGigs || "24"}</h2>
            </div>
            <div className="absolute -right-4 -bottom-4 text-white/5 text-8xl font-black">✓</div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <p className="text-xs text-gray-400 mb-1 font-bold uppercase tracking-widest">Avg Rating</p>
            <div className="flex items-center gap-2">
              <h2 className="text-5xl font-black text-gray-900">{profile.rating}</h2>
              <span className="text-yellow-400 text-3xl">★</span>
            </div>
          </div>

          <div className="bg-pink-100 p-8 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-pink-900 font-black text-xl leading-tight">Campus<br/>Verified</h3>
              <p className="text-pink-800 text-[10px] mt-2 font-bold uppercase">Trusted Student Creator</p>
            </div>
            <div className="bg-white/50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner">
              🤝
            </div>
          </div>
        </section>

        {/* Services & Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Services List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Active Services</h3>
              <div className="h-1 flex-1 mx-4 bg-gray-200 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* If you have real service data, map it here. For now, we'll keep the design style */}
              <PortfolioServiceCard 
                title="Academic Branding" 
                price="$25/hr" 
                category="Design" 
              />
              <PortfolioServiceCard 
                title="Full-Stack Dev" 
                price="$50/hr" 
                category="Tech" 
              />
            </div>
          </div>

          {/* Review Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Feedback</h3>
            <div className="space-y-4">
              <PortfolioReviewCard 
                name="Alex Rivera" 
                text="Incredible attention to detail. Would highly recommend for anyone on campus!" 
              />
              <PortfolioReviewCard 
                name="Jordan Smith" 
                text="Fast delivery and exactly what we needed for our club project." 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Internal Sub-components for better organization */
const PortfolioServiceCard = ({ title, price, category }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
    <div className="h-32 bg-gray-100 group-hover:bg-gray-200 transition-colors" />
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-black text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
          {title}
        </h4>
        <span className="text-[10px] font-black bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">
          {price}
        </span>
      </div>
      <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase tracking-widest">
        {category}
      </span>
    </div>
  </div>
);

const PortfolioReviewCard = ({ name, text }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-xs">👤</div>
      <div>
        <p className="text-xs font-black text-gray-900 uppercase tracking-wide">{name}</p>
        <div className="flex text-[8px] text-yellow-400">★★★★★</div>
      </div>
    </div>
    <p className="text-xs italic text-gray-500 leading-relaxed">"{text}"</p>
  </div>
);

export default Portfolio;