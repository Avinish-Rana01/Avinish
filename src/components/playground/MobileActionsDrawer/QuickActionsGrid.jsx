import React from 'react';
import { RotateCcw, Trash2, Copy, Download } from 'lucide-react';

const QuickActionsGrid = ({
  handleReset,
  handleClear,
  handleCopyCode,
  handleDownloadCode,
  setShowMobileMenu
}) => {
  return (
    <>
      <button
        onClick={() => { handleReset(); setShowMobileMenu(false); }}
        className="flex flex-col gap-1.5 items-start p-4 rounded-2xl border border-white/5 bg-white/5 active:bg-[#B600A8]/20 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <RotateCcw size={14} className="text-[#B600A8]" />
          Reset
        </div>
        <span className="text-[10px] text-[#D7E2EA]/50">Wipe changes, load template default code.</span>
      </button>

      <button
        onClick={() => { handleClear(); setShowMobileMenu(false); }}
        className="flex flex-col gap-1.5 items-start p-4 rounded-2xl border border-white/5 bg-white/5 active:bg-[#B600A8]/20 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <Trash2 size={14} className="text-red-500" />
          Clear
        </div>
        <span className="text-[10px] text-[#D7E2EA]/50">Clear all workspace input characters.</span>
      </button>

      <button
        onClick={() => { handleCopyCode(); setShowMobileMenu(false); }}
        className="flex flex-col gap-1.5 items-start p-4 rounded-2xl border border-white/5 bg-white/5 active:bg-[#B600A8]/20 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <Copy size={14} className="text-cyan-400" />
          Copy
        </div>
        <span className="text-[10px] text-[#D7E2EA]/50">Copy workspace script directly to clipboard.</span>
      </button>

      <button
        onClick={() => { handleDownloadCode(); setShowMobileMenu(false); }}
        className="flex flex-col gap-1.5 items-start p-4 rounded-2xl border border-white/5 bg-white/5 active:bg-[#B600A8]/20 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <Download size={14} className="text-emerald-400" />
          Download
        </div>
        <span className="text-[10px] text-[#D7E2EA]/50">Save as script file on your physical storage.</span>
      </button>
    </>
  );
};

export default React.memo(QuickActionsGrid);
