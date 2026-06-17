import React, { useState } from "react";
import { glossaryMs, glossaryEn } from "../data";
import { BookOpen, AlertCircle, ChevronRight, HelpCircle } from "lucide-react";

interface DefinitionGlossaryProps {
  lang: "ms" | "en";
}

export default function DefinitionGlossary({ lang }: DefinitionGlossaryProps) {
  const glossary = lang === "ms" ? glossaryMs : glossaryEn;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <div className="w-full h-full flex flex-col justify-between" id="glossary-module">
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-4">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-cyan-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          {lang === "ms" ? "Glosari Interaktif" : "Interactive Glossary"}
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          {lang === "ms" ? "Klik istilah untuk membaca huraian terperinci:" : "Click on a term to view structured explanation:"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {glossary.map((g, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
              selectedIndex === idx
                ? "bg-cyan-500/10 border-cyan-400 text-white shadow-lg shadow-cyan-500/5"
                : "bg-white/5 border-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm md:text-base flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selectedIndex === idx ? "bg-cyan-400" : "bg-slate-500"}`} />
                {g.term}
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${selectedIndex === idx ? "rotate-90 text-cyan-400" : "text-slate-400"}`} />
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="p-4 bg-slate-900/80 border border-cyan-500/20 rounded-2xl relative overflow-hidden flex-1 flex flex-col justify-center min-h-[140px]">
          <div className="absolute right-3 top-3 opacity-10">
            <HelpCircle className="w-16 h-16 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-1">
              {lang === "ms" ? "Huraian Konsep" : "Concept Breakdown"}
            </h4>
            <p className="text-slate-105 font-medium leading-relaxed text-sm md:text-base mb-2">
              {glossary[selectedIndex].definition}
            </p>
            <div className="flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>{lang === "ms" ? "Implikasi: " : "Implication: "}</strong>
                {glossary[selectedIndex].extra}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
