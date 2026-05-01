import { Bell, Menu, Search, Settings, User } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { IsMobileContext } from "../mobileContext";
const nav = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Community",
    link: "/",
  },
];
export const TopBar = ({ openSideBar }) => {
  const isMobile = useContext(IsMobileContext);
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openSideBar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </motion.button>
          {!isMobile && (
            <div className="flex text-[#002107] items-center space-x-12">
              <p className="text-xl font-sans"> Amigo Admin</p>
              <ul className="flex space-x-8 text-lg ">
                {nav.map((item, i) => (
                  <div key={i}>
                    <a href={item.link}>{item.name}</a>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {isMobile && (
            <p className="text-xs md:text-xl font-sans"> Amigo Admin</p>
          )}
        </div>
        <div className="flex items-center gap-0 md:gap-6 sm:gap-4 relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-500" />
            <input
              className="w-42 md:ml-0 md:w-82 h-10 md:h-12 pl-10 rounded-xl border-gray-300 border focus:outline-none bg-gray-400/10"
              placeholder="Search Reports"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openSideBar}
            className="p-3 hover:bg-gray-100 rounded-full"
          >
            <Bell />
          </motion.button>
          {!isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openSideBar}
              className="p-3 hover:bg-gray-100 rounded-full"
            >
              <Settings />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openSideBar}
            className="p-3 hover:bg-gray-100 rounded-full"
          >
            <User />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
