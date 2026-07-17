import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';

const DeveloperAccessDialog = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  // Expected access code from env, defaulting to 'INBOX'
  const expectedCode = import.meta.env.VITE_DEV_ACCESS_CODE || 'INBOX';

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === expectedCode.toUpperCase()) {
      onSuccess();
    } else {
      setError(true);
      setCode('');
      setTimeout(() => setError(false), 500); // Reset shake after 500ms
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={
              error
                ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: error ? 0.4 : 0.2,
              type: error ? 'tween' : 'spring',
            }}
            className="relative w-full max-w-sm mx-4 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-white/90">
                <Lock size={16} className="text-[#B600A8]" />
                <h3 className="font-medium text-sm tracking-wide">Developer Access</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white/90 transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-white/60 text-xs mb-4">Enter access code to unlock the inbox.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    ref={inputRef}
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Access Code"
                    className={`w-full bg-white/5 border ${
                      error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#B600A8]/50'
                    } rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20`}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {error && (
                    <p className="text-red-400 text-[11px] mt-2 ml-1">Invalid access code</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-white/50 hover:text-white/90 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#7621B0] to-[#B600A8] hover:opacity-90 text-white text-xs font-medium rounded-lg transition-opacity"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeveloperAccessDialog;
