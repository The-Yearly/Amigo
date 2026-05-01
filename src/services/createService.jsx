import React from "react";
import WorkspaceSidebar from "../Components/Services/WorkspaceSidebar";
import ExpertiseForm from "../Components/Services/ExpertiseForm";
import Navbar from "../Components/Landing/Navbar";
const createService = () => {
  return (
    <div className=" stickymin-h-screen bg-[#F9F9F9] text-[#1a1a1a] font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Left Sidebar (Col Span 4) */}
        <div className="md:col-span-4">
          <WorkspaceSidebar />
        </div>

        {/* Right Form (Col Span 8) */}
        <div className="md:col-span-8">
          <ExpertiseForm />
        </div>
      </main>
    </div>
  );
};

export default createService;
