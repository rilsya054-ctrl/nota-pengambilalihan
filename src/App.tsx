import React, { useState, useEffect, useRef } from "react";
import { slidesMs, slidesEn } from "./data";
import DefinitionGlossary from "./components/DefinitionGlossary";
import ConsolidatedCalculator from "./components/ConsolidatedCalculator";
import SidebarQuiz from "./components/SidebarQuiz";
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
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
  GitBranch, 
  Sparkles,
  Info 
} from "lucide-react";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [lang, setLang] = useState<"ms" | "en">("ms");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [interactiveCard, setInteractiveCard] = useState<number | null>(null);
  
  // Accessibility & High Readability Settings
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hoveredBullet, setHoveredBullet] = useState<number | null>(null);

  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slides = lang === "ms" ? slidesMs : slidesEn;

  // Reset interactive state when slide changes
  useEffect(() => {
    setInteractiveCard(null);
  }, [currentSlide]);

  // Web Audio API for premium UI touch sound effects
  const playClickSound = () => {
    if (!isAudioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(450, audioCtx.currentTime); // Quick subtle chime pitch
      oscillator.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.12);
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.log("Audio contexts pending interaction restrictions.");
    }
  };

  // Slideshow Autoplay mechanism
  useEffect(() => {
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false); // Stop at end of rotation
            return prev;
          }
        });
      }, 6500); // 6.5 Sec per slide
    } else {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  // Global key bindings for slide navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length]);

  const handleNext = () => {
    playClickSound();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleGoTo = (idx: number) => {
    playClickSound();
    setCurrentSlide(idx);
  };

  const toggleLanguage = () => {
    playClickSound();
    setLang(prev => (prev === "ms" ? "en" : "ms"));
  };

  const togglePlay = () => {
    playClickSound();
    setIsPlaying(!isPlaying);
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

  // Readability style mappers
  const getTitleSizeClass = () => {
    if (fontSize === "xl") return "text-3xl md:text-4xl lg:text-5xl font-extrabold font-serif leading-tight";
    if (fontSize === "large") return "text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif leading-snug";
    return "text-xl md:text-2xl lg:text-3xl font-bold font-serif leading-snug";
  };

  const getSubtitleSizeClass = () => {
    if (fontSize === "xl") return "text-lg md:text-xl font-medium leading-relaxed";
    if (fontSize === "large") return "text-base md:text-lg leading-relaxed";
    return "text-sm md:text-base leading-relaxed";
  };

  const getBulletSizeClass = () => {
    if (fontSize === "xl") return "text-base md:text-lg leading-relaxed";
    if (fontSize === "large") return "text-sm md:text-base leading-relaxed";
    return "text-xs md:text-sm leading-relaxed";
  };

  const renderVisualPanel = () => {
    const isLight = theme === "light";
    
    switch (currentSlide) {
      case 0: // Slide 1: Welcome/Intro
        return (
          <div className={`relative h-full flex flex-col items-center justify-center p-6 rounded-3xl border overflow-hidden transition-all duration-305 ${
            isLight 
              ? "bg-[#f1f5f9] border-slate-200 text-slate-100 shadow-inner" 
              : "bg-slate-950/40 border-white/5 text-white"
          }`}>
            <div className={`absolute inset-0 pointer-events-none opacity-40 ${isLight ? "bg-radial-gradient from-cyan-400/20 to-transparent" : "bg-radial-gradient from-cyan-500/10 to-transparent"}`} />
            
            <div className="flex flex-col items-center gap-6 z-10 w-full max-w-md">
              <div className="relative w-full flex items-center justify-between gap-4">
                {/* Parent Block */}
                <div className={`flex flex-col items-center gap-2 p-4 border rounded-2xl w-2/5 shadow-md transition-colors ${
                  isLight 
                    ? "bg-white border-cyan-200 text-slate-900" 
                    : "bg-slate-900/90 border-cyan-500/30 text-slate-100"
                }`}>
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isLight ? "bg-cyan-100 text-cyan-700" : "bg-cyan-500/10 text-cyan-400"}`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-wide text-center">Microsoft</span>
                  <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded ${isLight ? "bg-cyan-100/70 text-cyan-800" : "bg-cyan-950/40 text-cyan-400"}`}>
                    {lang === "ms" ? "INDUK" : "PARENT"}
                  </span>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex flex-col items-center select-none">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center animate-bounce transition-colors ${
                    isLight ? "bg-white border-slate-200 text-cyan-600" : "bg-slate-800 border-white/10 text-amber-400"
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-widest text-center ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {lang === "ms" ? "Membeli" : "Acquires"}
                  </span>
                </div>

                {/* Subsidiary Block */}
                <div className={`flex flex-col items-center gap-2 p-4 border rounded-2xl w-2/5 shadow-md transition-colors ${
                  isLight 
                    ? "bg-white border-indigo-200 text-slate-900" 
                    : "bg-slate-900/90 border-indigo-500/30 text-slate-100"
                }`}>
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isLight ? "bg-indigo-100 text-indigo-700" : "bg-indigo-500/10 text-indigo-400"}`}>
                    <Github className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-wide text-center">GitHub</span>
                  <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded ${isLight ? "bg-indigo-100/70 text-indigo-800" : "bg-indigo-950/40 text-indigo-400"}`}>
                    {lang === "ms" ? "ANAK" : "SUBSIDIARY"}
                  </span>
                </div>
              </div>

              {/* Deal stats widget */}
              <div className={`w-full p-4 border rounded-2xl text-center space-y-1 transition-colors ${isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10"}`}>
                <span className={`text-[10px] font-bold uppercase tracking-widest block ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  {lang === "ms" ? "NILAI URUS NIAGA (2018)" : "ACQUISITION VALUE (2018)"}
                </span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                  $7.5 BILLION
                </span>
                <span className={`text-[11px] block ${isLight ? "text-slate-600 font-medium" : "text-slate-350"}`}>
                  {lang === "ms" ? "Diselesaikan dengan pertukaran saham Microsoft " : "Settled fully via Microsoft stock translation"}
                </span>
              </div>
            </div>
          </div>
        );

      case 1: // Slide 2: Hierarchy Diagram
        return (
          <div className={`relative h-full flex flex-col justify-center p-6 rounded-3xl border overflow-hidden transition-all duration-300 ${
            isLight ? "bg-[#f1f5f9] border-slate-200" : "bg-slate-950/40 border-white/5"
          }`}>
            <div className="space-y-3 max-w-md mx-auto w-full z-10">
              <div className={`text-center text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                {lang === "ms" ? "Tap Hubungan Struktur Korporat" : "Tap to Explore Corporate Hierarchy"}
              </div>

              {/* Interactive Node 1: Parent */}
              <button 
                onClick={() => setInteractiveCard(1)}
                style={{ cursor: "pointer" }}
                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 cursor-pointer ${
                  isLight
                    ? (interactiveCard === 1 ? "bg-cyan-50 border-cyan-400 shadow-md" : "bg-white border-slate-200 hover:bg-slate-50")
                    : (interactiveCard === 1 ? "bg-cyan-500/15 border-cyan-400 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/10")
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isLight ? "bg-cyan-100 text-cyan-700" : "bg-cyan-500/10 text-cyan-400"
                }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold flex items-center gap-1.5 ${isLight ? "text-slate-900" : "text-white"}`}>
                    Microsoft Inc. 
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${isLight ? "bg-cyan-100 text-cyan-800" : "bg-cyan-500/20 text-cyan-300"}`}>
                      {lang === "ms" ? "Induk" : "Parent"}
                    </span>
                  </h4>
                  <p className={`text-xs mt-1 ${isLight ? "text-slate-600" : "text-slate-350"}`}>
                    {lang === "ms" 
                      ? "Memiliki modal saham, kawalan undi, dan melantik lembaga pengarah GitHub." 
                      : "Holds the core stock, voting rights, and elects the upper board of directors."}
                  </p>
                </div>
              </button>

              {/* Decorative Connector */}
              <div className="flex justify-center my-0.5">
                <div className="h-6 w-0.5 bg-gradient-to-b from-cyan-500 to-indigo-500" />
              </div>

              {/* Interactive Node 2: Subsidiary */}
              <button 
                onClick={() => setInteractiveCard(2)}
                style={{ cursor: "pointer" }}
                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 cursor-pointer ${
                  isLight
                    ? (interactiveCard === 2 ? "bg-indigo-50 border-indigo-400 shadow-md" : "bg-white border-slate-200 hover:bg-slate-50")
                    : (interactiveCard === 2 ? "bg-indigo-505/15 border-indigo-400 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/10")
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isLight ? "bg-indigo-100 text-indigo-700" : "bg-indigo-500/10 text-indigo-400"
                }`}>
                  <Building className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold flex items-center gap-1.5 ${isLight ? "text-slate-900" : "text-white"}`}>
                    GitHub, LLC
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${isLight ? "bg-indigo-100 text-indigo-800" : "bg-indigo-500/20 text-indigo-300"}`}>
                      {lang === "ms" ? "Subsidiari" : "Subsidiary"}
                    </span>
                  </h4>
                  <p className={`text-xs mt-1 ${isLight ? "text-slate-600" : "text-slate-350"}`}>
                    {lang === "ms" 
                      ? "Entiti komersial yang modal operasinya disokong penuh oleh dana induk." 
                      : "The operating business whose commercial structures pool under Parent finances."}
                  </p>
                </div>
              </button>

              {/* Detail view based on node select */}
              {interactiveCard && (
                <div className={`p-3 border rounded-xl text-center text-xs font-semibold animate-fadeIn ${
                  isLight ? "bg-cyan-50 border-cyan-250 text-cyan-850" : "bg-slate-900 border-slate-705 text-cyan-300"
                }`}>
                  {interactiveCard === 1 
                    ? (lang === "ms" ? "💡 Microsoft mengundi keputusan kritikal dan menyatukan semua liabiliti GitHub." : "💡 Microsoft casts votes and holds direct ownership responsibilities for all consolidated obligations.") 
                    : (lang === "ms" ? "💡 Walau dikawal Microsoft, GitHub berjalan secara bebas di bawah CEO sendiri." : "💡 Although subsidiary, GitHub retains dedicated CEO directions to manage daily software workflows.")}
                </div>
              )}
            </div>
          </div>
        );

      case 2: // Slide 3: Status cards block
        return (
          <div className={`relative h-full flex flex-col justify-center p-6 rounded-3xl border overflow-hidden transition-all duration-300 ${
            isLight ? "bg-[#f1f5f9] border-slate-200" : "bg-slate-950/40 border-white/5"
          }`}>
            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full z-10 text-xs">
              
              {/* Card 1: Masih Sah */}
              <div className={`p-3.5 border rounded-2xl flex items-center gap-3 transition-colors ${isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? "bg-cyan-100 text-cyan-750" : "bg-cyan-500/10 text-cyan-400"}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${isLight ? "text-slate-900" : "text-slate-100"}`}>{lang === "ms" ? "Masih Sah" : "Separate Legal Existence"}</h4>
                  <p className={`text-[11px] mt-0.5 ${isLight ? "text-slate-600" : "text-slate-350"}`}>
                    {lang === "ms" 
                      ? "GitHub tidak mati. Ia tetap didaftarkan sebagai syarikat sah yang buat perisytiharan tempatan."
                      : "GitHub maintains registration numbers, corporate properties, and general business standing."}
                  </p>
                </div>
              </div>

              {/* Card 2: Jenama Kekal */}
              <div className={`p-3.5 border rounded-2xl flex items-center gap-3 transition-colors ${isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? "bg-emerald-100 text-emerald-755" : "bg-[#142d25] text-teal-400"}`}>
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${isLight ? "text-slate-900" : "text-slate-100"}`}>{lang === "ms" ? "Jenama & Identiti" : "Preserving Identity"}</h4>
                  <p className={`text-[11px] mt-0.5 ${isLight ? "text-slate-600" : "text-slate-350"}`}>
                    {lang === "ms" 
                      ? "Logo Octocat dan platform dikekalkan terus tanpa bertukar menjadi Microsoft Hub."
                      : "The iconic GitHub Octocat and community pool operate normally without heavy parent rebranding."}
                  </p>
                </div>
              </div>

              {/* Card 3: Pemiliki Berubah */}
              <div className={`p-3.5 border rounded-2xl flex items-center gap-3 transition-colors ${isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? "bg-amber-100 text-amber-755" : "bg-[#332414] text-amber-400"}`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${isLight ? "text-slate-900" : "text-slate-100"}`}>{lang === "ms" ? "Kawalan Pertukaran Saham" : "Shift in Ownership Group"}</h4>
                  <p className={`text-[11px] mt-0.5 ${isLight ? "text-slate-600" : "text-slate-350"}`}>
                    {lang === "ms" 
                      ? "Pelabur asal GitHub menukar saham mereka menjadi portfolio cair pemegang Microsoft."
                      : "GitHub's early stakeholders converted their equity holdings into clean Microsoft stock shares."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        );

      case 3: // Slide 4: Separate Books / Statements
        return (
          <div className={`relative h-full flex flex-col justify-center p-6 rounded-3xl border overflow-hidden transition-all duration-300 ${
            isLight ? "bg-[#f1f5f9] border-slate-200" : "bg-slate-950/40 border-white/5"
          }`}>
            <div className="max-w-md mx-auto w-full z-10 space-y-4">
              
              {/* Notebook / Balance sheet card */}
              <div className="p-4 bg-white text-slate-900 rounded-2xl shadow-xl relative border-2 border-slate-200">
                {/* Book header */}
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Github className="w-5 h-5 text-slate-900" />
                    <span className="font-bold text-xs tracking-tight text-slate-800">GitHub, LLC · Financials</span>
                  </div>
                  <span className="text-[9px] bg-slate-100 text-slate-705 px-2 py-0.5 rounded font-black border border-slate-200">
                    {lang === "ms" ? "BUKU BERASINGAN" : "LOCAL GENERAL LEDGER"}
                  </span>
                </div>
                
                {/* Statement values illustration */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-600 border-b border-dashed pb-1">
                    <span>{lang === "ms" ? "Hasil Langganan:" : "Subscription Revenues:"}</span>
                    <span className="font-bold text-emerald-600">+$125,000,000</span>
                  </div>
                  <div className="flex justify-between text-slate-600 border-b border-dashed pb-1">
                    <span>{lang === "ms" ? "Gaji & Operasi:" : "Employee Costs & Ops:"}</span>
                    <span className="font-bold text-rose-600">-$92,000,000</span>
                  </div>
                  <div className="flex justify-between text-slate-600 border-b border-dashed pb-1">
                    <span>{lang === "ms" ? "Hasil Tunai Bersih:" : "Net Bank Balances:"}</span>
                    <span className="font-bold text-slate-900">+$33,000,000</span>
                  </div>
                  <div className="flex justify-between text-[#0f172a] pt-1.5 font-bold">
                    <span>{lang === "ms" ? "Aset Bersih (Separate Sheet):" : "Net Assets (Local Sheet):"}</span>
                    <span>$142,000,000</span>
                  </div>
                </div>
              </div>

              {/* Context text for accounting */}
              <div className={`p-3 border-l-2 text-xs leading-relaxed transition-colors ${
                isLight 
                  ? "bg-cyan-50/50 border-cyan-500 text-slate-700" 
                  : "bg-cyan-900/10 border-cyan-400 text-slate-300"
              }`}>
                {lang === "ms" 
                  ? "👉 Walaupun dimiliki induk, GitHub wajib melaporkan urusan akaun, buku lejar, dan kunci kira-kira tempatan secara berasingan bagi tujuan pengisytiharan berkanun." 
                  : "👉 Under Corporate Registry laws, subsidiaries must undergo separate financial checks and report separate corporate balance statements independently."}
              </div>
            </div>
          </div>
        );

      case 4: // Slide 5: Consolidated calculator simulation
        return (
          <div className={`relative h-full flex flex-col justify-center p-1 rounded-3xl overflow-hidden transition-all duration-300 ${isLight ? "bg-[#f1f5f9] border border-slate-200" : ""}`}>
            <ConsolidatedCalculator lang={lang} />
          </div>
        );

      case 5: // Slide 6: Summary Mindmap / Quiz Launch
        return (
          <div className={`relative h-full flex flex-col justify-center p-6 rounded-3xl border overflow-hidden transition-all duration-300 ${
            isLight ? "bg-[#f1f5f9] border-slate-200" : "bg-slate-950/40 border-white/5"
          }`}>
            <div className="max-w-md mx-auto w-full z-10 text-xs space-y-4">
              <div className={`p-4 border rounded-2xl transition-colors ${isLight ? "bg-white border-slate-200" : "bg-slate-900/80 border-slate-700/60"}`}>
                <h4 className="font-bold text-cyan-600 uppercase tracking-widest text-[11px] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  {lang === "ms" ? "Kunci Kefahaman" : "Key Insight Highlights"}
                </h4>
                
                <div className={`space-y-3 leading-relaxed ${isLight ? "text-slate-700 font-medium" : "text-slate-350"}`}>
                  <div className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>{lang === "ms" ? "Dua Laporan Kewangan:" : "Two System Tracks:"}</strong>{" "}
                      {lang === "ms" 
                        ? "GitHub urus lejar harian; Microsoft menyatukan angka akhir dalam lejar disatukan."
                        : "Local journals run independently; consolidated group reports combine them."}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>{lang === "ms" ? "Eliminasi Baki:" : "Eliminations of Balances:"}</strong>{" "}
                      {lang === "ms" 
                        ? "Hutang sesama induk-anak dilarang disenaraikan sebagai transaksi luar kumpulan."
                        : "Receivable loans within the branch pool out to avoid false balance growth."}
                    </span>
                  </div>

                  <div className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>{lang === "ms" ? "Gambaran Pelabur:" : "Unified Portfolio Yield:"}</strong>{" "}
                      {lang === "ms"
                        ? "Pemegang pelaburan hanya mentafsir gabungan aset bersih dalam pelaporan awam Microsoft."
                        : "Public shareholders evaluate financial status through consolidated outcomes."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Start interactive quiz button */}
              <button
                onClick={handleToggleQuiz}
                style={{ cursor: "pointer" }}
                className="w-full py-3.5 px-5 rounded-xl font-bold text-slate-900 bg-amber-505 hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Award className="w-5 h-5 text-slate-900" />
                {lang === "ms" ? "Uji Kefahaman Sekarang (Kuiz)" : "Take Knowledge Assessment Quiz"}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isLight = theme === "light";

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isLight 
        ? "bg-slate-50 text-slate-900" 
        : "bg-[#08111f] text-[#eef6ff] app-shell"
    }`}>
      
      {/* Premium Accessible Header */}
      <header className={`topbar relative z-30 transition-colors ${isLight ? "border-b border-slate-205 bg-white/70 backdrop-blur" : ""}`}>
        <div>
          <div className={`eyebrow select-none font-bold ${isLight ? "text-cyan-700" : "text-[#7bd2ff]"}`}>
            {lang === "ms" ? "TEMPLAT KES STUDI KELAS" : "CLASSROOM CASE STUDY TEMPLATE"}
          </div>
          <h1 className={`deck-title font-extrabold ${isLight ? "text-slate-900" : "text-white"}`}>
            {lang === "ms" ? "Microsoft × GitHub: Memahami Pengambilalihan Korporat" : "Microsoft x GitHub: Deciphering Corporate Mergers"}
          </h1>
        </div>

        {/* Dynamic Navigation Toolbar with font adjuster & high contrast controls */}
        <div className="flex items-center gap-3">
          
          {/* FONT ZOOM CONTROLLERS - Perfect for "Jelas Orang Boleh Baca" */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-white/10" title="Larasan Saiz Tulisan/Font Adjuster">
            <button
              onClick={() => { playClickSound(); setFontSize("normal"); }}
              style={{ cursor: "pointer" }}
              className={`px-2.5 py-1 text-xs font-bold rounded transition ${
                fontSize === "normal"
                  ? "bg-cyan-500 text-slate-900 shadow font-extrabold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              A
            </button>
            <button
              onClick={() => { playClickSound(); setFontSize("large"); }}
              style={{ cursor: "pointer" }}
              className={`px-2.5 py-1 text-xs font-bold rounded transition ${
                fontSize === "large"
                  ? "bg-cyan-500 text-slate-900 shadow font-extrabold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              A+
            </button>
            <button
              onClick={() => { playClickSound(); setFontSize("xl"); }}
              style={{ cursor: "pointer" }}
              className={`px-2.5 py-1 text-xs font-bold rounded transition ${
                fontSize === "xl"
                  ? "bg-cyan-500 text-slate-900 shadow font-extrabold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              A++
            </button>
          </div>

          {/* HIGH CONTRAST LIGHT / DARK MODE TOGGLE - Perfect for readability */}
          <button 
            onClick={() => { playClickSound(); setTheme(prev => prev === 'light' ? 'dark' : 'light'); }}
            style={{ cursor: "pointer" }}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isLight 
                ? "bg-slate-100 border-slate-350 hover:bg-slate-200 text-slate-800"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-amber-400"
            }`}
            title={lang === "ms" ? "Tukar Tema Cerah/Gelap" : "Switch Light/Dark Contrast Theme"}
          >
            {isLight ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                🌙 {lang === "ms" ? "Malam" : "Dark"}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                ☀️ {lang === "ms" ? "Cerah" : "Light"}
              </span>
            )}
          </button>

          {/* Autoplay button */}
          <button 
            onClick={togglePlay}
            style={{ cursor: "pointer" }}
            title={isPlaying ? "Autoplay On" : "Autoplay Off"}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isLight ? "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-cyan-500 animate-pulse" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Sound volume button */}
          <button 
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            style={{ cursor: "pointer" }}
            title={isAudioEnabled ? "Mutasi Bunyi" : "Bunyi Aktif"}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isLight ? "bg-slate-100 border-slate-200 text-slate-850" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage}
            style={{ cursor: "pointer" }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs select-none transition-all cursor-pointer border ${
              isLight ? "bg-cyan-100 border-cyan-200 text-cyan-700 hover:bg-cyan-100/50" : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20"
            }`}
          >
            <Globe className="w-3.5 h-3.5 inline mr-1" />
            <span>{lang === "ms" ? "BM" : "EN"}</span>
          </button>
        </div>
      </header>

      {/* Main presentation grid */}
      <div className="stage">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
          
          {/* Left panel: Slide Text Content & bullets with highlighted reading rows */}
          <div className={`col-span-1 lg:col-span-7 h-full flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 ${
            isLight 
              ? "bg-white border-slate-200 text-slate-900 shadow-xl" 
              : "bg-slate-900/60 border-white/10 text-slate-100 backdrop-blur-md"
          }`}>
            
            <div className="space-y-4">
              <div className={`kicker select-none font-bold tracking-widest uppercase ${isLight ? "text-cyan-700" : "text-[#76d3ff]"}`}>
                {slides[currentSlide].kicker}
              </div>
              
              <h2 className={`${getTitleSizeClass()} tracking-tight font-serif ${isLight ? "text-slate-900" : "text-white"}`}>
                {slides[currentSlide].title}
              </h2>
              
              <p className={`${getSubtitleSizeClass()} ${isLight ? "text-slate-600 font-medium" : "text-slate-350"}`}>
                {slides[currentSlide].subtitle}
              </p>

              {slides[currentSlide].bullets.length > 0 && (
                <div className="bullet-list pt-4 space-y-3" aria-label="Slide detail points">
                  {slides[currentSlide].bullets.map((bullet, idx) => {
                    const isHovered = hoveredBullet === idx;
                    return (
                      <div 
                        key={idx} 
                        onMouseEnter={() => setHoveredBullet(idx)}
                        onMouseLeave={() => setHoveredBullet(null)}
                        className={`bullet p-3 rounded-2xl border transition-all flex items-start gap-3 select-none ${
                          isHovered 
                            ? (isLight ? "bg-cyan-50/75 border-cyan-200 scale-[1.01]" : "bg-cyan-950/20 border-cyan-500/30 scale-[1.01]")
                            : "bg-transparent border-transparent"
                        }`}
                      >
                        <div className={`bullet-dot mt-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border ${
                          isLight 
                            ? (isHovered ? "bg-cyan-500 text-white border-cyan-400" : "bg-slate-100 text-slate-600 border-slate-300")
                            : (isHovered ? "bg-cyan-500 text-slate-900 border-cyan-400" : "bg-slate-800 text-slate-400 border-white/15")
                        }`}>
                          ✓
                        </div>
                        <p className={`flex-1 font-semibold ${getBulletSizeClass()} ${
                          isLight 
                            ? "text-slate-850" 
                            : "text-slate-200"
                        }`}>
                          {bullet}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Micro information badge */}
            <div className={`pt-6 border-t flex items-center gap-2 text-xs select-none mt-6 ${isLight ? "border-slate-100 text-slate-500" : "border-white/5 text-slate-400"}`}>
              <Info className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span>
                {lang === "ms" 
                  ? "Papan Petunjuk: Gerakkan penunjuk mouse di atas baris mata pelajaran untuk mod fokus membaca." 
                  : "Reading Aid: Hover mouse over points to isolate line focus for rapid reading."}
              </span>
            </div>

          </div>

          {" "}
          {/* Right panel: Dynamic Interactive Visual Elements */}
          <div className="col-span-1 lg:col-span-5 h-[400px] lg:h-full">
            {renderVisualPanel()}
          </div>

        </div>
      </div>

      {/* Floating Side Drawer Controls for glossary/dictionary & assessments */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
        {/* Toggle Glossary */}
        <button
          onClick={handleToggleGlossary}
          style={{ cursor: "pointer" }}
          className={`px-4 py-3 rounded-2xl flex items-center gap-2 shadow-2xl transition border cursor-pointer ${
            showGlossary 
              ? "bg-cyan-500 border-cyan-400 text-slate-950 font-extrabold" 
              : `bg-slate-950/90 hover:bg-slate-900 text-white ${isLight ? "border-slate-300" : "border-white/15"}`
          }`}
        >
          <BookOpen className="w-5 h-5 font-bold" />
          <span className="text-xs font-bold">{lang === "ms" ? "Glosari Istilah" : "Business Glossary"}</span>
        </button>

        {/* Toggle Quiz */}
        <button
          onClick={handleToggleQuiz}
          style={{ cursor: "pointer" }}
          className={`px-4 py-3 rounded-2xl flex items-center gap-2 shadow-2xl transition border cursor-pointer ${
            showQuiz 
              ? "bg-amber-500 border-amber-400 text-slate-950 font-extrabold" 
              : `bg-slate-950/90 hover:bg-slate-900 text-white ${isLight ? "border-slate-300" : "border-white/15"}`
          }`}
        >
          <Award className="w-5 h-5 font-bold" />
          <span className="text-xs font-bold">{lang === "ms" ? "Kuiz Kefahaman" : "Knowledge Check"}</span>
        </button>
      </div>

      {/* Sliding Modals overlay panel for Glossary & Quiz */}
      {(showGlossary || showQuiz) && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop Click to close */}
          <div className="absolute inset-0" onClick={() => { setShowGlossary(false); setShowQuiz(false); }} />
          
          {/* Slide out card pane */}
          <div className="relative w-full max-w-md h-full bg-[#07111e] border-l border-white/10 shadow-2xl p-5 flex flex-col justify-between z-10 transition-transform duration-300">
            {showGlossary && (
              <div className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
                  <h3 className="font-bold text-lg text-white">📘 {lang === "ms" ? "Daftar Istilah" : "Glossary Terms"}</h3>
                  <button 
                    onClick={() => setShowGlossary(false)} 
                    style={{ cursor: "pointer" }}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 cursor-pointer"
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

      {/* Footer Presentation Controls */}
      <footer className={`footer transition-colors ${isLight ? "bg-white/80 border-t border-slate-200" : ""}`}>
        
        {/* Previous Button */}
        <button 
          id="prevBtn"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          style={{ cursor: currentSlide === 0 ? "not-allowed" : "pointer" }}
          className={`nav-btn transition-colors cursor-pointer ${
            isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-250 text-slate-900" : ""
          }`}
          aria-label={lang === "ms" ? "Halaman sebelum" : "Previous slide"}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "ms" ? "Sebelumnya" : "Previous"}</span>
        </button>

        {/* Centered slide indicator dots */}
        <div className="dots flex items-center gap-1.5 font-bold" aria-label="Slide Indicator Map">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleGoTo(idx)}
              style={{ cursor: "pointer" }}
              className={`dot h-1.5 transition-all outline-none border-none cursor-pointer ${
                currentSlide === idx 
                  ? "bg-cyan-500 w-8 md:w-12 rounded-full" 
                  : (isLight ? "bg-slate-300 hover:bg-slate-500 w-2.5 md:w-3.5 rounded-full" : "bg-white/20 hover:bg-white/45 w-2.5 md:w-3.5 rounded-full")
              }`}
              aria-label={`Slide target ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button 
          id="nextBtn"
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
          style={{ cursor: currentSlide === slides.length - 1 ? "not-allowed" : "pointer" }}
          className={`nav-btn transition-colors cursor-pointer ${
            isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-250 text-slate-900" : ""
          }`}
          aria-label={lang === "ms" ? "Halaman seterusnya" : "Next slide"}
        >
          <span>{lang === "ms" ? "Seterusnya" : "Next"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </footer>

    </div>
  );
}
