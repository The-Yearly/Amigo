import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/lib/authProvider";
import { Mail, Shield, Clock, Key, Settings, Activity } from "lucide-react";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [load, setLoading] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { user, loading } = useContext(AuthContext);

  // 1. Fetch Admin Data on Load
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/profile/" + user.uid,
          {
            withCredentials: true,
          },
        );
        setAdmin(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  // 2. Handle Password Update Logic
  const handleUpdatePassword = async () => {
    if (!newPassword) return alert("Please enter a new password");

    try {
      await axios.put(
        "http://localhost:5000/api/admin/update-profile",
        { newPassword },
        { withCredentials: true },
      );
      alert("Password updated successfully!");
      setNewPassword("");
      setIsChangingPassword(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update password.");
    }
  };

  if (load)
    return <div className="p-12 text-center font-bold">Loading Profile...</div>;
  if (!admin)
    return (
      <div className="p-12 text-center text-red-500">
        Admin session not found.
      </div>
    );

  const isSuperAdmin = admin.role === "Super Admin";

  return (
    <div className="flex min-h-screen bg-[#F9F9F4] font-sans text-[#1A2E1A]">
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">
            Admin Profile
          </h2>
          <p className="text-gray-500 max-w-2xl text-lg">
            Manage your personal administrative credentials and account security
            settings.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100">
                  <img
                    src={
                      admin.profileImage ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300"
                    }
                    alt="Admin Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${isSuperAdmin ? "bg-[#8B3D52]" : "bg-slate-400"}`}
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-[#1A2E1A]">
                      {admin.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                          isSuperAdmin
                            ? "bg-[#8B3D52] text-white"
                            : "bg-[#E2E8F0] text-[#475569]"
                        }`}
                      >
                        {admin.role}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                        ID: {admin.id.substring(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#0A2612] text-white rounded-xl font-bold text-sm hover:bg-[#143d1f] transition-all shadow-md">
                    <Settings size={16} /> Edit Profile
                  </button>
                </div>
                <div className="mt-6 p-4 bg-[#F9F9F4] rounded-xl border border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong className="text-[#1A2E1A] block mb-1">
                      Bio / Permission Scope:
                    </strong>
                    {admin.bio ||
                      (isSuperAdmin
                        ? admin.permissionScope
                        : "Standard administrative access.")}
                  </p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard
                icon={<Activity size={20} />}
                label="Actions Today"
                value="42"
                color="blue"
              />
              <MetricCard
                icon={<Clock size={20} />}
                label="Last Activity"
                value={admin.lastLogin}
                color="orange"
              />
            </div>
          </div>

          {/* Account Security & Password Change */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold px-2 flex items-center gap-2">
              <Shield size={20} /> Account Security
            </h3>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    System Email
                  </p>
                  <p className="font-bold text-[#1A2E1A]">{admin.email}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                {isChangingPassword ? (
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-green-500 transition-all text-sm"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdatePassword}
                        className="flex-1 py-3 bg-[#0A2612] text-white rounded-xl font-bold text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsChangingPassword(false)}
                        className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-4 border-2 border-gray-100 rounded-2xl font-bold text-sm text-[#1A2E1A] hover:bg-gray-50 transition-all"
                  >
                    <Key size={18} /> Change Password
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className={`${colorMap[color]} p-3 rounded-xl`}>{icon}</div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </span>
      </div>
      <h4 className="text-3xl font-bold text-[#1A2E1A]">{value}</h4>
    </div>
  );
};

export default AdminProfile;
