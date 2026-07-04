import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDevLabGuide } from '../../hooks/useDevLabGuide';
import GuideCharacter from './GuideCharacter';
import SpeechBubble from './SpeechBubble';

const DevLabGuide = ({ onComplete }) => {
  const { isVisible, completeIntro } = useDevLabGuide(onComplete);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Subtle dimming and blurring backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9950] pointer-events-auto"
            onClick={(e) => {
              // Clicking outside does nothing as requested
              e.stopPropagation();
            }}
          />

          {/* Guide Character cutout (z-index 9970) */}
          <GuideCharacter />

          {/* Chat Speech Bubble (z-index 9975) */}
          <SpeechBubble onComplete={completeIntro} />
        </>
      )}
    </AnimatePresence>
  );
};

export default DevLabGuide;
