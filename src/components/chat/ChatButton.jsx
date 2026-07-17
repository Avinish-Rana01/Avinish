import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

const WELCOME_STORAGE_KEY = 'avinish-ai-welcomed-user';

const ChatButton = ({ onClick, isOpen }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show welcome bubble only on first visit
    try {
      const welcomed = localStorage.getItem(WELCOME_STORAGE_KEY);
      if (!welcomed) {
        const timer = setTimeout(() => {
          setShowWelcome(true);
          // Auto hide after 4 seconds
          const hideTimer = setTimeout(() => {
            setShowWelcome(false);
            localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
          }, 4000);
          return () => clearTimeout(hideTimer);
        }, 1500); // Appear slightly after load

        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage disabled
    }
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setShowTooltip(true);
    e.currentTarget.style.transform = 'scale(1.06)';
    // We only want a shadow if it's the circular button (isOpen or has background)
    if (e.currentTarget.style.background !== 'transparent') {
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(181, 1, 167, 0.4)';
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    setShowTooltip(false);
    e.currentTarget.style.transform = 'scale(1)';
    if (e.currentTarget.style.background !== 'transparent') {
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(181, 1, 167, 0.25)';
    } else {
      e.currentTarget.style.boxShadow = 'none';
    }
  }, []);

  return (
    <>
      <div
        id="chat-toggle-container"
        style={{
          position: 'fixed',
          bottom: '90px', // Stacks neatly above AmbientPlayer
          right: '20px',
          zIndex: isOpen ? 9970 : 9990,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          pointerEvents: 'none',
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.3s ease, z-index 0.3s step-end',
        }}
      >
        {/* Welcome Bubble (First Visit Only) */}
        {showWelcome && !isOpen && (
          <div
            style={{
              pointerEvents: 'auto',
              background: 'rgba(12, 12, 12, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(118, 33, 176, 0.3)',
              borderRadius: '16px',
              padding: '12px 16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              color: '#D7E2EA',
              fontFamily: "'Kanit', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              maxWidth: '180px',
              marginBottom: '10px',
              position: 'relative',
              animation: 'ai-fade-in 0.35s ease-out',
              transformOrigin: 'bottom right',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px' }}>👋</span>
              <div>
                Hi! <br /> I'm <strong>Avinish AI</strong>.
              </div>
            </div>
            {/* Bubble arrow */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '20px',
                width: '12px',
                height: '12px',
                background: 'rgba(12, 12, 12, 0.95)',
                borderRight: '1px solid rgba(118, 33, 176, 0.3)',
                borderBottom: '1px solid rgba(118, 33, 176, 0.3)',
                transform: 'rotate(45deg)',
              }}
            />
          </div>
        )}

        {/* Floating Tooltip */}
        {showTooltip && !isOpen && !showWelcome && (
          <div
            style={{
              background: 'rgba(12, 12, 12, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#D7E2EA',
              fontFamily: "'Kanit', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(215, 226, 234, 0.12)',
              marginBottom: '8px',
              whiteSpace: 'nowrap',
              animation: 'ai-fade-in 0.2s ease-out',
            }}
          >
            Ask Avinish AI
          </div>
        )}

        <button
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open Avinish AI Assistant'}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
          style={{
            pointerEvents: isOpen ? 'none' : 'auto',
            width: '48px',
            height: '48px',
            borderRadius: isOpen ? '50%' : '0',
            border: 'none',
            background: isOpen ? 'linear-gradient(135deg, #7621B0 0%, #B600A8 100%)' : 'transparent',
            boxShadow: isOpen ? '0 8px 32px rgba(181, 1, 167, 0.25)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            animation: isOpen ? 'ai-pulse 15s infinite' : 'none',
            position: 'relative'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
        >
          {isOpen ? (
            <MessageSquare size={18} color="#FFFFFF" strokeWidth={2.2} />
          ) : (
            <>
              {/* Floating PNG Avatar without background */}
              <div style={{ position: 'relative', width: '110%', height: '110%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img 
                  src="https://res.cloudinary.com/dvxemrtys/image/upload/v1784312337/Avinish-portfolio-AI-image_ymz1nt.png" 
                  alt="Avinish AI Avatar" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
                    transform: 'scale(1.7) translateY(2px)',
                  }}
                  draggable={false}
                />
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default React.memo(ChatButton);
