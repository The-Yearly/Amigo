import React from 'react';
import { 
  User, Mail, Shield, Clock, Key, 
  Settings, Activity, Eye, LogOut, LayoutDashboard, Flag, ShieldCheck, FileText 
} from 'lucide-react';

const AdminProfile = () => {
  // Mock data - You can toggle 'role' to 'Admin' to see the UI change
  const admin = {
    name: 'Elena Rostova',
    email: 'elena.r@amigo.sys',
    role: 'Super Admin', // Can be 'Super Admin' or 'Admin'
    permissionScope: 'Unrestricted platform access. Can modify core architecture.',
    lastLogin: 'Today, 14:32'
  };

  // Logic to determine badge style based on status
  const isSuperAdmin = admin.role === 'Super Admin';

  return (
    <div className="flex min-h-screen bg-[#F9F9F4] font-sans text-[#1A2E1A]">
      

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">Admin Profile</h2>
          <p className="text-gray-500 max-w-2xl text-lg">
            Manage your personal administrative credentials and account security settings.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300" 
                    alt="Admin Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Visual indicator for status on the avatar itself */}
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${isSuperAdmin ? 'bg-purple-500' : 'bg-slate-400'}`} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-[#1A2E1A]">{admin.name}</h3>
                    <div className="mt-2 flex items-center gap-3">
                      {/* Dynamic Badge based on Screenshot 2026-05-09 190222.png */}
                      <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                        isSuperAdmin 
                        ? 'bg-[#8B3D52] text-white' 
                        : 'bg-[#E2E8F0] text-[#475569]'
                      }`}>
                        {admin.role}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                        ID: ADM-{isSuperAdmin ? '001' : '892'}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#0A2612] text-white rounded-xl font-bold text-sm hover:bg-[#143d1f] transition-all shadow-md">
                    <Settings size={16} /> Edit Profile
                  </button>
                </div>
                <div className="mt-6 p-4 bg-[#F9F9F4] rounded-xl border border-gray-100">
                   <p className="text-gray-600 text-sm leading-relaxed">
                    <strong className="text-[#1A2E1A] block mb-1">Permission Scope:</strong>
                    {isSuperAdmin 
                      ? admin.permissionScope 
                      : 'Standard administrative access. Limited to flag moderation and user reporting.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Metrics */}
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

          {/* Account Security Section */}
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
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">System Email</p>
                  <p className="font-bold text-[#1A2E1A]">{admin.email}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-6 leading-relaxed font-medium">
                  Update your security credentials to maintain platform integrity.
                </p>
                <button className="w-full flex items-center justify-center gap-2 px-5 py-4 border-2 border-gray-100 rounded-2xl font-bold text-sm text-[#1A2E1A] hover:bg-gray-50 hover:border-gray-200 transition-all">
                  <Key size={18} /> Change Password
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-[#0A2612] font-bold text-xs transition-colors">
                <Eye size={14} /> View login history →
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Reusable Metric Card matching the "Amigo Admin" Dashboard style
const MetricCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className={`${colorMap[color]} p-3 rounded-xl`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <h4 className="text-3xl font-bold text-[#1A2E1A]">{value}</h4>
    </div>
  );
};


export default AdminProfile;