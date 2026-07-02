import React, { useState, useEffect } from 'react';

const MESSAGES = ['🧠 Reading portfolio...', '✨ Thinking...'];

const TypingIndicator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1500); // Rotate messages every 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        borderRadius: '16px',
        background: 'rgba(215, 226, 234, 0.03)',
        border: '1px solid rgba(215, 226, 234, 0.06)',
        maxWidth: '220px',
        fontFamily: "'Kanit', sans-serif",
        fontSize: '13px',
        color: '#D7E2EA',
        opacity: 0.8,
        alignSelf: 'flex-start',
        animation: 'ai-pulse-text 1.5s ease-in-out infinite alternate',
      }}
    >
      <div style={{ display: 'flex', gap: '3px' }}>
        <span className="dot" style={{ animationDelay: '0s' }}></span>
        <span className="dot" style={{ animationDelay: '0.2s' }}></span>
        <span className="dot" style={{ animationDelay: '0.4s' }}></span>
      </div>
      <span>{MESSAGES[index]}</span>

      <style>{`
        @keyframes ai-pulse-text {
          from { opacity: 0.6; }
          to   { opacity: 0.95; }
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7621B0;
          display: inline-block;
          animation: dot-bounce 1.4s infinite ease-in-out both;
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40%           { transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
};

export default TypingIndicator;
