import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageCard from './MessageCard';
import { Inbox, AlertCircle } from 'lucide-react';

const MessageList = ({ messages, isLoading, error, onDelete }) => {
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col gap-4 p-8 overflow-y-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle size={48} className="text-red-500/50 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Failed to load messages</h3>
        <p className="text-white/40 text-sm max-w-sm">{error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          <Inbox size={32} className="text-white/20" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No messages found</h3>
        <p className="text-white/40 text-sm">Your inbox is completely empty.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-hide overscroll-contain" data-lenis-prevent="true">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.5) }}
            >
              <MessageCard
                message={msg}
                onDelete={onDelete}
                isDeleting={false} // State is managed in parent hook, could pass specific ID if needed
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageList;
