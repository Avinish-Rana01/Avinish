import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import FloatingInput from './FloatingInput';
import FloatingTextarea from './FloatingTextarea';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const INTRO_TEXT = {
  reply:
    "I'd genuinely love to hear from you. Whether it's feedback, collaboration, or simply saying hello — I'll personally read every message.",
  anonymous:
    'Sometimes the most honest thoughts come without introductions. Feel free to share anything anonymously.',
};

const MessageForm = ({
  mode,
  formData,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit,
  onBack,
  showWarning,
}) => {
  const isReply = mode === 'reply';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      className="w-full max-w-xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.05 }}
        onClick={onBack}
        disabled={isSubmitting}
        className="
          group flex items-center gap-2.5 mb-6
          text-sm text-[#646973]
          disabled:opacity-40 disabled:cursor-not-allowed
          outline-none focus-visible:text-[#B600A8]
        "
        style={{
          fontFamily: "'Inter', sans-serif",
          transition: 'color 0.3s ease',
        }}
        aria-label="Go back to mode selection"
        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.color = '#D7E2EA')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#646973')}
      >
        <motion.span
          className="inline-flex"
          whileHover={{ x: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ArrowLeft size={15} />
        </motion.span>
        <span className="uppercase tracking-[0.15em] text-[11px]">Back</span>
      </motion.button>

      {/* Mode indicator badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 300, damping: 28 }}
        className="mb-3"
      >
        <span
          className="
            relative inline-flex items-center gap-2 px-3.5 py-1.5
            rounded-full text-[11px] uppercase tracking-[0.15em]
            bg-white/[0.04] border border-white/[0.06]
            text-[#B600A8]/90 overflow-hidden
          "
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {/* Subtle animated glow behind badge */}
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(118,33,176,0.3), rgba(182,0,168,0.15))',
            }}
          />
          {/* Active dot */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B600A8] opacity-40" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#B600A8]" />
          </span>
          <span className="relative">{isReply ? '👋' : '🎭'}</span>
          <span className="relative">{isReply ? 'Say Hello' : 'Anonymous Thought'}</span>
        </span>
      </motion.div>

      {/* Introduction text */}
      <motion.p
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-[12px] sm:text-[13px] text-[#646973]/80 font-light leading-relaxed mb-6 max-w-md"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {INTRO_TEXT[mode]}
      </motion.p>

      {/* Form container with glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 250, damping: 28 }}
        className="relative rounded-2xl p-4 sm:p-6"
        style={{
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.04)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.15), 0 0 80px rgba(118,33,176,0.04), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* Ambient glow behind form */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(118,33,176,0.06), transparent)',
          }}
        />

        <form onSubmit={handleFormSubmit} noValidate>
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {/* Reply-only fields */}
              {isReply && (
                <>
                  <FloatingInput
                    key="name"
                    id="contact-name"
                    label="Full Name"
                    value={formData.name}
                    onChange={(v) => onUpdateField('name', v)}
                    error={errors.name}
                    disabled={isSubmitting}
                  />
                  <FloatingInput
                    key="phone"
                    id="contact-phone"
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(v) => onUpdateField('phone', v)}
                    error={errors.phone}
                    disabled={isSubmitting}
                  />
                  <FloatingInput
                    key="email"
                    id="contact-email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(v) => onUpdateField('email', v)}
                    error={errors.email}
                    disabled={isSubmitting}
                  />
                </>
              )}

              {/* Message textarea — always visible */}
              <FloatingTextarea
                key="message"
                id="contact-message"
                label="Your Message"
                value={formData.message}
                onChange={(v) => onUpdateField('message', v)}
                error={errors.message}
                disabled={isSubmitting}
                rows={isReply ? 3 : 5}
                mode={mode}
              />
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showWarning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 rounded-xl border font-light text-xs sm:text-sm leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  borderColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#FCD34D',
                }}
              >
                <strong>Quick Tip:</strong> You haven't provided an email or phone number. I won't be able to contact you back! You can add them above, or click Send again to submit anyway.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 28 }}
            className="mt-5"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? {
                scale: 1.015,
                y: -1,
              } : {}}
              whileTap={!isSubmitting ? { scale: 0.985 } : {}}
              className="
                relative w-full sm:w-auto px-8 py-3 rounded-xl
                text-[12px] font-medium uppercase tracking-[0.15em]
                text-white
                outline-none
                focus-visible:ring-2 focus-visible:ring-[#7621B0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]
                disabled:cursor-not-allowed
                flex items-center justify-center gap-3
                overflow-hidden
              "
              style={{
                fontFamily: "'Inter', sans-serif",
                background: isSubmitting
                  ? 'linear-gradient(135deg, #5a1a8a 0%, #8a0080 100%)'
                  : 'linear-gradient(135deg, #7621B0 0%, #B600A8 100%)',
                boxShadow: isSubmitting
                  ? '0 2px 15px rgba(118,33,176,0.15)'
                  : '0 2px 20px rgba(118,33,176,0.2)',
                opacity: isSubmitting ? 0.8 : 1,
                transition: 'box-shadow 0.4s ease, opacity 0.3s ease, background 0.4s ease',
              }}
            >
              {/* Hover shimmer effect */}
              {!isSubmitting && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                  }}
                />
              )}

              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2.5"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-flex"
                    >
                      <Loader2 size={16} />
                    </motion.span>
                    <span>Sending...</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2.5"
                  >
                    <span>
                      {isReply ? 'Send Message' : 'Leave Anonymous Thought'}
                    </span>
                    <motion.span
                      className="inline-flex"
                      whileHover={{ x: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MessageForm;
