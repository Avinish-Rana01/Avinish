import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import useChat from '../../hooks/useChat';

const ChatPanel = ({ isOpen, onClose }) => {
  const { messages, isThinking, isTyping, sendMessage, clearChat } = useChat();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const panelRef = useRef(null);

  // Resize listener to toggle layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Escape key listener to close panel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap inside the chat panel for accessibility
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableElements = panelRef.current.querySelectorAll(
      'button, textarea, [href], input, select, [tabindex="0"]'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    // Focus first element on open
    setTimeout(() => firstElement.focus(), 150);

    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Handle outside click to close side sheet on desktop
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest('#nav-chat') &&
        !e.target.closest('button[aria-label*="AI Assistant"]')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  // Responsive motion variants
  const desktopVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  const mobileVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay (Mobile only, semi-transparent backdrop) */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000000',
                zIndex: 9980,
              }}
              onClick={onClose}
            />
          )}

          {/* Main Sheet Container */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Avinish AI Assistant"
            tabIndex="-1"
            variants={isMobile ? mobileVariants : desktopVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'tween', ease: [0.25, 0.1, 0.25, 1], duration: 0.35 }}
            style={{
              position: 'fixed',
              background: '#0C0C0C',
              borderLeft: isMobile ? 'none' : '1px solid rgba(215, 226, 234, 0.08)',
              borderTop: isMobile ? '1px solid rgba(215, 226, 234, 0.1)' : 'none',
              boxShadow: isMobile
                ? '0 -8px 32px rgba(0, 0, 0, 0.5)'
                : '-8px 0 32px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9985,
              // Responsive dimensions
              bottom: 0,
              right: 0,
              top: isMobile ? 'auto' : 0,
              height: isMobile ? '88%' : '100%', // 88% of screen height on mobile
              width: isMobile ? '100%' : 'clamp(420px, 30vw, 460px)',
              borderRadius: isMobile ? '24px 24px 0 0' : '0',
              overflow: 'hidden',
            }}
          >
            {/* Header Area */}
            <ChatHeader onClose={onClose} onClear={clearChat} />

            {/* Scrollable Message List */}
            <ChatMessages
              messages={messages}
              isThinking={isThinking}
              onSendPrompt={sendMessage}
              isWaiting={isThinking || isTyping}
            />

            {/* Sticky Text Input */}
            <ChatInput onSend={sendMessage} disabled={isThinking || isTyping} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;
