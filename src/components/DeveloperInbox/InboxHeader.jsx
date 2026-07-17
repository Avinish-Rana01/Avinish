import React from 'react';
import { RefreshCw, X, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const InboxHeader = ({ totalCount, onRefresh, onClose, isLoading }) => {
  return (
    <div className="flex items-center justify-between py-6 px-8 border-b border-white/5 bg-white/[0.01]">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-gradient-to-br from-[#7621B0]/20 to-[#B600A8]/20 rounded-xl border border-white/5">
          <LayoutDashboard size={24} className="text-[#B600A8]" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Developer Inbox</h2>
          <p className="text-sm text-white/40 mt-0.5">
            {totalCount} {totalCount === 1 ? 'Message' : 'Messages'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all disabled:opacity-50"
          title="Refresh"
        >
          <motion.div animate={{ rotate: isLoading ? 360 : 0 }} transition={{ repeat: isLoading ? Infinity : 0, duration: 1, ease: 'linear' }}>
            <RefreshCw size={18} />
          </motion.div>
        </button>
        <div className="w-px h-6 bg-white/10" />
        <button
          onClick={onClose}
          className="p-2.5 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          title="Close Inbox"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default InboxHeader;
