import React, { useState, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Store } from '../data/store';

const avatar = (seed, bg = 'b6e3f4') =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}`;

const SUBJECTS = [
  { id: 'all',     icon: 'forum',        label: 'Tous les posts', color: 'text-[#F59E0B]' },
  { id: 'laravel', icon: 'php',          label: 'Laravel',        color: 'text-red-400'   },
  { id: 'react',   icon: 'deployed_code',label: 'React',          color: 'text-cyan-400'  },
  { id: 'python',  icon: 'terminal',     label: 'Python',         color: 'text-yellow-300'},
];

const TAG_STYLE = {
  laravel: 'bg-red-500/20 text-red-400 border-red-500/30',
  react:   'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  python:  'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
};

const timeAgo = (ts) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'À l\'instant';
  if (m < 60) return `Il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Il y a ${h}h`;
  return `Il y a ${Math.floor(h / 24)}j`;
};

const Badge = ({ role }) => {
  if (role === 'teacher') return (
    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-emerald-700 text-white">Professeur</span>
  );
  if (role === 'admin') return (
    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-red-700 text-white">Admin</span>
  );
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-slate-700 text-slate-300">Étudiant</span>
  );
};

const Comment = ({ comment, onLike, currentUserId }) => (
  <div className="flex gap-3 pt-3">
    <img src={avatar(comment.authorSeed, comment.authorBg)} alt={comment.authorName}
      className="w-8 h-8 rounded-full ring-1 ring-slate-600 shrink-0 bg-slate-700" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="text-sm font-bold text-white">{comment.authorName}</span>
        <Badge role={comment.authorRole} />
        <span className="text-xs text-slate-500 ml-auto">{timeAgo(comment.createdAt)}</span>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{comment.body}</p>
      <button
        onClick={() => onLike(comment.id)}
        className={`flex items-center gap-1 mt-2 text-xs transition-colors ${(comment.likedBy ?? []).includes(String(currentUserId)) ? 'text-[#F59E0B]' : 'text-slate-500 hover:text-[#F59E0B]'}`}
      >
        <span className="material-symbols-outlined text-sm">thumb_up</span>
        {comment.likes ?? 0}
      </button>
    </div>
  </div>
);

const PostCard = ({ post, onLike, onComment, onLikeComment, onDelete, currentUserId, currentUserRole, expandedId, setExpandedId }) => {
  const [newComment, setNewComment] = useState('');
  const isExpanded = expandedId === post.id;
  const canDelete = String(post.authorId) === String(currentUserId) || currentUserRole === 'admin';

  const handleComment = () => {
    if (!newComment.trim()) return;
    onComment(post.id, newComment.trim());
    setNewComment('');
  };

  return (
    <article className={`bg-[#1E293B] rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all ${post.pinned ? 'border-l-4 border-l-[#F59E0B]' : ''}`}>
      <div className="p-5">
        <div className="flex gap-4">
          <div className="shrink-0">
            <img src={avatar(post.authorSeed, post.authorBg)} alt={post.authorName}
              className="w-11 h-11 rounded-full ring-2 ring-slate-600 bg-slate-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-bold text-white">{post.authorName}</span>
              <Badge role={post.authorRole} />
              {post.pinned && (
                <span className="flex items-center gap-1 text-[#F59E0B] text-[11px] font-bold ml-auto">
                  <span className="material-symbols-outlined text-sm">push_pin</span>Épinglé
                </span>
              )}
              {canDelete && !post.pinned && (
                <button onClick={() => onDelete(post.id)} className="ml-auto text-slate-600 hover:text-red-400 transition-colors" title="Supprimer">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              )}
            </div>
            <h3 className="text-base font-bold text-white mb-2 leading-snug">{post.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{post.body}</p>

            <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
              <div className="flex items-center gap-4 text-slate-500 text-xs">
                <button
                  onClick={() => onLike(post.id)}
                  className={`flex items-center gap-1 transition-colors ${(post.likedBy ?? []).includes(String(currentUserId)) ? 'text-[#F59E0B]' : 'hover:text-[#F59E0B]'}`}
                >
                  <span className="material-symbols-outlined text-sm">thumb_up</span>
                  {post.likes ?? 0}
                </button>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : post.id)}
                  className="flex items-center gap-1 hover:text-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">chat_bubble</span>
                  {(post.comments ?? []).length}
                </button>
                <span className="text-slate-600">{timeAgo(post.createdAt)}</span>
              </div>
              <span className={`px-2.5 py-1 text-[11px] font-bold rounded border uppercase tracking-wide ${TAG_STYLE[post.subject] ?? ''}`}>
                {post.subject}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-700/60 px-5 pb-5">
          {(post.comments ?? []).length > 0 && (
            <div className="divide-y divide-slate-700/40">
              {(post.comments ?? []).map(c => (
                <Comment key={c.id} comment={c} onLike={(cid) => onLikeComment(post.id, cid)} currentUserId={currentUserId} />
              ))}
            </div>
          )}

          {currentUserId ? (
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold text-primary">{String(currentUserId).slice(0,2)}</span>
              </div>
              <div className="flex-1 flex gap-2">
                <textarea
                  rows={2}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire…"
                  className="flex-1 bg-[#0F172A] border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]/70 resize-none"
                />
                <button
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="px-3 py-2 bg-[#F59E0B] text-[#0F172A] rounded-lg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed self-start"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm mt-4 text-center">Connectez-vous pour commenter.</p>
          )}
        </div>
      )}
    </article>
  );
};

