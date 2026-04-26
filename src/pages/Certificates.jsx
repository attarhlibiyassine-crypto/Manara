import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FULL_COURSES } from '../data/coursesData';

const NAV = [
  { to: '/dashboard',    icon: 'dashboard',          label: 'Dashboard'    },
  { to: '/progress',     icon: 'bar_chart',           label: 'Progression'  },
  { to: '/forum',        icon: 'forum',               label: 'Forum'        },
  { to: '/certificates', icon: 'workspace_premium',   label: 'Certificats', active: true },
  { to: '/settings',     icon: 'settings',            label: 'Paramètres'   },
];

const COURSE_COLOR = {
  laravel: { bg: 'from-red-600 to-red-800',    badge: 'bg-red-700',    icon: 'php' },
  react:   { bg: 'from-cyan-500 to-blue-700',  badge: 'bg-cyan-700',   icon: 'deployed_code' },
  python:  { bg: 'from-yellow-500 to-amber-700',badge: 'bg-yellow-700', icon: 'terminal' },
};

const Certificates = () => {
  const { user, logout } = useAuth();

  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '??';

  // Cours 100% complétés = certificat obtenu
  const progressMap = user?.progress ?? {};
  const completedCourses = Object.entries(progressMap)
    .filter(([, p]) => p.percentage === 100)
    .map(([courseId, p]) => ({ courseId, ...p, course: FULL_COURSES[courseId] }))
    .filter(c => c.course);

  // Cours en cours (pour encourager)
  const inProgressCourses = Object.entries(progressMap)
    .filter(([, p]) => p.percentage > 0 && p.percentage < 100)
    .map(([courseId, p]) => ({ courseId, ...p, course: FULL_COURSES[courseId] }))
    .filter(c => c.course);

  return (
    <div className="flex min-h-screen bg-[#0F172A] font-display text-slate-100">

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
          {NAV.map(n => (
            <Link key={n.to} to={n.to}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-colors ${
                n.active ? 'bg-primary text-navy-900 font-bold' : 'hover:bg-white/5 text-slate-300 hover:text-white'
              }`}>
              <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50 mt-auto">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
              <span className="text-sm font-extrabold text-primary">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name ?? '—'}</p>
              <p className="text-xs text-slate-400 truncate capitalize">{user?.plan ?? ''}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white font-medium">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="md:ml-[280px] flex-1 flex flex-col min-h-screen">
        <header className="h-[72px] bg-[#0F172A] border-b border-slate-800 flex items-center px-8 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">workspace_premium</span>
            Mes Certificats
          </h2>
        </header>

        <div className="px-8 py-8 flex-1">

          {/* ── Aucun certificat ────────────────────────────────────────── */}
          {completedCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary/50">workspace_premium</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Aucun certificat pour l'instant</h3>
              <p className="text-slate-400 text-sm mb-6">
                Terminez un cours à 100% pour obtenir votre certificat de réussite.
              </p>
              {inProgressCourses.length > 0 && (
                <div className="w-full space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Cours en cours</p>
                  {inProgressCourses.map(({ courseId, percentage, course }) => (
                    <Link key={courseId} to={`/course/${courseId}`}
                      className="flex items-center gap-4 p-4 bg-[#1E293B] rounded-xl border border-slate-700 hover:border-primary/40 transition-colors">
                      <span className={`material-symbols-outlined text-2xl ${COURSE_COLOR[courseId]?.badge ? 'text-primary' : 'text-primary'}`}>
                        {COURSE_COLOR[courseId]?.icon ?? 'menu_book'}
                      </span>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-bold text-white">{course.title}</p>
                        <div className="mt-1.5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{percentage}% complété</p>
                      </div>
                      <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link to="/dashboard" className="mt-6 px-6 py-3 bg-primary text-navy-900 font-bold rounded-xl hover:brightness-110 transition-all">
                Voir mes cours
              </Link>
            </div>
          )}

          {/* ── Certificats obtenus ──────────────────────────────────────── */}
          {completedCourses.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">emoji_events</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{completedCourses.length} certificat{completedCourses.length > 1 ? 's' : ''} obtenu{completedCourses.length > 1 ? 's' : ''}</h3>
                  <p className="text-slate-400 text-sm">Félicitations pour votre progression !</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedCourses.map(({ courseId, course }) => {
                  const meta = COURSE_COLOR[courseId] ?? { bg: 'from-slate-600 to-slate-800', icon: 'menu_book' };
                  const issuedDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
                  return (
                    <div key={courseId}
                      className={`relative rounded-2xl bg-gradient-to-br ${meta.bg} p-6 shadow-xl overflow-hidden`}>
                      {/* Watermark */}
                      <div className="absolute top-3 right-3 opacity-10">
                        <span className="material-symbols-outlined text-[80px] text-white">{meta.icon}</span>
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="material-symbols-outlined text-white text-2xl">workspace_premium</span>
                          <span className="text-white font-extrabold text-lg">Certificat de Réussite</span>
                        </div>

                        <div className="bg-white/10 rounded-xl p-4 mb-4">
                          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Décerné à</p>
                          <p className="text-white font-extrabold text-xl">{user?.name}</p>
                        </div>

                        <p className="text-white/70 text-xs mb-1">Pour avoir complété avec succès</p>
                        <p className="text-white font-bold text-base mb-4">{course.title}</p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/60 text-xs">Niveau</p>
                            <p className="text-white font-bold text-sm">{course.level}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white/60 text-xs">Date d'obtention</p>
                            <p className="text-white font-bold text-sm">{issuedDate}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-sm">school</span>
                            </div>
                            <span className="text-white/80 text-xs font-bold">Manara Platform</span>
                          </div>
                          <span className="text-white/50 text-[10px] font-mono">
                            CERT-{String(user?.id).padStart(4,'0')}-{courseId.toUpperCase().slice(0,3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cours en cours */}
              {inProgressCourses.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Prochains certificats</h4>
                  <div className="space-y-3">
                    {inProgressCourses.map(({ courseId, percentage, course }) => (
                      <Link key={courseId} to={`/course/${courseId}`}
                        className="flex items-center gap-4 p-4 bg-[#1E293B] rounded-xl border border-slate-700 hover:border-primary/40 transition-colors">
                        <span className="material-symbols-outlined text-primary">
                          {COURSE_COLOR[courseId]?.icon ?? 'menu_book'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white">{course.title}</p>
                          <div className="mt-1.5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percentage}%` }} />
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{percentage}% — encore {100 - percentage}% pour le certificat</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Certificates;
