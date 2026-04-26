import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { coursesAPI, resourcesAPI, progressAPI, forumAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useApp }  from '../context/AppContext';
import { FULL_COURSES } from '../data/coursesData';
import { Store } from '../data/store';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const resIcon = (type) => {
  if (!type) return 'attachment';
  if (type === 'pdf')   return 'picture_as_pdf';
  if (type === 'video') return 'smart_display';
  if (type === 'link')  return 'open_in_new';
  return 'attachment';
};

const resColor = (type) => {
  if (type === 'pdf')   return 'text-red-500';
  if (type === 'video') return 'text-blue-500';
  if (type === 'link')  return 'text-green-500';
  return 'text-[#F59E0B]';
};

// ─── Course Quiz Component ────────────────────────────────────────────────────
const CourseQuiz = ({ quiz, courseId, userLevel, isMock, onComplete }) => {
  const level = userLevel || 'Beginner';
  const questions = quiz?.[level] ?? [];

  const [current,   setCurrent]   = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [answers,   setAnswers]   = useState([]);
  const [done,      setDone]      = useState(false);
  const [score,     setScore]     = useState(0);

  if (!questions.length) {
    return (
      <div className="text-center py-10 text-slate-400">
        <span className="material-symbols-outlined text-4xl">quiz</span>
        <p className="mt-2 text-sm">Aucun quiz disponible pour le niveau {level}.</p>
      </div>
    );
  }

  const q = questions[current];
  const total = questions.length;

  const handleSelect = (idx) => { if (selected === null) setSelected(idx); };

  const handleNext = async () => {
    const isCorrect = selected === q.correct;
    const newAnswers = [...answers, { question_id: q.id, selected_index: selected, correct: isCorrect }];
    setAnswers(newAnswers);
    const newScore = score + (isCorrect ? 1 : 0);
    if (selected !== null && current < total - 1) {
      setScore(newScore); setCurrent((c) => c + 1); setSelected(null);
    } else if (current === total - 1) {
      setScore(newScore); setDone(true);
      if (!isMock) {
        try { await progressAPI.updateProgress(courseId, { quiz_score: newScore, quiz_total: total, level }); } catch { /**/ }
      }
      onComplete?.(newScore, total);
    }
  };

  const pct = Math.round((score / total) * 100);

  if (done) {
    const passed = score >= Math.ceil(total * 0.6);
    return (
      <div className="text-center py-8 space-y-4">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-black ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
          {score}/{total}
        </div>
        <h3 className="text-xl font-bold text-[#1E293B]">{passed ? '🎉 Bravo !' : '📚 Continuez à apprendre'}</h3>
        <p className="text-slate-500 text-sm">
          Vous avez obtenu <strong>{score} / {total}</strong> ({pct}%) au niveau <strong>{level}</strong>.
        </p>
        {passed
          ? <p className="text-green-600 text-sm font-medium">Vous avez validé ce quiz. Passez au niveau supérieur !</p>
          : <p className="text-slate-400 text-sm">Révisez les leçons et retentez le quiz.</p>
        }
        <button onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); setScore(0); }}
          className="mt-4 px-6 py-2.5 bg-[#F59E0B] text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-colors">
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500">Question {current + 1}/{total}</span>
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#F59E0B] rounded-full transition-all" style={{ width: `${((current) / total) * 100}%` }} />
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F59E0B]/20 text-amber-700">{level}</span>
      </div>

      {/* Question */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5">
        <p className="text-base font-semibold text-[#1E293B] leading-snug">{q.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let cls = 'border-slate-200 bg-white hover:border-[#F59E0B]/50 hover:bg-amber-50/50 cursor-pointer';
          if (selected !== null) {
            if (idx === q.correct) cls = 'border-green-400 bg-green-50';
            else if (idx === selected) cls = 'border-red-400 bg-red-50';
            else cls = 'border-slate-200 bg-white opacity-60';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${cls}`}>
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                selected !== null && idx === q.correct ? 'border-green-500 bg-green-500 text-white' :
                selected === idx && idx !== q.correct  ? 'border-red-500  bg-red-500  text-white' :
                'border-slate-300 text-slate-500'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm font-medium text-[#1E293B]">{opt}</span>
              {selected !== null && idx === q.correct && (
                <span className="material-symbols-outlined text-green-500 ml-auto">check_circle</span>
              )}
              {selected === idx && idx !== q.correct && (
                <span className="material-symbols-outlined text-red-500 ml-auto">cancel</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {selected !== null && (
        <div className="space-y-3">
          <div className={`p-3 rounded-lg text-sm font-medium ${selected === q.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {selected === q.correct ? '✅ Bonne réponse !' : `❌ La bonne réponse était : "${q.options[q.correct]}"`}
          </div>
          <button onClick={handleNext}
            className="w-full py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
            {current < total - 1 ? 'Question suivante →' : 'Voir mes résultats'}
          </button>
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// CoursePlayer
// ═════════════════════════════════════════════════════════════════════════════
const CoursePlayer = () => {
  const { id }           = useParams();
  const { user, isMock } = useAuth();
  const { getCourseResources, updateProgress: appUpdateProgress, studentProgress } = useApp();

  const [course,        setCourse]        = useState(null);
  const [resources,     setResources]     = useState([]);
  const [forumPosts,    setForumPosts]    = useState([]);
  const [progress,      setProgress]      = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeTab,     setActiveTab]     = useState('overview');
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [sectionOpen,   setSectionOpen]   = useState(true);
  const [loading,       setLoading]       = useState(true);
  const [markingDone,   setMarkingDone]   = useState(false);
  const [newPost,       setNewPost]       = useState({ title: '', content: '' });
  const [postLoading,   setPostLoading]   = useState(false);

  const userLevel = user?.level || 'Beginner';

  // ── Load course ────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // 1. Try local full course first (the 3 main ones)
      const local = FULL_COURSES[id];
      if (local) {
        setCourse(local);
        setResources(getCourseResources(id) || local.resources || []);
        // Restore mock progress from user object
        // Charger la progression depuis le Store (source de vérité)
        const freshUser = Store.getUserById(user?.id);
        const mockProgress = freshUser?.progress?.[id] || user?.progress?.[id] || null;
        setProgress(mockProgress);
        // S'assurer que l'étudiant est enrôlé dans le cours
        if (user?.id) Store.enrollCourse(user.id, id);
        const completedIds = new Set(mockProgress?.completed_lesson_ids || []);
        const firstIncomplete = local.lessons.find((l) => !completedIds.has(l.id));
        setCurrentLesson(firstIncomplete || local.lessons[0] || null);
        setLoading(false);
        return;
      }
      // 2. Try API for non-local courses
      if (!isMock) {
        try {
          const [cRes, rRes, pRes] = await Promise.allSettled([
            coursesAPI.getOne(id),
            resourcesAPI.getByCourse(id),
            progressAPI.getCourseProgress(id),
          ]);
          if (cRes.status === 'fulfilled') setCourse(cRes.value.data);
          if (rRes.status === 'fulfilled') setResources(rRes.value.data?.data ?? rRes.value.data ?? []);
          if (pRes.status === 'fulfilled') setProgress(pRes.value.data);
        } catch { /* ignore */ }
      }
      setLoading(false);
    };
    load();
  }, [id, isMock, user]);

  // ── Mark lesson complete ───────────────────────────────────────────────────
  const markComplete = useCallback(async () => {
    if (!currentLesson || markingDone || !user) return;
    setMarkingDone(true);

    // Toujours persister dans le Store
    setProgress((prev) => {
      const done = new Set(prev?.completed_lesson_ids || []);
      done.add(currentLesson.id);
      const total = course?.lessons?.length || 1;
      const pct = Math.round((done.size / total) * 100);
      const newProg = { ...prev, completed_lesson_ids: [...done], percentage: pct, lessons_done: done.size, lessons_total: total };
      Store.updateProgress(user.id, id, newProg);
      return newProg;
    });

    setTimeout(() => setMarkingDone(false), 500);
  }, [id, currentLesson, markingDone, user, course]);

  // ── Submit forum post ──────────────────────────────────────────────────────
  const submitPost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim()) return;
    setPostLoading(true);
    if (isMock) {
      const mockPostObj = {
        id: Date.now(), title: newPost.title, content: newPost.content,
        user: { name: user?.name }, created_at: new Date().toISOString(),
        likes: 0, comments: 0,
      };
      setForumPosts((p) => [mockPostObj, ...p]);
    } else {
      try {
        const res = await forumAPI.createPost({ ...newPost, course_id: id });
        setForumPosts((p) => [res.data, ...p]);
      } catch { /* ignore */ }
    }
    setNewPost({ title: '', content: '' });
    setPostLoading(false);
  };

  const opts = { height: '100%', width: '100%', playerVars: { autoplay: 0, modestbranding: 1, rel: 0 } };

  const completedIds  = new Set(progress?.completed_lesson_ids || []);
  const pct           = progress?.percentage ?? 0;
  const lessons       = course?.lessons || [];
  const userInitials  = user?.name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const youtubeId     = currentLesson?.youtube_id ?? currentLesson?.youtubeId ?? course?.youtubeId ?? course?.youtube_id;

  const tabs = [
    { id: 'overview',   icon: 'info',          label: 'Vue d\'ensemble' },
    { id: 'quiz',       icon: 'quiz',          label: `Quiz (${userLevel})` },
    { id: 'resources',  icon: 'folder',        label: `Ressources (${resources.length})` },
    { id: 'discussion', icon: 'forum',         label: `Discussion (${forumPosts.length})` },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-400">
        <span className="w-10 h-10 border-4 border-slate-700 border-t-[#F59E0B] rounded-full animate-spin" />
        <span className="text-sm">Chargement du cours…</span>
      </div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-slate-100">
      <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">search_off</span>
      <h1 className="text-2xl font-bold mb-2">Cours introuvable</h1>
      <Link to="/dashboard" className="text-[#F59E0B] hover:underline font-medium mt-2">← Retour au dashboard</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-display flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-slate-800 shrink-0 gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-300">
            <span className="material-symbols-outlined text-[#F59E0B] text-base">emoji_events</span>
            <span className="font-medium">Progression : <span className="font-bold text-white">{pct}%</span></span>
            <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden ml-1">
              <div className="h-full bg-[#F59E0B] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <h1 className="font-semibold text-sm sm:text-base text-center truncate flex-1 max-w-xl">{course.title}</h1>

        <div className="flex items-center gap-3 shrink-0">
          {isMock && (
            <span className="hidden sm:block text-[10px] font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">DÉMO</span>
          )}
          <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0F172A] flex items-center justify-center text-xs font-bold">{userInitials}</div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Left: video + content */}
        <section className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Video */}
          <div className="relative w-full aspect-video bg-black shrink-0">
            {youtubeId ? (
              <YouTube videoId={youtubeId} opts={opts} className="absolute inset-0 w-full h-full" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <span className="material-symbols-outlined text-6xl">videocam_off</span>
                <p className="text-sm mt-2">Aucune vidéo disponible</p>
              </div>
            )}
          </div>

          {/* Below video */}
          <div className="flex-1 px-4 md:px-6 py-5 overflow-y-auto bg-white text-[#1E293B]">
            <h2 className="text-xl md:text-2xl font-bold mb-5">{currentLesson?.title ?? course.title}</h2>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-6 flex gap-1 flex-wrap">
              {tabs.map(({ id: tid, icon, label }) => (
                <button key={tid} onClick={() => setActiveTab(tid)}
                  className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tid ? 'text-[#1E293B]' : 'text-slate-500 hover:text-[#1E293B]'}`}>
                  <span className="material-symbols-outlined text-base">{icon}</span>
                  {label}
                  {activeTab === tid && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F59E0B] rounded-full" />}
                </button>
              ))}
            </div>

            {/* TAB: Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <p className="text-sm text-[#475569] leading-relaxed">{course.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: 'signal_cellular_alt', label: 'Niveau',     val: course.level },
                    { icon: 'play_lesson',          label: 'Leçons',    val: lessons.length },
                    { icon: 'schedule',             label: 'Durée',     val: course.duration },
                    { icon: 'star',                 label: 'Note',      val: `${course.rating ?? '—'}/5` },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#F59E0B] text-xl shrink-0">{icon}</span>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{label}</p>
                        <p className="text-sm font-bold text-[#1E293B]">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[#F59E0B]">person</span>
                    <p className="text-sm font-semibold text-[#1E293B]">Instructeur</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{course.instructor ?? 'Prof El Alaoui'}</p>
                </div>
              </div>
            )}

            {/* TAB: Quiz */}
            {activeTab === 'quiz' && (
              <CourseQuiz
                quiz={course.quiz}
                courseId={id}
                userLevel={userLevel}
                isMock={isMock}
                onComplete={(score, total) => console.log('Quiz terminé', score, '/', total)}
              />
            )}

            {/* TAB: Ressources */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                {resources.length === 0 ? (
                  <div className="text-center py-10">
                    <span className="material-symbols-outlined text-5xl text-slate-300">folder_open</span>
                    <p className="text-slate-400 mt-3 text-sm">Aucune ressource pour ce cours.</p>
                  </div>
                ) : (
                  resources.map((r) => (
                    <a key={r.id} href={r.url ?? r.file_url ?? '#'} target="_blank" rel="noreferrer"
                      className="flex items-center gap-4 px-4 py-4 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-[#F59E0B]/60 hover:bg-amber-50/40 transition-all group">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-white border border-slate-200 ${resColor(r.type)}`}>
                        <span className="material-symbols-outlined text-xl">{resIcon(r.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1E293B] truncate">{r.title}</p>
                        {r.description && <p className="text-xs text-slate-400 mt-0.5">{r.description}</p>}
                        {r.size && <p className="text-xs text-slate-400 mt-0.5">{r.size}</p>}
                      </div>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-[#F59E0B] transition-colors shrink-0">
                        {r.type === 'link' || r.type === 'video' ? 'open_in_new' : 'download'}
                      </span>
                    </a>
                  ))
                )}
              </div>
            )}

            {/* TAB: Discussion */}
            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <form onSubmit={submitPost} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-[#1E293B]">Poser une question</h4>
                  <input className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                    placeholder="Titre de votre question…" value={newPost.title}
                    onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} />
                  <textarea rows={3}
                    className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent resize-none"
                    placeholder="Détaillez votre question…" value={newPost.content}
                    onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))} />
                  <button type="submit" disabled={postLoading || !newPost.title.trim()}
                    className="px-5 py-2 bg-[#F59E0B] text-slate-900 font-bold text-sm rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50">
                    {postLoading ? 'Envoi…' : 'Publier'}
                  </button>
                </form>

                {forumPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-5xl text-slate-300">forum</span>
                    <p className="text-slate-400 mt-2 text-sm">Aucune discussion pour ce cours. Soyez le premier !</p>
                  </div>
                ) : (
                  forumPosts.map((post) => (
                    <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-xs font-bold shrink-0">
                          {post.user?.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <span className="text-sm font-semibold text-[#1E293B]">{post.user?.name ?? 'Utilisateur'}</span>
                        <span className="text-xs text-slate-400 ml-auto">{post.created_at ? new Date(post.created_at).toLocaleDateString('fr-FR') : ''}</span>
                      </div>
                      <h5 className="font-bold text-[#1E293B] text-sm mb-1">{post.title}</h5>
                      {post.content && <p className="text-slate-500 text-sm">{post.content}</p>}
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">thumb_up</span>{post.likes ?? 0}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">chat_bubble</span>{post.comments ?? 0}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Right Sidebar ──────────────────────────────────────────────── */}
        {sidebarOpen && (
          <aside className="w-full lg:w-[320px] bg-white text-slate-800 border-l border-slate-200 flex flex-col shrink-0">
            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200 shrink-0">
              <h2 className="text-base font-semibold">Contenu du cours</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-500 hover:text-slate-800">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {pct > 0 && (
              <div className="px-5 py-3 border-b border-slate-100">
                <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
                  <span>Progression</span><span className="font-bold">{pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{progress?.lessons_done ?? 0} / {progress?.lessons_total ?? lessons.length} leçons</p>
              </div>
            )}

            <div className="border-b border-slate-200 shrink-0">
              <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50"
                onClick={() => setSectionOpen((v) => !v)}>
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500">Section 1</p>
                  <p className="text-xs text-slate-600 mt-0.5">{course.subject}</p>
                </div>
                <span className={`material-symbols-outlined text-slate-500 transition-transform ${sectionOpen ? '' : '-rotate-90'}`}>expand_more</span>
              </button>
            </div>

            {sectionOpen && (
              <div className="flex-1 overflow-y-auto py-1">
                {lessons.map((lesson) => {
                  const isCurrent   = currentLesson?.id === lesson.id;
                  const isCompleted = completedIds.has(lesson.id);
                  return (
                    <button key={lesson.id} onClick={() => setCurrentLesson(lesson)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-4 ${isCurrent ? 'border-[#F59E0B] bg-amber-50' : 'border-transparent hover:bg-slate-50'}`}>
                      <div className={`w-14 h-10 rounded-lg flex items-center justify-center shrink-0 ${isCompleted ? 'bg-green-100' : isCurrent ? 'bg-amber-100' : 'bg-slate-100'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isCompleted ? 'text-green-500' : isCurrent ? 'text-[#F59E0B]' : 'text-slate-400'}`}>
                          {isCompleted ? 'check_circle' : 'play_circle'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-snug ${isCurrent ? 'text-slate-800' : 'text-slate-600'}`}>{lesson.title}</p>
                        {lesson.duration && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 13 }}>schedule</span>
                            <span className={`text-[11px] ${isCurrent ? 'text-[#F59E0B] font-medium' : 'text-slate-400'}`}>{lesson.duration}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="shrink-0 p-4 border-t border-slate-200">
              <button onClick={markComplete} disabled={markingDone || !currentLesson || completedIds.has(currentLesson?.id)}
                className="w-full py-3.5 rounded-xl bg-[#0F172A] text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {markingDone ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sauvegarde…</>
                ) : completedIds.has(currentLesson?.id) ? (
                  <><span className="material-symbols-outlined text-green-400 text-sm">check_circle</span> Leçon terminée</>
                ) : (
                  'Marquer comme terminé'
                )}
              </button>
            </div>
          </aside>
        )}
      </main>

      {!sidebarOpen && (
        <button className="fixed right-4 bottom-4 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] text-slate-100 shadow-lg lg:hidden"
          onClick={() => setSidebarOpen(true)}>
          <span className="material-symbols-outlined text-base text-[#F59E0B]">menu_open</span>
          <span className="text-xs font-medium">Contenu</span>
        </button>
      )}
    </div>
  );
};

export default CoursePlayer;
