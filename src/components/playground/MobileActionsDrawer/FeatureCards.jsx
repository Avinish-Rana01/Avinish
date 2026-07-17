import React from 'react';
import { Sparkles, Music } from 'lucide-react';

const FeatureCards = ({
  isAiOpen,
  toggleAi,
  isAudioPlaying,
  toggleAudio,
  setShowMobileMenu
}) => {
  return (
    <>
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
    </>
  );
};

export default React.memo(FeatureCards);
