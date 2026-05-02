import {
  ArrowDownUp,
  Briefcase,
  ChevronDown,
  CircleCheckBig,
  Gavel,
  ListFilterPlus,
  TrendingUp,
  TriangleAlert,
  User,
  Clock,
  ArrowRight,
} from "lucide-react";
import {motion} from "framer-motion"
import React, { useContext, useEffect } from "react";
import { IsMobileContext } from "./mobileContext";
export const dummyData = [
  {
    reportId: "RPT-1001",
    type: "User Profile",
    reason: "User repeatedly posted promotional links",
    status: "Pending",
    time: "2026-04-28T10:15:30Z",
  },
  {
    reportId: "RPT-1002",
    type: "User Profile",
    reason: "Offensive language used in comments",
    status: "Completed",
    time: "2026-04-27T14:42:10Z",
  },
  {
    reportId: "RPT-1003",
    type: "Errand",
    reason: "App crashes on login",
    status: "Under Review",
    time: "2026-04-26T09:05:55Z",
  },
  {
    reportId: "RPT-1004",
    type: "User Profile",
    reason: "Suspicious payment activity detected",
    status: "Completed",
    time: "2026-04-25T18:20:00Z",
  },
  {
    reportId: "RPT-1005",
    type: "User Profile",
    reason: "Request for dark mode support",
    status: "Pending",
    time: "2026-04-24T12:33:45Z",
  },
  {
    reportId: "RPT-1006",
    type: "Errand",
    reason: "User sending repeated unwanted messages",
    status: "Completed",
    time: "2026-04-23T16:10:22Z",
  },
  {
    reportId: "RPT-1007",
    type: "Errand",
    reason: "Slow loading dashboard",
    status: "Under Review",
    time: "2026-04-22T08:55:10Z",
  },
  {
    reportId: "RPT-1008",
    type: "Errand",
    reason: "Possible XSS vulnerability",
    status: "Pending",
    time: "2026-04-21T11:47:36Z",
  },
];

export const MobileReportCard = ({ card }) => {
  return (
    <div className=" p-6 bg-white border border-gray-100 rounded-2xl shadow-sm font-sans">
      <div className="flex  justify-between items-start mb-2">
        <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
          #{card.reportId}
        </span>
        <div
          className={`flex items-center w-fit px-3 py-1 text-sm rounded-2xl ${card.status === "Completed" ? "bg-green-300/30 text-green-700 " : card.status === "Pending" ? "bg-red-300/30 text-red-400" : "bg-gray-300/30 text-black"}`}
        >
          {card.status}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{card.type}</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={18} />
          <span className="text-base font-medium text-gray-500">
            {card.time}
          </span>
        </div>
      </div>
    </div>
  );
};

const Cards = ({ card }) => {
  return (
    <div className="w-full bg-white rounded-xl bg- col-span-1 grid grid-cols-2 px-4 sm:px-6 py-5  shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`${card.style} flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl`}
      >
        <card.icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div>{card.sideContent}</div>
      <div className="space-y-1">
        <p className="text-sm sm:text-base text-gray-600">{card.name}</p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {card.value}
        </p>
      </div>
    </div>
  );
};

