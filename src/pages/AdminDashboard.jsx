import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp }  from '../context/AppContext';
import { Store } from '../data/store';
import { FULL_COURSES } from '../data/coursesData';

// Stats are now computed dynamically inside the component

const SECTION_NAV = [
  { id: 'overview',   icon: 'dashboard',      label: 'Vue d\'ensemble' },
  { id: 'users',      icon: 'group',          label: 'Utilisateurs' },
  { id: 'courses',    icon: 'menu_book',      label: 'Cours & Ressources' },
  { id: 'resources',  icon: 'approval',       label: 'Validation ressources' },
  { id: 'categories', icon: 'category',       label: 'Catégories' },
  { id: 'stats',      icon: 'bar_chart',      label: 'Statistiques' },
];

const LEVEL_COLOR = { Beginner: 'bg-green-100 text-green-700', Intermediate: 'bg-blue-100 text-blue-700', Advanced: 'bg-purple-100 text-purple-700' };
const ROLE_COLOR  = { admin: 'bg-red-100 text-red-700', teacher: 'bg-purple-100 text-purple-700', student: 'bg-[#F59E0B]/10 text-amber-700' };

const AdminDashboard = () => {
  const { user, logout }    = useAuth();
  const { pendingResources, approveResource, rejectResource, monthlyRevenue, validatedResources } = useApp();
  const [section,    setSection]    = useState('overview');
  const [categories, setCategories] = useState(() => Store.getApp()?.categories ?? ['Laravel', 'React', 'Python', 'HTML/CSS', 'JavaScript', 'DevOps', 'AI Skills']);
  const [newCatName, setNewCatName] = useState('');

  const allUsers = Store.getUsers();
  const courses  = Object.values(FULL_COURSES);

  // Total ressources validées sur tous les cours
  const totalValidated = Object.values(validatedResources).reduce((acc, arr) => acc + arr.length, 0);

  const STATS = [
    { label: 'Étudiants total',    value: String(allUsers.filter(u=>u.role==='student').length), trend: '+12.5%', icon: 'group',    color: 'text-blue-500',   bg: 'bg-blue-50' },
    { label: 'Professeurs actifs', value: String(allUsers.filter(u=>u.role==='teacher').length), trend: '+5.2%',  icon: 'school',   color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Cours disponibles',  value: String(courses.length),                                trend: '+3',     icon: 'menu_book',color: 'text-[#F59E0B]',  bg: 'bg-amber-50' },
    { label: 'Revenus du mois',    value: `${monthlyRevenue.toLocaleString('fr-FR')} MAD`,       trend: '+18.1%', icon: 'paid',     color: 'text-green-500',  bg: 'bg-green-50' },
  ];

  const approve = (id) => approveResource(id);
  const reject  = (id) => rejectResource(id);
  const addCat  = () => { if (newCatName.trim() && !categories.includes(newCatName)) { const next = Store.addCategory(newCatName.trim()); setCategories(next.categories); setNewCatName(''); } };
  const delCat  = (c) => { const next = Store.removeCategory(c); setCategories(next.categories); };
  const pendingRes = pendingResources;

  const inp = 'block w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]';

  return (
    <div className="flex min-h-screen bg-[#F4F5F9] font-display">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-64 bg-[#161B28] text-white flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="size-9 bg-[#F59E0B] rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-slate-900 text-xl">admin_panel_settings</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">Manara Admin</h1>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {SECTION_NAV.map(({ id, icon, label }) => (
            <button key={id} onClick={() => setSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${section === id ? 'bg-[#F59E0B] text-slate-900 font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
              {id === 'resources' && pendingResources.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{pendingRes.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="size-9 rounded-full bg-[#F59E0B]/20 flex items-center justify-center font-bold text-[#F59E0B] text-sm">
              {user?.avatar ?? user?.name?.[0] ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name ?? 'Admin'}</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">logout</span>Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="ml-64 flex-1 p-8 min-h-screen overflow-y-auto">

        {/* ══ VUE D'ENSEMBLE ══════════════════════════════════════════════ */}
        {section === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Bonjour, {user?.name?.split(' ')[0]} 👋</h2>
              <p className="text-slate-500 text-sm mt-1">Voici un résumé de la plateforme Manara.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map(({ label, value, trend, icon, color, bg }) => (
                <div key={label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">{label}</span>
                    <div className={`${bg} ${color} p-2.5 rounded-xl`}>
                      <span className="material-symbols-outlined text-[22px]">{icon}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-800">{value}</p>
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span>{trend}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Valider les ressources', count: pendingRes.length, icon: 'approval', sec: 'resources', color: 'bg-red-500' },
                { label: 'Gérer les utilisateurs', count: allUsers.length,    icon: 'group',    sec: 'users',     color: 'bg-blue-500' },
                { label: 'Gérer les catégories',   count: categories.length,  icon: 'category', sec: 'categories',color: 'bg-purple-500' },
              ].map(({ label, count, icon, sec, color }) => (
                <button key={sec} onClick={() => setSection(sec)}
                  className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all text-left group">
                  <div className={`${color} text-white p-3 rounded-xl shrink-0`}>
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{count} élément{count > 1 ? 's' : ''}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#F59E0B] ml-auto transition-colors">chevron_right</span>
                </button>
              ))}
            </div>

            {/* Recent users */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Utilisateurs récents</h3>
                <button onClick={() => setSection('users')} className="text-[#F59E0B] text-sm font-semibold hover:underline">Voir tout</button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <tr><th className="px-6 py-3">Nom</th><th className="px-6 py-3">Rôle</th><th className="px-6 py-3">Plan</th><th className="px-6 py-3">Rejoint</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-xs font-bold shrink-0">{u.avatar}</div>
                          <div><p className="text-sm font-semibold text-slate-800">{u.name}</p><p className="text-xs text-slate-400">{u.email}</p></div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold ${ROLE_COLOR[u.role]}`}>{u.role}</span></td>
                      <td className="px-6 py-4"><span className="text-xs text-slate-600 capitalize">{u.plan}</span></td>
                      <td className="px-6 py-4 text-xs text-slate-500">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ UTILISATEURS ════════════════════════════════════════════════ */}
        {section === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Gestion des utilisateurs</h2>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <tr><th className="px-6 py-4">Utilisateur</th><th className="px-6 py-4">Rôle</th><th className="px-6 py-4">Niveau</th><th className="px-6 py-4">Plan</th><th className="px-6 py-4">Rejoint</th><th className="px-6 py-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-sm font-bold shrink-0">{u.avatar}</div>
                          <div><p className="text-sm font-semibold text-slate-800">{u.name}</p><p className="text-xs text-slate-400">{u.email}</p></div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold ${ROLE_COLOR[u.role]}`}>{u.role}</span></td>
                      <td className="px-6 py-4">{u.level ? <span className={`px-2 py-1 rounded text-[10px] font-bold ${LEVEL_COLOR[u.level]}`}>{u.level}</span> : <span className="text-slate-300 text-xs">—</span>}</td>
                      <td className="px-6 py-4 text-xs text-slate-600 capitalize">{u.plan}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{u.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded" title="Bloquer">
                          <span className="material-symbols-outlined text-lg">block</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ COURS ═══════════════════════════════════════════════════════ */}
        {section === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Cours & Ressources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full aspect-video object-cover" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${c.level === 'Beginner' ? 'bg-green-100 text-green-700' : c.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{c.level}</span>
                      <span className="text-xs text-slate-400">{c.students?.toLocaleString()} étudiants</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug">{c.title}</h3>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                      <div className="bg-slate-50 rounded-lg p-2"><p className="font-black text-slate-800">{c.lessons?.length ?? 0}</p><p className="text-slate-400">Leçons</p></div>
                      <div className="bg-slate-50 rounded-lg p-2"><p className="font-black text-slate-800">{c.resources?.length ?? 0}</p><p className="text-slate-400">Ressources</p></div>
                      <div className="bg-slate-50 rounded-lg p-2"><p className="font-black text-[#F59E0B]">{c.rating}</p><p className="text-slate-400">Note</p></div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                      <span className="text-xs text-green-600 font-semibold">Validé & publié</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ VALIDATION RESSOURCES ════════════════════════════════════════ */}
        {section === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800">Validation des ressources</h2>
              {pendingRes.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">{pendingRes.length} en attente</span>
              )}
            </div>

            {pendingRes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <span className="material-symbols-outlined text-6xl text-green-400">check_circle</span>
                <h3 className="text-xl font-bold text-slate-700 mt-4">Tout est à jour !</h3>
                <p className="text-slate-400 text-sm mt-2">Aucune ressource en attente de validation.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                    <tr><th className="px-6 py-4">Ressource</th><th className="px-6 py-4">Cours</th><th className="px-6 py-4">Professeur</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pendingRes.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'}`}>
                              <span className={`material-symbols-outlined text-base ${r.type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`}>{r.type === 'pdf' ? 'picture_as_pdf' : 'smart_display'}</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-800">{r.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{r.course}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{r.teacher}</td>
                        <td className="px-6 py-4"><span className={`text-[10px] font-black px-2 py-1 rounded ${r.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{r.type.toUpperCase()}</span></td>
                        <td className="px-6 py-4 text-xs text-slate-500">{r.date}</td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                          <button onClick={() => approve(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors">
                            <span className="material-symbols-outlined text-sm">check</span>Valider
                          </button>
                          <button onClick={() => reject(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors">
                            <span className="material-symbols-outlined text-sm">close</span>Rejeter
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ CATÉGORIES ══════════════════════════════════════════════════ */}
        {section === 'categories' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-800">Gestion des catégories</h2>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex gap-3 mb-6">
                <input className={inp} placeholder="Nom de la nouvelle catégorie…" value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCat()} />
                <button onClick={addCat} className="px-5 py-2.5 bg-[#F59E0B] text-slate-900 font-bold text-sm rounded-lg hover:bg-amber-400 transition-colors shrink-0">
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl group">
                    <span className="material-symbols-outlined text-[#F59E0B] text-base">label</span>
                    <span className="text-sm font-semibold text-slate-700">{cat}</span>
                    <button onClick={() => delCat(cat)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ STATISTIQUES ════════════════════════════════════════════════ */}
        {section === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Statistiques du site</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B]">people</span>Répartition des utilisateurs
                </h3>
                <div className="space-y-3">
                  {[{ label: 'Étudiants', count: 1, pct: 33, color: 'bg-[#F59E0B]' }, { label: 'Professeurs', count: 1, pct: 33, color: 'bg-purple-400' }, { label: 'Admins', count: 1, pct: 34, color: 'bg-blue-400' }].map(({ label, count, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs font-medium text-slate-600 mb-1"><span>{label}</span><span>{count} ({pct}%)</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B]">menu_book</span>Popularité des cours
                </h3>
                <div className="space-y-3">
                  {Object.values(FULL_COURSES).map((c) => (
                    <div key={c.id}>
                      <div className="flex justify-between text-xs font-medium text-slate-600 mb-1"><span>{c.subject}</span><span>{c.students?.toLocaleString()} étudiants</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${Math.round((c.students / 4000) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:col-span-2">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B]">insights</span>Métriques clés
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Taux de complétion',  value: '68%',   icon: 'task_alt' },
                    { label: 'Note moyenne',        value: '4.8/5', icon: 'star' },
                    { label: 'Sessions actives',    value: '1',     icon: 'person_pin_circle' },
                    { label: 'Ressources validées', value: String(totalValidated), icon: 'approval' },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-4 text-center">
                      <span className="material-symbols-outlined text-[#F59E0B] text-2xl">{icon}</span>
                      <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
                      <p className="text-xs text-slate-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
