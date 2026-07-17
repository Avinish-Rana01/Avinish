import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickActionsGrid from './QuickActionsGrid';
import FeatureCards from './FeatureCards';
import EditorSettingsGroup from './EditorSettingsGroup';

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
              <QuickActionsGrid 
                handleReset={handleReset}
                handleClear={handleClear}
                handleCopyCode={handleCopyCode}
                handleDownloadCode={handleDownloadCode}
                setShowMobileMenu={setShowMobileMenu}
              />

              <FeatureCards 
                isAiOpen={isAiOpen}
                toggleAi={toggleAi}
                isAudioPlaying={isAudioPlaying}
                toggleAudio={toggleAudio}
                setShowMobileMenu={setShowMobileMenu}
              />
            </div>

            {/* Editor Toggles */}
            <EditorSettingsGroup 
              fontSize={fontSize}
              setFontSize={setFontSize}
              showMinimap={showMinimap}
              setShowMinimap={setShowMinimap}
              showWordWrap={showWordWrap}
              setShowWordWrap={setShowWordWrap}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(MobileActionsDrawer);
