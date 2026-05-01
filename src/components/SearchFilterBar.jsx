// SearchFilterBar.jsx
// Search bar with category/sort dropdowns, apply button, and quick filter chips.
// Props:
//   chips       – array of { label, icon?, active? }
//   onChipClick – (index) => void

import FilterChip from "./FilterChip";

const CATEGORIES = ["All Categories", "Academic Help", "Graphic Design", "Photography", "Tech Support"];
const SORT_OPTIONS = ["Sort by: Popular", "Newest First", "Price: Low to High", "Highest Rated"];

export default function SearchFilterBar({ chips = [], onChipClick }) {
  return (
    <section className="mb-12">
        {/* Search + Dropdowns + Button */}
        <div className="bg-surface-container-high/90 backdrop-blur-md p-4 rounded-xl flex flex-col lg:flex-row gap-4 items-center">
          {/* Search input */}
          <div className="relative w-full lg:flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="What service are you looking for today?"
              className="w-full bg-surface-container-lowest border border-primary/15 focus:border-primary/35 focus:ring-2 focus:ring-primary/15 rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline shadow-sm"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex gap-4 w-full lg:w-auto">
            {/* Category */}
            <div className="relative min-w-[180px] flex-1">
              <select className="w-full bg-surface-container-lowest border border-primary/15 focus:border-primary/35 focus:ring-2 focus:ring-primary/15 rounded-lg py-4 pl-4 pr-10 appearance-none text-on-surface font-medium shadow-sm">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                expand_more
              </span>
            </div>

            {/* Sort */}
            <div className="relative min-w-[180px] flex-1">
              <select className="w-full bg-surface-container-lowest border border-primary/15 focus:border-primary/35 focus:ring-2 focus:ring-primary/15 rounded-lg py-4 pl-4 pr-10 appearance-none text-on-surface font-medium shadow-sm">
                {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                sort
              </span>
            </div>
          </div>

          {/* Apply button */}
          <button className="bg-primary-gradient text-on-primary h-full py-4 px-8 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap text-white">
            Apply Filters
          </button>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-3 mt-6">
          {chips.map((chip, i) => (
            <FilterChip
              key={chip.label}
              label={chip.label}
              active={chip.active}
              icon={chip.icon}
              onClick={() => onChipClick?.(i)}
            />
          ))}
        </div>
    </section>
  );
}
