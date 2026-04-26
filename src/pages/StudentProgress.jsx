import React, { useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const student = {
  name: 'Ahmed Mansour',
  level: 'Advanced Level',
  email: 'ahmed.mansour@example.com',
  plan: 'PRO ANNUAL',
  joined: 'January 12, 2023',
  lastActive: '2 hours ago',
  avatar: '/ahmed-avatar.png',
};

const stats = [
  { label: 'Enrolled Courses', value: 12, icon: '📋' },
  { label: 'Completed Courses', value: 8, icon: '✅' },
  { label: 'Certificates Earned', value: 5, icon: '🏆' },
  { label: 'Forum Posts', value: 24, icon: '💬' },
];

const courses = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    subtitle: 'Software Development • Expert',
    progress: 85,
    engagement: '42/50 Videos',
    engagementDate: 'Oct 24, 2023',
    quizScore: '92%',
    status: 'EARNED',
  },
  {
    id: 2,
    title: 'System Design Fundamentals',
    subtitle: 'Architecture • Intermediate',
    progress: 40,
    engagement: '12/30 Videos',
    engagementDate: 'Nov 12, 2023',
    quizScore: '—',
    status: 'PENDING',
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms',
    subtitle: 'Computer Science • Advanced',
    progress: 70,
    engagement: '35/50 Videos',
    engagementDate: 'Dec 01, 2023',
    quizScore: '78%',
    status: 'PENDING',
  },
];

const certificates = [
  {
    id: 1,
    title: 'UI Design Principles',
    issued: 'Oct 10, 2023',
    certId: 'MN-9821',
  },
  {
    id: 2,
    title: 'Full Stack Fundamentals',
    issued: 'Aug 15, 2023',
    certId: 'MN-7432',
  },
  {
    id: 3,
    title: 'API Development with Node.js',
    issued: 'Jul 02, 2023',
    certId: 'MN-2104',
  },
];

