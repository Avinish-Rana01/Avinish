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
      <div style={{ display: 'flex', gap: '3.5px' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7621B0] inline-block animate-dot-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7621B0] inline-block animate-dot-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7621B0] inline-block animate-dot-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
      <span>{MESSAGES[index]}</span>
    </div>
  );
};

export default TypingIndicator;
