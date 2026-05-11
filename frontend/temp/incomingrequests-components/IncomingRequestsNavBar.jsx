// IncomingRequestsNavBar.jsx
// Top nav for the Incoming Requests dashboard.
// Has cart + notifications icons, Post a Request CTA, and avatar.
// Props:
//   avatarSrc – user avatar URL

const NAV_LINKS = [
  { label: "Services", href: "#" },
  { label: "Textbooks", href: "#" },
  { label: "Housing", href: "#" },
  { label: "Careers", href: "#", active: true },
];

export default function IncomingRequestsNavBar({ avatarSrc }) {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#faf9fb]/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-ambient">
      <div className="flex justify-between items-center px-12 py-6 max-w-[1440px] mx-auto">
        {/* Left: brand + nav */}
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black text-primary-container font-display tracking-tight">
            The Editorial Marketplace
          </span>
          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={
                  link.active
                    ? "text-primary-container font-bold border-b-2 border-primary-container pb-1"
                    : "text-gray-600 dark:text-gray-400 font-medium hover:text-secondary transition-all duration-300"
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: icons + CTA + avatar */}
        <div className="flex items-center gap-4">
          <div className="flex gap-4 mr-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary transition-colors">
              shopping_cart
            </span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary transition-colors">
              notifications
            </span>
          </div>
          <button className="bg-primary-container text-on-primary px-6 py-2 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-transform duration-200">
            Post a Request
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant/20">
            <img src={avatarSrc} alt="Curator Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
