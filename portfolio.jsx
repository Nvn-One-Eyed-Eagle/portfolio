import { useState, useEffect, useRef } from "react";

const DEFAULT_PROJECTS = [
  {
    id: "1",
    name: "AutoSub Generator",
    shortDesc: "Automated subtitle generator using FFmpeg and Python",
    description: "A powerful automation tool that generates accurate subtitles for any video file using FFmpeg and speech recognition. Solves the tedious manual process of transcribing video content by automating the entire pipeline — from audio extraction to SRT file output.",
    techStack: ["Python", "FFmpeg", "SpeechRecognition", "subprocess"],
    problemSolved: "Manual subtitle creation is time-consuming and error-prone. This tool automates the entire process in seconds.",
    keyFeatures: ["Batch process multiple videos", "Auto-detect language and timing"],
    github: "https://github.com/Nvn-One-Eyed-Eagle",
    liveDemo: "",
    images: ["https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80", "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"],
    video: "",
    category: "Automation",
    featured: true,
  },
  {
    id: "2",
    name: "Django Task Manager",
    shortDesc: "Full-stack task management web app built with Django",
    description: "A clean and functional task management application built with Django and Supabase. Features user authentication, task CRUD operations, priority tagging, and deadline tracking. Designed with a focus on real-world usability and clean backend architecture.",
    techStack: ["Python", "Django", "Supabase", "HTML", "CSS", "JavaScript"],
    problemSolved: "Personal project management tools often lack a clean backend. This app demonstrates full Django MVC architecture with cloud database integration.",
    keyFeatures: ["User auth with sessions", "Supabase PostgreSQL backend"],
    github: "https://github.com/Nvn-One-Eyed-Eagle",
    liveDemo: "",
    images: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80", "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80"],
    video: "",
    category: "Web App",
    featured: true,
  },
  {
    id: "3",
    name: "Python Web Scraper",
    shortDesc: "Automated data extraction tool with export capabilities",
    description: "A versatile web scraping toolkit built in Python that extracts structured data from websites and exports to CSV/JSON formats. Features rotating proxies, rate limiting, and dynamic page rendering support via Selenium.",
    techStack: ["Python", "BeautifulSoup", "Selenium", "requests", "pandas"],
    problemSolved: "Manual data collection from websites is inefficient. This scraper automates the process with anti-block measures.",
    keyFeatures: ["Dynamic JS rendering support", "CSV/JSON export pipeline"],
    github: "https://github.com/Nvn-One-Eyed-Eagle",
    liveDemo: "",
    images: ["https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"],
    video: "",
    category: "Automation",
    featured: false,
  }
];

const DEFAULT_SKILLS = {
  Programming: ["Python", "JavaScript"],
  Web: ["HTML", "CSS", "Django", "Flask"],
  Tools: ["Git & GitHub", "VS Code", "FFmpeg", "Supabase"]
};

const STORAGE_KEY = "naveen_portfolio_data";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { projects: DEFAULT_PROJECTS, skills: DEFAULT_SKILLS, resumeUrl: "" };
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}

// ── ICONS ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
    external: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  };
  return icons[name] || null;
};

