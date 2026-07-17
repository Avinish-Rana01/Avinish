import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLACEHOLDER_PROMPTS = [
  'Tell me about your idea...',
  "Share your thoughts...",
  "Let's build something together.",
  'Say hello 👋',
  'What excites you about design?',
];

const FloatingTextarea = ({
  id,
  label,
  value,
  onChange,
  error,
  disabled = false,
  rows = 4,
  mode = 'reply',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  const [promptIndex, setPromptIndex] = useState(0);
  const intervalRef = useRef(null);

  // Rotate placeholder prompts when empty and not focused
  useEffect(() => {
    if (value.length > 0 || isFocused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [value, isFocused]);

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative group">
        <motion.textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className={`
            w-full px-5 pt-6 pb-2.5 rounded-xl resize-none
            bg-white/[0.03] backdrop-blur-sm
            text-[#D7E2EA] text-[15px] font-light leading-relaxed
            border outline-none
            placeholder-transparent
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${isFocused
              ? 'bg-white/[0.06] border-[#7621B0]/40 shadow-[0_0_24px_rgba(118,33,176,0.12),inset_0_1px_2px_rgba(0,0,0,0.2)]'
              : 'border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]'
            }
            ${error ? 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.08),inset_0_1px_2px_rgba(0,0,0,0.2)]' : ''}
          `}
          style={{
            fontFamily: "'Inter', sans-serif",
            caretColor: isFocused ? '#B600A8' : '#D7E2EA',
          }}
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`
            absolute left-5 pointer-events-none
            transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${isActive
              ? 'top-2.5 text-[11px] tracking-wide font-normal'
              : 'top-5 text-[15px] font-light'
            }
            ${isFocused ? 'text-[#B600A8]' : 'text-[#646973]'}
            ${error && !isFocused ? 'text-red-400/80' : ''}
          `}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label}
        </label>

        {/* Rotating placeholder prompts — visible only when empty and not focused */}
        <AnimatePresence mode="wait">
          {!isActive && !isFocused && (
            <motion.span
              key={promptIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.35, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-5 top-12 text-[13px] text-[#646973] font-light pointer-events-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
              aria-hidden="true"
            >
              {PLACEHOLDER_PROMPTS[promptIndex]}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Focus glow line at bottom */}
        <motion.div
          className="absolute bottom-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
          initial={false}
          animate={{
            opacity: isFocused ? 1 : 0,
            scaleX: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(182,0,168,0.4), transparent)',
          }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto', marginTop: 6 }}
            exit={{ opacity: 0, y: -4, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-red-400/90 text-[11px] ml-1 font-light tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingTextarea;
