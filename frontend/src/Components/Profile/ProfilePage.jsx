import React, { useState, useRef, useEffect, useContext } from "react";
import Navbar from "../Landing/Navbar";
import axios from "axios";
import { AuthContext } from "@/lib/authProvider";
import { toast } from "react-toastify";
import { upload } from "@imagekit/react";
import { Link } from "react-router-dom";
import {
  Edit3,
  Plus,
  Star,
  Users,
  CheckCircle,
  MessageSquare,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImageFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${user.uid}`,
        );
        const data = res.data;
        setProfile({
          name: data.name,
          role: data.department,
          bio: data.bio,
          image: data.profileImage,
        });
        setServices(data.services || []);
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };
    fetchData();
  }, [user]);

  if (!profile)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  const handleSave = async () => {
    try {
      let finalImageUrl = profile.image;
      if (image) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/uploadImage`,
        );
        const response = await upload({
          file: image,
          fileName: image.name,
          publicKey: data.publicKey,
          signature: data.signature,
          token: data.token,
          expire: data.expire,
        });
        finalImageUrl = response.url;
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
        {
          id: user.uid,
          name: profile.name,
          department: profile.role,
          bio: profile.bio,
          profileImage: finalImageUrl,
        },
        { withCredentials: true },
      );

      setProfile({
        name: res.data.name,
        role: res.data.department,
        bio: res.data.bio,
        image: res.data.profileImage,
      });
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (e) {
      toast.error("Failed to update");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Stores the actual file for the upload logic
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result }); // Updates the UI preview immediately
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-sans pb-20 text-[#2D2D2D]">
      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* Profile Header - Elegant Serif Style */}
        <section className="flex flex-col md:flex-row gap-10 items-start mb-16 bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm">
          <div className="relative group">
            <div
              onClick={() => isEditing && fileInputRef.current.click()}
              className={`w-44 h-44 rounded-2xl overflow-hidden shadow-inner border-2 transition-all ${
                isEditing
                  ? "cursor-pointer border-[#803D5B] border-dashed ring-4 ring-[#803D5B]/5"
                  : "border-white"
              }`}
            >
              <img
                src={profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-[#803D5B]/20 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-white text-[#803D5B] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase shadow-md">
                    Change Photo
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    className="text-5xl font-serif italic text-[#803D5B] border-b border-[#803D5B]/30 w-full focus:outline-none bg-transparent mb-2"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                ) : (
                  <h1 className="text-5xl font-serif italic text-[#803D5B] mb-2 tracking-tight">
                    {profile.name}
                  </h1>
                )}

                <p className="text-gray-500 font-medium flex items-center gap-2 mb-4">
                  <span className="bg-[#F9F5F3] px-3 py-1 rounded-full text-xs text-[#803D5B]">
                    🎓 {profile.role}
                  </span>
                </p>

                {isEditing ? (
                  <textarea
                    className="text-sm text-gray-600 border border-gray-200 w-full focus:ring-1 focus:ring-[#803D5B] outline-none bg-white p-4 rounded-xl shadow-inner"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="3"
                  />
                ) : (
                  <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                    {profile.bio}
                  </p>
                )}
              </div>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`ml-4 flex items-center gap-2 border px-6 py-2.5 rounded-xl transition-all shadow-sm text-sm font-bold ${
                  isEditing
                    ? "bg-[#803D5B] text-white border-[#803D5B] hover:bg-[#6a324b]"
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                {isEditing ? (
                  <>
                    <CheckCircle size={16} /> Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 size={16} /> Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">
              Services Listed
            </p>
            <h2 className="text-4xl font-bold">{services.length}</h2>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">
              Avg Rating
            </p>
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold">4.9</h2>
              <Star size={20} className="text-[#D97706] fill-[#D97706]" />
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">
              Inbox
            </p>
            <h2 className="text-4xl font-bold">0</h2>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: My Services */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">My Services</h3>
              <Link
                to="/create-service"
                className="flex items-center gap-2 text-sm font-bold text-[#803D5B] hover:opacity-80 transition-opacity"
              >
                <Plus size={18} />
                Create New Service
              </Link>
            </div>

            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    price={service.price}
                    image={service.image}
                    category={service.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">
                  You haven't listed any services yet.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Campus Pulse Sidebar */}
          {/* Right Column: New Jobs Sidebar */}
          <aside className="w-full lg:w-80">
            <div className="bg-[#F9F5F3] p-8 rounded-[2.5rem] sticky top-24">
              <h4 className="text-[#803D5B] font-bold flex items-center gap-2 mb-8 uppercase tracking-tighter text-sm">
                <Activity size={18} /> New Jobs
              </h4>

              <div className="space-y-8">
                {/* These represent active requests from other students on campus */}
                <PulseItem
                  icon="🚚"
                  title="Needed: Dorm Move-out help"
                  sub="North Campus • Just Now"
                />
                <PulseItem
                  icon="📚"
                  title="Looking for: CS101 Tutor"
                  sub="Engineering Wing • 12m ago"
                />
                <PulseItem
                  icon="🎨"
                  title="Needed: Poster Design"
                  sub="Arts Block • 1h ago"
                />
              </div>

              {/* Updated to point to Incoming Requests */}
              <Link
                to="/incomingrequests"
                className="w-full mt-10 bg-white py-4 rounded-full font-bold shadow-sm hover:shadow-md transition-all text-center block text-sm text-[#803D5B]"
              >
                View All Jobs
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// Helper Components for clean code
const PulseItem = ({ icon, title, sub }) => (
  <div className="flex gap-4 group cursor-default">
    <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold leading-tight text-gray-800">{title}</p>
      <p className="text-[10px] text-gray-400 uppercase mt-1.5 font-bold tracking-wider">
        {sub}
      </p>
    </div>
  </div>
);

const ServiceCard = ({ title, price, image, category }) => (
  <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
    <div className="h-48 relative overflow-hidden">
      <div className="absolute top-4 left-4 bg-[#803D5B] text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter z-10">
        Top Curated
      </div>
      <img
        src={image}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-7">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#803D5B] opacity-60">
          {category || "University Service"}
        </span>
      </div>
      <h4 className="font-bold text-gray-900 text-xl group-hover:text-[#803D5B] transition-colors">
        {title}
      </h4>

      <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Starting at
          </p>
          <p className="text-2xl font-bold">₹{price}</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />{" "}
          Active
        </div>
      </div>
    </div>
  </div>
);
export default Dashboard;
