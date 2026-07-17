import React from 'react';
import { motion } from 'framer-motion';

const MODES = [
  {
    key: 'reply',
    emoji: '👋',
    title: 'Say Hello',
    description: "Introduce yourself and I'll personally get back to you.",
  },
  {
    key: 'anonymous',
    emoji: '🎭',
    title: 'Leave a Thought',
    description: 'Share your thoughts anonymously.',
  },
];

const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 50,
    scale: 0.95,
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 24,
      delay: i * 0.12,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ModeSelector = ({ onSelect }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full max-w-3xl mx-auto"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {MODES.map((mode, i) => (
        <motion.div
          key={mode.key}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="button"
          tabIndex={0}
          aria-label={`${mode.title} — ${mode.description}`}
          onClick={() => onSelect(mode.key)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(mode.key);
            }
          }}
          whileHover={{
            scale: 1.02,
            y: -3,
            transition: { type: 'spring', stiffness: 400, damping: 28 },
          }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative group cursor-pointer
            rounded-2xl p-6 sm:p-7 md:p-8
            bg-white/[0.03] backdrop-blur-xl
            border border-white/[0.06]
            outline-none
            focus-visible:ring-2 focus-visible:ring-[#7621B0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]
            overflow-hidden select-none
          `}
          style={{
            transition: 'box-shadow 0.5s cubic-bezier(0.25,0.1,0.25,1)',
          }}
        >
          {/* Gradient overlay on hover */}
          <div
            className="
              absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
              pointer-events-none
            "
            style={{
              background:
                'linear-gradient(135deg, rgba(118,33,176,0.06) 0%, rgba(182,0,168,0.03) 50%, transparent 100%)',
              transition: 'opacity 0.6s cubic-bezier(0.25,0.1,0.25,1)',
            }}
          />

          {/* Top glow line */}
          <div
            className="
              absolute top-0 left-[10%] right-[10%] h-[1px]
              opacity-0 group-hover:opacity-100
              pointer-events-none
            "
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(182,0,168,0.35), transparent)',
              transition: 'opacity 0.6s cubic-bezier(0.25,0.1,0.25,1)',
            }}
          />

          {/* Hover shadow — applied via style for smoother GPU transition */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              boxShadow: '0 8px 40px rgba(118,33,176,0.15), 0 0 60px rgba(182,0,168,0.06)',
              transition: 'opacity 0.5s cubic-bezier(0.25,0.1,0.25,1)',
            }}
          />

          <div className="relative z-10">
            {/* Emoji */}
            <motion.span
              className="text-3xl sm:text-4xl block mb-4"
              whileHover={{ scale: 1.1, rotate: mode.key === 'reply' ? 12 : -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              {mode.emoji}
            </motion.span>

            {/* Title */}
            <h3
              className="text-lg sm:text-xl font-semibold text-[#D7E2EA] mb-2 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {mode.title}
            </h3>

            {/* Description */}
            <p
              className="text-xs sm:text-[13px] text-[#646973] font-light leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {mode.description}
            </p>

            {/* Arrow indicator */}
            <div
              className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#646973] group-hover:text-[#B600A8]/80"
              style={{
                fontFamily: "'Inter', sans-serif",
                transition: 'color 0.4s cubic-bezier(0.25,0.1,0.25,1)',
              }}
            >
              <span>Select</span>
              <motion.span
                className="inline-block"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ModeSelector;