const activities = [
  {
    type: 'Earned Certificate',
    desc: 'Completed "UI Design Principles" with 95% score.',
    time: 'Oct 10, 2023 • 14:20',
  },
  {
    type: 'Passed Quiz',
    desc: 'Achieved 88% on "State Management" quiz.',
    time: 'Oct 05, 2023 • 09:15',
  },
  {
    type: 'Posted in Forum',
    desc: 'Commented on "React Hooks Best Practices".',
    time: 'Sep 28, 2023 • 18:44',
  },
  {
    type: 'Upgraded Plan',
    desc: 'Switched from Monthly to Annual Pro Plan.',
    time: 'Sep 15, 2023 • 11:30',
  },
  {
    type: 'Watched Video',
    desc: '"Introduction to Server Components" (14:30 min)',
    time: 'Sep 12, 2023 • 16:05',
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function downloadCSV() {
  const header = ['Course Title', 'Progress', 'Engagement', 'Quiz Score', 'Status'];
  const rows = courses.map((c) => [
    c.title,
    `${c.progress}%`,
    c.engagement,
    c.quizScore,
    c.status,
  ]);
  const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ahmed-course-progress.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export default function StudentProgress() {
  const [menuOpen, setMenuOpen] = useState(false);

  const accent = '#F59E0B';
  const bg = '#0F172A';
  const sidebar = '#1E293B';
  const card = '#ffffff';
  const cardBorder = '#e2e8f0';
  const textDark = '#0f172a';
  const textMuted = '#64748b';

  /* inline styles so this page is fully self-contained */
  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      fontFamily: "'Lexend', 'Inter', sans-serif",
      color: textDark,
    },
    /* ── NAVBAR ── */
    nav: {
      backgroundColor: bg,
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    },
    navLeft: { display: 'flex', alignItems: 'center', gap: '2.5rem' },
    logo: { display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' },
    logoIcon: {
      width: 36,
      height: 36,
      backgroundColor: accent,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
    },
    logoText: { color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 },
    navLinks: { display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 },
    navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' },
    navLinkActive: { color: '#ffffff', borderBottom: `2px solid ${accent}`, paddingBottom: 2 },
    navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
    searchBox: {
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: 8,
      padding: '0.4rem 0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: 220,
    },
    searchInput: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#94a3b8',
      fontSize: '0.82rem',
      width: '100%',
    },
    avatarCircle: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      backgroundColor: '#64748b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.85rem',
      cursor: 'pointer',
      overflow: 'hidden',
    },
    /* ── MAIN CONTENT ── */
    content: { maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' },
    /* ── PROFILE CARD ── */
    profileCard: {
      backgroundColor: card,
      borderRadius: 16,
      border: `1px solid ${cardBorder}`,
      padding: '1.5rem 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
      flexWrap: 'wrap',
    },
    profileAvatar: {
      width: 90,
      height: 90,
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid #e2e8f0',
      flexShrink: 0,
    },
    profileInfo: { flex: 1, minWidth: 200 },
    profileNameRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' },
    profileName: { fontSize: '1.4rem', fontWeight: 700, color: textDark },
    levelBadge: {
      backgroundColor: '#fef9c3',
      color: '#854d0e',
      fontSize: '0.72rem',
      fontWeight: 600,
      padding: '2px 10px',
      borderRadius: 20,
      border: '1px solid #fde68a',
    },
    profileEmail: { color: textMuted, fontSize: '0.88rem', marginBottom: '0.75rem' },
    profileMeta: { display: 'flex', gap: '2.5rem', flexWrap: 'wrap' },
    profileMetaItem: {},
    metaLabel: { color: textMuted, fontSize: '0.75rem', marginBottom: '2px' },
    metaValue: { fontWeight: 600, fontSize: '0.9rem', color: textDark },
    profileActions: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' },
    editBtn: {
      backgroundColor: accent,
      color: '#000',
      border: 'none',
      borderRadius: 8,
      padding: '0.5rem 1.25rem',
      fontWeight: 600,
      fontSize: '0.88rem',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    },
    dotsBtn: {
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1.1rem',
      color: textMuted,
    },
    onlineDot: {
      width: 10,
      height: 10,
      backgroundColor: '#22c55e',
      borderRadius: '50%',
      border: '2px solid #fff',
      position: 'absolute',
      bottom: 4,
      right: 4,
    },
    avatarWrap: { position: 'relative', flexShrink: 0 },
    /* ── STATS ── */
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    statCard: {
      backgroundColor: card,
      borderRadius: 14,
      border: `1px solid ${cardBorder}`,
      padding: '1.25rem 1.5rem',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    },
    statIcon: { fontSize: '1.5rem', marginBottom: '0.75rem' },
    statLabel: { color: textMuted, fontSize: '0.8rem', marginBottom: '0.25rem' },
    statValue: { fontSize: '2rem', fontWeight: 700, color: textDark },
    /* ── TABLE SECTION ── */
    tableSection: {
      backgroundColor: card,
      borderRadius: 16,
      border: `1px solid ${cardBorder}`,
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    },
    tableSectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.25rem',
    },
    tableTitle: { fontSize: '1rem', fontWeight: 700, color: textDark },
    csvBtn: {
      color: accent,
      background: 'transparent',
      border: 'none',
      fontWeight: 600,
      fontSize: '0.85rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      textAlign: 'left',
      color: textMuted,
      fontSize: '0.72rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      padding: '0.5rem 0.75rem',
      borderBottom: '1px solid #f1f5f9',
    },
    td: {
      padding: '1rem 0.75rem',
      borderBottom: '1px solid #f8fafc',
      verticalAlign: 'middle',
    },
    courseTitle: { fontWeight: 600, fontSize: '0.9rem', color: textDark },
    courseSubtitle: { color: accent, fontSize: '0.75rem', marginTop: 2 },
    progressBarBg: { backgroundColor: '#f1f5f9', borderRadius: 99, height: 6, width: 120, overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 99, backgroundColor: accent },
    progressPct: { fontSize: '0.78rem', fontWeight: 600, color: textDark, marginBottom: 4 },
    engagementText: { fontSize: '0.85rem', fontWeight: 500, color: textDark },
    engagementDate: { color: textMuted, fontSize: '0.75rem' },
    quizScore: { fontWeight: 600, fontSize: '0.9rem' },
    earnedBadge: {
      display: 'inline-block',
      backgroundColor: '#dcfce7',
      color: '#16a34a',
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    pendingBadge: {
      display: 'inline-block',
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    eyeBtn: {
      backgroundColor: '#1e293b',
      border: 'none',
      borderRadius: 8,
      width: 34,
      height: 34,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#94a3b8',
      fontSize: '1rem',
    },
    /* ── BOTTOM GRID ── */
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
    },
    sectionCard: {
      backgroundColor: card,
      borderRadius: 16,
      border: `1px solid ${cardBorder}`,
      padding: '1.5rem',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: 700,
      color: textDark,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.25rem',
    },
    certCard: {
      border: `1px solid ${cardBorder}`,
      borderRadius: 12,
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '0.75rem',
    },
    certTop: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    certIconBox: {
      width: 40,
      height: 40,
      backgroundColor: '#fef9c3',
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      flexShrink: 0,
    },
    certTitle: { fontWeight: 600, fontSize: '0.9rem', color: textDark },
    certMeta: { color: textMuted, fontSize: '0.75rem' },
    viewCertBtn: {
      border: `1px solid ${cardBorder}`,
      backgroundColor: 'transparent',
      color: textDark,
      borderRadius: 8,
      padding: '0.4rem',
      fontSize: '0.78rem',
      fontWeight: 600,
      cursor: 'pointer',
      letterSpacing: '0.03em',
      width: '100%',
      transition: 'background 0.2s',
    },
    /* ── TIMELINE ── */
    timeline: { display: 'flex', flexDirection: 'column', gap: 0 },
    timelineItem: {
      display: 'flex',
      gap: '0.75rem',
      paddingBottom: '1.25rem',
      position: 'relative',
    },
    timelineDotCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 16 },
    timelineDot: { width: 10, height: 10, borderRadius: '50%', backgroundColor: accent, flexShrink: 0, marginTop: 4 },
    timelineLine: { flex: 1, width: 2, backgroundColor: '#e2e8f0', marginTop: 4 },
    timelineType: { fontWeight: 600, fontSize: '0.88rem', color: textDark },
    timelineDesc: { color: textMuted, fontSize: '0.8rem', marginTop: 1 },
    timelineTime: { color: '#94a3b8', fontSize: '0.73rem', marginTop: 3 },
    /* ── FOOTER ── */
    footer: {
      backgroundColor: bg,
      borderTop: '1px solid #1e293b',
      padding: '1.25rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2rem',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    footerLeft: { color: '#64748b', fontSize: '0.8rem' },
    footerLinks: { display: 'flex', gap: '1.5rem' },
    footerLink: { color: '#64748b', fontSize: '0.8rem', textDecoration: 'none', cursor: 'pointer' },
  };

  return (
    <div style={s.page}>
      {/* ── NAVBAR ── */}
      <nav style={s.nav}>
        <div style={s.navLeft}>
          <a href="/" style={s.logo}>
            <div style={s.logoIcon}>🎓</div>
            <span style={s.logoText}>Manara</span>
          </a>
          <ul style={s.navLinks}>
            {['Dashboard', 'Students', 'Courses', 'Reports'].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  style={link === 'Students' ? { ...s.navLink, ...s.navLinkActive } : s.navLink}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div style={s.navRight}>
          <div style={s.searchBox}>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search student ID..."
              style={s.searchInput}
            />
          </div>
          <div style={s.avatarCircle}>
            <img
              src="/ahmed-avatar.png"
              alt="User"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.textContent = 'AM';
              }}
            />
          </div>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div style={s.content}>
        {/* ── PROFILE CARD ── */}
        <div style={s.profileCard}>
          <div style={s.avatarWrap}>
            <img
              src="/ahmed-avatar.png"
              alt="Ahmed Mansour"
              style={s.profileAvatar}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div style={s.onlineDot} />
          </div>
          <div style={s.profileInfo}>
            <div style={s.profileNameRow}>
              <span style={s.profileName}>{student.name}</span>
              <span style={s.levelBadge}>{student.level}</span>
            </div>
            <div style={s.profileEmail}>{student.email}</div>
            <div style={s.profileMeta}>
              <div style={s.profileMetaItem}>
                <div style={s.metaLabel}>Plan</div>
                <div style={s.metaValue}>{student.plan}</div>
              </div>
              <div style={s.profileMetaItem}>
                <div style={s.metaLabel}>Joined</div>
                <div style={s.metaValue}>{student.joined}</div>
              </div>
              <div style={s.profileMetaItem}>
                <div style={s.metaLabel}>Last Active</div>
                <div style={s.metaValue}>{student.lastActive}</div>
              </div>
            </div>
          </div>
          <div style={s.profileActions}>
            <button style={s.editBtn}>Edit Profile</button>
            <button style={s.dotsBtn}>⋯</button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={s.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} style={s.statCard}>
              <div style={s.statIcon}>{stat.icon}</div>
              <div style={s.statLabel}>{stat.label}</div>
              <div style={s.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* ── COURSE PROGRESS TABLE ── */}
        <div style={s.tableSection}>
          <div style={s.tableSectionHeader}>
            <span style={s.tableTitle}>Detailed Course Progress</span>
            <button style={s.csvBtn} onClick={downloadCSV}>
              ⬇ Download CSV
            </button>
          </div>
          <table style={s.table}>
            <thead>
              <tr>
                {['Course Title', 'Progress', 'Engagement', 'Quiz Score', 'Status', 'Action'].map(
                  (h) => (
                    <th key={h} style={s.th}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} style={{ transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={s.td}>
                    <div style={s.courseTitle}>{c.title}</div>
                    <div style={s.courseSubtitle}>{c.subtitle}</div>
                  </td>
                  <td style={s.td}>
                    <div style={s.progressPct}>{c.progress}%</div>
                    <div style={s.progressBarBg}>
                      <div style={{ ...s.progressBarFill, width: `${c.progress}%` }} />
                    </div>
                  </td>
                  <td style={s.td}>
                    <div style={s.engagementText}>{c.engagement}</div>
                    <div style={s.engagementDate}>{c.engagementDate}</div>
                  </td>
                  <td style={{ ...s.td, ...s.quizScore }}>{c.quizScore}</td>
                  <td style={s.td}>
                    <span style={c.status === 'EARNED' ? s.earnedBadge : s.pendingBadge}>
                      {c.status}
                    </span>
                  </td>
                  <td style={s.td}>
                    <button style={s.eyeBtn} title="View details">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── BOTTOM GRID ── */}
        <div style={s.bottomGrid}>
          {/* Certificates */}
          <div style={s.sectionCard}>
            <div style={s.sectionTitle}>
              <span style={{ color: accent }}>🏆</span> Earned Certificates
            </div>
            {certificates.map((cert) => (
              <div key={cert.id} style={s.certCard}>
                <div style={s.certTop}>
                  <div style={s.certIconBox}>🏅</div>
                  <div>
                    <div style={s.certTitle}>{cert.title}</div>
                    <div style={s.certMeta}>
                      Issued: {cert.issued} • ID: {cert.certId}
                    </div>
                  </div>
                </div>
                <button
                  style={s.viewCertBtn}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f1f5f9')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                >
                  VIEW CERTIFICATE
                </button>
              </div>
            ))}
          </div>

          {/* Activity Timeline */}
          <div style={s.sectionCard}>
            <div style={s.sectionTitle}>
              <span style={{ color: accent }}>🔁</span> Recent Activity
            </div>
            <div style={s.timeline}>
              {activities.map((act, i) => (
                <div key={i} style={s.timelineItem}>
                  <div style={s.timelineDotCol}>
                    <div style={s.timelineDot} />
                    {i < activities.length - 1 && <div style={s.timelineLine} />}
                  </div>
                  <div>
                    <div style={s.timelineType}>{act.type}</div>
                    <div style={s.timelineDesc}>{act.desc}</div>
                    <div style={s.timelineTime}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerLeft}>© 2024 Manara Education Management. All rights reserved.</div>
        <div style={s.footerLinks}>
          {['Privacy Policy', 'Terms of Service', 'Support'].map((l) => (
            <a key={l} href="#" style={s.footerLink}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
