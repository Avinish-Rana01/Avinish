import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const SuccessOverlay = ({ isVisible, mode, onDismiss }) => {
  // ESC key closes overlay
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);

  const subtext =
    mode === 'reply'
      ? "Thanks for leaving a message. I'll get back to you soon."
      : 'Thanks for leaving your thoughts.';

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
          aria-label="Message sent successfully"
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
          >
            {/* Animated check icon */}
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
                    opacity: [0, 0.3, 0],
                    scale: [0.8, 1.4, 1.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeOut',
                  }}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)',
                  }}
                />
                {/* Check circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                  }}
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Check
                      size={28}
                      className="text-emerald-400"
                      strokeWidth={2}
                    />
                  </motion.div>
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
              Message Delivered
            </motion.h3>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[13px] sm:text-sm text-[#646973] font-light max-w-xs leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {subtext}
            </motion.p>

            {/* Progress bar showing auto-dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 w-24 h-[1.5px] rounded-full overflow-hidden bg-white/[0.06]"
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'rgba(34,197,94,0.4)' }}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessOverlay;
