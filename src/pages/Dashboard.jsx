import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { UserContext } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import coursesData from '../data/coursesData';

const Dashboard = () => {
  const { t } = useTranslation();
  const { userLevel } = useContext(UserContext);
  const { logout } = useAuth();
  const [filter, setFilter] = useState('All Levels');

  // Filter logic based on the user selection
  const filteredCourses = coursesData.filter(course => {
    if (filter === 'All Levels') return true;
    return course.level === filter;
  });

  return (
    <div className="flex min-h-screen bg-[#F4F5F9] font-display text-navy-900">
      {/* Sidebar - Dark Navy exactly as screenshot */}
      <aside className="w-[280px] bg-[#161B28] text-white hidden md:flex flex-col fixed h-full z-50">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-navy-900 font-bold">school</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Manara</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-primary text-navy-900 font-bold">
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
          <Link to="/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            Settings
          </Link>
        </nav>
        
        {/* User Profile Block */}
        <div className="p-4 border-t border-slate-800/50 mt-auto">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-primary">
               {/* Stand-in for Alex user photo */}
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
        <header className="h-[90px] bg-[#F4F5F9] flex items-center justify-between px-10 sticky top-0 z-40 relative">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-navy-900">Welcome, Alex!</h2>
            {userLevel && (
              <span className="px-5 py-1.5 bg-primary/20 text-navy-900 text-xs font-bold rounded-full uppercase tracking-widest border border-primary/30">
                {userLevel} Level
              </span>
            )}
            {!userLevel && (
              <Link to="/placement-test" className="text-sm font-bold text-red-500 hover:underline">
                {t('beginTest')}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
              <input 
                className="pl-11 pr-4 py-2.5 bg-slate-200/50 border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white w-[300px] text-sm transition-all text-navy-900 placeholder-slate-500 font-medium" 
                placeholder="Search courses..." 
                type="text"
              />
            </div>
            <button className="relative text-navy-900 p-2 hover:bg-slate-200/50 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[26px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <div className="px-10 pb-10 space-y-10 max-w-[1400px] w-full flex-1">
          {/* Stats Row - 4 Light Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Box 1 */}
            <div className="bg-white rounded-2xl p-6 flex flex-row items-center gap-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
              <div className="w-[52px] h-[52px] rounded-xl bg-[#E6F0FF] text-[#3B82F6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">play_circle</span>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">In Progress</p>
                <p className="text-3xl font-black text-navy-900 leading-none">3</p>
              </div>
            </div>
            
            {/* Box 2 */}
            <div className="bg-white rounded-2xl p-6 flex flex-row items-center gap-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
              <div className="w-[52px] h-[52px] rounded-xl bg-[#E6FFEA] text-[#22C55E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px] font-bold">check_circle</span>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">Completed</p>
                <p className="text-3xl font-black text-navy-900 leading-none">12</p>
              </div>
            </div>
            
            {/* Box 3 */}
            <div className="bg-white rounded-2xl p-6 flex flex-row items-center gap-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
              <div className="w-[52px] h-[52px] rounded-xl bg-primary/20 text-yellow-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">Certificates</p>
                <p className="text-3xl font-black text-navy-900 leading-none">5</p>
              </div>
            </div>
            
            {/* Box 4 */}
            <div className="bg-white rounded-2xl p-6 flex flex-row items-center gap-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
              <div className="w-[52px] h-[52px] rounded-xl bg-[#F3E8FF] text-[#A855F7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">forum</span>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">Forum Posts</p>
                <p className="text-3xl font-black text-navy-900 leading-none">28</p>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-bold text-navy-900">My Courses</h3>
              <div className="flex flex-wrap gap-2">
                {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                  <button 
                    key={lvl}
                    onClick={() => setFilter(lvl)}
                    className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                      filter === lvl 
                        ? 'bg-primary text-navy-900 shadow-md shadow-primary/20' 
                        : 'bg-transparent text-slate-500 hover:text-navy-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 3).map((course, idx) => (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] overflow-hidden group hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all flex flex-col hover:-translate-y-1">
                  
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                       <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest text-white ${
                         course.level === 'Beginner' ? 'bg-[#3B82F6]' :
                         course.level === 'Intermediate' ? 'bg-[#A855F7]' :
                         'bg-[#10B981]'
                       }`}>
                         {course.subject}
                       </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="font-bold text-lg text-navy-900 min-h-[3.5rem] leading-snug mb-6">{course.title}</h4>

                    <div className="space-y-3 mt-auto mb-6">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Progress: {idx === 0 ? '65%' : idx === 1 ? '20%' : '88%'}</span>
                        <span>{idx === 0 ? '12/18 Videos' : idx === 1 ? '5/25 Videos' : '22/25 Videos'}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: idx === 0 ? '65%' : idx === 1 ? '20%' : '88%' }}></div>
                      </div>
                    </div>

                    <Link to={`/course/${course.id}`} className="w-full bg-primary hover:bg-[#F0B400] text-navy-900 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center text-[15px] shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30">
                        Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Certificates Section */}
          <div className="pt-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Recent Certificates</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl p-7 flex flex-col sm:flex-row gap-6 items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-[100px] h-[100px] bg-amber-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-amber-100/50">
                  <span className="material-symbols-outlined text-4xl text-primary font-bold">verified</span>
                  <span className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">Certified</span>
                </div>
                <div className="flex-1 text-center sm:text-left w-full">
                  <h4 className="font-bold text-navy-900 text-[18px]">The Complete Python Bootcamp</h4>
                  <p className="text-[13px] text-slate-500 font-medium italic mt-1">Issued Oct 24, 2023</p>
                  <div className="flex gap-3 mt-5 justify-center sm:justify-start">
                    <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#F4F5F9] hover:bg-slate-200 text-navy-900 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download
                    </button>
                    <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0077B5] hover:bg-[#006097] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-900/20">
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 flex flex-col sm:flex-row gap-6 items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-[100px] h-[100px] bg-amber-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-amber-100/50">
                  <span className="material-symbols-outlined text-4xl text-primary font-bold">workspace_premium</span>
                  <span className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">Verified</span>
                </div>
                <div className="flex-1 text-center sm:text-left w-full">
                  <h4 className="font-bold text-navy-900 text-[18px]">UI/UX Design Masterclass 2023</h4>
                  <p className="text-[13px] text-slate-500 font-medium italic mt-1">Issued Sep 12, 2023</p>
                  <div className="flex gap-3 mt-5 justify-center sm:justify-start">
                    <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#F4F5F9] hover:bg-slate-200 text-navy-900 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download
                    </button>
                    <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0077B5] hover:bg-[#006097] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-900/20">
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
