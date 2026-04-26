import React, { useState } from 'react';

/* ─── Avatar URLs (DiceBear Avataaars – deterministic, no account needed) ─── */
const AVATARS = {
  alexChen:    'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexChen&backgroundColor=b6e3f4',
  sarahJenkins:'https://api.dicebear.com/9.x/avataaars/svg?seed=SarahJenkins&backgroundColor=ffd5dc',
  marcoRossi:  'https://api.dicebear.com/9.x/avataaars/svg?seed=MarcoRossi&backgroundColor=c0aede',
  leoDubois:   'https://api.dicebear.com/9.x/avataaars/svg?seed=LeoDubois&backgroundColor=d1f4cc',
  jeanDupont:  'https://api.dicebear.com/9.x/avataaars/svg?seed=JeanDupont&backgroundColor=b6e3f4',
  marieCurie:  'https://api.dicebear.com/9.x/avataaars/svg?seed=MarieCurie&backgroundColor=ffd5dc',
  currentUser: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CurrentUser&backgroundColor=c0aede',
};

/* ─── Left sidebar subjects ─────────────────────────────────────────── */
const SUBJECTS = [
  { icon: 'code',           label: 'HTML/CSS',       count: 245 },
  { icon: 'javascript',     label: 'JavaScript',     count: 412 },
  { icon: 'deployed_code',  label: 'React',          count: 189 },
  { icon: 'terminal',       label: 'Python',         count: 94  },
  { icon: 'php',            label: 'PHP / Laravel',  count: 76  },
  { icon: 'storage',        label: 'MySQL / MongoDB',count: 54  },
  { icon: 'functions',      label: 'Algorithm',      count: 120 },
  { icon: 'share',          label: 'Git / DevOps',   count: 43  },
  { icon: 'task_alt',       label: 'Agile / Jira',   count: 29  },
  { icon: 'smart_toy',      label: 'AI Skills',      count: 15  },
  { icon: 'chat',           label: 'General',        count: 310 },
];

/* ─── Posts data ────────────────────────────────────────────────────────── */
const POSTS = [
  {
    id: 1,
    author: 'Alex Chen',
    avatar: AVATARS.alexChen,
    badge: 'LVL 12 • STAFF',
    badgeClass: 'bg-[#1E293B] text-white',
    pinned: true,
    title: 'Mastering React Hooks: Best practices for cleaner state management in 2024',
    excerpt: "In this pinned guide, we'll dive deep into how to handle complex side effects using useEffect properly and why custom hooks are your best friend for reusability...",
    likes: 142,
    comments: 56,
    time: '2 hours ago',
    tag: 'REACT',
    tagColor: 'bg-[#1E293B] text-white',
    pinColor: 'border-l-4 border-[#F59E0B]',
  },
  {
    id: 2,
    author: 'Sarah Jenkins',
    avatar: AVATARS.sarahJenkins,
    badge: 'LVL 4 • STUDENT',
    badgeClass: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300',
    pinned: false,
    title: 'Help with Laravel Eloquent Relationship (Many-to-Many)',
    excerpt: "I'm trying to set up a pivot table for my project but I keep getting an integrity constraint violation. Can someone check my migration file?",
    likes: 12,
    comments: 8,
    time: '5 hours ago',
    tag: 'LARAVEL',
    tagColor: 'bg-[#F59E0B] text-[#0F172A]',
    pinColor: '',
  },
  {
    id: 3,
    author: 'Marco Rossi',
    avatar: AVATARS.marcoRossi,
    badge: 'LVL 8 • MENTOR',
    badgeClass: 'bg-emerald-700 text-white',
    pinned: false,
    title: 'Best practices for writing clean SQL queries in MongoDB?',
    excerpt: 'Should I use the aggregation framework for simple lookups or stick to basic find() methods for performance?',
    likes: 4,
    comments: 0,
    time: '12 hours ago',
    tag: 'MONGODB',
    tagColor: 'bg-emerald-600 text-white',
    pinColor: '',
  },
  {
    id: 4,
    author: 'Leo Dubois',
    avatar: AVATARS.leoDubois,
    badge: 'LVL 2 • STUDENT',
    badgeClass: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300',
    pinned: false,
    title: 'How to start with AI Skills for Web Developers?',
    excerpt: 'Is it worth learning OpenAI API integration now, or should I focus on basic data science concepts first?',
    likes: 28,
    comments: 15,
    time: 'Yesterday',
    tag: 'AI SKILLS',
    tagColor: 'bg-purple-600 text-white',
    pinColor: '',
  },
];

/* ─── Trending Tags ─────────────────────────────────────────────────────── */
const TAGS = ['#react_hooks', '#nextjs', '#manara_challenge', '#eloquent', '#chatgpt_api'];

/* ─── Leaderboard ───────────────────────────────────────────────────────── */
const LEADERS = [
  { rank: 1, name: 'Jean Dupont',  pts: '1,240', avatar: AVATARS.jeanDupont },
  { rank: 2, name: 'Marie Curie',  pts: '980',   avatar: AVATARS.marieCurie },
];