// ── STYLES ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050a05;
    --bg2: #0a110a;
    --bg3: #0f1a0f;
    --surface: #111c11;
    --surface2: #162016;
    --green: #00ff88;
    --green2: #00cc66;
    --green3: #00ff88aa;
    --green-dim: #00ff8822;
    --green-dim2: #00ff8811;
    --text: #e8f5e8;
    --text2: #9ab89a;
    --text3: #5a7a5a;
    --border: #1a2e1a;
    --border2: #00ff8833;
    --red: #ff4455;
    --yellow: #ffcc00;
    --radius: 4px;
    --radius2: 8px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Syne', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    cursor: none;
  }

  ::selection { background: var(--green); color: var(--bg); }

  /* CUSTOM CURSOR */
  .cursor {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  }
  .cursor-dot {
    width: 8px; height: 8px;
    background: var(--green);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
  }
  .cursor-ring {
    width: 32px; height: 32px;
    border: 1px solid var(--green);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.15s ease;
    opacity: 0.6;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--green2); border-radius: 2px; }

  /* LAYOUT */
  .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    border-bottom: 1px solid var(--border);
    background: #050a05ee;
    backdrop-filter: blur(12px);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 0;
  }
  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    color: var(--green);
    text-decoration: none;
    letter-spacing: 2px;
  }
  .nav-logo span { color: var(--text2); }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--text2);
    text-decoration: none;
    letter-spacing: 1px;
    transition: color 0.2s;
    cursor: none;
  }
  .nav-link:hover { color: var(--green); }
  .nav-btn {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--green);
    border: 1px solid var(--green);
    background: transparent;
    padding: 8px 16px;
    cursor: none;
    letter-spacing: 1px;
    transition: all 0.2s;
  }
  .nav-btn:hover { background: var(--green); color: var(--bg); }
  .nav-mobile-toggle { display: none; background: none; border: none; color: var(--green); cursor: none; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    position: relative; overflow: hidden;
    padding-top: 80px;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.4;
  }
  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, #00ff8815 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--green);
    border: 1px solid var(--border2);
    background: var(--green-dim2);
    padding: 6px 14px;
    letter-spacing: 2px;
    margin-bottom: 28px;
    animation: fadeUp 0.8s ease both;
  }
  .hero-tag::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .hero-name {
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -2px;
    margin-bottom: 16px;
    animation: fadeUp 0.8s 0.1s ease both;
  }
  .hero-name .first { color: var(--text); }
  .hero-name .last { color: var(--green); }
  .hero-subtitle {
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    color: var(--text2);
    margin-bottom: 32px;
    animation: fadeUp 0.8s 0.2s ease both;
  }
  .hero-desc {
    max-width: 520px;
    font-size: 17px;
    color: var(--text2);
    line-height: 1.7;
    margin-bottom: 40px;
    animation: fadeUp 0.8s 0.3s ease both;
  }
  .hero-actions {
    display: flex; gap: 16px; flex-wrap: wrap;
    animation: fadeUp 0.8s 0.4s ease both;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--green);
    color: var(--bg);
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 14px 28px;
    text-decoration: none;
    cursor: none;
    transition: all 0.2s;
    border: none;
  }
  .btn-primary:hover { background: var(--green2); transform: translateY(-2px); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent;
    color: var(--green);
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 13px 28px;
    text-decoration: none;
    cursor: none;
    border: 1px solid var(--border2);
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--green); background: var(--green-dim); }

  /* SECTION */
  section { padding: 100px 0; }
  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--green);
    letter-spacing: 4px;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::after {
    content: '';
    flex: 1; max-width: 60px;
    height: 1px;
    background: var(--green);
  }
  .section-title {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1px;
    margin-bottom: 60px;
  }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .about-text p { color: var(--text2); line-height: 1.8; font-size: 16px; margin-bottom: 20px; }
  .about-stats { display: flex; gap: 40px; margin-top: 32px; }
  .stat-num {
    font-size: 40px; font-weight: 800;
    color: var(--green); line-height: 1;
    font-family: 'Space Mono', monospace;
  }
  .stat-label { font-size: 12px; color: var(--text3); margin-top: 4px; letter-spacing: 1px; }
  .terminal {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius2);
    overflow: hidden;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
  }
  .terminal-bar {
    background: var(--surface);
    padding: 10px 16px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid var(--border);
  }
  .t-dot { width: 10px; height: 10px; border-radius: 50%; }
  .t-red { background: #ff5f57; }
  .t-yellow { background: #febc2e; }
  .t-green { background: #28c840; }
  .terminal-body { padding: 20px; }
  .t-line { margin-bottom: 8px; color: var(--text2); }
  .t-line .prompt { color: var(--green); }
  .t-line .cmd { color: var(--text); }
  .t-line .output { color: var(--text3); }
  .t-line .val { color: var(--green2); }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .skill-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 28px;
    transition: border-color 0.2s;
  }
  .skill-card:hover { border-color: var(--border2); }
  .skill-cat {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--green);
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--text2);
    background: var(--bg);
    border: 1px solid var(--border);
    padding: 5px 12px;
    letter-spacing: 0.5px;
  }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    transition: all 0.3s;
    cursor: none;
    overflow: hidden;
    position: relative;
  }
  .project-card:hover { border-color: var(--green); transform: translateY(-4px); }
  .project-card:hover .project-img { transform: scale(1.05); }
  .project-img-wrap { height: 200px; overflow: hidden; position: relative; }
  .project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .project-img-placeholder {
    width: 100%; height: 100%;
    background: var(--bg3);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--text3);
    letter-spacing: 2px;
  }
  .project-badge {
    position: absolute; top: 12px; right: 12px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 1px;
    padding: 4px 10px;
    background: var(--green);
    color: var(--bg);
    font-weight: 700;
  }
  .project-body { padding: 24px; }
  .project-cat {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--green);
    letter-spacing: 2px;
    margin-bottom: 8px;
  }
  .project-name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 1.2;
  }
  .project-short { font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 16px; }
  .project-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
  .stack-tag {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--text3);
    border: 1px solid var(--border);
    padding: 3px 8px;
  }
  .project-links { display: flex; gap: 12px; }
  .proj-link {
    display: flex; align-items: center; gap: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--text2);
    text-decoration: none;
    transition: color 0.2s;
    cursor: none;
  }
  .proj-link:hover { color: var(--green); }
  .proj-link-btn {
    display: flex; align-items: center; gap: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--green);
    background: none; border: none;
    cursor: none;
    padding: 0;
    margin-left: auto;
    transition: gap 0.2s;
  }
  .proj-link-btn:hover { gap: 10px; }

  /* PROJECT PAGE */
  .proj-page { padding-top: 100px; min-height: 100vh; }
  .proj-hero { padding: 60px 0; border-bottom: 1px solid var(--border); }
  .proj-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--text2);
    background: none; border: none;
    cursor: none;
    margin-bottom: 32px;
    transition: color 0.2s;
    letter-spacing: 1px;
  }
  .proj-back:hover { color: var(--green); }
  .proj-page-title { font-size: clamp(36px, 6vw, 72px); font-weight: 800; letter-spacing: -2px; margin-bottom: 16px; }
  .proj-page-desc { font-size: 17px; color: var(--text2); line-height: 1.8; max-width: 700px; margin-bottom: 32px; }
  .proj-meta { display: flex; flex-wrap: wrap; gap: 32px; }
  .proj-meta-item label { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--text3); letter-spacing: 2px; display: block; margin-bottom: 6px; }
  .proj-images-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 60px 0; }
  .proj-images-grid img { width: 100%; border-radius: var(--radius); border: 1px solid var(--border); }
  .proj-video { margin: 40px 0; }
  .proj-video video { width: 100%; border-radius: var(--radius); border: 1px solid var(--border); }
  .proj-section { margin: 48px 0; padding-top: 48px; border-top: 1px solid var(--border); }
  .proj-section h3 { font-size: 20px; font-weight: 700; margin-bottom: 16px; color: var(--green); }
  .proj-section p { color: var(--text2); line-height: 1.8; }
  .features-list { list-style: none; }
  .features-list li {
    display: flex; align-items: flex-start; gap: 12px;
    color: var(--text2); padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 15px;
  }
  .features-list li::before { content: '▸'; color: var(--green); margin-top: 2px; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .contact-links { display: flex; flex-direction: column; gap: 16px; }
  .contact-link {
    display: flex; align-items: center; gap: 16px;
    padding: 20px 24px;
    border: 1px solid var(--border);
    text-decoration: none;
    color: var(--text2);
    transition: all 0.2s;
    background: var(--surface);
    cursor: none;
  }
  .contact-link:hover { border-color: var(--green); color: var(--green); background: var(--green-dim); }
  .contact-link-label { font-size: 14px; font-weight: 600; }
  .contact-link-sub { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text3); margin-top: 2px; }
  .contact-text h3 { font-size: 28px; font-weight: 800; margin-bottom: 20px; }
  .contact-text p { color: var(--text2); line-height: 1.8; font-size: 16px; }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 32px 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-txt { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text3); }
  .footer-green { color: var(--green); }

  /* ADMIN */
  .admin-overlay {
    position: fixed; inset: 0;
    background: var(--bg);
    z-index: 200;
    overflow-y: auto;
  }
  .admin-header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 20px 32px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }
  .admin-logo { font-family: 'Space Mono', monospace; font-size: 14px; color: var(--green); letter-spacing: 2px; }
  .admin-body { padding: 40px 32px; max-width: 1100px; margin: 0 auto; }
  .admin-tabs { display: flex; gap: 0; margin-bottom: 40px; border-bottom: 1px solid var(--border); }
  .admin-tab {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 1px;
    color: var(--text3);
    background: none; border: none;
    padding: 14px 24px;
    cursor: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;
  }
  .admin-tab.active { color: var(--green); border-bottom-color: var(--green); }
  .admin-tab:hover { color: var(--text); }

  /* FORM */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--green); letter-spacing: 1px; }
  .form-input, .form-textarea, .form-select {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: var(--radius);
    transition: border-color 0.2s;
    outline: none;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--green); }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-hint { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--text3); }
  .btn-green {
    background: var(--green); color: var(--bg);
    font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
    letter-spacing: 1px; border: none; padding: 13px 28px;
    cursor: none; transition: all 0.2s;
  }
  .btn-green:hover { background: var(--green2); }
  .btn-outline {
    background: transparent; color: var(--text2);
    font-family: 'Space Mono', monospace; font-size: 12px;
    letter-spacing: 1px; border: 1px solid var(--border);
    padding: 12px 24px; cursor: none; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--text2); color: var(--text); }
  .btn-danger {
    background: transparent; color: var(--red);
    font-family: 'Space Mono', monospace; font-size: 11px;
    border: 1px solid #ff445533; padding: 8px 16px;
    cursor: none; transition: all 0.2s;
  }
  .btn-danger:hover { background: #ff44550f; border-color: var(--red); }
  
  /* Admin Project List */
  .admin-proj-list { display: flex; flex-direction: column; gap: 16px; }
  .admin-proj-item {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 20px 24px;
    display: flex; align-items: center; gap: 20px;
  }
  .admin-proj-thumb { width: 72px; height: 48px; object-fit: cover; border-radius: var(--radius); border: 1px solid var(--border); flex-shrink: 0; }
  .admin-proj-thumb-ph { width: 72px; height: 48px; background: var(--bg3); border: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--text3); }
  .admin-proj-info { flex: 1; }
  .admin-proj-name { font-size: 15px; font-weight: 600; }
  .admin-proj-meta { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text3); margin-top: 3px; }
  .admin-proj-actions { display: flex; gap: 8px; }

  /* Login */
  .login-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg);
  }
  .login-box {
    width: 380px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 48px 40px;
  }
  .login-title { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
  .login-sub { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text3); margin-bottom: 36px; letter-spacing: 1px; }
  .login-error { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--red); margin-bottom: 16px; }

  /* MOBILE */
  @media(max-width:768px) {
    .nav-links { display: none; }
    .nav-links.open { display: flex; flex-direction: column; position: fixed; inset: 0; background: var(--bg); justify-content: center; align-items: center; gap: 32px; z-index: 99; }
    .nav-mobile-toggle { display: flex; z-index: 100; }
    .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .skills-grid { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .proj-images-grid { grid-template-columns: 1fr; }
    .about-stats { gap: 24px; }
    .form-grid { grid-template-columns: 1fr; }
    .admin-body { padding: 24px 16px; }
  }

  /* ANIMATIONS */
  .fade-in { animation: fadeIn 0.6s ease both; }
  .slide-in { animation: fadeUp 0.6s ease both; }
`;

// ── CURSOR COMPONENT ────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const move = e => {
      if(dotRef.current) { dotRef.current.style.left = e.clientX+'px'; dotRef.current.style.top = e.clientY+'px'; }
      if(ringRef.current) { ringRef.current.style.left = e.clientX+'px'; ringRef.current.style.top = e.clientY+'px'; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor cursor-dot" style={{position:'fixed',pointerEvents:'none',zIndex:9999}} />
      <div ref={ringRef} className="cursor cursor-ring" style={{position:'fixed',pointerEvents:'none',zIndex:9998}} />
    </>
  );
}

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ onAdminClick, resumeUrl }) {
  const [open, setOpen] = useState(false);
  const links = ["about","projects","skills","contact"];
  return (
    <nav>
      <div className="container">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={()=>setOpen(false)}>NP<span>.</span></a>
          <div className={`nav-links ${open?'open':''}`}>
            {links.map(l=>(
              <a key={l} className="nav-link" href={`#${l}`} onClick={()=>setOpen(false)}>{l}</a>
            ))}
            {resumeUrl && <a href={resumeUrl} target="_blank" rel="noopener" className="nav-link" onClick={()=>setOpen(false)}>resume</a>}
            <button className="nav-btn" onClick={()=>{setOpen(false);onAdminClick();}}>admin</button>
          </div>
          <button className="nav-mobile-toggle" onClick={()=>setOpen(!open)}>
            {open ? <Icon name="close" size={22}/> : <Icon name="menu" size={22}/>}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ resumeUrl }) {
  return (
    <section className="hero" id="home">
      <div className="hero-grid"/>
      <div className="hero-glow"/>
      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">AVAILABLE FOR PROJECTS</div>
          <h1 className="hero-name">
            <div className="first">Naveen</div>
            <div className="last">Phartyal.</div>
          </h1>
          <p className="hero-subtitle">
            First-Year CS Student &nbsp;·&nbsp; Python Developer &nbsp;·&nbsp; Aspiring Backend Engineer
          </p>
          <p className="hero-desc">
            I build practical Python and web projects with a focus on clean code and real-world functionality. From automation tools to full-stack Django apps — I ship things that work.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Projects <Icon name="arrow" size={16}/></a>
            {resumeUrl
              ? <a href={resumeUrl} target="_blank" rel="noopener" className="btn-secondary"><Icon name="download" size={16}/> Resume</a>
              : <a href="#contact" className="btn-secondary">Get In Touch</a>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Building real things<br/><span style={{color:'var(--green)'}}>from day one.</span></h2>
            <p>I'm a first-year Computer Science student who doesn't wait to start building. While most are learning the basics, I'm already shipping projects — automation tools, web apps, and backend systems that solve real problems.</p>
            <p>My focus is Python and backend development. I love the challenge of making systems that are efficient, scalable, and actually useful. Django, Flask, Supabase — I work with what gets the job done right.</p>
            <p>Technical interests span Python, Django, web applications, and automation. My goal: building scalable backend systems that handle real-world load.</p>
            <div className="about-stats">
              <div><div className="stat-num">3+</div><div className="stat-label">PROJECTS BUILT</div></div>
              <div><div className="stat-num">1st</div><div className="stat-label">YEAR CS STUDENT</div></div>
              <div><div className="stat-num">∞</div><div className="stat-label">THINGS TO LEARN</div></div>
            </div>
          </div>
          <div className="terminal">
            <div className="terminal-bar">
              <div className="t-dot t-red"/><div className="t-dot t-yellow"/><div className="t-dot t-green"/>
              <span style={{marginLeft:8,fontSize:11,color:'var(--text3)',fontFamily:'Space Mono'}}>naveen.py</span>
            </div>
            <div className="terminal-body">
              {[
                ['$','python naveen.py',''],
                ['','',''],
                ['>>>','name','= "Naveen Phartyal"'],
                ['>>>','role','= "Backend Developer"'],
                ['>>>','stack','= ["Python","Django","Flask"]'],
                ['>>>','db','= ["Supabase","PostgreSQL"]'],
                ['>>>','tools','= ["Git","FFmpeg","VS Code"]'],
                ['>>>','goal','= "Scalable Web Systems"'],
                ['>>>','status','= "Building & Learning"'],
                ['','',''],
                ['>>>','print(naveen.building)',''],
                ['','','→ AutoSub, TaskManager...'],
              ].map(([p,c,v],i) => (
                <div key={i} className="t-line">
                  {p && <span className="prompt">{p} </span>}
                  {c && <span className="cmd">{c}</span>}
                  {v && <span className="val"> {v}</span>}
                  {!p && !c && <span className="output">{v}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ───────────────────────────────────────────────────────────────────
function Skills({ skills }) {
  return (
    <section id="skills" style={{background:'var(--bg2)'}}>
      <div className="container">
        <div className="section-label">03 / SKILLS</div>
        <h2 className="section-title">Tech I work with.</h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([cat, tags]) => (
            <div key={cat} className="skill-card">
              <div className="skill-cat">{cat.toUpperCase()}</div>
              <div className="skill-tags">
                {tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS LIST ─────────────────────────────────────────────────────────────
function Projects({ projects, onView }) {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-label">02 / PROJECTS</div>
        <h2 className="section-title">Things I've <span style={{color:'var(--green)'}}>built.</span></h2>
        {projects.length === 0
          ? <div style={{textAlign:'center',color:'var(--text3)',fontFamily:'Space Mono',fontSize:13,padding:'60px 0'}}>No projects yet. Add them via admin panel.</div>
          : <div className="projects-grid">
              {projects.map(p => (
                <div key={p.id} className="project-card" onClick={() => onView(p.id)}>
                  <div className="project-img-wrap">
                    {p.images && p.images[0]
                      ? <img className="project-img" src={p.images[0]} alt={p.name} onError={e=>e.target.style.display='none'}/>
                      : <div className="project-img-placeholder">[ IMAGE ]</div>
                    }
                    {p.featured && <div className="project-badge">FEATURED</div>}
                  </div>
                  <div className="project-body">
                    <div className="project-cat">{p.category || 'PROJECT'}</div>
                    <h3 className="project-name">{p.name}</h3>
                    <p className="project-short">{p.shortDesc}</p>
                    <div className="project-stack">
                      {(p.techStack||[]).map(t => <span key={t} className="stack-tag">{t}</span>)}
                    </div>
                    <div className="project-links">
                      {p.github && <a className="proj-link" href={p.github} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()}><Icon name="github" size={14}/> GitHub</a>}
                      {p.liveDemo && <a className="proj-link" href={p.liveDemo} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()}><Icon name="external" size={14}/> Live</a>}
                      <button className="proj-link-btn">Details <Icon name="arrow" size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </section>
  );
}

// ── PROJECT PAGE ──────────────────────────────────────────────────────────────
function ProjectPage({ project, onBack }) {
  const [imgIdx, setImgIdx] = useState(0);
  if (!project) return null;
  const imgs = project.images || [];
  return (
    <div className="proj-page">
      <div className="container">
        <div className="proj-hero">
          <button className="proj-back" onClick={onBack}><Icon name="back" size={16}/> Back to Projects</button>
          <div className="project-cat">{project.category || 'PROJECT'}</div>
          <h1 className="proj-page-title">{project.name}</h1>
          <p className="proj-page-desc">{project.description || project.shortDesc}</p>
          <div className="proj-meta">
            {project.techStack?.length > 0 && (
              <div className="proj-meta-item">
                <label>TECH STACK</label>
                <div className="project-stack">{project.techStack.map(t=><span key={t} className="stack-tag">{t}</span>)}</div>
              </div>
            )}
            {project.github && (
              <div className="proj-meta-item">
                <label>GITHUB</label>
                <a href={project.github} target="_blank" rel="noopener" className="proj-link"><Icon name="github" size={14}/> View Code</a>
              </div>
            )}
            {project.liveDemo && (
              <div className="proj-meta-item">
                <label>LIVE DEMO</label>
                <a href={project.liveDemo} target="_blank" rel="noopener" className="proj-link"><Icon name="external" size={14}/> Open App</a>
              </div>
            )}
          </div>
        </div>

        {imgs.length > 0 && (
          <div style={{marginTop:48}}>
            <div style={{marginBottom:16}}>
              <img src={imgs[imgIdx]} alt={project.name} style={{width:'100%',maxHeight:480,objectFit:'cover',border:'1px solid var(--border)',borderRadius:'var(--radius)'}} onError={e=>e.target.style.display='none'}/>
            </div>
            {imgs.length > 1 && (
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {imgs.map((img,i) => (
                  <div key={i} onClick={()=>setImgIdx(i)} style={{width:80,height:52,overflow:'hidden',border:`1px solid ${i===imgIdx?'var(--green)':'var(--border)'}`,cursor:'none',borderRadius:'var(--radius)',flexShrink:0}}>
                    <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>e.target.style.display='none'}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {project.video && (
          <div className="proj-video">
            <video controls><source src={project.video}/></video>
          </div>
        )}

        {project.problemSolved && (
          <div className="proj-section">
            <h3>Problem Solved</h3>
            <p>{project.problemSolved}</p>
          </div>
        )}

        {project.keyFeatures?.length > 0 && (
          <div className="proj-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {project.keyFeatures.map((f,i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}

        <div style={{padding:'48px 0'}}>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            {project.github && <a href={project.github} target="_blank" rel="noopener" className="btn-primary"><Icon name="github" size={16}/> View on GitHub</a>}
            {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener" className="btn-secondary"><Icon name="external" size={16}/> Live Demo</a>}
            <button onClick={onBack} className="btn-outline"><Icon name="back" size={14}/> Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{background:'var(--bg2)'}}>
      <div className="container">
        <div className="section-label">04 / CONTACT</div>
        <div className="contact-grid">
          <div className="contact-text">
            <h2 className="section-title">Let's build<br/><span style={{color:'var(--green)'}}>something.</span></h2>
            <p>Open to collaborations, internships, freelance projects, and anything interesting. If you want to work together or just talk Python — reach out.</p>
          </div>
          <div className="contact-links">
            {[
              {icon:'mail',label:'Email',sub:'naveen.phartyal2023@gmail.com',href:'mailto:naveen.phartyal2023@gmail.com'},
              {icon:'github',label:'GitHub',sub:'Nvn-One-Eyed-Eagle',href:'https://github.com/Nvn-One-Eyed-Eagle'},
              {icon:'linkedin',label:'LinkedIn',sub:'naveen-phartyal',href:'https://www.linkedin.com/in/naveen-phartyal-0ba3a3377/'},
            ].map(c => (
              <a key={c.label} className="contact-link" href={c.href} target="_blank" rel="noopener">
                <Icon name={c.icon} size={20}/>
                <div>
                  <div className="contact-link-label">{c.label}</div>
                  <div className="contact-link-sub">{c.sub}</div>
                </div>
                <Icon name="arrow" size={14} style={{marginLeft:'auto'}}/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const handle = () => {
    if (pass === 'naveen2024') { onLogin(); setErr(''); }
    else setErr('Incorrect password.');
  };
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div style={{color:'var(--green)',marginBottom:20}}><Icon name="lock" size={32}/></div>
        <h2 className="login-title">Admin Panel</h2>
        <p className="login-sub">DEFAULT PASSWORD: naveen2024</p>
        {err && <div className="login-error">{err}</div>}
        <div className="form-group" style={{marginBottom:20}}>
          <label className="form-label">PASSWORD</label>
          <input className="form-input" type="password" value={pass} onChange={e=>setPass(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&handle()} placeholder="Enter password" autoFocus/>
        </div>
        <button className="btn-green" style={{width:'100%'}} onClick={handle}>Unlock Admin →</button>
      </div>
    </div>
  );
}

// ── PROJECT FORM ──────────────────────────────────────────────────────────────
const EMPTY_PROJECT = {name:'',shortDesc:'',description:'',techStack:[],problemSolved:'',keyFeatures:[],github:'',liveDemo:'',images:[],video:'',category:'Web App',featured:false};

function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_PROJECT);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const arrChange = (k,v) => set(k, v.split('\n').filter(x=>x.trim()));
  const submit = () => {
    if (!form.name.trim()) return alert('Project name required.');
    onSave({...form, id: form.id || Date.now().toString()});
  };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
        <h2 style={{fontSize:24,fontWeight:800}}>{form.id ? 'Edit Project' : 'Add New Project'}</h2>
        <button className="btn-outline" onClick={onCancel}>Cancel</button>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">PROJECT NAME *</label>
          <input className="form-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="My Awesome Project"/>
        </div>
        <div className="form-group">
          <label className="form-label">CATEGORY</label>
          <select className="form-select" value={form.category} onChange={e=>set('category',e.target.value)}>
            {['Web App','Automation','Backend','CLI Tool','API','Other'].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group full">
          <label className="form-label">SHORT DESCRIPTION</label>
          <input className="form-input" value={form.shortDesc} onChange={e=>set('shortDesc',e.target.value)} placeholder="One-line summary shown on cards"/>
        </div>
        <div className="form-group full">
          <label className="form-label">FULL DESCRIPTION</label>
          <textarea className="form-textarea" style={{minHeight:120}} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Detailed description for the project page..."/>
        </div>
        <div className="form-group">
          <label className="form-label">TECH STACK</label>
          <textarea className="form-textarea" style={{minHeight:80}} value={(form.techStack||[]).join('\n')} onChange={e=>arrChange('techStack',e.target.value)} placeholder="Python&#10;Django&#10;Supabase"/>
          <span className="form-hint">One per line</span>
        </div>
        <div className="form-group">
          <label className="form-label">KEY FEATURES</label>
          <textarea className="form-textarea" style={{minHeight:80}} value={(form.keyFeatures||[]).join('\n')} onChange={e=>arrChange('keyFeatures',e.target.value)} placeholder="User authentication&#10;Batch processing"/>
          <span className="form-hint">One per line</span>
        </div>
        <div className="form-group full">
          <label className="form-label">PROBLEM SOLVED</label>
          <textarea className="form-textarea" value={form.problemSolved} onChange={e=>set('problemSolved',e.target.value)} placeholder="What real-world problem does this solve?"/>
        </div>
        <div className="form-group">
          <label className="form-label">GITHUB URL</label>
          <input className="form-input" value={form.github} onChange={e=>set('github',e.target.value)} placeholder="https://github.com/..."/>
        </div>
        <div className="form-group">
          <label className="form-label">LIVE DEMO URL</label>
          <input className="form-input" value={form.liveDemo} onChange={e=>set('liveDemo',e.target.value)} placeholder="https://myapp.com (optional)"/>
        </div>
        <div className="form-group full">
          <label className="form-label">IMAGE URLS</label>
          <textarea className="form-textarea" value={(form.images||[]).join('\n')} onChange={e=>arrChange('images',e.target.value)} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"/>
          <span className="form-hint">One URL per line. Replace dummy URLs with your actual project screenshots.</span>
        </div>
        <div className="form-group full">
          <label className="form-label">VIDEO URL (optional)</label>
          <input className="form-input" value={form.video} onChange={e=>set('video',e.target.value)} placeholder="https://example.com/demo.mp4"/>
        </div>
        <div className="form-group">
          <label className="form-label">FEATURED PROJECT</label>
          <label style={{display:'flex',alignItems:'center',gap:10,cursor:'none',fontSize:14,color:'var(--text2)'}}>
            <input type="checkbox" checked={form.featured} onChange={e=>set('featured',e.target.checked)} style={{accentColor:'var(--green)',width:16,height:16}}/>
            Show as featured on portfolio
          </label>
        </div>
      </div>
      <div style={{display:'flex',gap:12,marginTop:32}}>
        <button className="btn-green" onClick={submit}>Save Project</button>
        <button className="btn-outline" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ data, onSave, onClose }) {
  const [tab, setTab] = useState('projects');
  const [editing, setEditing] = useState(null); // null | 'new' | project object
  const [projects, setProjects] = useState(data.projects);
  const [skills, setSkills] = useState(data.skills);
  const [resumeUrl, setResumeUrl] = useState(data.resumeUrl || '');
  const [authed, setAuthed] = useState(false);

  const persist = (updates) => {
    const next = {...data, projects, skills, resumeUrl, ...updates};
    onSave(next);
  };

  const saveProject = (proj) => {
    let next;
    if (projects.find(p=>p.id===proj.id)) {
      next = projects.map(p=>p.id===proj.id?proj:p);
    } else {
      next = [...projects, proj];
    }
    setProjects(next);
    persist({projects: next});
    setEditing(null);
  };

  const deleteProject = (id) => {
    if (!confirm('Delete this project?')) return;
    const next = projects.filter(p=>p.id!==id);
    setProjects(next);
    persist({projects: next});
  };

  const saveSkills = () => persist({skills});
  const saveResume = () => persist({resumeUrl});

  if (!authed) return <div className="admin-overlay"><AdminLogin onLogin={()=>setAuthed(true)}/></div>;

  return (
    <div className="admin-overlay">
      <div className="admin-header">
        <span className="admin-logo">⬡ ADMIN PANEL</span>
        <button className="btn-outline" style={{fontSize:11}} onClick={onClose}>← Back to Portfolio</button>
      </div>
      <div className="admin-body">
        {!editing && (
          <>
            <div className="admin-tabs">
              {[['projects','Projects'],['skills','Skills'],['resume','Resume']].map(([k,l])=>(
                <button key={k} className={`admin-tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>{l}</button>
              ))}
            </div>

            {tab === 'projects' && (
              <div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
                  <h2 style={{fontSize:22,fontWeight:800}}>Projects <span style={{color:'var(--text3)',fontSize:14,fontWeight:400}}>({projects.length})</span></h2>
                  <button className="btn-green" onClick={()=>setEditing('new')}><span style={{display:'flex',alignItems:'center',gap:8}}><Icon name="plus" size={14}/> Add Project</span></button>
                </div>
                <div className="admin-proj-list">
                  {projects.map(p => (
                    <div key={p.id} className="admin-proj-item">
                      {p.images?.[0]
                        ? <img className="admin-proj-thumb" src={p.images[0]} alt={p.name} onError={e=>e.target.style.display='none'}/>
                        : <div className="admin-proj-thumb-ph">IMG</div>
                      }
                      <div className="admin-proj-info">
                        <div className="admin-proj-name">{p.name}</div>
                        <div className="admin-proj-meta">{p.category} · {(p.techStack||[]).slice(0,3).join(', ')}{p.featured?' · ★ FEATURED':''}</div>
                      </div>
                      <div className="admin-proj-actions">
                        <button className="btn-outline" style={{fontSize:11,display:'flex',gap:6,alignItems:'center'}} onClick={()=>setEditing(p)}><Icon name="edit" size={13}/> Edit</button>
                        <button className="btn-danger" style={{display:'flex',gap:6,alignItems:'center'}} onClick={()=>deleteProject(p.id)}><Icon name="trash" size={13}/> Delete</button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && <div style={{textAlign:'center',padding:'60px 0',color:'var(--text3)',fontFamily:'Space Mono',fontSize:12}}>No projects yet. Add your first one!</div>}
                </div>
              </div>
            )}

            {tab === 'skills' && (
              <div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:28}}>Skills</h2>
                {Object.entries(skills).map(([cat, tags]) => (
                  <div key={cat} className="form-group" style={{marginBottom:20}}>
                    <label className="form-label">{cat.toUpperCase()}</label>
                    <div style={{display:'flex',gap:8}}>
                      <textarea className="form-textarea" style={{minHeight:60,flex:1}}
                        value={tags.join(', ')}
                        onChange={e=>setSkills(s=>({...s,[cat]:e.target.value.split(',').map(x=>x.trim()).filter(Boolean)}))}/>
                    </div>
                    <span className="form-hint">Comma separated</span>
                  </div>
                ))}
                <div style={{marginTop:16,marginBottom:20}}>
                  <label className="form-label" style={{marginBottom:8,display:'block'}}>ADD NEW CATEGORY</label>
                  <div style={{display:'flex',gap:8}}>
                    <input className="form-input" id="newCat" placeholder="Category name" style={{maxWidth:200}}/>
                    <button className="btn-outline" onClick={()=>{
                      const el = document.getElementById('newCat');
                      const v = el.value.trim();
                      if(v && !skills[v]) { setSkills(s=>({...s,[v]:[]})); el.value=''; }
                    }}>Add Category</button>
                  </div>
                </div>
                <button className="btn-green" onClick={saveSkills}>Save Skills</button>
              </div>
            )}

            {tab === 'resume' && (
              <div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:28}}>Resume</h2>
                <div className="form-group" style={{marginBottom:24,maxWidth:600}}>
                  <label className="form-label">RESUME URL</label>
                  <input className="form-input" value={resumeUrl} onChange={e=>setResumeUrl(e.target.value)} placeholder="https://drive.google.com/file/d/..."/>
                  <span className="form-hint">Upload your resume to Google Drive, Dropbox, or any hosting service and paste the public link here. It will appear as a download button in the nav.</span>
                </div>
                <button className="btn-green" onClick={saveResume}>Save Resume URL</button>
              </div>
            )}
          </>
        )}

        {editing && (
          <ProjectForm
            initial={editing === 'new' ? null : editing}
            onSave={saveProject}
            onCancel={()=>setEditing(null)}
          />
        )}
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="container">
      <footer>
        <span className="footer-txt">© 2024 <span className="footer-green">Naveen Phartyal</span> — Built with React</span>
        <span className="footer-txt">Python · Django · Supabase</span>
      </footer>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(() => loadData());
  const [viewProject, setViewProject] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleSave = (newData) => {
    setData(newData);
    saveData(newData);
  };

  const project = data.projects.find(p=>p.id===viewProject);

  return (
    <>
      <style>{css}</style>
      <Cursor/>

      {showAdmin
        ? <AdminPanel data={data} onSave={handleSave} onClose={()=>setShowAdmin(false)}/>
        : <>
            <Nav onAdminClick={()=>setShowAdmin(true)} resumeUrl={data.resumeUrl}/>
            {viewProject && project
              ? <ProjectPage project={project} onBack={()=>setViewProject(null)}/>
              : <>
                  <Hero resumeUrl={data.resumeUrl}/>
                  <About/>
                  <Projects projects={data.projects} onView={setViewProject}/>
                  <Skills skills={data.skills}/>
                  <Contact/>
                </>
            }
            <Footer/>
          </>
      }
    </>
  );
}
