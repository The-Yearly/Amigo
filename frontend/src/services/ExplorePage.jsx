import ExploreNavBar from "@/Components/Landing/Navbar";
import ServiceCard from "@/components/ServiceCard";
import ExploreFooter from "@/Components/Landing/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => {
        console.log("API data:", res.data);
        setServices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChipClick(index) {
    setChips((prev) =>
      prev.map((chip, i) => ({
        ...chip,
        active: i === index ? !chip.active : chip.active,
      }))
    );
  }

  // FILTER LOGIC
  const filteredServices = services.filter((service) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    return (
      service.title?.toLowerCase().includes(query) ||
      service.category?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-24 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Hero */}
          <header className="mb-16">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-editorial-gradient mb-4 font-display">
              Explore Services
            </h1>

            <p className="text-xl text-on-surface-variant max-w-2xl font-body">
              Find help from students around you. Discover curated talent within
              your campus community for everything from design to tutoring.
            </p>
          </header>

          {/* Search Input */}
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3"
            />

            <p className="mt-2 text-sm text-gray-500">
              Search: {searchQuery} | Total: {services.length} | Filtered: {filteredServices.length}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((card) => (
              <ServiceCard
                key={card._id || card.id}
                {...card}
              />
            ))}
          </div>

          {/* No results */}
          {filteredServices.length === 0 && (
            <p className="text-center mt-10 text-red-500">
              No services found
            </p>
          )}

          {/* Load More */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <button className="bg-surface-container-lowest border border-outline-variant/30 text-primary font-bold px-12 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-md">
              Load More Services
            </button>

            <p className="text-on-surface-variant text-sm font-medium">
              Showing {filteredServices.length} services
            </p>
          </div>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}