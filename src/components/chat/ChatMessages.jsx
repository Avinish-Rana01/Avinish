import React, { useRef, useEffect, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionChips from './SuggestionChips';

const ChatMessages = ({ messages, isThinking, onSendPrompt, isWaiting }) => {
  const containerRef = useRef(null);
  const isAtBottomRef = useRef(true);

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  // Monitor user scroll direction to prevent auto-scrolling hijack
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      const threshold = 40; // Pixels from bottom
      const position = el.scrollTop + el.clientHeight;
      isAtBottomRef.current = position >= el.scrollHeight - threshold;
    }
  }, []);

  // Auto scroll when message list changes
  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, isThinking, scrollToBottom]);

  // Initial scroll on open
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      data-lenis-prevent="true"
      style={{
        flex: 1,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(215, 226, 234, 0.1) transparent',
      }}
    >
      {/* Welcome Message (displayed when history is empty) */}
      {messages.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start',
            maxWidth: '90%',
            animation: 'ai-bubble-slide 0.3s ease-out',
          }}
        >
          <div
            style={{
              borderRadius: '16px 16px 16px 4px',
              padding: '16px',
              background: 'rgba(215, 226, 234, 0.03)',
              border: '1px solid rgba(215, 226, 234, 0.06)',
              fontFamily: "'Kanit', sans-serif",
              fontSize: '14px',
              color: '#D7E2EA',
              lineHeight: 1.5,
            }}
          >
            <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>👋 Hi!</p>
            <p style={{ margin: '0 0 12px 0' }}>I'm Avinish's AI Assistant.</p>
            <p style={{ margin: '0 0 8px 0', opacity: 0.8 }}>I can answer questions about:</p>
            <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'circle', display: 'flex', flexDirection: 'column', gap: '4px', opacity: 0.85 }}>
              <li>Projects & Live Links</li>
              <li>Work Experience & Internships</li>
              <li>Technical Skills & Tools</li>
              <li>Resume PDF Download</li>
              <li>Contact Details & Socials</li>
            </ul>
          </div>
        </div>
      )}

      {/* Render Conversation Bubbles */}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Thinking Status Indicator */}
      {isThinking && <TypingIndicator />}

      {/* Suggestion Chips */}
      {messages.length === 0 && (
        <SuggestionChips onSelect={onSendPrompt} disabled={isWaiting} />
      )}
    </div>
  );
};

export default ChatMessages;
