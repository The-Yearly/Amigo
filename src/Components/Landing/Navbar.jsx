import React from "react";
import { Bell, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      
      {/* LOGO */}
      <Link to="/">
        <div className="text-2xl font-bold tracking-tighter text-[#1a1a1a]">
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
          to="/services/create"
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
        <Link to="/profile">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img src="user-avatar.jpg" alt="profile" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;