// ExploreNavBar.jsx
// Top navigation bar for the Explore Services page.

const NAV_LINKS = [
  { label: "Services", href: "#", active: true },
  { label: "Textbooks", href: "#" },
  { label: "Housing", href: "#" },
  { label: "Events", href: "#" },
];

export default function ExploreNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf9fb]/70 dark:bg-[#1a1c1e]/70 backdrop-blur-xl shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center px-12 py-4 max-w-[1920px] mx-auto">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold tracking-tighter text-[#003912] dark:text-[#b7f1b8] font-display">
            Amigo
          </span>
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-display tracking-tight text-lg transition-colors duration-300 ${
                  link.active
                    ? "text-[#003912] dark:text-[#b7f1b8] font-bold border-b-2 border-[#003912]"
                    : "text-[#414940] dark:text-[#c1c9bd] font-medium hover:text-[#984063]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-6">
          <button className="text-[#414940] dark:text-[#c1c9bd] font-medium hover:text-[#984063] transition-colors duration-300 scale-95 active:scale-90 transition-transform">
            Sign In
          </button>
          <button className="bg-secondary text-on-secondary px-6 py-2.5 rounded-full font-bold scale-95 active:scale-90 transition-transform shadow-md">
            Post a Request
          </button>
        </div>
      </div>
    </nav>
  );
}
