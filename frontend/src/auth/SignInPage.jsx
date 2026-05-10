// SignInPage.jsx
// Transactional sign-in page — no top nav or footer (suppressed per shell rules).
// Reuses AuthInput.

import { useState } from "react";
import AuthInput from "@/Components/Auth/AuthInput";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_OglCyvJ98lBg5BlrTCnaandYTwe7WkMDXCkQCudtDgqAJ5rlLCqEC8hhcIXyHhbfBEqWWitSpW4cECiJAmiXIi2noUPj88rwVsXhcyHJovKgFaJdH5nu01BRJujEqsjR7F4CZoYCt4jRltFQSA6gRDapv0e09YwJx2cq-ptbT0yxK4ugDEKfGoiVdkwH-Gkou5qPUHroEEcGzfA3uhmw4yFvxDhRxYEF26fp62ZMBf8BRqxKbTVoreQcD_BjngkIB20ZiPBuNGWL";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: email,
        password: password,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        payload,
        { withCredentials: true },
      );
      toast.success("Login successful!");
      toast.info("Redirecting...");
      setTimeout(() => {
        window.location.href = res.data.isAdmin ? "/adminSettings" : "/";
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
  //       {
  //         email,
  //         password,
  //       },
  //     );

  //     // same logic from your old component
  //     const { token, user } = res.data;
  //     const creds = { uid: user.id, token: token };

  //     Cookies.set("creds", JSON.stringify(creds), { expires: 7 });

  //     toast.success("Login successful!");
  //     toast.info("Redirecting...");

  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1000);
  //   } catch (err) {
  //     console.log(err)
  //     toast.error(err.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex items-center justify-center p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* ── Left: Editorial image panel ── */}
        <div className="hidden md:flex flex-1 relative">
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden editorial-shadow group">
            <img
              src={HERO_IMG}
              alt="Students collaborating in a modern campus space"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />

            {/* Floating badge */}
            <div className="absolute top-8 left-8 bg-[#974063] text-on-secondary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase editorial-shadow">
              The Modern Curator
            </div>

            {/* Brand overlay card */}
            <div className="absolute -bottom-6 -right-6 p-10 bg-primary-container text-primary-fixed-dim rounded-xl editorial-shadow max-w-[240px]">
              <h2 className="font-headline font-extrabold text-3xl tracking-tighter mb-2 text-gray-300">
                Amigo
              </h2>
              <p className="text-sm font-body leading-relaxed opacity-80 text-gray-400">
                Empowering student talent through a curated creative
                marketplace.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Sign-in form ── */}
        <div className="flex-1 w-full max-w-md">
          {/* Heading */}
          <div className="mb-12">
            <h1 className="font-headline text-5xl font-black tracking-tight text-primary mb-4">
              Welcome back.
            </h1>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Please enter your credentials to access the marketplace of
              student-led services.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AuthInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="student@university.edu"
              icon="mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AuthInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              icon="lock"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightSlot={
                <a
                  href="/forgot-password"
                  className="text-xs font-bold text-[#974063] hover:text-on-secondary-container transition-colors tracking-tight"
                >
                  Forgot Password?
                </a>
              }
            />

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full hero-gradient text-on-primary font-headline font-bold py-4 rounded-xl editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group text-white"
              >
                {loading ? "Signing in..." : "Sign In"}
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          {/* Footer links */}
          <div
            onClick={() => {
              setIsVerifying(false);
            }}
            className="mt-12 pt-8 border-t border-outline-variant/20 text-center"
          >
            <p className="text-on-surface-variant text-sm">
              Don't have an account?
              <a
                href="/signup"
                className="text-primary font-bold hover:underline underline-offset-4 ml-1"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Mobile brand mark */}
          <div className="md:hidden mt-16 flex justify-center">
            <span className="font-headline font-black text-2xl tracking-tighter text-primary-container">
              Amigo
            </span>
          </div>
        </div>
      </main>

      {/* Legal footer */}
      <div className="fixed bottom-6 w-full text-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-40 font-bold">
          Amigo Marketplace © 2024
        </span>
      </div>
    </div>
  );
}
