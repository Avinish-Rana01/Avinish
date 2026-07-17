import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useContactForm from '../../hooks/useContactForm';
import ModeSelector from './ModeSelector';
import MessageForm from './MessageForm';
import SuccessOverlay from './SuccessOverlay';
import ErrorOverlay from './ErrorOverlay';
import ContactButton from '../ContactButton';

const LeaveMessage = () => {
  const {
    selectedMode,
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    showWarning,
    selectMode,
    updateField,
    handleSubmit,
    dismissSuccess,
    dismissError,
    goBack,
  } = useContactForm();

  return (
    <section
      id="contact"
      className="relative w-full px-4 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 overflow-hidden flex flex-col justify-center"
      style={{
        background: '#0C0C0C',
        minHeight: 'calc(100svh - 5rem)',
      }}
    >
      {/* Ambient radial gradient — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(118,33,176,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Secondary ambient — form-area glow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          top: '55%',
          background:
            'radial-gradient(circle, rgba(118,33,176,0.035) 0%, transparent 65%)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Barely visible noise grain — CSS-only */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Section heading */}
      <div className="relative text-center mb-8 sm:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase"
          style={{ fontSize: 'clamp(2rem, 6vw, 64px)' }}
        >
          Leave a Message
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#646973]/80 font-light max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Choose how you'd like to connect. Whether you want a reply or prefer
          to stay anonymous — the choice is yours.
        </motion.p>
      </div>

      {/* Main interactive area */}
      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedMode && (
            <motion.div
              key="mode-selector"
              exit={{ opacity: 0, y: -15, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
            >
              <ModeSelector onSelect={selectMode} />
              
              <div className="flex justify-center mt-6 sm:mt-8">
                <ContactButton id="leave-message-contact-btn" />
              </div>
            </motion.div>
          )}

          {selectedMode && (
            <motion.div
              key="message-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 24,
                delay: 0.08,
              }}
              className="relative"
            >
              <MessageForm
                mode={selectedMode}
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                onUpdateField={updateField}
                onSubmit={handleSubmit}
                onBack={goBack}
                showWarning={showWarning}
              />

              {/* Overlays render over the form */}
              <SuccessOverlay
                isVisible={isSuccess}
                mode={selectedMode}
                onDismiss={dismissSuccess}
              />
              <ErrorOverlay
                isVisible={!!submitError}
                errorMessage={submitError}
                onDismiss={dismissError}
                onRetry={dismissError}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LeaveMessage;
