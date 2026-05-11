import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/lib/authProvider";
import { Mail, Shield, Clock, Key, Activity } from "lucide-react";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [load, setLoading] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");

  const { user } = useContext(AuthContext);

  // Fetch Admin Data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/admin/profile/${user.uid}`,
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/profile/${user.uid}`,
          {
            withCredentials: true,
          }
        );

        setAdmin(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchAdminData();
    }
  }, [user]);

  // Handle Password Update
  const handleUpdatePassword = async () => {
    try {
      // Empty validation
      if (
        !currPassword.trim() ||
        !newPassword.trim() ||
        !confirmPassword.trim()
      ) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "All password fields are required.",
        });
      }

      // Prevent empty spaces only passwords
      if (newPassword.trim().length === 0) {
        return Swal.fire({
          icon: "warning",
          title: "Invalid Password",
          text: "Password cannot be empty spaces.",
        });
      }

      // Password length check
      if (newPassword.length < 6) {
        return Swal.fire({
          icon: "warning",
          title: "Weak Password",
          text: "New password must be at least 6 characters long.",
        });
      }

      // Confirm password match
      if (newPassword !== confirmPassword) {
        return Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "New password and confirm password do not match.",
        });
      }

      // Verify current password
      const isMatch = await bcrypt.compare(
        currPassword,
        admin.password
      );

      if (!isMatch) {
        return Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "Current password is incorrect.",
        });
      }

      // Update password API call
      await axios.put(
        // "http://localhost:5000/api/admin/update-profile",
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/update-profile`,
        {
          newPassword,
          adminId: admin.id,
        },
        {
          withCredentials: true,
        }
      );

      // Success popup
      Swal.fire({
        icon: "success",
        title: "Password Updated Successfully",
        text: "Your password has been changed successfully.",
        confirmButtonColor: "#0A2612",
      });

      // Reset fields
      setNewPassword("");
      setConfirmPassword("");
      setCurrPassword("");
      setIsChangingPassword(false);
    } catch (error) {
      console.error("Update failed:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating password.",
      });
    }
  };

  if (load) {
    return (
      <div className="p-12 text-center font-bold">
        Loading Profile...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-12 text-center text-red-500">
        Admin session not found.
      </div>
    );
  }

  const isSuperAdmin = admin.role === "Super Admin";

  return (
    <div className="flex min-h-screen bg-[#F9F9F4] font-sans text-[#1A2E1A]">
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">
            Admin Profile
          </h2>
          <p className="text-gray-500 max-w-2xl text-lg">
            Manage your personal administrative credentials and account security settings.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-8">
              <div className="w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden">
                <img
                  src={
                    admin.profileImage ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300"
                  }
                  alt="Admin Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold">{admin.name}</h3>
                <div className="mt-2 flex gap-3 items-center">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold ${
                      isSuperAdmin
                        ? "bg-[#8B3D52] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {admin.role}
                  </span>
                  <span className="text-sm text-gray-400">
                    ID: {admin.id.substring(0, 8).toUpperCase()}
                  </span>
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

          {/* Security Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Shield size={20} /> Account Security
            </h3>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">System Email</p>
                  <p className="font-bold">{admin.email}</p>
                </div>
              </div>

              {isChangingPassword ? (
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                  />

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdatePassword}
                      className="flex-1 py-3 bg-[#0A2612] text-white rounded-xl font-bold"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setNewPassword("");
                        setConfirmPassword("");
                        setCurrPassword("");
                      }}
                      className="flex-1 py-3 bg-gray-100 rounded-xl font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 border rounded-2xl font-bold"
                >
                  <Key size={18} /> Change Password
                </button>
              )}
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
        <div className={`${colorMap[color]} p-3 rounded-xl`}>
          {icon}
        </div>
        <span className="text-xs text-gray-400">{label}</span>
      </div>

      <h4 className="text-3xl font-bold">{value}</h4>
    </div>
  );
};

export default AdminProfile;
