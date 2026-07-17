import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ErrorOverlay = ({ isVisible, onDismiss, onRetry }) => {
  // ESC key closes overlay
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl overflow-hidden"
          onClick={onDismiss}
          role="dialog"
          aria-label="Message delivery failed"
        >
          {/* Blurred backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'rgba(12,12,12,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 22,
              delay: 0.15,
            }}
            className="relative z-10 flex flex-col items-center text-center px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated X icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 16,
                delay: 0.25,
              }}
              className="mb-7"
            >
              <div className="relative">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.25, 0],
                    scale: [0.8, 1.4, 1.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeOut',
                  }}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
                  }}
                />
                {/* X circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.15)',
                  }}
                >
                  <X
                    size={26}
                    className="text-red-400/90"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xl sm:text-2xl font-semibold text-[#D7E2EA] mb-2.5 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Transmission Failed
            </motion.h3>

            {/* Reassuring explanation */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[13px] sm:text-sm text-[#646973] font-light max-w-xs leading-relaxed mb-7"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Your message is still safe.
              <br />
              Please try again.
            </motion.p>

            {/* Try Again button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.stopPropagation();
                onRetry();
              }}
              className="
                relative px-8 py-3 rounded-xl
                text-[11px] font-medium uppercase tracking-[0.15em]
                text-white
                outline-none
                focus-visible:ring-2 focus-visible:ring-[#7621B0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]
                overflow-hidden
              "
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'linear-gradient(135deg, #7621B0 0%, #B600A8 100%)',
                boxShadow: '0 2px 20px rgba(118,33,176,0.2)',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              Try Again
            </motion.button>

            {/* Dismiss hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-[10px] text-[#646973]/40 mt-5 font-light tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ESC to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorOverlay;
