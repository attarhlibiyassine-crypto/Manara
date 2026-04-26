import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { UserContext } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { coursesAPI, progressAPI } from '../services/api';
import coursesDataFallback, { FULL_COURSES } from '../data/coursesData';
import { Store } from '../data/store';

// ─── Level badge colours ──────────────────────────────────────────────────────
const LEVEL_COLOR = {
  Beginner:     'bg-[#3B82F6] text-white',
  Intermediate: 'bg-[#A855F7] text-white',
  Advanced:     'bg-[#10B981] text-white',
};

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV = [
  { to: '/dashboard', icon: 'dashboard',          label: 'Dashboard',    active: true  },
  { to: '/progress',  icon: 'bar_chart',           label: 'Progress',     active: false },
  { to: '/forum',     icon: 'forum',               label: 'Forum',        active: false },
  { to: '/certificates', icon: 'workspace_premium',label: 'Certificates', active: false },
  { to: '/settings',  icon: 'settings',            label: 'Settings',     active: false },
];

// ─── Skeleton loader card ─────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
    <div className="aspect-video bg-slate-200" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-100 rounded w-1/2" />
      <div className="h-2 bg-slate-100 rounded-full mt-4" />
      <div className="h-10 bg-slate-100 rounded-xl mt-4" />
    </div>
  </div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, iconBg, iconColor, label, value }) => (
  <div className="bg-white rounded-2xl p-6 flex flex-row items-center gap-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
    <div className={`w-[52px] h-[52px] rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
      <span className="material-symbols-outlined text-[28px]">{icon}</span>
    </div>
    <div className="flex flex-col">
      <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-black text-navy-900 leading-none">
        {value === undefined ? <span className="inline-block w-8 h-7 bg-slate-100 rounded animate-pulse" /> : value}
      </p>
    </div>
  </div>
);

// ─── Course card ──────────────────────────────────────────────────────────────
const CourseCard = ({ course, progress }) => {
  const pct      = progress?.percentage ?? 0;
  const enrolled = progress !== undefined;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] overflow-hidden group hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all flex flex-col hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-slate-300">play_circle</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${LEVEL_COLOR[course.level] ?? 'bg-slate-500 text-white'}`}>
            {course.subject || course.category?.name || 'Cours'}
          </span>
        </div>
        {enrolled && pct > 0 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {pct}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h4 className="font-bold text-lg text-navy-900 min-h-[3.5rem] leading-snug mb-4">{course.title}</h4>

        {enrolled && (
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Progression : {pct}%</span>
              {progress?.lessons_done !== undefined && (
                <span>{progress.lessons_done}/{progress.lessons_total} leçons</span>
              )}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-[#F59E0B] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        <Link
          to={`/course/${course.id}`}
          className="mt-auto w-full bg-[#F59E0B] hover:bg-[#F0B400] text-navy-900 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center text-[15px] shadow-sm shadow-primary/20"
        >
          {enrolled ? (pct > 0 ? 'Continuer' : 'Commencer') : 'Voir le cours'}
        </Link>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Dashboard
// ═════════════════════════════════════════════════════════════════════════════
const Dashboard = () => {
  const { t }        = useTranslation();
  const { userLevel } = useContext(UserContext);
  const { user, logout } = useAuth();
  const navigate     = useNavigate();

  const [filter,      setFilter]      = useState('All Levels');
  const [search,      setSearch]      = useState('');

  // ── Data state ─────────────────────────────────────────────────────────────
  const [allCourses,      setAllCourses]      = useState([]);
  const [enrolledIds,     setEnrolledIds]     = useState(new Set());
  const [progressMap,     setProgressMap]     = useState({}); // { courseId: { percentage, lessons_done, lessons_total } }
  const [stats,           setStats]           = useState(null);
  const [coursesLoading,  setCoursesLoading]  = useState(true);
  const [statsLoading,    setStatsLoading]    = useState(true);
  const [apiError,        setApiError]        = useState(false);

  // ── Fetch all courses ──────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setCoursesLoading(true);
      try {
        const res = await coursesAPI.getAll();
        const list = res.data?.data ?? res.data ?? [];
        if (list && list.length > 0) {
          setAllCourses(list);
          setApiError(false);
        } else {
          throw new Error('empty');
        }
      } catch {
        // API not ready → fall back to local data
        const fallback = coursesDataFallback && coursesDataFallback.length > 0
          ? coursesDataFallback
          : Object.values(FULL_COURSES);
        setAllCourses(fallback);
        setApiError(true);
      } finally {
        setCoursesLoading(false);
      }
    };
    load();
  }, []);

  // ── Charger progression depuis le Store (localStorage) ───────────────────
  useEffect(() => {
    if (!user) return;
    setStatsLoading(true);
    // Lire les données fraîches depuis le Store
    const freshUser = Store.getUserById(user.id);
    const src = freshUser ?? user;
    const enrolled = src.enrolled_courses ?? [];
    setEnrolledIds(new Set(enrolled.map(String)));
    setProgressMap(src.progress ?? {});
    setStats(src.stats ?? null);
    setStatsLoading(false);
  }, [user?.id]);

  // ── Derived: filter + search ───────────────────────────────────────────────
  const displayedCourses = allCourses.filter((c) => {
    const levelOk  = filter === 'All Levels' || c.level === filter;
    const searchOk = !search || c.title.toLowerCase().includes(search.toLowerCase()) || (c.subject || '').toLowerCase().includes(search.toLowerCase());
    return levelOk && searchOk;
  });

  const userInitials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="flex min-h-screen bg-[#F4F5F9] font-display text-navy-900">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-[280px] bg-[#161B28] text-white hidden md:flex flex-col fixed h-full z-50">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 bg-[#F59E0B] rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-900 font-bold text-lg">school</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Manara</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon, label, active }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors font-medium ${
                active
                  ? 'bg-[#F59E0B] text-slate-900 font-bold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* User block */}
        <div className="p-4 border-t border-slate-800/50 mt-auto">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 ring-2 ring-[#F59E0B] flex items-center justify-center font-bold text-[#F59E0B] text-sm shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name ?? 'Étudiant'}</p>
              <p className="text-xs text-slate-400 truncate capitalize">
                {user?.plan ? `${user.plan} Member` : 'Free Member'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="md:ml-[280px] flex-1 flex flex-col min-h-screen">

        {/* Top header */}
        <header className="h-[90px] bg-[#F4F5F9] flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 truncate">
              Bonjour, {user?.name?.split(' ')[0] ?? 'Étudiant'} 👋
            </h2>
            {userLevel && (
              <span className="hidden sm:block px-4 py-1 bg-[#F59E0B]/20 text-navy-900 text-[10px] font-black rounded-full uppercase tracking-widest border border-[#F59E0B]/30 shrink-0">
                {userLevel}
              </span>
            )}
            {!userLevel && (
              <Link to="/placement-test" className="hidden sm:block text-sm font-bold text-red-500 hover:underline shrink-0">
                {t('beginTest')} →
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un cours…"
                className="pl-11 pr-4 py-2.5 bg-slate-200/50 border-none rounded-xl focus:ring-2 focus:ring-[#F59E0B] focus:bg-white w-[260px] text-sm transition-all text-navy-900 placeholder-slate-500 font-medium"
              />
            </div>
            <button className="relative text-navy-900 p-2 hover:bg-slate-200/50 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[26px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
          </div>
        </header>

        <div className="px-6 md:px-10 pb-10 space-y-10 flex-1">

          {/* API warning */}
          {apiError && (
            <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-amber-700 text-sm">
              <span className="material-symbols-outlined text-base shrink-0">info</span>
              API Laravel non connectée — données de démonstration affichées.
              Lancez <code className="mx-1 font-mono bg-amber-100 px-1 rounded">php artisan serve</code> pour activer le mode réel.
            </div>
          )}

          {/* ── Stats row ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatCard icon="play_circle"        iconBg="bg-[#E6F0FF]" iconColor="text-[#3B82F6]" label="En cours"       value={stats?.in_progress   ?? (statsLoading ? undefined : '—')} />
            <StatCard icon="check_circle"       iconBg="bg-[#E6FFEA]" iconColor="text-[#22C55E]" label="Terminés"       value={stats?.completed      ?? (statsLoading ? undefined : '—')} />
            <StatCard icon="workspace_premium"  iconBg="bg-[#FEF3C7]" iconColor="text-yellow-600" label="Certificats"  value={stats?.certificates   ?? (statsLoading ? undefined : '—')} />
            <StatCard icon="forum"              iconBg="bg-[#F3E8FF]" iconColor="text-[#A855F7]" label="Posts Forum"    value={stats?.forum_posts    ?? (statsLoading ? undefined : '—')} />
          </div>

          {/* ── Courses section ─────────────────────────────────────────── */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-navy-900">Catalogue des cours</h3>
                {!coursesLoading && (
                  <p className="text-sm text-slate-500 mt-1">
                    {displayedCourses.length} cours disponible{displayedCourses.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilter(lvl)}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                      filter === lvl
                        ? 'bg-[#F59E0B] text-navy-900 shadow-md shadow-[#F59E0B]/20'
                        : 'bg-transparent text-slate-500 hover:text-navy-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {lvl === 'All Levels' ? 'Tous' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {coursesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : displayedCourses.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
                <p className="text-slate-500 mt-4 font-medium">Aucun cours trouvé pour ces filtres.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={progressMap[String(course.id)]}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Recommended (if level known) ────────────────────────────── */}
          {userLevel && !coursesLoading && (
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Recommandés pour vous</h3>
              <p className="text-sm text-slate-500 mb-6">
                Basé sur votre niveau <span className="font-bold text-[#F59E0B]">{userLevel}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCourses
                  .filter((c) => c.level === userLevel)
                  .slice(0, 3)
                  .map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      progress={progressMap[String(course.id)]}
                    />
                  ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
