import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { userLevel } = useContext(UserContext);
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#0F172A] font-display text-slate-100">
      {/* Sidebar copied from Dashboard.jsx */}
      <aside className="w-[280px] bg-[#161B28] text-white hidden md:flex flex-col fixed h-full z-50 border-r border-slate-800/50">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-navy-900 font-bold">school</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Manara</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            Dashboard
          </Link>
          <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            My Courses
          </Link>
          <Link to="/progress" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[22px]">bar_chart</span>
            Progress
          </Link>
          <Link to="/forum" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[22px]">forum</span>
            Forum
          </Link>
          <Link to="/certificates" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            Certificates
          </Link>
          <Link to="/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-primary text-navy-900 font-bold">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            Settings
          </Link>
        </nav>
        
        {/* User Profile Block */}
        <div className="p-4 border-t border-slate-800/50 mt-auto">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-primary">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFJfRwRLLU3F54i2Q6PPSWO0RjsI-Xb4Ju-d5m5Dy0uo41FXnWiYhvcfXQoLLJC89eFWo2fDzxyETp6NxOHFh38cs7nhrr1mQ61DVRFrcTrlBu-RQ1L8YKOtgNX2nAA1pe2-hO32dSXFXOiODJkaLyiNl9g2pfxJ2effNdwHhESmZLvwyRdDmUtN9pUIjxlIsUnQ-P8I1Yfkm_XCT--KAY_vhxArsvnlLtKVmxS4C6-mWK6Sgge5nOIKRYDbHKMbGxLeIRgSZfnA" className="w-full h-full object-cover" alt="User" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Alex Rivera</p>
              <p className="text-xs text-slate-400 truncate">Premium Member</p>
            </div>
          </div>
          
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-[280px] flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-[90px] bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 z-40 relative">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
          </div>
        </header>

        <div className="px-10 py-10 max-w-3xl w-full flex-1">
          <div className="bg-[#1E293B] rounded-2xl p-8 border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Alex Rivera"
                  className="appearance-none block w-full px-4 py-3 border border-slate-600 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="alex@manara.com"
                  className="appearance-none block w-full px-4 py-3 border border-slate-600 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-slate-800 text-white"
                />
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <h4 className="text-lg font-bold text-white mb-4">Change Password</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="appearance-none block w-full px-4 py-3 border border-slate-600 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="appearance-none block w-full px-4 py-3 border border-slate-600 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-slate-800 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-3 bg-primary hover:bg-[#F0B400] text-navy-900 font-bold rounded-xl transition-colors shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
