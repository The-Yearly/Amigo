// RequestTabBar.jsx
// Segmented tab control + search input + sort button.
// Props:
//   tabs       – string[] of tab labels
//   activeTab  – currently active tab string
//   onTabChange – (tab) => void
//   search     – controlled search value
//   onSearch   – change handler

const TABS = ["All", "Pending", "Accepted", "In Progress", "Completed"];

export default function RequestTabBar({ activeTab = "All", onTabChange, search = "", onSearch }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
      {/* Segmented tabs */}
      <div className="flex bg-surface-container p-1 rounded-xl">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange?.(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-surface-container-lowest text-primary-container font-bold shadow-sm"
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex gap-4 w-full md:w-auto">
        <div className="relative flex-grow md:flex-grow-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={onSearch}
            className="pl-10 pr-4 py-2 bg-surface-container-high border-none rounded-xl w-full md:w-64 focus:ring-2 focus:ring-primary-container transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-xl font-medium text-on-surface-variant">
          <span className="material-symbols-outlined">sort</span>
          Sort
        </button>
      </div>
    </div>
  );
}
