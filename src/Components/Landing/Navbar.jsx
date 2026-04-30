import React from "react";
import { Search, Bell, MessageSquare, UserCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      <div className="text-2xl font-bold tracking-tighter text-[#1a1a1a]">
        The Editorial Marketplace
      </div>

      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <Link to="/CuratorWorkspace" className="hover:text-black">
          Services
        </Link>
        <a href="#" className="hover:text-black">
          Textbooks
        </a>
        <a href="#" className="hover:text-black">
          Housing
        </a>
        <a href="#" className="hover:text-black">
          Events
        </a>
        <a href="#" className="hover:text-black">
          Careers
        </a>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-black">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </button>
        <button className="bg-[#064e3b] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-green-900 transition-colors">
          Post a Request
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <img src="user-avatar.jpg" alt="profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
