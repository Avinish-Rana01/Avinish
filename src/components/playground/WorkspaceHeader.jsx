import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Trash2, Copy, Download, Maximize2, Minimize2, Sparkles, Music, Settings, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES } from './constants';
import { useUI } from '../../context/UIContext';

const WorkspaceHeader = ({
  onBack,
  selectedLang,
  isLangOpen,
  setIsLangOpen,
  onLangChange,
  onRun,
  onReset,
  onClear,
  onCopy,
  onDownload,
  onToggleFullscreen,
  isFullscreen,
  showSettings,
  setShowSettings,
  fontSize,
  setFontSize,
  showMinimap,
  setShowMinimap,
  showWordWrap,
  setShowWordWrap,
  onShowMobileMenu,
  isAiOpen,
  onToggleAi,
  isAudioPlaying,
  onToggleAudio
}) => {
  const { isDustEnabled, toggleDust } = useUI();

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/10 z-20 select-none shrink-0">
      {/* Left Back navigation & picker */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Home
        </button>
        <div className="h-4 w-px bg-white/10 hidden sm:block" />
        
        {/* Custom Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            id="lang-select-dropdown"
            className="flex items-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 bg-opacity-70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA] transition-colors cursor-pointer"
          >
            {LANGUAGES.find(l => l.id === selectedLang)?.name || 'Language'}
            <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsLangOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 mt-2 w-64 max-h-[360px] overflow-y-auto rounded-2xl border border-white/10 bg-[#121212]/95 backdrop-blur-xl p-2.5 z-40 shadow-2xl scrollbar-thin"
                >
                  {['frontend', 'runtime', 'wasm', 'preview'].map(category => (
                    <div key={category} className="mb-3 last:mb-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40 px-2 block mb-1">
                        {category === 'frontend' ? 'Frontend Dev' : category === 'runtime' ? 'Browser Runtimes' : category === 'wasm' ? 'WebAssembly Runtimes' : 'Utility & Markup'}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        {LANGUAGES.filter(l => l.category === category).map(lang => (
                          <button
                            key={lang.id}
                            onClick={() => {
                              onLangChange(lang.id);
                              setIsLangOpen(false);
                            }}
                            className={`flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                              selectedLang === lang.id
                                ? 'bg-[#B600A8]/20 text-white'
                                : 'hover:bg-white/5 text-[#D7E2EA]/70'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span>{lang.name}</span>
                              <span className="text-[9px] opacity-40 font-mono">{lang.runtime}</span>
                            </div>
                            {selectedLang === lang.id && <Check size={12} className="text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center Branding */}
      <div className="hidden md:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#B600A8]" />
        <span className="text-xs uppercase tracking-[0.2em] font-black text-[#D7E2EA]">
          Avinish DevLab
        </span>
      </div>

      {/* Right Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          id="run-code-btn"
          className="flex items-center gap-1.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider px-5 py-2 transition-transform active:scale-95 hover:bg-slate-200 cursor-pointer"
        >
          <Play size={12} fill="currentColor" />
          Run
        </button>
        
        <button
          onClick={onReset}
          aria-label="Reset active code"
          className="hidden md:inline-flex p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/85 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
        >
          <RotateCcw size={13} />
        </button>
        
        <button
          onClick={onClear}
          aria-label="Clear active code"
          className="hidden md:inline-flex p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/85 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
        >
          <Trash2 size={13} />
        </button>
        
        <button
          onClick={onCopy}
          aria-label="Copy active code"
          className="hidden md:inline-flex p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/80 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
        >
          <Copy size={13} />
        </button>
        
        <button
          onClick={onDownload}
          aria-label="Download script file"
          className="hidden md:inline-flex p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/80 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
        >
          <Download size={13} />
        </button>
        
        <button
          onClick={onToggleFullscreen}
          aria-label="Toggle Fullscreen Workspace"
          className="hidden md:inline-flex p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/80 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>

        {/* AI Chat Assistant Toggle */}
        <button
          onClick={onToggleAi}
          aria-label="Toggle AI Chat Assistant"
          className={`hidden md:inline-flex p-2 border rounded-full transition-all active:scale-95 duration-200 cursor-pointer ${
            isAiOpen 
              ? 'border-[#B600A8]/45 bg-[#B600A8]/10 text-white shadow-[0_0_15px_rgba(182,0,168,0.25)]' 
              : 'border-white/10 text-[#D7E2EA]/80 hover:bg-white/5 hover:border-white/20'
          }`}
        >
          <Sparkles size={13} className={isAiOpen ? 'animate-pulse' : ''} />
        </button>

        {/* Ambient Music Toggle */}
        <button
          onClick={onToggleAudio}
          aria-label="Toggle Ambient Audio Player"
          className={`hidden md:inline-flex p-2 border rounded-full transition-all active:scale-95 duration-200 cursor-pointer ${
            isAudioPlaying 
              ? 'border-[#7621B0]/45 bg-[#7621B0]/10 text-white shadow-[0_0_15px_rgba(118,33,176,0.25)]' 
              : 'border-white/10 text-[#D7E2EA]/80 hover:bg-white/5 hover:border-white/20'
          }`}
        >
          <Music size={13} className={isAudioPlaying ? 'animate-bounce' : ''} style={{ animationDuration: '2.5s' }} />
        </button>

        {/* Settings menu toggle dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/80 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
          >
            <Settings size={13} />
          </button>
          <AnimatePresence>
            {showSettings && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowSettings(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#121212]/95 backdrop-blur-xl p-4 z-40 shadow-2xl flex flex-col gap-3 select-none"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40">Editor Settings</span>
                  
                  {/* Font scale adjustment */}
                  <div className="flex items-center justify-between text-xs font-semibold text-[#D7E2EA]/85">
                    <span>Font Size</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                        className="w-5 h-5 flex items-center justify-center border border-white/10 rounded hover:bg-white/5 active:scale-90 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-[10px] font-mono">{fontSize}px</span>
                      <button
                        type="button"
                        onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                        className="w-5 h-5 flex items-center justify-center border border-white/10 rounded hover:bg-white/5 active:scale-90 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Minimap toggle */}
                  <label className="flex items-center justify-between text-xs font-semibold text-[#D7E2EA]/85 cursor-pointer">
                    <span>Minimap</span>
                    <input
                      type="checkbox"
                      checked={showMinimap}
                      onChange={(e) => setShowMinimap(e.target.checked)}
                      className="accent-[#B600A8]"
                    />
                  </label>

                  {/* Digital Dust toggle */}
                  <label className="flex items-center justify-between text-xs font-semibold text-[#D7E2EA]/85 cursor-pointer">
                    <span>Digital Dust</span>
                    <input
                      type="checkbox"
                      checked={isDustEnabled}
                      onChange={toggleDust}
                      className="accent-[#B600A8]"
                    />
                  </label>

                  {/* Word wrap toggle */}
                  <label className="flex items-center justify-between text-xs font-semibold text-[#D7E2EA]/85 cursor-pointer">
                    <span>Word Wrap</span>
                    <input
                      type="checkbox"
                      checked={showWordWrap}
                      onChange={(e) => setShowWordWrap(e.target.checked)}
                      className="accent-[#B600A8]"
                    />
                  </label>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile controls drawer trigger */}
        <button
          onClick={onShowMobileMenu}
          aria-label="Open Workspace Settings"
          className="flex md:hidden p-2 border border-white/10 hover:border-white/20 rounded-full text-[#D7E2EA]/85 hover:bg-white/5 transition-colors active:scale-95 cursor-pointer"
        >
          <Settings size={13} />
        </button>
      </div>
    </header>
  );
};

export default React.memo(WorkspaceHeader);
