import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeIcon as EyeClosed, ShieldCheck } from "lucide-react";
import Cookies from "js-cookie";

export default function AuthPage() {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

function verifyEmail(email) {
  const regex = /^am\.sc\.u4cse\d{5}@am\.students\.amrita\.edu$/;
  return regex.test(email);
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const payload = {
          userData: {
            name: data.name,
            mail: data.email,
            password: data.password,
          }
        };
        //add check for amrita mail here before complete
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signUp`, payload);
        setVerificationToken(res.data.verificationToken);
        setIsVerifying(true);
        toast.success(res.data.message);
      } else {
        const payload = {
          email: data.email,
          password: data.password,
        };
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, payload);
        handlePostAuthSuccess(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
        otp,
        verificationToken
      });
      
      toast.success("Email verified successfully!");
      handlePostAuthSuccess(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  }

  const handlePostAuthSuccess = (responseData) => {
    const { token, user } = responseData;
    const creds = { uid: user.id, session: token };

    Cookies.set("creds", JSON.stringify(creds), { expires: 7 });
    
    toast.info("Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <img
        className="w-full h-screen object-cover fixed top-0 left-0 -z-10"
        src="https://images.unsplash.com/photo-1556742517-fde6c2abbe11?q=80&w=1974&auto=format&fit=crop"
        alt="Background"
      />
      <div className="flex justify-center items-center min-h-screen">
        <div className="modal p-8 rounded-lg shadow-lg w-[90vw] max-w-md bg-white/80 backdrop-blur-md">
          
          {!isVerifying ? (
            <form onSubmit={handleAuth}>
              <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
                {isSignUp ? "Sign Up" : "Login"}
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="name@example.com"
                  required
                />
              </div>

              {isSignUp && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-slate-700">Username</label>
                  <input
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Pick a display name"
                    required
                  />
                </div>
              )}

              <div className="mb-6 relative">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-slate-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : (isSignUp ? "Get Verification Code" : "Sign In")}
              </button>

              <p
                className="text-center mt-4 cursor-pointer text-blue-600 hover:underline text-sm"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Login" : "New here? Create an account"}
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <ShieldCheck size={40} />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-slate-800">Verify Email</h2>
              <p className="text-slate-600 text-sm mb-6">
                Enter the 6-digit code sent to <br/>
                <span className="font-semibold">{data.email}</span>
              </p>
              
              <div className="mb-6">
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-3xl tracking-[0.5em] font-mono py-3 border-2 border-blue-500 rounded-md focus:outline-none bg-white text-black"
                  placeholder="000000"
                  required
                />
              </div>

              <button
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>

              <button
                type="button"
                className="mt-4 text-sm text-slate-500 hover:text-blue-600"
                onClick={() => setIsVerifying(false)}
              >
                ← Back to Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}