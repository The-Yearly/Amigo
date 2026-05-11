import React, { useEffect, useState } from "react";
import { Bell, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/authProvider";
import axios from "axios";import { motion } from "framer-motion"; 
import { LogOut } from "lucide-react";
const Navbar = () => {
  const [image,useImage]=useState("")
  const {user,loading}=useAuth()
  useEffect(()=>{const fetchData=async()=>{
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${user.uid}`)
    useImage(res.data.profileImage)
}
  fetchData()})
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      // Clear local storage/state and redirect
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <nav className="relative z-[60] flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      {/* LOGO */}
      <Link to="/">
        <div className="text-2xl font-bold tracking-tighter text-[#1a1a1a] cursor-pointer">
          Amigo
        </div>
      </Link>

      {/* NAV LINKS */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <Link to="/services" className="hover:text-black">
          Explore
        </Link>
        <Link to="/my/services" className="hover:text-black">
          My Services
        </Link>
        <Link to="/my/requests" className="hover:text-black">
          Requests
        </Link>
        <Link to="/messages" className="hover:text-black">
          Messages
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-5">
        {/* CREATE SERVICE BUTTON */}
        <Link
          to="/create-service"
          className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-900 transition"
        >
          <Plus size={16} />
          Create
        </Link>

        {/* NOTIFICATIONS */}
        <button className="text-gray-500 hover:text-black">
          <Bell size={20} />
        </button>

        {/* PROFILE */}
        <Link to="/profile" className="hover:text-black ">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img src={image} />
          </div>
        </Link>
        {/* LOGOUT BUTTON */}
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
  );
};

export default Navbar;
