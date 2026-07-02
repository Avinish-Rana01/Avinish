import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow height logic
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      // Max height clamp 120px
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);

  const handleSend = useCallback(() => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
    // Reset height
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  }, [text, onSend, disabled]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div
      style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(215, 226, 234, 0.06)',
        background: 'rgba(12, 12, 12, 0.95)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-end',
      }}
    >
      <div
        style={{
          flex: 1,
          position: 'relative',
          borderRadius: '24px',
          background: 'rgba(215, 226, 234, 0.03)',
          border: '1px solid rgba(215, 226, 234, 0.1)',
          padding: '4px 16px',
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = 'rgba(118, 33, 176, 0.4)';
          e.currentTarget.style.background = 'rgba(215, 226, 234, 0.05)';
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = 'rgba(215, 226, 234, 0.1)';
          e.currentTarget.style.background = 'rgba(215, 226, 234, 0.03)';
        }}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={disabled}
          rows={1}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: '#D7E2EA',
            fontFamily: "'Kanit', sans-serif",
            fontSize: '14px',
            lineHeight: '20px',
            padding: '8px 0',
            maxHeight: '120px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
        />
      </div>

      {/* Animated Send Button */}
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        aria-label="Send message"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: 'none',
          background: text.trim() && !disabled
            ? 'linear-gradient(135deg, #7621B0 0%, #B600A8 100%)'
            : 'rgba(215, 226, 234, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: text.trim() && !disabled ? 'pointer' : 'not-allowed',
          transition: 'transform 0.2s ease, background 0.2s ease, opacity 0.2s ease',
          opacity: text.trim() && !disabled ? 1 : 0.6,
        }}
        onMouseEnter={(e) => {
          if (text.trim() && !disabled) {
            e.currentTarget.style.transform = 'scale(1.08)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Send size={15} color={text.trim() && !disabled ? '#FFFFFF' : '#D7E2EA'} strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default React.memo(ChatInput);
