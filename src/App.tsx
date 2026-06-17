import React, { useState, useEffect, useRef } from "react";
import { slidesMs, slidesEn } from "./data";
import DefinitionGlossary from "./components/DefinitionGlossary";
import ConsolidatedCalculator from "./components/ConsolidatedCalculator";
import SidebarQuiz from "./components/SidebarQuiz";
import { 
  BookOpen, 
  Award, 
  Building2, 
  Building, 
  Globe, 
  ShieldCheck, 
  BadgeCheck, 
  Users, 
  FileText, 
  Github,
  Sparkles,
  Info,
  Check,
  ChevronRight,
  HelpCircle,
  TrendingDown,
  Compass
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"ms" | "en">("ms");
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeSegment, setActiveSegment] = useState<number>(0);

  // Readability custom tools
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("large");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hoveredBullet, setHoveredBullet] = useState<string | null>(null);

  const slides = lang === "ms" ? slidesMs : slidesEn;

  // Sound effect generator using Web Audio API
  const playClickSound = () => {
    if (!isAudioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio play postponed pending gesture interaction.");
    }
  };

  // Intersection Observer to highlight active section in sticky table of contents
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idStr = entry.target.getAttribute("id");
          if (idStr && idStr.startsWith("slide-sec-")) {
            const index = parseInt(idStr.replace("slide-sec-", ""), 10);
            setActiveSegment(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-25% 0px -65% 0px", // triggers when section dominates middle view
      threshold: 0.1
    });

    const sections = document.querySelectorAll("[id^='slide-sec-']");
    sections.forEach(sec => observer.observe(sec));

    return () => {
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, [slides]);

  const toggleLanguage = () => {
    playClickSound();
    setLang(prev => (prev === "ms" ? "en" : "ms"));
  };

  const scrollToSection = (id: string, idx: number) => {
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveSegment(idx);
    }
  };

  const handleToggleGlossary = () => {
    playClickSound();
    setShowGlossary(!showGlossary);
    if (showQuiz) setShowQuiz(false);
  };

  const handleToggleQuiz = () => {
    playClickSound();
    setShowQuiz(!showQuiz);
    if (showGlossary) setShowGlossary(false);
  };

  // Readability layout metrics
  const getSubTextClass = () => {
    if (fontSize === "xl") return "text-lg md:text-xl font-medium leading-relaxed";
    if (fontSize === "large") return "text-base md:text-lg leading-relaxed";
    return "text-sm md:text-base leading-relaxed";
  };

  const getBulletClass = () => {
    if (fontSize === "xl") return "text-base md:text-lg leading-relaxed";
    if (fontSize === "large") return "text-sm md:text-base leading-relaxed";
    return "text-xs md:text-sm leading-relaxed";
  };

  const isLight = theme === "light";

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans ${
      isLight 
        ? "bg-slate-50 text-slate-900" 
        : "bg-[#070e1b] text-[#eef6ff] app-shell"
    }`}>
      
      {/* 1. Header Area with Accessibility Panel */}
      <header className={`sticky top-0 z-40 transition-all border-b px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 ${
        isLight 
          ? "bg-white/95 border-slate-200/80 shadow-sm backdrop-blur" 
          : "bg-[#081223]/95 border-white/[0.08] shadow-lg backdrop-blur"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold relative overflow-hidden ${isLight ? "bg-cyan-100 text-cyan-700" : "bg-cyan-500/10 text-cyan-400"}`}>
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className={`text-[10px] font-extrabold tracking-widest uppercase ${isLight ? "text-cyan-700" : "text-cyan-300"}`}>
              {lang === "ms" ? "KES STUDI KORPORAT JELAS BACA" : "READABLE CORPORATE CASE STUDY"}
            </div>
            <h1 className={`text-base md:text-lg font-extrabold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
              {lang === "ms" ? "Microsoft × GitHub: Pengambilalihan Korporat & Penyata Kewangan" : "Microsoft x GitHub: Corporate Acquisitions & Financial Reporting"}
            </h1>
          </div>
        </div>

        {/* Global Control Widgets */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Readability Font Adjuster */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-white/10" title={lang === "ms" ? "Ubah Saiz Perenggan" : "Adjust Reading Font Size"}>
            <button
              onClick={() => { playClickSound(); setFontSize("normal"); }}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1 text-xs font-black rounded transition cursor-pointer ${
                fontSize === "normal"
                  ? "bg-cyan-500 text-slate-900 shadow"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-450 dark:hover:text-white"
              }`}
            >
              A
            </button>
            <button
              onClick={() => { playClickSound(); setFontSize("large"); }}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1 text-xs font-black rounded transition cursor-pointer ${
                fontSize === "large"
                  ? "bg-cyan-500 text-slate-900 shadow"
                  : "text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              A+
            </button>
            <button
              onClick={() => { playClickSound(); setFontSize("xl"); }}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1 text-xs font-black rounded transition cursor-pointer ${
                fontSize === "xl"
                  ? "bg-cyan-500 text-slate-900 shadow"
                  : "text-slate-400 hover:text-slate-700 dark:text-slate-405 dark:hover:text-white"
              }`}
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button 
            onClick={() => { playClickSound(); setTheme(prev => prev === 'light' ? 'dark' : 'light'); }}
            style={{ cursor: "pointer" }}
            className={`px-3 py-1.5 rounded-lg border font-bold text-xs select-none transition-colors cursor-pointer flex items-center gap-1.5 ${
              isLight 
                ? "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-850" 
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
            }`}
          >
            {isLight ? (
              <>
                <span>🌙</span>
                <span>{lang === "ms" ? "Tema Malam" : "Dark Mode"}</span>
              </>
            ) : (
              <>
                <span>☀️</span>
                <span>{lang === "ms" ? "Tema Cerah" : "Light Mode"}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            style={{ cursor: "pointer" }}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs select-none transition-all cursor-pointer border flex items-center gap-1.5 ${
              isLight 
                ? "bg-cyan-100 border-cyan-200 text-cyan-700 hover:bg-cyan-100/50" 
                : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "ms" ? "BM" : "EN"}</span>
          </button>
        </div>
      </header>

      {/* Main Single-Scroll Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sticky Roadmap Index Tracker */}
          <aside className="col-span-1 lg:col-span-3 lg:sticky lg:top-28 space-y-4">
            <div className={`p-4 rounded-2xl border transition-colors ${
              isLight ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/60 border-white/10"
            }`}>
              <h3 className={`text-xs font-black tracking-widest uppercase mb-3 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                🧭 {lang === "ms" ? "MODUL PEMBELAJARAN" : "LEARNING BLUEPRINT"}
              </h3>
              
              <div className="space-y-1.5">
                {slides.map((s, idx) => {
                  const isActive = activeSegment === idx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(`slide-sec-${idx}`, idx)}
                      style={{ cursor: "pointer" }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                        isActive 
                          ? "bg-cyan-500 text-slate-900 font-extrabold shadow-md transform translate-x-1" 
                          : (isLight ? "text-slate-705 hover:bg-slate-100" : "text-slate-300 hover:bg-white/5")
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-slate-900" : "bg-cyan-450"}`} />
                      <span className="truncate">{s.kicker}</span>
                    </button>
                  );
                })}
              </div>

              {/* Side Action Buttons to trigger tools */}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5 space-y-2">
                <button
                  onClick={handleToggleGlossary}
                  style={{ cursor: "pointer" }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs select-none transition border cursor-pointer flex items-center justify-between ${
                    showGlossary 
                      ? "bg-cyan-500 border-cyan-400 text-slate-950 font-extrabold" 
                      : `bg-slate-950/90 text-white ${isLight ? "border-slate-300" : "border-white/15"}`
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    {lang === "ms" ? "Glosari Istilah (Pop-up)" : "Interactive Glossary"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleToggleQuiz}
                  style={{ cursor: "pointer" }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs select-none transition border cursor-pointer flex items-center justify-between ${
                    showQuiz 
                      ? "bg-amber-500 border-amber-400 text-slate-950 font-extrabold" 
                      : `bg-slate-950/90 text-white ${isLight ? "border-slate-300" : "border-white/15"}`
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    {lang === "ms" ? "Uji Minda Kuiz (Pop-up)" : "Knowledge Quiz"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Readability Indicator Badge */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isLight 
                ? "bg-cyan-50/70 border-cyan-200 text-cyan-800"
                : "bg-cyan-950/20 border-cyan-500/20 text-cyan-300"
            }`}>
              <div className="font-bold flex items-center gap-1 mb-1">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{lang === "ms" ? "Mod Membaca Aktif" : "Reading Aid Active"}</span>
              </div>
              <p className="opacity-80 font-medium">
                {lang === "ms" 
                  ? "Semua slaid telah disusun secara menegak agar mudah dibaca sekaligus tanpa menolak butang anak panah." 
                  : "All chapters are laid out in a continuous reading stream for absolute clarity without sliding arrows."}
              </p>
            </div>
          </aside>

          {/* Right Column: Beautiful Continuous Presentation Scroll Cards */}
          <main className="col-span-1 lg:col-span-9 space-y-12">
            
            {slides.map((slide, idx) => {
              const slideId = `slide-sec-${idx}`;
              const hasBullets = slide.bullets && slide.bullets.length > 0;
              
              return (
                <section 
                  key={slide.id} 
                  id={slideId}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                    activeSegment === idx 
                      ? (isLight ? "bg-white border-cyan-300 shadow-2xl ring-2 ring-cyan-400/20" : "bg-[#0a162b] border-cyan-500/30 shadow-2xl")
                      : (isLight ? "bg-white border-slate-200 opacity-90 shadow" : "bg-slate-900/50 border-white/5 opacity-80")
                  }`}
                >
                  {/* Slide Marker Badge */}
                  <div className="absolute top-4 right-4 text-xs font-mono font-bold select-none text-slate-400">
                    SLIDE {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Kicker Tag */}
                  <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${isLight ? "text-cyan-800" : "text-cyan-400"}`}>
                    {slide.kicker}
                  </div>

                  {/* Grid Layout to bring together clean text content & its matching visual illustration side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left side in card: Title and bullets */}
                    <div className="md:col-span-7 space-y-4">
                      
                      <h2 className={`font-serif tracking-tight font-extrabold text-2xl md:text-3xl leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>
                        {slide.title}
                      </h2>
                      
                      <p className={`${getSubTextClass()} ${isLight ? "text-slate-600 font-medium" : "text-slate-300"}`}>
                        {slide.subtitle}
                      </p>

                      {hasBullets && (
                        <div className="pt-3 space-y-2.5">
                          {slide.bullets.map((bullet, bIdx) => {
                            const uniqueKey = `${idx}-${bIdx}`;
                            const isFocused = hoveredBullet === uniqueKey;
                            
                            return (
                              <div
                                key={bIdx}
                                onMouseEnter={() => setHoveredBullet(uniqueKey)}
                                onMouseLeave={() => setHoveredBullet(null)}
                                className={`p-3 rounded-xl border transition-all duration-150 flex items-start gap-3 select-none ${
                                  isFocused 
                                    ? (isLight ? "bg-cyan-50 border-cyan-200" : "bg-cyan-950/20 border-cyan-500/20")
                                    : "bg-transparent border-transparent"
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                                  isLight 
                                    ? (isFocused ? "bg-cyan-500 text-white border-cyan-400" : "bg-slate-100 text-slate-600 border-slate-300")
                                    : (isFocused ? "bg-cyan-500 text-slate-900 border-cyan-400" : "bg-slate-800 text-slate-400 border-white/10")
                                }`}>
                                  ✓
                                </div>
                                <p className={`flex-1 font-semibold ${getBulletClass()} ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                                  {bullet}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right side in card: Immersive visual panels embedded directly! */}
                    <div className="md:col-span-5 h-[280px] md:h-auto min-h-[240px]">
                      {idx === 0 && (
                        <div className={`h-full flex flex-col items-center justify-center p-4 border rounded-2xl relative overflow-hidden ${
                          isLight ? "bg-slate-100 border-slate-205" : "bg-black/30 border-white/5"
                        }`}>
                          <div className="relative w-full text-center space-y-3">
                            <div className="flex justify-between items-center px-2">
                              {/* Parent block */}
                              <div className={`p-2 rounded-lg border text-center text-xs font-bold w-5/12 ${
                                isLight ? "bg-white border-slate-200" : "bg-slate-900 border-cyan-500/20"
                              }`}>
                                <Building2 className="w-5 h-5 mx-auto text-cyan-400 mb-1" />
                                <span>Microsoft</span>
                                <div className="text-[8px] tracking-widest text-cyan-500 uppercase">{lang === "ms" ? "INDUK" : "PARENT"}</div>
                              </div>

                              <span className="text-xs text-amber-500 font-extrabold animate-pulse">➡️</span>

                              {/* Subsidiary block */}
                              <div className={`p-2 rounded-lg border text-center text-xs font-bold w-5/12 ${
                                isLight ? "bg-white border-slate-200" : "bg-slate-900 border-indigo-505/20"
                              }`}>
                                <Github className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
                                <span>GitHub</span>
                                <div className="text-[8px] tracking-widest text-indigo-500 uppercase">{lang === "ms" ? "SUBSIDIARI" : "SUBSIDIARY"}</div>
                              </div>
                            </div>

                            <div className={`p-2 rounded-xl border text-center leading-relaxed text-[11px] ${
                              isLight ? "bg-white border-slate-200" : "bg-slate-900/80 border-white/5"
                            }`}>
                              <span className="block text-[8px] tracking-wider text-slate-400 font-semibold">{lang === "ms" ? "TUNAI PERTUKARAN STOCK" : "EQUITY CONVERSION STOCK"}</span>
                              <span className="font-extrabold text-white text-sm bg-[#5c6bc0]/20 px-2 py-0.5 rounded">$7.5 Billion</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 1 && (
                        <div className={`h-full flex flex-col justify-center p-4 border rounded-2xl ${
                          isLight ? "bg-slate-100 border-slate-205" : "bg-black/30 border-white/5"
                        }`}>
                          <div className="space-y-2 text-xs">
                            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-white/10"}`}>
                              <Building2 className="w-4 h-4 text-cyan-400" />
                              <div className="font-semibold text-[11px]">{lang === "ms" ? "Microsoft Inc. (Memiliki Kawalan Majorti)" : "Microsoft Inc. (Holds Voting Interest)"}</div>
                            </div>
                            <div className="w-0.5 h-4 bg-cyan-500 mx-auto" />
                            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-white/10"}`}>
                              <Building className="w-4 h-4 text-indigo-400" />
                              <div className="font-semibold text-[11px]">{lang === "ms" ? "GitHub, LLC (Anak Syarikat / Subsidiari)" : "GitHub, LLC (Daughter Subsidiary)"}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 2 && (
                        <div className={`h-full flex flex-col justify-center p-4 border rounded-2xl space-y-2 ${
                          isLight ? "bg-slate-100 border-slate-205" : "bg-black/30 border-white/5"
                        }`}>
                          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-white/10"}`}>
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <div className="font-semibold text-[11px]">{lang === "ms" ? "Kekal Syarikat Undang-Undang Berdaftar" : "Separate Legal Corporation Status"}</div>
                          </div>
                          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-white/10"}`}>
                            <BadgeCheck className="w-4 h-4 text-cyan-400" />
                            <div className="font-semibold text-[11px]">{lang === "ms" ? "Nama Dagangan & Komuniti Terjamin" : "Independent Brand Community Preserved"}</div>
                          </div>
                          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-white/10"}`}>
                            <Users className="w-4 h-4 text-indigo-400" />
                            <div className="font-semibold text-[11px]">{lang === "ms" ? "Aset Modal Dibiayai Kumpulan Induk" : "Funded via Unified Corporate Group Capital"}</div>
                          </div>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className={`h-full flex flex-col justify-center p-4 border rounded-2xl bg-white text-slate-900 border-slate-300 shadow-sm font-mono`}>
                          <div className="border-b pb-1 flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                              <Github className="w-4 h-4" /> GitHub, LLC
                            </span>
                            <span className="text-[8px] bg-slate-200 px-1.5 py-0.5 rounded font-bold uppercase">{lang === "ms" ? "REKOD SENDIRI" : "LOCAL GENERAL LEDGER"}</span>
                          </div>
                          <div className="space-y-1.5 text-[10px] leading-relaxed">
                            <div className="flex justify-between text-slate-600">
                              <span>{lang === "ms" ? "Jumlah Aliran Masuk:" : "Total Subscriptions:"}</span>
                              <span className="font-bold text-emerald-600">+$125M</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span>{lang === "ms" ? "Kos Penyelenggaraan:" : "Platform Overhead:"}</span>
                              <span className="font-bold text-rose-600">-$92M</span>
                            </div>
                            <div className="flex justify-between text-[#0c2036] font-extrabold border-t pt-1">
                              <span>{lang === "ms" ? "Kedudukan Kunci Bersih:" : "Local Net Asset Yield:"}</span>
                              <span>+$142M</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 4 && (
                        <div className="h-full">
                          {/* Emplaces the simulated financial calculator straight inside the section card */}
                          <ConsolidatedCalculator lang={lang} />
                        </div>
                      )}

                      {idx === 5 && (
                        <div className={`h-full flex flex-col justify-center p-4 border rounded-2xl relative select-none ${
                          isLight ? "bg-slate-100 border-slate-205" : "bg-black/30 border-white/5"
                        }`}>
                          <div className="text-center space-y-3">
                            <div className="inline-block p-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 animate-pulse text-amber-400">
                              <Award className="w-8 h-8 mx-auto" />
                            </div>
                            <div>
                              <h4 className={`text-xs font-bold leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                                {lang === "ms" ? "Uji Impak Kefahaman Anda" : "Check Your Knowledge Growth"}
                              </h4>
                              <p className={`text-[10px] mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                {lang === "ms" ? "Mulakan kuiz penilaian korporat sekarang!" : "Interact with the interactive assessment checklist."}
                              </p>
                            </div>
                            
                            <button
                              onClick={handleToggleQuiz}
                              style={{ cursor: "pointer" }}
                              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 transition-colors shadow-md w-full cursor-pointer inline-flex items-center justify-center gap-1.5"
                            >
                              <Award className="w-4 h-4" />
                              {lang === "ms" ? "Buka Kuiz Penilaian" : "Start Evaluation Quiz"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </section>
              );
            })}

            {/* Bottom Panel Block containing Interactive Glossary directly integrated onto the main page */}
            <section 
              id="glossary-section-block"
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                isLight ? "bg-white border-slate-200 shadow" : "bg-slate-900/40 border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                    📘 {lang === "ms" ? "Glosari Istilah Komprehensif" : "Comprehensive Glossary Database"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === "ms" ? "Penerangan konsep perakaunan dan undang-undang syarikat." : "Standard company reporting and regulatory definitions."}
                  </p>
                </div>
              </div>

              <DefinitionGlossary lang={lang} />
            </section>

          </main>

        </div>
      </div>

      {/* Pop-up Modals for Side drawers */}
      {(showGlossary || showQuiz) && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop Click Close */}
          <div className="absolute inset-0" onClick={() => { setShowGlossary(false); setShowQuiz(false); }} />
          
          <div className="relative w-full max-w-md h-full bg-[#0a1424] border-l border-white/10 shadow-2xl p-5 flex flex-col justify-between z-10">
            {showGlossary && (
              <div className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
                  <h3 className="font-bold text-lg text-white">📘 {lang === "ms" ? "Rujukan Istilah" : "Glossary Directory"}</h3>
                  <button 
                    onClick={() => setShowGlossary(false)} 
                    style={{ cursor: "pointer" }}
                    className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 cursor-pointer"
                  >
                    {lang === "ms" ? "Selesai" : "Done"}
                  </button>
                </div>
                <DefinitionGlossary lang={lang} />
              </div>
            )}

            {showQuiz && (
              <SidebarQuiz lang={lang} onClose={() => setShowQuiz(false)} />
            )}
          </div>
        </div>
      )}

      {/* Simple, Professional Bottom Footer */}
      <footer className={`mt-12 py-10 px-6 border-t text-center text-xs transition-colors ${
        isLight ? "bg-slate-100/60 border-slate-205 text-slate-500" : "bg-[#040913] border-white/5 text-slate-450"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-semibold select-none">
            {lang === "ms" 
              ? "© 2026 Templat Pembelajaran Korporat Microsoft-GitHub. Hak Cipta Terpelihara." 
              : "© 2026 Microsoft-GitHub Corporate Learning Template. All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { playClickSound(); scrollToSection("slide-sec-0", 0); }}
              style={{ cursor: "pointer" }}
              className="hover:underline font-bold cursor-pointer"
            >
              {lang === "ms" ? "Kembali ke Atas" : "Back to Top"}
            </button>
            <span>·</span>
            <button 
              onClick={handleToggleQuiz}
              style={{ cursor: "pointer" }}
              className="hover:underline font-bold cursor-pointer"
            >
              {lang === "ms" ? "Mula Kuiz" : "Start Assessment"}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
