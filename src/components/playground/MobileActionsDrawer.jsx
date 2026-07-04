import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trash2, Copy, Download, Sparkles, Music } from 'lucide-react';

const MobileActionsDrawer = ({
  showMobileMenu,
  setShowMobileMenu,
  handleReset,
  handleClear,
  handleCopyCode,
  handleDownloadCode,
  isAiOpen,
  toggleAi,
  isAudioPlaying,
  toggleAudio,
  fontSize,
  setFontSize,
  showMinimap,
  setShowMinimap,
  showWordWrap,
  setShowWordWrap
}) => {
  return (
    <AnimatePresence>
      {showMobileMenu && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9950] md:hidden"
          />
          {/* Slide up Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 rounded-t-[32px] border-t border-white/10 bg-[#121212]/95 backdrop-blur-2xl p-6 z-[9960] shadow-2xl flex flex-col gap-6 select-none md:hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Header drawer drag handle */}
            <div className="w-12 h-1.5 rounded-full bg-white/10 mx-auto -mt-2 mb-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#B600A8]">DevLab Workspace Settings</span>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 hover:text-white cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Grid Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
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

              {/* Mobile: AI Assistant card */}
              <button
                onClick={() => { toggleAi(); setShowMobileMenu(false); }}
                className={`flex flex-col gap-1.5 items-start p-4 rounded-2xl border transition-colors text-left cursor-pointer ${
                  isAiOpen ? 'border-[#B600A8]/40 bg-[#B600A8]/10' : 'border-white/5 bg-white/5 active:bg-[#B600A8]/20'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Sparkles size={14} className="text-[#B600A8]" />
                  AI Assistant
                </div>
                <span className="text-[10px] text-[#D7E2EA]/50">Get hints, explanations, and reviews.</span>
              </button>

              {/* Mobile: Music Player card */}
              <button
                onClick={() => { toggleAudio(); setShowMobileMenu(false); }}
                className={`flex flex-col gap-1.5 items-start p-4 rounded-2xl border transition-colors text-left cursor-pointer ${
                  isAudioPlaying ? 'border-[#7621B0]/40 bg-[#7621B0]/10' : 'border-white/5 bg-white/5 active:bg-[#B600A8]/20'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Music size={14} className="text-[#7621B0]" />
                  Ambient Mode
                </div>
                <span className="text-[10px] text-[#D7E2EA]/50 font-medium">Toggle persistent backing ambient tunes.</span>
              </button>
            </div>

            {/* Editor Toggles */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#D7E2EA]/40 text-left">Editor View Parameters</span>

              {/* Font Size controls */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Font Size</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-lg active:bg-white/5 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold text-[#D7E2EA]">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-lg active:bg-white/5 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Minimap toggle */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Minimap overlay</span>
                <button
                  onClick={() => setShowMinimap(!showMinimap)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${showMinimap ? 'bg-[#B600A8]' : 'bg-white/10'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${showMinimap ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Word Wrap toggle */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Line Word Wrap</span>
                <button
                  onClick={() => setShowWordWrap(!showWordWrap)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${showWordWrap ? 'bg-[#B600A8]' : 'bg-white/10'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${showWordWrap ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(MobileActionsDrawer);
