import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../../context/UIContext';

const SettingsDropdown = ({
  showSettings,
  setShowSettings,
  fontSize,
  setFontSize,
  showMinimap,
  setShowMinimap,
  showWordWrap,
  setShowWordWrap
}) => {
  const { isDustEnabled, toggleDust } = useUI();

  return (
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
  );
};

export default React.memo(SettingsDropdown);