const Forum = () => {
  const { user } = useAuth();
  const currentUserId = user?.id ?? null;

  // ── État local reflétant le Store ─────────────────────────────────────────
  const [posts, setPosts] = useState(() => Store.getPosts());

  const [activeSubject, setActiveSubject] = useState('all');
  const [filter, setFilter]       = useState('recent');
  const [search, setSearch]       = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost]     = useState({ subject: 'laravel', title: '', body: '' });

  const refresh = useCallback(() => setPosts(Store.getPosts()), []);

  const filtered = useMemo(() => {
    let list = [...posts];
    if (activeSubject !== 'all') list = list.filter(p => p.subject === activeSubject);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q));
    }
    if (filter === 'recent')     list.sort((a, b) => b.createdAt - a.createdAt);
    if (filter === 'liked')      list.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    if (filter === 'unanswered') list = list.filter(p => (p.comments ?? []).length === 0);
    list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    return list;
  }, [posts, activeSubject, filter, search]);

  const handleLikePost = useCallback((postId) => {
    if (!currentUserId) return;
    Store.toggleLikePost(postId, currentUserId);
    refresh();
  }, [currentUserId, refresh]);

  const handleComment = useCallback((postId, body) => {
    if (!currentUserId || !user) return;
    Store.addComment(postId, user, body);
    refresh();
  }, [currentUserId, user, refresh]);

  const handleLikeComment = useCallback((postId, commentId) => {
    if (!currentUserId) return;
    Store.toggleLikeComment(postId, commentId, currentUserId);
    refresh();
  }, [currentUserId, refresh]);

  const handleDelete = useCallback((postId) => {
    if (!currentUserId) return;
    Store.deletePost(postId, currentUserId);
    refresh();
  }, [currentUserId, refresh]);

  const handlePublish = useCallback(() => {
    if (!newPost.title.trim() || !newPost.body.trim() || !user) return;
    Store.createPost(user, newPost);
    setNewPost({ subject: 'laravel', title: '', body: '' });
    setShowModal(false);
    refresh();
  }, [newPost, user, refresh]);

  const counts = useMemo(() => ({
    all:     posts.length,
    laravel: posts.filter(p => p.subject === 'laravel').length,
    react:   posts.filter(p => p.subject === 'react').length,
    python:  posts.filter(p => p.subject === 'python').length,
  }), [posts]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] font-display text-slate-100">

      <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-700/60 px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0 mr-4">
          <span className="material-symbols-outlined text-[#F59E0B] text-2xl">forum</span>
          <span className="font-extrabold text-lg tracking-tight text-white hidden sm:block">Forum Manara</span>
        </div>
        <div className="flex-1 max-w-xl relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une discussion…"
            className="w-full pl-10 pr-4 py-2 bg-[#1E293B] border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]/70 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 ml-auto shrink-0">
          {user ? (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#F59E0B] text-[#0F172A] px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">Nouveau post</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400">Connectez-vous pour poster</span>
          )}
          {user && (
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-[#F59E0B]/40 shrink-0">
              <span className="text-xs font-extrabold text-primary">
                {user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 max-w-[1440px] w-full mx-auto">

        <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-[#1E293B] border-r border-slate-700/50 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-5 space-y-2">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Sujets</p>
            {SUBJECTS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSubject(s.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                  activeSubject === s.id
                    ? 'bg-[#F59E0B]/15 border border-[#F59E0B]/25 text-white'
                    : 'hover:bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${activeSubject === s.id ? s.color : ''}`}>{s.icon}</span>
                  <span className="text-sm font-semibold">{s.label}</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded font-extrabold ${
                  activeSubject === s.id ? 'bg-[#F59E0B] text-[#0F172A]' : 'text-slate-500 font-semibold'
                }`}>{counts[s.id]}</span>
              </button>
            ))}
          </div>

          {user && (
            <div className="p-5 border-t border-slate-700/50 mt-auto">
              <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-extrabold text-primary">{user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                  <Badge role={user.role} />
                </div>
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1 min-w-0 bg-slate-900">
          <div className="sticky top-[57px] z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">
                {activeSubject === 'all' ? 'Toutes les discussions' : `Discussions — ${SUBJECTS.find(s=>s.id===activeSubject)?.label}`}
                <span className="ml-2 text-sm font-normal text-slate-400">({filtered.length})</span>
              </h2>
              <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg self-start">
                {[['recent','Récent'],['liked','Plus aimés'],['unanswered','Sans réponse']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFilter(val)}
                    className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all ${
                      filter === val ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >{label}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4 max-w-3xl">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">forum</span>
                <p className="text-slate-400 text-lg font-semibold">Aucune discussion trouvée</p>
                <p className="text-slate-600 text-sm mt-1">Soyez le premier à poster sur ce sujet !</p>
              </div>
            ) : (
              filtered.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onComment={handleComment}
                  onLikeComment={handleLikeComment}
                  onDelete={handleDelete}
                  currentUserId={currentUserId}
                  currentUserRole={user?.role}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                />
              ))
            )}
          </div>
        </main>

        <aside className="hidden xl:flex w-64 flex-col bg-slate-900 border-l border-slate-800 p-5 space-y-5 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="bg-[#1E293B] rounded-xl p-5 border border-slate-700/50">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-[#F59E0B] text-[18px]">bar_chart</span>
              Statistiques
            </h4>
            <div className="space-y-3">
              {SUBJECTS.filter(s => s.id !== 'all').map(s => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${s.color}`}>{s.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">{s.label}</span>
                      <span className="text-slate-400">{counts[s.id]} posts</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${counts.all > 0 ? (counts[s.id] / counts.all) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1E3A8A] rounded-xl p-5 border border-blue-800/50">
            <h4 className="font-bold text-[#F59E0B] mb-2 text-sm">Règles du forum</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-none">
              {['Soyez respectueux', 'Restez sur le sujet', 'Pas de spam', 'Aidez les autres'].map(r => (
                <li key={r} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B] text-sm">check_circle</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h3 className="text-lg font-extrabold text-white">Nouveau post</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Sujet</label>
                <div className="flex gap-2">
                  {SUBJECTS.filter(s => s.id !== 'all').map(s => (
                    <button
                      key={s.id}
                      onClick={() => setNewPost(p => ({ ...p, subject: s.id }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold border transition-all ${
                        newPost.subject === s.id
                          ? `${TAG_STYLE[s.id]} border-current`
                          : 'border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Titre</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                  placeholder="Un titre clair et précis…"
                  className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]/70"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Contenu</label>
                <textarea
                  rows={5}
                  value={newPost.body}
                  onChange={e => setNewPost(p => ({ ...p, body: e.target.value }))}
                  placeholder="Décrivez votre question ou partagez vos connaissances…"
                  className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]/70 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-semibold hover:border-slate-500 transition-colors">Annuler</button>
              <button
                onClick={handlePublish}
                disabled={!newPost.title.trim() || !newPost.body.trim()}
                className="px-6 py-2.5 bg-[#F59E0B] text-[#0F172A] rounded-xl font-extrabold text-sm hover:brightness-110 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
