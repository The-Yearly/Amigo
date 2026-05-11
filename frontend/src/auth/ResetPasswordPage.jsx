import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  LockKeyhole,
  AlertTriangle,
} from "lucide-react";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [expired, setExpired] = useState(false);

  // PASSWORD RULES
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const completedRules = Object.values(rules).filter(Boolean).length;

  const strength =
    completedRules <= 1 ? "Weak" : completedRules <= 3 ? "Medium" : "Strong";

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        },
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      console.error(err);

      const message = err.response?.data?.message || "Reset failed";

      setError(message);

      if (message.includes("expired") || message.includes("Invalid")) {
        setExpired(true);
      }
    } finally {
      setLoading(false);
    }
  }

  if (expired) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-red-600 w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
            Reset Link Expired
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>

          <div className="space-y-4">
            <Link
              to="/forgot-password"
              className="block w-full bg-[#064e3b] text-white py-4 rounded-xl font-semibold hover:bg-green-900 transition"
            >
              Request New Link
            </Link>

            <Link
              to="/login"
              className="block text-sm text-gray-500 hover:text-black"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex bg-[#faf9fb]">
      {/* LEFT SIDE */}
      <section className="hidden lg:flex lg:w-1/2 bg-[#002107] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.12) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-20 max-w-xl">
          <div className="overflow-hidden rounded-3xl shadow-2xl mb-10">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Security"
              className="w-full h-[420px] object-cover"
            />
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Your account
            <br />
            security matters.
          </h1>

          <p className="text-green-200 text-lg leading-relaxed">
            We use secure encrypted account recovery flows to protect your
            personal workspace and services.
          </p>
        </div>

        <div className="absolute bottom-8 left-8 flex items-center gap-2">
          <span className="text-white font-black text-2xl tracking-tight">
            Amigo
          </span>

          <div className="w-2 h-2 rounded-full bg-pink-400" />
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-10">
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="text-[#064e3b] font-black text-3xl tracking-tight">
                Amigo
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[#064e3b] mb-3">
              <LockKeyhole className="w-4 h-4" />

              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Secure Reset
              </span>
            </div>

            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">
              Reset Your Password
            </h2>

            <p className="text-gray-500">
              Create a new password for your account.
            </p>
          </div>

          {/* ERROR */}
          {error && !expired && (
            <div className="mb-6 bg-red-100 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#064e3b]" />
              </div>

              <h3 className="text-2xl font-bold mb-3">Password Updated</h3>

              <p className="text-gray-500 mb-8">Redirecting you to login...</p>

              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#064e3b] animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#064e3b]/50 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-[#064e3b]/30 animate-pulse delay-150" />
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 outline-none focus:ring-2 focus:ring-[#064e3b]"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* STRENGTH */}
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        completedRules >= i ? "bg-[#064e3b]" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs mt-2 text-[#064e3b] font-medium">
                  Password Strength: {strength}
                </p>
              </div>

              {/* CONFIRM */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 outline-none focus:ring-2 focus:ring-[#064e3b]"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* RULES */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Security Requirements
                </h4>

                {[
                  {
                    ok: rules.length,
                    label: "At least 8 characters",
                  },
                  {
                    ok: rules.uppercase,
                    label: "One uppercase letter",
                  },
                  {
                    ok: rules.number,
                    label: "One numerical digit",
                  },
                  {
                    ok: rules.special,
                    label: "One special character",
                  },
                ].map((rule) => (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-3 text-sm ${
                      rule.ok ? "text-[#064e3b]" : "text-gray-400"
                    }`}
                  >
                    {rule.ok ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Circle size={16} />
                    )}

                    {rule.label}
                  </div>
                ))}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#064e3b] hover:bg-green-900 text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          {/* FOOTER */}
          {!success && (
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="text-sm text-gray-500 hover:text-black"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
