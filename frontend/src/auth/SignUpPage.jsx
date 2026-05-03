import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_HEM2GFeH0UHpQL_e796s5ZOBlbqE7PThOMkCm6w9dnfKSyOayFLOTPBDDoQsjrdpHMYrfhpbm34zqaekNMBqCZ-OelJXPI5neA7EwaC3sus9-NfyqytdnnYrvqu1MUnVj8VPvEcoepN5ba5eOEi2i2D-bLRBvvfqdSYrh-MWT2_0MFS-4Pxv69B4Vwh4Pvo9_cZWKC9WvNE6XVtvS0TMZB981G9EqgQRH7dixf_Z9Qe6B-pvrce1gWDNjJWFfHap6Z4EqBmKdet";

// ── Local field component (right-icon layout, different from AuthInput's left-icon) ──
function SignUpField({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="space-y-2 group">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-surface-container-high rounded-md px-4 py-4 border-2 border-outline-variant/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md text-on-surface placeholder:text-outline transition-all duration-300"
        />
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-sm">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const navigate = useNavigate();

  function verifyEmail(email) {
    const regex = /^am\.sc\.u4cse\d{5}@am\.students\.amrita\.edu$/;
    return regex.test(email);
  }

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!agreed) {
      toast.error("Please agree to the Terms of Service.");
      return;
    }

    if (!verifyEmail(form.email)) {
      toast.error("Use a valid Amrita student email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          userData: {
            name: form.name,
            mail: form.email,
            password: form.password,
          },
        },
      );

      setVerificationToken(res.data.verificationToken);
      setIsVerifying(true);

      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
        {
          otp,
          verificationToken,
        },
      );

      const { token, user } = res.data;
      const creds = { uid: user.id, session: token };

      Cookies.set("creds", JSON.stringify(creds), { expires: 7 });

      toast.success("Account verified!");
      toast.info("Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed h-screen w-screen overflow-hidden flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="flex-1 flex items-center justify-center px-4 relative">
        {/* Ambient background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-fixed/20 rounded-full blur-[120px] hidden lg:block" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px] hidden lg:block" />

        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 md:gap-16 z-10">
          {/* ── Left: Branding / editorial column ── */}
          <div className="flex-1 text-center md:text-left space-y-8 max-w-xl hidden lg:flex lg:flex-col">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-primary font-medium text-sm tracking-wide">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Now accepting student creators
            </div>

            {/* Hero heading */}
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-primary leading-[1.1]">
              The Amigo <br />
              <span className="text-on-primary-container italic font-medium">
                Marketplace.
              </span>
            </h1>

            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-light">
              Join a curated ecosystem of student talent. From design to
              tutoring, monetize your skills or find the help you need in a
              high-end editorial gallery.
            </p>

            {/* Floating testimonial quote */}
            <div className="hidden lg:flex items-start gap-4 p-6 bg-surface-container-low rounded-xl translate-x-8 border-l-4 border-primary-container">
              <img
                src={AVATAR_SRC}
                alt="Elena R."
                className="w-12 h-12 object-cover rounded-full shrink-0"
              />
              <div>
                <p className="text-sm font-medium italic text-on-surface">
                  "Amigo helped me turn my design hobby into a professional
                  portfolio that employers actually notice."
                </p>
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1 block">
                  — Elena R., Visual Artist
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Sign-up form card ── */}
          <div className="w-full max-w-md">
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-lg border border-outline-variant/50">
              <div className="mb-10">
                <h2 className="font-display text-3xl font-bold tracking-tight text-primary mb-2">
                  Create Account
                </h2>
                <p className="text-on-surface-variant text-sm">
                  Start your journey as a student curator today.
                </p>
              </div>
              {!isVerifying ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <SignUpField
                    id="name"
                    label="Full Name"
                    placeholder="Alex Rivera"
                    icon="person"
                    value={form.name}
                    onChange={set("name")}
                  />
                  <SignUpField
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="alex@university.edu"
                    icon="mail"
                    value={form.email}
                    onChange={set("email")}
                  />
                  <SignUpField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon="lock"
                    value={form.password}
                    onChange={set("password")}
                  />

                  {/* Terms checkbox */}
                  <div className="flex items-center gap-3 py-2">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 rounded text-primary border-outline-variant focus:ring-primary"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs text-on-surface-variant leading-snug"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-primary font-bold hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-primary font-bold hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full editorial-gradient text-on-primary font-bold py-5 rounded-md hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg tracking-tight disabled:opacity-70 text-white"
                    >
                      {loading ? "Sending OTP..." : "Create Account"}
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  className="space-y-6 text-center"
                  onSubmit={handleVerifyOtp}
                >
                  <h2 className="text-xl font-bold text-primary">
                    Verify your email
                  </h2>

                  <p className="text-sm text-on-surface-variant">
                    Enter the 6-digit code sent to <br />
                    <span className="font-semibold">{form.email}</span>
                  </p>

                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center text-2xl tracking-[0.5em] py-4 border-2 border-primary rounded-md bg-white text-black"
                    placeholder="000000"
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-4 rounded-md disabled:opacity-70"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsVerifying(false)}
                    className="text-sm text-gray-500 hover:text-primary"
                  >
                    ← Back
                  </button>
                </form>
              )}
              {/* Sign in link */}
              <div className="mt-10 pt-8 border-t border-surface-container-high text-center">
                <p className="text-on-surface-variant text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-secondary font-bold hover:text-on-secondary-container transition-colors ml-1"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex justify-center items-center gap-6 opacity-40 grayscale contrast-125 hidden md:flex">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Secure Enrollment
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Verified Students
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Floating help button */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:flex">
        <a
          href="#"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest shadow-md border border-outline-variant/20 group hover:bg-primary-container transition-all"
        >
          <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
            help
          </span>
        </a>
      </div>
    </div>
  );
}
