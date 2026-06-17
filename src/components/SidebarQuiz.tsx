import React, { useState } from "react";
import { quizQuestionsMs, quizQuestionsEn } from "../data";
import { Award, CheckCircle2, XCircle, RotateCcw, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react";

interface SidebarQuizProps {
  lang: "ms" | "en";
  onClose?: () => void;
}

export default function SidebarQuiz({ lang, onClose }: SidebarQuizProps) {
  const questions = lang === "ms" ? quizQuestionsMs : quizQuestionsEn;
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Score Calculations
  const answersCount = Object.keys(selectedAnswers).length;
  const totalQuestions = questions.length;
  
  const correctCount = questions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (questionId: number, idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setShowExplanation(false);
  };

  const currentQ = questions[currentIdx];
  const userAns = selectedAnswers[currentQ.id];
  const isCorrect = userAns === currentQ.correctIndex;

  return (
    <div className="flex flex-col h-full text-slate-100" id="quiz-sidebar-container">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400 animate-pulse" />
          {lang === "ms" ? "Uji Kefahaman Anda" : "Test Your Understanding"}
        </h3>
        {onClose && (
          <button 
            onClick={onClose}
            style={{ cursor: "pointer" }}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10"
          >
            {lang === "ms" ? "Tutup" : "Close"}
          </button>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!isSubmitted ? (
          <div className="space-y-4">
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {lang === "ms" ? `Soalan ${currentIdx + 1} daripada ${totalQuestions}` : `Question ${currentIdx + 1} of ${totalQuestions}`}
              </span>
              <span>
                {Math.round(((currentIdx + 1) / totalQuestions) * 100)}% {lang === "ms" ? "Selesai" : "Completed"}
              </span>
            </div>
            
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                {lang === "ms" ? `KATEGORI: STRUKTUR KORPORAT` : `CATEGORY: CORPORATE STRUCTURE`}
              </span>
              <p className="mt-1 font-semibold text-sm md:text-base text-white">
                {currentQ.question}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2">
              {currentQ.options.map((option, oIdx) => {
                const isSelected = userAns === oIdx;
                
                // Styling when chosen
                let optStyle = "bg-white/5 border-white/10 text-slate-250 hover:bg-white/10";
                if (isSelected) {
                  optStyle = "bg-cyan-500/10 border-cyan-400 text-white shadow-md";
                }
                
                // If answer was evaluated/visible
                if (userAns !== undefined && showExplanation) {
                  if (oIdx === currentQ.correctIndex) {
                    optStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-250 font-medium";
                  } else if (isSelected) {
                    optStyle = "bg-rose-500/20 border-rose-400 text-rose-250";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={userAns !== undefined}
                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                    style={{ cursor: userAns !== undefined ? "not-allowed" : "pointer" }}
                    className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm transition-all duration-150 flex items-center justify-between ${optStyle}`}
                  >
                    <span>{option}</span>
                    {userAns !== undefined && oIdx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {userAns !== undefined && isSelected && oIdx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Micro Explanatory Popup */}
            {userAns !== undefined && showExplanation && (
              <div className="p-3.5 bg-[#091e32]/80 border border-cyan-500/25 rounded-2xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isCorrect ? (lang === "ms" ? "Tepat Sekali!" : "Correct!") : (lang === "ms" ? "Sipi-sipi!" : "Incorrect!")}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px] md:text-xs">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                style={{ cursor: currentIdx === 0 ? "not-allowed" : "pointer" }}
                className="px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1 bg-white/5 border border-white/10 text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                {lang === "ms" ? "Kembali" : "Previous"}
              </button>

              <button
                onClick={handleNext}
                disabled={userAns === undefined}
                style={{ cursor: userAns === undefined ? "not-allowed" : "pointer" }}
                className="px-4 py-1.5 rounded-xl text-xs flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 font-semibold text-slate-900 disabled:opacity-40 transition-colors cursor-pointer"
              >
                {currentIdx === totalQuestions - 1 
                  ? (lang === "ms" ? "Hantar" : "Submit") 
                  : (lang === "ms" ? "Seterusnya" : "Next")}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Report Card Mode */
          <div className="py-6 text-center space-y-5">
            {/* Award Medallion */}
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-400/50 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/5">
                <Award className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-[#091523]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-white">
                {lang === "ms" ? "Kuiz Selesai!" : "Quiz Completed!"}
              </h4>
              <p className="text-xs text-slate-350">
                {lang === "ms" 
                  ? "Syabas kerana melengkapkan modul penilaian kes studi." 
                  : "Great job completing the case study evaluation module."}
              </p>
            </div>

            {/* Scorecard Box */}
            <div className="py-4 px-6 bg-slate-900/80 rounded-2xl border border-white/10 display:inline-block max-w-[280px] mx-auto text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">
                {lang === "ms" ? "SKOR ANDA" : "YOUR SCORE"}
              </span>
              <span className="text-4xl font-black text-amber-400">
                {correctCount}
              </span>
              <span className="text-lg text-slate-400 font-semibold">
                {" "}/ {totalQuestions}
              </span>
              <div className="text-[10px] text-emerald-400 mt-1 font-semibold">
                {correctCount === totalQuestions 
                  ? (lang === "ms" ? "🎖️ Sempurna! Anda Master Korporat" : "🎖️ Perfect Score! Corporate Master") 
                  : (correctCount >= 3 
                    ? (lang === "ms" ? "👍 Cemerlang! Pemahaman Kuat" : "👍 Well Done! Robust Understanding") 
                    : (lang === "ms" ? "🧐 Teruskan Membaca Glosari" : "🧐 Keep reviewing slides/glossary"))}
              </div>
            </div>

            {/* Custom Interactive Badges */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left text-xs text-slate-300">
              <span className="font-semibold text-white block mb-1">
                🔑 {lang === "ms" ? "Rumusan Praktikal:" : "Key Practical Takeaway:"}
              </span>
              <span>
                {lang === "ms"
                  ? "Syarikat subsidiari (GitHub) mengekalkan undang-undang berasingan mereka, tetapi digabungkan di bawah laporan induk (Microsoft) untuk pelabur."
                  : "Subsidiary (GitHub) retains separate legal operations, but pools into the parent (Microsoft) for financial statement purposes."}
              </span>
            </div>

            <button
              onClick={handleReset}
              style={{ cursor: "pointer" }}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {lang === "ms" ? "Ambil Semula" : "Retake Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