export default function AdminHome() {
  const isMobile = useContext(IsMobileContext);
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);
  const adminHeroCards = [
    {
      name: "Total Flags",
      icon: TriangleAlert,
      value: 124,
      style: "bg-amber-400/30 text-amber-800",
      sideContent: (
        <div className="bg-amber-400/30 text-amber-800 px-3 space-x-2 h-8 text-xs rounded-2xl justify-center py-1 flex items-center whitespace-nowrap">
          <TrendingUp className="w-4 h-4" />
          <p>+12%</p>
        </div>
      ),
    },
    {
      name: "Urgent Reports",
      icon: TriangleAlert,
      value: 25,
      style: "bg-red-300/30 text-red-400",
      sideContent: (
        <div className="bg-red-300/30 text-red-400 px-3 h-8 text-xs rounded-2xl py-1 flex justify-center items-center whitespace-nowrap">
          Requires Action
        </div>
      ),
    },
    {
      name: "Profile Reports",
      icon: User,
      value: 10,
      style: "bg-blue-300/20 text-blue-400",
      sideContent: (
        <div className="bg-blue-300/30 text-blue-400 px-3 h-8 text-xs rounded-2xl py-1 flex justify-center items-center whitespace-nowrap">
          Reports Pending
        </div>
      ),
    },
    {
      name: "Errand Reports",
      icon: Briefcase,
      value: 90,
      style: "bg-green-300/30 text-green-700",
      sideContent: (
        <div className="bg-green-300/30 text-green-700 px-3 h-8 text-xs rounded-2xl py-1 flex items-center justify-center whitespace-nowrap">
          Reports Pending
        </div>
      ),
    },
    {
      name: "Audited Today",
      icon: Gavel,
      value: 20,
      style: "bg-gray-300/30 text-black",
      sideContent: (
        <div className="bg-gray-100 flex items-center text-xs justify-center py-2 rounded-2xl whitespace-nowrap">
          <CircleCheckBig className="w-4 h-4" />
          <p className="ml-1">84% Completed</p>
        </div>
      ),
    },
  ];
  return (
    <div className="max-w-full min-h-screen bg-[#fafaf4] gap-6 px-12 grid grid-cols-1 md:grid-cols-5">
      <div className="space-y-4 mt-8 col-span-1 md:col-span-5">
        <p className="text-5xl font-semibold text-[#002107]">
          Flagged Market Activity
        </p>
        <p className="font-sans">
          Review and moderate user-reported content, transactions, and community
          interactions
          <br /> requiring immediate administrative attention.
        </p>
      </div>
      {adminHeroCards.map((card, i) => (
        <Cards card={card} key={i} />
      ))}
      <div className="col-span-1 md:col-span-5 mt-16 flex w-full justify-between">
        <p className="text-2xl">Recent Activity</p>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-3 px-5 py-3 hover:bg-gray-300/40 transition-all duration-300  rounded-xl items-center">
            <ListFilterPlus />
            <p>Filter</p>
          </div>
          <div className="flex space-x-3 px-5 py-3 hover:bg-gray-300/40 transition-all duration-300 rounded-xl items-center">
            <ArrowDownUp />
            <p>Sort</p>
          </div>
          {!isMobile &&
          <motion.span
            className="flex items-center space-x-2 text-sm font-bold cursor-pointer"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.p
              variants={{
                rest: { x: 0 },
                hover: { x: 2 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View All
            </motion.p>

            <motion.div
              variants={{
                rest: { x: 0, opacity: 0.7 },
                hover: { x: 6, opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.span>}
                  </div>
                </div>
                {!isMobile && (
        <React.Fragment>
          <p className="font-sans">REPORT ID</p>
          <p className="font-sans">TYPE</p>
          <p className="font-sans">REASON</p>
          <p className="font-sans">STATUS</p>
          <p className="flex font-sans justify-end">TIME</p>

          {dummyData.slice(0, 4).map((activity, i) => (
            <React.Fragment key={i}>
              <p className="font-sans truncate line-clamp-1">
                #{activity.reportId}
              </p>
              <div className="flex space-x-2 items-center">
                {activity.type === "User Profile" ? <User /> : <Briefcase />}
                <p className="font-sans truncate line-clamp-1">
                  {activity.type}
                </p>
              </div>
              <p className="font-sans truncate line-clamp-1">
                {activity.reason}
              </p>
              <div
                className={`flex items-center w-fit px-3 py-1 text-sm rounded-2xl ${activity.status === "Completed" ? "bg-green-300/30 text-green-700 " : activity.status === "Pending" ? "bg-red-300/30 text-red-400" : "bg-gray-300/30 text-black"}`}
              >
                <p className="font-sans truncate line-clamp-1">
                  {activity.status}
                </p>
              </div>
              <p className="flex justify-end font-sans truncate line-clamp-1">
                {activity.time}
              </p>
            </React.Fragment>
          ))}


        </React.Fragment>
      )}
      {isMobile &&
        dummyData
          .slice(0, 4)
          .map((card, i) => <MobileReportCard card={card} key={i} />)}
    </div>
  );
}
