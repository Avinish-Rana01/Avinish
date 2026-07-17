import React, { useCallback } from 'react';
import { Sparkles, Trash2, X } from 'lucide-react';

const ChatHeader = ({ onClose, onClear }) => {
  const handleClearClick = useCallback((e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      onClear();
    }
  }, [onClear]);

  return (
    <div
      style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(215, 226, 234, 0.06)',
        background: 'rgba(12, 12, 12, 0.95)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Title + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Profile AI Avatar */}
        <div style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img 
            src="https://res.cloudinary.com/dvxemrtys/image/upload/v1784312337/Avinish-portfolio-AI-image_ymz1nt.png" 
            alt="Avinish AI Avatar" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              transform: 'scale(1.6) translateY(2px)',
            }}
            draggable={false}
          />
        </div>

        {/* Text Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: "'Kanit', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#D7E2EA',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              Avinish AI
            </span>
            {/* Glowing online dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#28CA40',
                  boxShadow: '0 0 8px #28CA40',
                  animation: 'ai-glow 2s infinite alternate',
                }}
              />
              <span
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontSize: '9px',
                  fontWeight: 500,
                  color: '#28CA40',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                }}
              >
                Online
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: '11px',
              color: '#D7E2EA',
              opacity: 0.5,
            }}
          >
            Ask about projects, experience, skills or resume
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Trash/Clear history */}
        <button
          onClick={handleClearClick}
          aria-label="Clear chat history"
          className="focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[#0C0C0C]"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#D7E2EA',
            opacity: 0.5,
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.background = 'rgba(215, 226, 234, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close AI Assistant"
          className="focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[#0C0C0C]"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#D7E2EA',
            opacity: 0.5,
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.background = 'rgba(215, 226, 234, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <X size={16} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ChatHeader);
