import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SpeechBubble = ({ onComplete }) => {
  const primaryButtonRef = useRef(null);
  const skipButtonRef = useRef(null);

  // Auto focus the primary CTA button when bubble completes animation
  useEffect(() => {
    const timer = setTimeout(() => {
      primaryButtonRef.current?.focus();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Trap focus between "Let's Build" and "Skip" on mobile/desktop
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      const active = document.activeElement;
      if (e.shiftKey) {
        // Shift + Tab: Focus Skip if on Primary
        if (active === primaryButtonRef.current) {
          e.preventDefault();
          skipButtonRef.current?.focus();
        }
      } else {
        // Tab: Focus Primary if on Skip
        if (active === skipButtonRef.current) {
          e.preventDefault();
          primaryButtonRef.current?.focus();
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { 
          type: 'spring',
          damping: 22,
          stiffness: 150,
          delay: 0.5 
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95, 
        y: 10,
        transition: { duration: 0.3 }
      }}
      whileHover={{ 
        y: -4,
        boxShadow: '0 20px 40px rgba(182, 0, 168, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      onKeyDown={handleKeyDown}
      className="fixed z-[9975] p-6 sm:p-8 rounded-[28px] border border-white/10 bg-[#121212]/85 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col gap-4 select-none
                 bottom-[190px] xs:bottom-[210px] sm:bottom-[230px] md:bottom-[160px] 
                 left-4 right-4 sm:left-[170px] sm:right-auto md:left-[clamp(250px,29vw,430px)] 
                 max-w-md md:max-w-xl"
    >
      {/* Speech bubble tail pointing bottom-left */}
      <div 
        className="absolute -bottom-2 left-10 w-4 h-4 bg-[#121212]/95 border-r border-b border-white/10 rotate-[45deg]"
        style={{ backdropFilter: 'blur(20px)' }}
      />

      {/* 1. Speech bubble Title */}
      <motion.h2
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.4 } }}
        className="text-lg sm:text-xl font-black uppercase tracking-wider text-white flex items-center gap-2"
      >
        👋 Hey, I'm Avinish!
      </motion.h2>

      {/* 2. Speech bubble Body paragraphs */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.4 } }}
        className="flex flex-col gap-2 text-xs sm:text-sm font-medium leading-relaxed text-[#D7E2EA]/75 text-left"
      >
        <p>Thanks for checking out my portfolio.</p>
        <p>
          Welcome to <strong className="text-white">DevLab</strong> — my personal browser-powered coding playground.
          Here you can write, run, and experiment with different programming languages directly in your browser.
        </p>
        <p className="opacity-60 text-[11px] sm:text-xs">
          Everything you're about to explore is part of my portfolio and reflects how I enjoy building modern developer experiences.
          Have fun exploring—and if something inspires you, I'd love to hear from you. 🚀
        </p>
      </motion.div>

      {/* 3. Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.4 } }}
        className="flex flex-col xs:flex-row items-center gap-3 w-full sm:w-auto mt-2"
      >
        {/* Let's Build CTA button */}
        <button
          ref={primaryButtonRef}
          onClick={onComplete}
          className="w-full xs:w-auto inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-widest text-white cursor-pointer px-8 py-3 text-xs transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #7621B0 0%, #B600A8 100%)',
            boxShadow: '0 4px 15px rgba(181, 1, 167, 0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(181, 1, 167, 0.65)';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(181, 1, 167, 0.25)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Let's Build 🚀
        </button>

        {/* Skip button */}
        <button
          ref={skipButtonRef}
          onClick={onComplete}
          className="w-full xs:w-auto text-xs uppercase tracking-widest font-bold text-[#D7E2EA]/50 hover:text-white/90 py-3 transition-colors active:scale-95 duration-200"
        >
          Skip
        </button>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(SpeechBubble);
