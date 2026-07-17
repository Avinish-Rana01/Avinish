import React from 'react';
import { useUI } from '../../../context/UIContext';

const EditorSettingsGroup = ({
  fontSize,
  setFontSize,
  showMinimap,
  setShowMinimap,
  showWordWrap,
  setShowWordWrap
}) => {
  const { isDustEnabled, toggleDust } = useUI();

  return (
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

      {/* Digital Dust toggle */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-white">Digital Dust</span>
        <button
          onClick={toggleDust}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${isDustEnabled ? 'bg-[#B600A8]' : 'bg-white/10'}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${isDustEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
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
  );
};

export default React.memo(EditorSettingsGroup);
