import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, Trash2, Calendar, User, Ghost } from 'lucide-react';
import DeleteConfirmation from './DeleteConfirmation';

const MessageCard = ({ message, onDelete, isDeleting }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCopy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Safely cast to string to prevent crashes if spreadsheet returns numbers
  const nameStr = String(message.name || '');
  const emailStr = String(message.email || '');
  const phoneStr = String(message.phone || '');

  // Improved anonymous detection
  const isAnonymous = message.type === 'anonymous' || !message.email || emailStr.toLowerCase() === 'anonymous' || nameStr.toLowerCase() === 'anonymous';
  const date = message.timestamp ? new Date(message.timestamp).toLocaleString() : 'Unknown date';

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors group flex flex-col"
      >
        {/* Card Header */}
        <div className="p-5 flex flex-col sm:flex-row gap-4 sm:items-start justify-between border-b border-white/5">
          <div className="flex items-start gap-4">
            <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center border ${isAnonymous ? 'bg-white/5 border-white/10' : 'bg-gradient-to-br from-[#7621B0]/20 to-[#B600A8]/20 border-[#B600A8]/30'}`}>
              {isAnonymous ? (
                <Ghost size={18} className="text-white/40" />
              ) : (
                <User size={18} className="text-[#B600A8]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-base font-medium text-white/90">
                  {nameStr && nameStr.toLowerCase() !== 'anonymous' ? message.name : 'Anonymous User'}
                </h3>
                {isAnonymous && (
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/40 text-[10px] font-medium tracking-wide uppercase flex items-center gap-1">
                    <Ghost size={10} /> Anonymous
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <Calendar size={12} />
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              title="Delete Message"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Card Details (Always Visible) */}
        <div className="p-5 flex flex-col gap-4">
          {/* Contact Info (if available and not fully anonymous) */}
          {(!isAnonymous || (emailStr && emailStr.toLowerCase() !== 'anonymous') || (phoneStr && phoneStr.toLowerCase() !== 'not provided' && phoneStr.toLowerCase() !== 'anonymous')) && (
            <div className="flex flex-wrap gap-3">
              {emailStr && emailStr.toLowerCase() !== 'anonymous' && emailStr.toLowerCase() !== 'not provided' && (
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Mail size={13} className="text-white/40" />
                  <span className="text-sm text-white/80">{message.email}</span>
                  <button 
                    onClick={() => handleCopy(message.email, 'email')}
                    className="ml-1 text-white/40 hover:text-white transition-colors"
                  >
                    {copiedField === 'email' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  </button>
                </div>
              )}
              {phoneStr && phoneStr.toLowerCase() !== 'anonymous' && phoneStr.toLowerCase() !== 'not provided' && (
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Phone size={13} className="text-white/40" />
                  <span className="text-sm text-white/80">{message.phone}</span>
                  <button 
                    onClick={() => handleCopy(message.phone, 'phone')}
                    className="ml-1 text-white/40 hover:text-white transition-colors"
                  >
                    {copiedField === 'phone' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Message Content */}
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
              {message.message || <span className="italic text-white/30">No message content provided.</span>}
            </p>
          </div>
        </div>
      </motion.div>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(message.id);
          setIsDeleteModalOpen(false);
        }}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default MessageCard;
