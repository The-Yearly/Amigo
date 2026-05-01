import ExploreNavBar from "@/Components/Landing/Navbar";
import SearchFilterBar from "@/components/SearchFilterBar";
import ServiceCard from "@/components/ServiceCard";
import ExploreFooter from "@/Components/Landing/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

// ─── Data ────────────────────────────────────────────────────────────────────

const INITIAL_CHIPS = [
  { label: "Top Rated", icon: "verified", active: true },
  { label: "Digital Art" },
  { label: "Essay Review" },
  { label: "Apparel Printing" },
  { label: "Moving Help" },
];



export default function ExplorePage() {
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data));
  }, []);

  function handleChipClick(index) {
    setChips((prev) =>
      prev.map((chip, i) => ({ ...chip, active: i === index ? !chip.active : chip.active }))
    );
  }

  return (
    <div className="bg-surface font-body text-on-surface">
      <ExploreNavBar />

      <main className="pt-24 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-editorial-gradient mb-4 font-display">
            Explore Services
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-body">
            Find help from students around you. Discover curated talent within your campus community
            for everything from design to tutoring.
          </p>
        </header>

        {/* Search + Filters */}
        <SearchFilterBar chips={chips} onChipClick={handleChipClick} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* First 4 standard cards */}
         {services.map((card) => (
            <ServiceCard key={card.id} {...card} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <button className="bg-surface-container-lowest border border-outline-variant/30 text-primary font-bold px-12 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-md">
            Load More Services
          </button>
          <p className="text-on-surface-variant text-sm font-medium">
            Showing 1–12 of 348 services
          </p>
        </div>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
