import React, { useState, useRef, useEffect, useContext } from "react";
import Navbar from "../Landing/Navbar";
import axios from "axios";
import { AuthContext } from "@/lib/authProvider";
import { toast } from "react-toastify";
import { upload } from "@imagekit/react";
const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImageFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/` + user.uid,
      );
      console.log("User object:", user);

      const data = res.data;
      {
        setProfile({
          name: data.name,
          role: data.department,
          bio: data.bio,
          image: data.profileImage,
        });
      }
    };
    fetchData();
  }, []);

  if (!profile) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans pb-20">
       
        <main className="max-w-6xl mx-auto px-4 mt-12">
          <p>Loading profile...</p>
        </main>
      </div>
    );
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      console.log(profile.image);
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
        setProfile({ ...profile, image: response.url });
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
        {
          id: user.uid,
          name: profile.name,
          department: profile.role,
          bio: profile.bio,
          profileImage: profile.image,
        },
        { withCredentials: true },
      );

      const data = res.data;
      setProfile({
        name: data.name,
        role: data.department,
        bio: data.bio,
        image: data.profileImage,
      });
      setIsEditing(false);
    } catch (e) {
      console.log(e);
      toast.warn("Failed To Update");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    if (isEditing) fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      <main className="max-w-6xl mx-auto px-4 mt-12">
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Profile Pic */}
          <div className="relative">
            <div
              onClick={triggerFileSelect}
              className={`relative w-48 h-48 rounded-lg overflow-hidden shadow-lg border-2 ${
                isEditing
                  ? "cursor-pointer border-pink-400 border-dashed hover:opacity-90"
                  : "border-transparent"
              }`}
            >
              <img
                src={profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold bg-black/60 px-2 py-1 rounded uppercase">
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
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    className="text-4xl font-bold border-b-2 border-pink-200 w-full focus:outline-none focus:border-pink-500 bg-transparent mb-2"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {profile.name}
                  </h1>
                )}

                <p className="text-gray-500 mb-4">
                  <span className="text-sm">🎓 {profile.role}</span>
                </p>

                {isEditing ? (
                  <textarea
                    className="text-sm text-gray-600 border-2 border-pink-200 w-full focus:outline-none focus:border-pink-500 bg-transparent p-2 rounded"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="3"
                  />
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {profile.bio}
                  </p>
                )}
              </div>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`ml-4 flex items-center gap-2 border px-6 py-2 rounded-md transition shadow-sm text-sm font-bold ${
                  isEditing
                    ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#053317] text-white p-8 rounded-xl shadow-md">
            <p className="text-sm opacity-80 mb-2 font-medium uppercase tracking-tight">
              Gigs Completed
            </p>
            <h2 className="text-5xl font-bold mb-2">142</h2>
            <p className="text-green-400 text-xs font-semibold">
              📈 +12% this month
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-tight">
              Avg Rating
            </p>
            <div className="flex items-end gap-2">
              <h2 className="text-5xl font-bold text-gray-900">4.9</h2>
              <span className="text-pink-500 text-2xl mb-2">★</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              From 86 verified reviews
            </p>
          </div>

          <div className="bg-pink-200 p-8 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden">
            <div>
              <h3 className="text-pink-900 font-bold text-xl mb-1">
                Campus Influence
              </h3>
              <p className="text-pink-800 text-xs max-w-[180px]">
                Reached over 4,000 students via student org collaborations.
              </p>
            </div>
            <div className="bg-pink-300/50 p-4 rounded-xl text-2xl">👥</div>
          </div>
        </section>

        {/* Services & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Active Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceCard
                title="Editorial Layout Design"
                price="$45/hr"
                tags={["DESIGN", "PUBLISHING"]}
              />
              <ServiceCard
                title="Academic Brand Voice"
                price="$0.15/word"
                tags={["COPYWRITING", "STRATEGY"]}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Recent Reviews</h3>
            <div className="space-y-4">
              <ReviewCard
                name="Sarah Jenkins"
                role="VP COMMUNICATIONS"
                text="Marcus transformed our newsletter from a boring PDF into a masterpiece."
              />
              <ReviewCard
                name="Leo Chen"
                role="FOUNDER, CAMPUS GRUB"
                text="Exceptional eye for detail. Helped us secure our first round of funding."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ServiceCard = ({ title, price, tags }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer">
    <div className="h-40 bg-gray-900 relative" />
    <div className="p-6">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">
          {price}
        </span>
      </div>
      <div className="flex gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded font-bold"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ReviewCard = ({ name, role, text }) => (
  <div className="bg-gray-100 p-5 rounded-xl">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
      <div>
        <p className="text-xs font-bold leading-none">{name}</p>
        <p className="text-[9px] text-gray-500 font-semibold uppercase">
          {role}
        </p>
      </div>
    </div>
    <p className="text-xs italic text-gray-600 leading-relaxed">"{text}"</p>
  </div>
);

export default Dashboard;
