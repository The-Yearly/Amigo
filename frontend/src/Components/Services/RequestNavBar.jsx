// RequestNavBar.jsx
// Top nav for the My Requests page — has user avatar instead of Sign In.
// Props:
//   avatarSrc – user avatar image URL

const NAV_LINKS = ["Services", "Textbooks", "Housing", "Events"];

export default function RequestNavBar({ avatarSrc }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf9fb]/70 dark:bg-[#1a1c1e]/70 backdrop-blur-xl shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center px-12 py-4 max-w-[1920px] mx-auto">
        {/* Left */}
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold tracking-tighter text-[#003912] dark:text-[#b7f1b8] font-headline">
            Amigo
          </span>
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#414940] dark:text-[#c1c9bd] font-medium hover:text-[#984063] transition-colors duration-300 font-label"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <button className="px-6 py-2.5 editorial-gradient text-on-primary rounded-xl font-medium scale-95 active:scale-90 transition-transform shadow-sm">
            Post a Request
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-fixed">
            <img src={avatarSrc} alt="User avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
}
