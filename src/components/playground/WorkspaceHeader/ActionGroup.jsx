import React from 'react';
import { Play, RotateCcw, Trash2, Copy, Download, Maximize2, Minimize2, Sparkles, Music, Settings } from 'lucide-react';
import SettingsDropdown from './SettingsDropdown';

const ActionGroup = ({
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
  return (
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
        <SettingsDropdown 
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          fontSize={fontSize}
          setFontSize={setFontSize}
          showMinimap={showMinimap}
          setShowMinimap={setShowMinimap}
          showWordWrap={showWordWrap}
          setShowWordWrap={setShowWordWrap}
        />
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
  );
};

export default React.memo(ActionGroup);
