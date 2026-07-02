import React, { useState, useEffect, useCallback } from 'react';
import { Music } from 'lucide-react';
import useAmbientMusic from '../hooks/useAmbientMusic';

/* ─── Toast notification ─── */
const Toast = ({ message, visible }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      background: 'rgba(12, 12, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#D7E2EA',
      fontFamily: "'Kanit', sans-serif",
      fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
      fontWeight: 400,
      letterSpacing: '0.05em',
      padding: '10px 18px',
      borderRadius: '999px',
      border: '1px solid rgba(215, 226, 234, 0.12)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
      pointerEvents: 'none',
      zIndex: 9998,
      whiteSpace: 'nowrap',
    }}
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
);

/* ─── Equalizer bars (visible when playing) ─── */
const EqualizerBars = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '2.5px',
      height: '16px',
      width: '16px',
    }}
    aria-hidden="true"
  >
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        style={{
          display: 'block',
          width: '2.5px',
          borderRadius: '1px',
          background: '#D7E2EA',
          animation: `ambient-eq ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.12}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Main AmbientPlayer component ─── */
const AmbientPlayer = ({ isOpen }) => {
  const { isPlaying, toggle } = useAmbientMusic();
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  // Auto-hide toast after 2s
  useEffect(() => {
    if (!toastVisible) return;
    const timer = setTimeout(() => setToastVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  const handleClick = useCallback(() => {
    toggle();
    showToast(isPlaying ? 'Ambient Mode Disabled' : '♪ Ambient Mode Enabled');
  }, [toggle, isPlaying, showToast]);

  return (
    <>
      {/* Inject keyframes for equalizer animation */}
      <style>{`
        @keyframes ambient-eq {
          0%   { height: 3px; }
          100% { height: 14px; }
        }
        @keyframes ambient-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(118, 33, 176, 0.35); }
          50%      { box-shadow: 0 0 0 8px rgba(118, 33, 176, 0); }
        }
      `}</style>

      {/* Toast */}
      <Toast message={toastMessage} visible={toastVisible} />

      {/* Floating button */}
      <button
        onClick={handleClick}
        id="ambient-toggle"
        aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '20px',
          zIndex: isOpen ? 9970 : 9999,
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '1.5px solid rgba(215, 226, 234, 0.2)',
          background: 'rgba(12, 12, 12, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease, z-index 0.3s step-end',
          animation: isPlaying ? 'ambient-pulse 2.5s ease-in-out infinite' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.borderColor = 'rgba(118, 33, 176, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(215, 226, 234, 0.2)';
        }}
      >
        {isPlaying ? (
          <EqualizerBars />
        ) : (
          <Music size={18} color="#D7E2EA" strokeWidth={1.8} />
        )}
      </button>
    </>
  );
};

export default AmbientPlayer;
