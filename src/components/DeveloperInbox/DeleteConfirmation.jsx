import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={!isDeleting ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm mx-4 bg-[#141414] border border-red-500/20 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Delete Message?</h3>
              <p className="text-sm text-white/50 mb-6">
                This action cannot be undone. The message will be permanently removed from Google Sheets.
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  {isDeleting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <RefreshCw size={16} />
                    </motion.div>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Need to import RefreshCw here for the spinner
import { RefreshCw } from 'lucide-react';

export default DeleteConfirmation;
