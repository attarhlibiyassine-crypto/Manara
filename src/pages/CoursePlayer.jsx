import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import coursesData from '../data/coursesData';

const CoursePlayer = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sectionOpen, setSectionOpen] = useState(true);

  // Sidebar lesson list matching the screenshot
  const lessons = [
    {
      id: 1,
      title: '01. Scaling from zero to first 100 users',
      duration: '14:20',
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: '02. Choosing the right Database: SQL vs NoSQL',
      duration: '28:45',
      completed: true,
      current: false,
    },
    {
      id: 3,
      title: '04. Understanding Load Balancers & Reverse Proxies',
      duration: '34:30',
      completed: false,
      current: true,
    },
    {
      id: 4,
      title: '05. Caching Strategies: Redis & Memcached',
      duration: '19:15',
      completed: false,
      current: false,
    },
  ];

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-slate-100">
        <h1 className="text-3xl font-bold mb-4">Course not found</h1>
        <Link to="/dashboard" className="text-[#F59E0B] hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'discussion', label: 'Discussion (24)' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-display flex flex-col">
      {/* ── Header ── */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
        {/* Left: progress */}
        <div className="flex items-center gap-2 text-sm text-slate-300 whitespace-nowrap">
          <span className="material-symbols-outlined text-[#F59E0B] text-base">emoji_events</span>
          <span className="font-medium">
            Your Progress:{' '}
            <span className="font-semibold">45%</span>
          </span>
        </div>

        {/* Center: course title */}
        <div className="flex-1 flex justify-center px-4">
          <h1 className="font-semibold text-sm sm:text-base text-center truncate max-w-xl">
            {course.title}
          </h1>
        </div>

        {/* Right: bell + avatar */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          <button
            type="button"
            className="relative text-slate-300 hover:text-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0F172A] flex items-center justify-center text-xs font-bold uppercase select-none">
            JD
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Left: video + content ── */}
        <section className="flex-1 flex flex-col overflow-hidden">

          {/* Video */}
          <div className="relative w-full aspect-video bg-black shrink-0">
            <YouTube
              videoId={course.youtubeId}
              opts={opts}
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Below-video content */}
          <div className="flex-1 px-6 py-6 overflow-y-auto bg-white text-[#1E293B]">

            {/* Lesson heading */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-[#1E293B]">
              04. Understanding Load Balancers &amp; Reverse Proxies
            </h2>

            {/* Tabs */}
            <div className="border-b border-slate-800 mb-6 flex gap-1 flex-wrap">
              {tabs.map(({ id, label }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#1E293B]'
                        : 'text-slate-500 hover:text-[#1E293B]'
                    }`}
                  >
                    {/* Tab icons */}
                    {id === 'overview' && (
                      <span className="material-symbols-outlined text-base">info</span>
                    )}
                    {id === 'quiz' && (
                      <span className="material-symbols-outlined text-base">quiz</span>
                    )}
                    {id === 'discussion' && (
                      <span className="material-symbols-outlined text-base">forum</span>
                    )}
                    {id === 'resources' && (
                      <span className="material-symbols-outlined text-base">folder</span>
                    )}
                    {label}
                    {/* Active underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F59E0B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Overview tab ── */}
            {activeTab === 'overview' && (
              <div>
                {/* About section */}
                <h3 className="text-base font-semibold mb-2 text-[#1E293B]">About this lesson</h3>
                <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                  In this deep-dive, we explore the critical role of Load Balancers in modern
                  distributed systems. You'll learn the differences between Layer 4 and Layer 7
                  load balancing, common algorithms like Round Robin and Least Connections, and
                  how to ensure high availability for your traffic distribution layer.
                </p>

                {/* Cards row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Learning Objectives */}
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-[#F59E0B] text-lg">key</span>
                      <h4 className="text-sm font-semibold text-[#1E293B]">Learning Objectives</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-[#475569]">
                      <li className="flex items-start gap-1.5 before:content-['•'] before:mt-0 before:shrink-0 before:text-[#F59E0B]">
                        <span className="text-[#1E293B]">Difference between LB and Reverse Proxy</span>
                      </li>
                      <li className="flex items-start gap-1.5 before:content-['•'] before:shrink-0 before:text-[#F59E0B]">
                        <span className="text-[#1E293B]">Sticky sessions vs. Stateless routing</span>
                      </li>
                      <li className="flex items-start gap-1.5 before:content-['•'] before:shrink-0 before:text-[#F59E0B]">
                        <span className="text-[#1E293B]">Health check implementation strategies</span>
                      </li>
                    </ul>
                  </div>

                  {/* Downloads */}
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-[#F59E0B] text-lg">download</span>
                      <h4 className="text-sm font-semibold text-[#1E293B]">Downloads</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#1E293B] transition-colors border border-slate-200"
                        >
                          <span className="text-[#1E293B]">System_Design_CheatSheet.pdf</span>
                          <span className="material-symbols-outlined text-base text-[#F59E0B]">download</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#1E293B] transition-colors border border-slate-200"
                        >
                          <span className="text-[#1E293B]">Lesson_Slides_04.pptx</span>
                          <span className="material-symbols-outlined text-base text-[#F59E0B]">download</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="text-sm text-slate-300">
                <p>Quiz content will appear here.</p>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="text-sm text-slate-300">
                <p>Discussion thread preview will appear here.</p>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="text-sm text-slate-300">
                <p>Additional resources will appear here.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Right Sidebar ── */}
        {isSidebarOpen && (
          <aside className="w-full lg:w-[320px] bg-white text-slate-800 border-l border-slate-200 flex flex-col shrink-0">

            {/* Sidebar header: "Course Content" + X */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200 shrink-0">
              <h2 className="text-base font-semibold text-slate-800">Course Content</h2>
              <button
                type="button"
                className="text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Close course content"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Section header */}
            <div className="border-b border-slate-200 shrink-0">
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setSectionOpen((v) => !v)}
              >
                <div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500">
                    SECTION 1: FOUNDATIONS
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">Introduction to Scalability</p>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-500 text-lg transition-transform ${
                    sectionOpen ? 'rotate-0' : '-rotate-90'
                  }`}
                >
                  expand_more
                </span>
              </button>
            </div>

            {/* Lesson list */}
            {sectionOpen && (
              <div className="flex-1 overflow-y-auto py-1">

                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-4 ${
                      lesson.current
                        ? 'border-[#F59E0B] bg-amber-50'
                        : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className={`relative w-14 h-10 rounded-md flex items-center justify-center shrink-0 overflow-hidden ${
                      lesson.completed
                        ? 'bg-slate-200'
                        : lesson.current
                        ? 'bg-amber-200/60'
                        : 'bg-slate-200'
                    }`}>
                      {lesson.completed && (
                        <span className="material-symbols-outlined text-[#22c55e] text-2xl">
                          check_circle
                        </span>
                      )}
                      {lesson.current && !lesson.completed && (
                        <span className="material-symbols-outlined text-[#F59E0B] text-2xl">
                          play_circle
                        </span>
                      )}
                      {!lesson.completed && !lesson.current && (
                        <span className="material-symbols-outlined text-slate-400 text-xl">
                          play_circle
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium leading-snug ${
                        lesson.current ? 'text-slate-800' : 'text-slate-700'
                      }`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`material-symbols-outlined text-xs ${
                          lesson.current ? 'text-[#F59E0B]' : 'text-slate-400'
                        }`} style={{ fontSize: '13px' }}>
                          schedule
                        </span>
                        <span className={`text-[11px] ${
                          lesson.current ? 'text-[#F59E0B] font-medium' : 'text-slate-400'
                        }`}>
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Quiz item */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-4 border-transparent hover:bg-slate-50"
                >
                  <div className="w-14 h-10 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-500 text-xl">quiz</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700">
                      Quiz: System Design Foundations
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '13px' }}>
                        article
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                        10 QUESTIONS
                      </span>
                    </div>
                  </div>
                </button>

                {/* Lesson 5 */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-4 border-transparent hover:bg-slate-50"
                >
                  <div className="w-14 h-10 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-400 text-xl">play_circle</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700">
                      06. Content Delivery Networks (CDNs)
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '13px' }}>schedule</span>
                      <span className="text-[11px] text-slate-400">12:40</span>
                    </div>
                  </div>
                </button>

              </div>
            )}

            {/* Mark as Complete */}
            <div className="shrink-0 p-4 border-t border-slate-200">
              <button
                type="button"
                className="w-full py-3.5 rounded-lg bg-[#0F172A] text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Mark as Complete
              </button>
            </div>
          </aside>
        )}
      </main>

      {/* Mobile: reopen sidebar FAB */}
      {!isSidebarOpen && (
        <button
          type="button"
          className="fixed right-4 bottom-4 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] text-slate-100 shadow-lg lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="material-symbols-outlined text-base text-[#F59E0B]">menu_open</span>
          <span className="text-xs font-medium">Course Content</span>
        </button>
      )}
    </div>
  );
};

export default CoursePlayer;
