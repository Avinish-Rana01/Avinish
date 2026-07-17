import React from 'react';
import { ArrowLeft } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';
import ActionGroup from './ActionGroup';

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
        
        <LanguageDropdown 
          selectedLang={selectedLang}
          isLangOpen={isLangOpen}
          setIsLangOpen={setIsLangOpen}
          onLangChange={onLangChange}
        />
      </div>

      {/* Center Branding */}
      <div className="hidden md:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#B600A8]" />
        <span className="text-xs uppercase tracking-[0.2em] font-black text-[#D7E2EA]">
          Avinish DevLab
        </span>
      </div>

      {/* Right Action buttons */}
      <ActionGroup 
        onRun={onRun}
        onReset={onReset}
        onClear={onClear}
        onCopy={onCopy}
        onDownload={onDownload}
        onToggleFullscreen={onToggleFullscreen}
        isFullscreen={isFullscreen}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showMinimap={showMinimap}
        setShowMinimap={setShowMinimap}
        showWordWrap={showWordWrap}
        setShowWordWrap={setShowWordWrap}
        onShowMobileMenu={onShowMobileMenu}
        isAiOpen={isAiOpen}
        onToggleAi={onToggleAi}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={onToggleAudio}
      />
    </header>
  );
};

export default React.memo(WorkspaceHeader);
