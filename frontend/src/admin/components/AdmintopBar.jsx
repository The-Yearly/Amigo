import { Bell, Menu, Search, Settings, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { IsMobileContext } from "../mobileContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const nav = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Community", link: "/" },
];

export const TopBar = ({ openSideBar }) => {
  const isMobile = useContext(IsMobileContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your backend logout route
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      // Always redirect, even if the network call fails
      navigate("/signup");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full flex items-center justify-between px-2 md:px-6">

        {/* Left Section: Menu & Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openSideBar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </motion.button>

          <p className="hidden xs:block text-sm md:text-xl font-bold text-[#002107] whitespace-nowrap">
            Amigo Admin
          </p>

          {!isMobile && (
            <ul className="flex space-x-4 lg:space-x-8 ml-4 text-md font-medium text-gray-600">
              {nav.map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="hover:text-green-700 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-1 md:gap-3">

          {/* Icons Group */}
          <div className="flex items-center">
            <IconButton icon={<Bell className="w-5 h-5" />} />

            {!isMobile && <IconButton icon={<Settings className="w-5 h-5" />} />}

            <Link to="/adminSettings/adminProfile">
              <IconButton icon={<User className="w-5 h-5" />} />
            </Link>

            {/* Logout Button */}
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
        </div>
      </div>
    </div>
  );
};

// Helper component for clean icon buttons
const IconButton = ({ icon, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full text-gray-600"
  >
    {icon}
  </motion.button>
);