// ExploreFooter.jsx
// Footer for the Explore Services page.

const FOOTER_LINKS = [
  "Campus Safety",
  "Emergency Resources",
  "Privacy Policy",
  "Terms of Service",
  "Honor Code",
];

export default function ExploreFooter() {
  return (
    <footer className="bg-[#efedf0] dark:bg-[#1a1c1e] w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 w-full max-w-[1920px] mx-auto">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-lg font-bold text-[#003912] font-display">Amigo</span>
          <p className="font-['Inter'] text-sm tracking-wide text-[#414940] dark:text-[#c1c9bd] max-w-xs text-center md:text-left">
            © 2024 Amigo Campus Marketplace. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="font-['Inter'] text-sm tracking-wide text-[#414940] dark:text-[#c1c9bd] hover:text-[#984063] underline decoration-2 transition-all opacity-80 hover:opacity-100"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