/* ══════════════════════════════════════════════════════════════════════════ */
const Forum = () => {
  const [activeFilter, setActiveFilter] = useState('Recent');

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] font-display text-slate-100">

      {/* ── Forum Header ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-700/60 px-6 py-3 flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0 mr-4">
          <span className="material-symbols-outlined text-[#F59E0B] text-2xl">school</span>
          <span className="font-extrabold text-lg tracking-tight text-white hidden sm:block">Forum Manara</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search discussions, subjects, or users..."
            className="w-full pl-10 pr-4 py-2 bg-[#1E293B] border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]/70 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <button className="flex items-center gap-2 bg-[#F59E0B] text-[#0F172A] px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-md">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">New Post</span>
          </button>
          <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-300 text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F59E0B] rounded-full"></span>
          </button>
          <button className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#F59E0B]/40 hover:ring-[#F59E0B] transition-all shrink-0">
            <img src={AVATARS.currentUser} alt="You" className="w-full h-full object-cover bg-slate-700" />
          </button>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 max-w-[1440px] w-full mx-auto">

        {/* ── Left Sidebar ─────────────────────────────────────────────── */}
        <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-[#1E293B] border-r border-slate-700/50 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-5 flex-1 space-y-6">

            {/* Platform */}
            <nav className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Platform</p>
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/25 text-white font-semibold hover:bg-[#F59E0B]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#F59E0B] text-[20px]">forum</span>
                  <span className="text-sm">All Posts</span>
                </div>
                <span className="text-[11px] bg-[#F59E0B] text-[#0F172A] px-2 py-0.5 rounded font-extrabold">1.2k</span>
              </a>
            </nav>

            {/* Subjects */}
            <nav className="space-y-0.5">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Subjects</p>
              {SUBJECTS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                    <span className="text-sm">{s.label}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold group-hover:text-slate-300 transition-colors">{s.count}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Forum Guidelines */}
          <div className="p-5 border-t border-slate-700/50">
            <button className="w-full py-2 px-4 rounded-lg border border-slate-600 text-slate-400 text-sm font-medium hover:border-[#F59E0B]/50 hover:text-[#F59E0B] transition-all">
              Forum Guidelines
            </button>
          </div>
        </aside>

        {/* ── Main Feed ────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 bg-slate-900">
          {/* Filter bar */}
          <div className="sticky top-[57px] z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">Recent Discussions</h2>
              <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg self-start">
                {['Recent', 'Most Liked', 'Unanswered'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                      activeFilter === f
                        ? 'bg-white text-slate-900 shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Post cards */}
          <div className="p-6 space-y-4 max-w-3xl">
            {POSTS.map((post) => (
              <article
                key={post.id}
                className={`bg-[#1E293B] rounded-xl shadow-sm border border-slate-700/50 p-5 transition-all hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5 ${post.pinColor}`}
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full ring-2 ring-slate-600 overflow-hidden bg-slate-700">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('flex','items-center','justify-center');
                          e.target.parentElement.innerHTML = `<span class="font-bold text-slate-300 text-sm">${post.author.split(' ').map(w=>w[0]).join('')}</span>`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-bold text-white">{post.author}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${post.badgeClass}`}>
                        {post.badge}
                      </span>
                      {post.pinned && (
                        <span className="flex items-center gap-1 bg-[#F59E0B]/20 text-[#F59E0B] text-[11px] font-bold px-2 py-0.5 rounded-full ml-auto">
                          <span className="material-symbols-outlined text-sm">push_pin</span>
                          Pinned
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      <a href="#" className="hover:text-[#F59E0B] transition-colors">{post.title}</a>
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-4 text-slate-500 text-xs">
                        <span className="flex items-center gap-1 hover:text-[#F59E0B] cursor-pointer transition-colors">
                          <span className="material-symbols-outlined text-sm">thumb_up</span>
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer transition-colors">
                          <span className="material-symbols-outlined text-sm">chat_bubble</span>
                          {post.comments}
                        </span>
                        <span className="text-slate-600">{post.time}</span>
                      </div>
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded uppercase tracking-wide ${post.tagColor}`}>
                        {post.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Load More */}
            <div className="flex justify-center pt-4 pb-8">
              <button className="px-8 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:border-[#F59E0B]/50 hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 transition-all">
                Load More Discussions
              </button>
            </div>
          </div>
        </main>

        {/* ── Right Sidebar ─────────────────────────────────────────────── */}
        <aside className="hidden xl:flex w-72 flex-col bg-slate-900 border-l border-slate-800 p-5 space-y-5 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">

          {/* Trending Tags */}
          <div className="bg-[#1E293B] rounded-xl p-5 border border-slate-700/50">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-[#F59E0B] text-[18px]">trending_up</span>
              Trending Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-slate-800 hover:bg-[#F59E0B]/15 hover:border-[#F59E0B]/40 border border-slate-700 rounded-full text-xs font-medium text-slate-300 hover:text-[#F59E0B] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Leaderboard */}
          <div className="bg-[#1E3A8A] rounded-xl p-5 shadow-lg border border-blue-800/50">
            <h4 className="font-bold text-[#F59E0B] mb-1 text-sm">Weekly Leaderboard</h4>
            <p className="text-xs text-slate-300 mb-4">Top contributors this week</p>
            <div className="space-y-3">
              {LEADERS.map((leader) => (
                <div key={leader.rank} className="flex items-center gap-3">
                  <span className={`text-sm font-extrabold w-5 shrink-0 ${leader.rank === 1 ? 'text-[#F59E0B]' : 'text-slate-400'}`}>
                    {leader.rank}.
                  </span>
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-700 bg-slate-700 shrink-0">
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium text-white">{leader.name}</span>
                  <span className="text-xs font-bold text-white">{leader.pts} pts</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 py-2.5 rounded-lg bg-[#F59E0B] text-[#0F172A] font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md">
              View Full Standings
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Forum;
