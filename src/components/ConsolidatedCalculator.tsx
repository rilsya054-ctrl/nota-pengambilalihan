import React, { useState } from "react";
import { Plus, Minus, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface ConsolidatedCalculatorProps {
  lang: "ms" | "en";
}

export default function ConsolidatedCalculator({ lang }: ConsolidatedCalculatorProps) {
  // Financial numbers in Millions of USD
  const [msAssets, setMsAssets] = useState<number>(200);
  const [msLiabilities, setMsLiabilities] = useState<number>(80);
  
  const [ghAssets, setGhAssets] = useState<number>(50);
  const [ghLiabilities, setGhLiabilities] = useState<number>(15);

  // Model a potential intra-group loan elimination to explain "Consolidation Adjustments"
  const [hasIntraGroupLoan, setHasIntraGroupLoan] = useState<boolean>(true);
  const loanValue = 10; // $10 Million intra-group loan

  // Net Assets = Assets - Liabilities (this maps to Equity)
  const msEquity = msAssets - msLiabilities;
  const ghEquity = ghAssets - ghLiabilities;

  // Calculation with Elimination:
  // If there is an intra-group loan, Parent has an Asset (Receivable) of $10M, Subsidiary has a Liability (Payable) of $10M.
  // In consolidation, we must eliminate both the receivable and payable so we don't double count!
  const consolidatedAssets = msAssets + ghAssets - (hasIntraGroupLoan ? loanValue : 0);
  const consolidatedLiabilities = msLiabilities + ghLiabilities - (hasIntraGroupLoan ? loanValue : 0);
  const consolidatedEquity = consolidatedAssets - consolidatedLiabilities;

  return (
    <div className="w-full h-full flex flex-col justify-between" id="consolidated-calculator">
      {/* Short instructions */}
      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl mb-3 text-xs md:text-sm">
        <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          {lang === "ms" ? "Model Simulasi Penyata Disatukan" : "Consolidation Statement Simulation Model"}
        </span>
        <span className="text-slate-300">
          {lang === "ms" 
            ? "Ubah suai angka di bawah untuk melihat bagaimana aset & liabiliti digabungkan dan transaksi dalaman disingkirkan semula."
            : "Adjust the numbers below to see how assets & liabilities are pooled and internal transactions are eliminated."}
        </span>
      </div>

      {/* Input Sliders Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Microsoft Induk */}
        <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
          <h4 className="font-bold text-xs text-cyan-400 uppercase tracking-widest mb-2">
            🚀 Microsoft (INDUK)
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>{lang === "ms" ? "Aset" : "Assets"}:</span>
                <span className="text-white">${msAssets}M</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="500" 
                step="10"
                value={msAssets} 
                onChange={(e) => setMsAssets(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>{lang === "ms" ? "Liabiliti" : "Liabilities"}:</span>
                <span className="text-white">${msLiabilities}M</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="250" 
                step="5"
                value={msLiabilities} 
                onChange={(e) => setMsLiabilities(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1 rounded-lg cursor-pointer"
              />
            </div>
            <div className="pt-1.5 border-t border-cyan-500/10 flex justify-between font-semibold text-cyan-300">
              <span>{lang === "ms" ? "Ekuiti (Aset Bersih)" : "Equity (Net Assets)"}:</span>
              <span>${msEquity}M</span>
            </div>
          </div>
        </div>

        {/* GitHub Subsidiari */}
        <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
          <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest mb-2">
            🐙 GitHub (SUBSIDIARI)
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>{lang === "ms" ? "Aset" : "Assets"}:</span>
                <span className="text-white">${ghAssets}M</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="150" 
                step="5"
                value={ghAssets} 
                onChange={(e) => setGhAssets(Number(e.target.value))}
                className="w-full accent-indigo-400 h-1 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>{lang === "ms" ? "Liabiliti" : "Liabilities"}:</span>
                <span className="text-white">${ghLiabilities}M</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="80" 
                step="5"
                value={ghLiabilities} 
                onChange={(e) => setGhLiabilities(Number(e.target.value))}
                className="w-full accent-indigo-400 h-1 rounded-lg cursor-pointer"
              />
            </div>
            <div className="pt-1.5 border-t border-indigo-500/10 flex justify-between font-semibold text-indigo-300">
              <span>{lang === "ms" ? "Ekuiti (Aset Bersih)" : "Equity (Net Assets)"}:</span>
              <span>${ghEquity}M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Interactive Elimination */}
      <div className="px-3 py-2 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasIntraGroupLoan ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${hasIntraGroupLoan ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </span>
          <span className="text-slate-200 font-medium">
            {lang === "ms" 
              ? `Model Pinjaman Antara Kumpulan: $${loanValue}M` 
              : `Model Inter-Group Loan: $${loanValue}M`}
          </span>
        </div>
        <button 
          onClick={() => setActivatedLoan(!hasIntraGroupLoan)}
          style={{ cursor: "pointer" }}
          className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
            hasIntraGroupLoan 
              ? "bg-emerald-500/25 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/40" 
              : "bg-rose-500/25 border border-rose-500/50 text-rose-300 hover:bg-rose-500/40"
          }`}
        >
          {hasIntraGroupLoan 
            ? (lang === "ms" ? "Dinyahaktifkan" : "Deactivate") 
            : (lang === "ms" ? "Aktifkan Eliminasi" : "Activate Elimination")}
        </button>
      </div>

      {/* Result Display Pane */}
      <div className="p-3 bg-gradient-to-r from-teal-950/20 to-cyan-950/20 border border-teal-500/30 rounded-2xl flex-1 flex flex-col justify-center">
        <h5 className="font-bold text-[11px] text-teal-300 uppercase tracking-widest flex items-center gap-1 mb-1.5">
          📊 {lang === "ms" ? "KEDUDUKAN KEWANGAN DISATUKAN KUMPULAN" : "GROUP CONSOLIDATED FINANCIAL POSITION"}
        </h5>
        
        <div className="grid grid-cols-3 gap-2 text-center my-1.5">
          <div className="p-2 bg-slate-900/60 border border-slate-700/40 rounded-xl relative">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {lang === "ms" ? "Jumlah Aset" : "Total Assets"}
            </div>
            <div className="text-base md:text-xl font-extrabold text-[#7fd3b1]">
              ${consolidatedAssets}M
            </div>
            <div className="text-[9px] text-slate-400 mt-1">
              MS: {msAssets} + GH: {ghAssets} {hasIntraGroupLoan ? `- Eli: ${loanValue}` : ""}
            </div>
          </div>

          <div className="p-2 bg-slate-900/60 border border-slate-700/40 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {lang === "ms" ? "Jumlah Liabiliti" : "Total Liabilities"}
            </div>
            <div className="text-base md:text-xl font-extrabold text-rose-400">
              ${consolidatedLiabilities}M
            </div>
            <div className="text-[9px] text-slate-400 mt-1">
              MS: {msLiabilities} + GH: {ghLiabilities} {hasIntraGroupLoan ? `- Eli: ${loanValue}` : ""}
            </div>
          </div>

          <div className="p-2 bg-slate-900/60 border border-slate-700/40 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {lang === "ms" ? "Ekuiti Sandar" : "Net Group Equity"}
            </div>
            <div className="text-base md:text-xl font-extrabold text-cyan-400">
              ${consolidatedEquity}M
            </div>
            <div className="text-[9px] text-slate-400 mt-1">
              {lang === "ms" ? "Bersih" : "Net"}: {consolidatedAssets - consolidatedLiabilities}M
            </div>
          </div>
        </div>

        {hasIntraGroupLoan && (
          <div className="mt-1 text-[11px] text-slate-350 leading-relaxed bg-black/30 p-2 rounded-lg border border-white/5 flex gap-1.5 items-start">
            <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              {lang === "ms" 
                ? "Sebab penolakan: Nilai pinjaman $10M antara Microsoft dan GitHub tidak boleh dipaparkan sebagai pinjaman luar dalam laporan awam disatukan (Kerana baki tuntutan dalaman saling menolak)."
                : "Why we eliminate: The $10M internal loan cannot be shown as external receivable/payable on consolidated reports (since a group cannot owe money to itself)."}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  function setActivatedLoan(val: boolean) {
    setHasIntraGroupLoan(val);
  }
}
