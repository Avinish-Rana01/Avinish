import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InboxHeader from './InboxHeader';
import SearchBar from './SearchBar';
import MessageList from './MessageList';
import useDeveloperInbox from '../../hooks/useDeveloperInbox';

const DeveloperInbox = ({ isOpen, onClose }) => {
  const {
    messages,
    totalCount,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filterMode,
    setFilterMode,
    refresh,
    deleteMessage
  } = useDeveloperInbox();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex pointer-events-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl ml-auto h-full bg-[#0C0C0C] border-l border-white/10 shadow-2xl flex flex-col overscroll-contain"
            data-lenis-prevent="true"
          >
            <InboxHeader
              totalCount={totalCount}
              onRefresh={refresh}
              onClose={onClose}
              isLoading={isLoading}
            />

            <div className="px-4 sm:px-8 py-4 border-b border-white/5 bg-white/[0.01]">
              <SearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                filterMode={filterMode}
                setFilterMode={setFilterMode}
              />
            </div>

            <MessageList
              messages={messages}
              isLoading={isLoading}
              error={error}
              onDelete={deleteMessage}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeveloperInbox;
