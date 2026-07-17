import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Ghost, MessageSquare, Shield, Zap, Sparkles } from 'lucide-react';

const MODES = [
  {
    key: 'reply',
    icon: <Mail className="w-7 h-7 text-white" />,
    title: 'Start a Conversation',
    description: "Introduce yourself. I'll personally get back to you as soon as possible.",
    features: [
      { icon: <MessageSquare size={14} />, text: 'Personalized reply' },
      { icon: <Zap size={14} />, text: 'Project inquiries' },
      { icon: <Sparkles size={14} />, text: 'Direct contact' }
    ],
    accent: 'from-[#7621B0] to-[#B600A8]',
    borderHover: 'hover:border-[#B600A8]/40',
    shadowHover: 'hover:shadow-[0_0_40px_rgba(182,0,168,0.15)]',
    glowColor: 'rgba(182,0,168,0.4)',
  },
  {
    key: 'anonymous',
    icon: <Ghost className="w-7 h-7 text-white" />,
    title: 'Drop a Thought',
    description: 'Share feedback or critique my work completely anonymously.',
    features: [
      { icon: <Shield size={14} />, text: '100% Private' },
      { icon: <Ghost size={14} />, text: 'No email required' },
      { icon: <MessageSquare size={14} />, text: 'Honest feedback' }
    ],
    accent: 'from-white/20 to-white/5',
    borderHover: 'hover:border-white/20',
    shadowHover: 'hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]',
    glowColor: 'rgba(255,255,255,0.2)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 20 }
  },
};

const ModeSelector = ({ onSelect }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mx-auto px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {MODES.map((mode) => (
        <motion.div
          key={mode.key}
          variants={cardVariants}
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
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative group cursor-pointer
            rounded-3xl p-8 sm:p-10
            bg-[#0F0F0F]
            border border-white/5
            outline-none
            focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C]
            overflow-hidden select-none
            flex flex-col h-full min-h-[320px]
            transition-all duration-500 ease-out
            ${mode.borderHover} ${mode.shadowHover}
          `}
        >
          {/* Background Ambient Glow */}
          <div 
            className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 blur-[60px] pointer-events-none transition-opacity duration-700 ease-out"
            style={{ background: mode.glowColor }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Icon Box */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.accent} flex items-center justify-center mb-6 shadow-lg border border-white/10`}>
              {mode.icon}
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 tracking-tight font-['Syne',sans-serif]">
              {mode.title}
            </h3>
            <p className="text-[#646973] text-sm sm:text-base leading-relaxed mb-8 flex-grow">
              {mode.description}
            </p>

            {/* Features List */}
            <ul className="flex flex-col gap-3 mb-8">
              {mode.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/50 font-medium">
                  <span className="opacity-70">{feature.icon}</span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide text-white group-hover:text-white/80 transition-colors uppercase">
                Select Option
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:translate-x-1 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ModeSelector;
