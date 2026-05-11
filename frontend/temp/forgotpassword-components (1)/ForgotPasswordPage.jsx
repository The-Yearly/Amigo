// ForgotPasswordPage.jsx
// Transactional account recovery page — split-screen layout.
// Reuses AuthInput from the Sign In page.

import { useState } from "react";
import AuthInput from "./AuthInput";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAaa8mjSvdh815LJprWIZyzlGHTDkEzgcWqSevOTXdvNffl0k7VebEpjewEzgrda7DCwxv_F7qh7_pnZ9Ki55-LTLuFYDicWSXxEbpe-uu6wDUKzddtn2viCjvW2vNQO4eyeBs5SiGjGQHKsU3VqnPdd6tI05Ce-_h0iUhPJhHiFuuesKv-Xx7Q1eMB1ssFhBDdx3Dx8gbybnPJjg4iY3np03FWfZbyQTVjV_088GLrRyC4twyENL2YZAksSdGHhFiQ_3R1fujJ8-L6";

const FOOTER_LINKS = [
  "About Amigo",
  "Safety Center",
  "Terms of Service",
  "Privacy Policy",
];

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      <main className="flex-grow flex items-stretch overflow-hidden">

        {/* ── Left: Editorial image panel (desktop only) ── */}
        <section className="hidden lg:flex w-1/2 relative p-12 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-surface-container-low" />
          <div className="relative z-10 w-full h-full rounded-xl overflow-hidden shadow-xl">
            <img
              src={HERO_IMG}
              alt="Student in a bright modern library"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-primary/80 to-transparent">
              <h2 className="font-headline text-4xl font-extrabold text-white tracking-tighter mb-4">
                Focus on your future.
              </h2>
              <p className="text-primary-fixed/90 text-lg max-w-md">
                Amigo handles the logistics, while you handle the learning. Your security is our
                primary focus.
              </p>
            </div>
          </div>
        </section>

        {/* ── Right: Form panel ── */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-24 py-12 relative">
          {/* Brand anchor */}
          <div className="absolute top-12 left-6 md:left-24">
            <span className="text-2xl font-black tracking-tighter text-primary-container font-headline">
              Amigo
            </span>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
                Recover Your Account
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Enter your student email and we'll send you a link to reset your password.
              </p>
            </header>

            {/* Form — swaps to success state after submit */}
            {sent ? (
              <div className="p-6 rounded-xl bg-primary-fixed/30 border border-primary-fixed flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary-container mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mark_email_read
                </span>
                <div>
                  <h3 className="font-headline font-bold text-primary mb-1">Check your inbox</h3>
                  <p className="text-sm text-on-surface-variant">
                    We sent a recovery link to <strong>{email}</strong>. It expires in 30 minutes.
                  </p>
                </div>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <AuthInput
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="name@university.edu"
                  icon="mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full editorial-gradient text-on-primary font-headline font-bold py-4 px-8 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 group"
                  >
                    Send Recovery Link
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* Back to login */}
            <nav className="mt-10 flex flex-col gap-6">
              <div className="h-px w-full bg-surface-container-highest" />
              <a
                href="#"
                className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors duration-300 w-fit group"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Back to Login
              </a>
            </nav>
          </div>

          {/* Safety helper card */}
          <div className="mt-20 lg:mt-32 p-6 rounded-2xl bg-surface-container-low max-w-md border-l-4 border-secondary/30">
            <div className="flex gap-4">
              <span
                className="material-symbols-outlined text-secondary shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
              <div>
                <h4 className="font-headline font-bold text-on-surface mb-1">Safety First</h4>
                <p className="text-sm text-on-surface-variant">
                  Check your spam folder if you don't receive the email within 2 minutes. Links
                  expire after 30 minutes for your protection.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 mt-auto bg-[#efedf0] dark:bg-[#2e312e]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-24 gap-8">
          <div className="text-xl font-bold text-[#003912] dark:text-[#faf9fb]">Amigo</div>
          <div className="flex flex-wrap justify-center gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-['Inter'] text-xs uppercase tracking-widest text-[#414940] dark:text-[#c1c9bd] hover:text-[#003912] dark:hover:text-[#ffffff] transition-all opacity-80 hover:opacity-100"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="font-['Inter'] text-xs uppercase tracking-widest text-[#414940] dark:text-[#c1c9bd] text-center md:text-right">
            © 2024 Amigo. The Modern Curator of Student Services.
          </div>
        </div>
      </footer>
    </div>
  );
}
