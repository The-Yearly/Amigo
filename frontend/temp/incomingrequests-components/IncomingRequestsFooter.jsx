// IncomingRequestsFooter.jsx
// Footer for the Editorial Marketplace / Incoming Requests page.

const FOOTER_LINKS = [
  "About the Gallery",
  "Editorial Standards",
  "Trust & Safety",
  "Contact Curator",
];

export default function IncomingRequestsFooter() {
  return (
    <footer className="bg-[#efedf0] dark:bg-gray-900 w-full mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12 py-16 max-w-[1440px] mx-auto border-t border-[#c1c9bd]/20">
        {/* Brand */}
        <div>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#003912] text-xl block mb-4">
            The Editorial Marketplace
          </span>
          <p className="text-[#003912]/70 dark:text-emerald-500/70 font-['Inter'] text-sm tracking-wide max-w-xs">
            Curating excellence across campus. Connecting the most talented students with those
            seeking high-end creative and academic services.
          </p>
        </div>

        {/* Links + copyright */}
        <div className="flex flex-col md:items-end gap-6">
          <nav className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-500 dark:text-gray-400 font-['Inter'] text-sm tracking-wide hover:text-[#984063] underline-offset-4 hover:underline transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>
          <p className="text-gray-500 dark:text-gray-400 font-['Inter'] text-sm tracking-wide md:text-right">
            © 2024 The Editorial Marketplace. Curating excellence across campus.
          </p>
        </div>
      </div>
    </footer>
  );
}
