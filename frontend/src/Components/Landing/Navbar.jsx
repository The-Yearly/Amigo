import React, { useEffect, useState } from "react";
import { MessageSquare, Plus, Menu, X } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/authProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [image, useImage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${user.uid}`
      );

      useImage(res.data.profileImage);
    };

    fetchData();
  }, [user.uid]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav className="relative z-[60] flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
        
        
        <div className="flex items-center">
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <Link to="/" className="hidden md:block">
            <div className="text-2xl font-bold tracking-tighter text-[#1a1a1a] cursor-pointer">
              Amigo
            </div>
          </Link>
        </div>

        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/services" className="hover:text-black">Explore</Link>
          <Link to="/my/services" className="hover:text-black">My Services</Link>
          <Link to="/my/requests" className="hover:text-black">My Requests</Link>
          <Link to="/incomingrequests" className="hover:text-black">Incoming Requests</Link>
          <Link to="/messages" className="hover:text-black">Messages</Link>
        </div>

        
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <div className="text-2xl font-bold tracking-tighter text-[#1a1a1a]">
              Amigo
            </div>
          </Link>
        </div>

        
        <div className="flex items-center space-x-5">
          
          <Link
            to="/create-service"
            className="hidden md:flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-900 transition"
          >
            <Plus size={16} />
            Create
          </Link>

          

          <Link to="/profile" className="hover:text-black">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img src={image} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 ml-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </nav>

      
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600">
          <Link
            to="/create-service"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#064e3b] text-white px-4 py-3 rounded-md text-sm font-semibold"
          >
            <Plus size={16} />
            Create Service
          </Link>

          <Link to="/services" onClick={() => setMenuOpen(false)} className="py-2 border-b border-gray-50">Explore</Link>
          <Link to="/my/services" onClick={() => setMenuOpen(false)} className="py-2 border-b border-gray-50">My Services</Link>
          <Link to="/my/requests" onClick={() => setMenuOpen(false)} className="py-2 border-b border-gray-50">My Requests</Link>
          <Link to="/incomingrequests" onClick={() => setMenuOpen(false)} className="py-2 border-b border-gray-50">Incoming Requests</Link>
          <Link to="/messages" onClick={() => setMenuOpen(false)} className="py-2">Messages</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;