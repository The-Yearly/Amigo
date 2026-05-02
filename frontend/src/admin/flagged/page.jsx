import { useContext, useState } from "react";
import { FlaggedCard,EmptyState } from "../components/flaggedCard";
import { Eye, CheckCircle, Flag } from "lucide-react";
import React from "react";
import { dummyData } from "../page";
import { IsMobileContext } from "../mobileContext";

export default function AdminFlagged() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const filteredData = dummyData.filter(
    (item) => item.status === selectedStatus,
  );
  const errandsList = filteredData.filter((item) => item.type === "Errand");
  const profilesList = filteredData.filter(
    (item) => item.type === "User Profile",
  );
  const isMobile = useContext(IsMobileContext);
  return (
    <div className="min-h-screen bg-[#fafaf4] px-6 py-3 md:px-12 md:py-16 font-inter text-[#1a1c1e]">
      <div className="mb-14">
        <h1 className="font-plus-jakarta text-3xl md:text-[3.5rem] font-bold leading-tight tracking-tight text-[#002107]">
          Moderation Queue
        </h1>
        <p className="text-[#414940] text-sm md:text-lg mt-2 max-w-2xl">
          Review flagged content and user reports. Ensure all actions adhere to
          community guidelines and prioritize user safety.
        </p>
      </div>
      <div className="flex w-fit items-center md:gap-1 rounded-lg bg-gray-100 p-0.5 md:p-1.5 shadow-inner">
        <button
          onClick={() => {
            setSelectedStatus("Pending");
          }}
          className={`flex items-center gap-2 rounded-md ${selectedStatus === "Pending" ? "bg-white shadow-sm " : "bg-none "} px-1 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-900 transition-all hover:bg-gray-50`}
        >
          <Flag
            className={`h-4 w-4 ${selectedStatus === "Pending" ? "text-red-500" : "text-gray-500"}`}
          />
          <div>Pending</div>
          <div
            className={`ml-1 rounded-full md:px-2 md:py-0.5  ${selectedStatus === "Pending" ? "text-red-600 text-xs bg-red-100 " : "text-gray-400"}`}
          >
            {dummyData.filter((data) => data.status === "Pending").length}
          </div>
        </button>
        <button
          onClick={() => {
            setSelectedStatus("Under Review");
          }}
          className={`flex items-center gap-2 rounded-md ${selectedStatus === "Under Review" ? "bg-white shadow-sm " : "bg-none "} px-1 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-900 transition-all hover:bg-gray-50`}
        >
          <Eye
            className={`h-4 w-4 ${selectedStatus === "Under Review" ? "text-amber-600" : "text-gray-500"}`}
          />
          <div>Under Review</div>
          <div
            className={`ml-1 rounded-full md:px-2 md:py-0.5  ${selectedStatus === "Under Review" ? "text-amber-600 text-xs bg-amber-300/20 " : "text-gray-400"}`}
          >
            {dummyData.filter((data) => data.status === "Under Review").length}
          </div>
        </button>
        <button
          onClick={() => {
            setSelectedStatus("Completed");
            console.log("Hi");
          }}
          className={`flex items-center gap-2 rounded-md ${selectedStatus === "Completed" ? "bg-white shadow-sm " : "bg-none "} px-1 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-900 transition-all hover:bg-gray-50`}
        >
          <CheckCircle
            className={`h-4 w-4 ${selectedStatus === "Completed" ? "text-green-600" : "text-gray-500"}`}
          />
          <div>Completed</div>
          <div
            className={`ml-1 rounded-full md:px-2 md:py-0.5  ${selectedStatus === "Completed" ? "text-green-600 text-xs bg-green-300/20 " : "text-gray-400"}`}
          >
            {dummyData.filter((data) => data.status === "Completed").length}
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {!isMobile ? (
          <React.Fragment>
            <div>
              <div className="flex justify-between items-end mb-8 border-b-2 border-[#efedf0] pb-4">
                <h2 className="font-plus-jakarta text-2xl font-bold">
                  Flagged Errands
                </h2>
                <div className="text-xs font-bold uppercase tracking-widest text-[#414940] bg-[#efedf0] px-3 py-1 rounded-full">
                  {errandsList.length} {selectedStatus}
                </div>
              </div>
              <div className="space-y-8">
                {errandsList.map((item) => (
                  <FlaggedCard key={item.reportId} data={item} />
                ))}
                {errandsList.length === 0 && <EmptyState label="errands" />}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-8 border-b-2 border-[#efedf0] pb-4">
                <h2 className="font-plus-jakarta text-2xl font-bold">
                  Flagged Users
                </h2>
                <div className="text-xs font-bold uppercase tracking-widest text-[#414940] bg-[#efedf0] px-3 py-1 rounded-full">
                  {profilesList.length} {selectedStatus}
                </div>
              </div>
              <div className="space-y-8">
                {profilesList.map((item) => (
                  <FlaggedCard key={item.reportId} data={item} />
                ))}
                {profilesList.length === 0 && <EmptyState label="users" />}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div>
            <div className="flex justify-between items-end mb-8 border-b-2 border-[#efedf0] pb-4">
              <h2 className="font-plus-jakarta text-2xl font-bold">Flagged</h2>
              <div className="text-xs font-bold uppercase tracking-widest text-[#414940] bg-[#efedf0] px-3 py-1 rounded-full">
                {
                  dummyData.filter((item) => item.status === selectedStatus)
                    .length
                }{" "}
                {selectedStatus}
              </div>
            </div>
            <div className="space-y-8">
              {dummyData.map((item) => (
                <FlaggedCard key={item.reportId} data={item} />
              ))}
              {dummyData.length === 0 && <EmptyState label="errands" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

