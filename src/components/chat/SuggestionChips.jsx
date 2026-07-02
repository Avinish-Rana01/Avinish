import React, { useCallback } from 'react';

const CHIPS = [
  { label: '🚀 Projects', prompt: 'Tell me about your projects.' },
  { label: '💼 Experience', prompt: 'What is your work experience?' },
  { label: '🛠 Skills', prompt: 'What skills and technologies do you use?' },
  { label: '📄 Resume', prompt: 'How can I download your resume?' },
  { label: '📧 Contact', prompt: 'How can I get in touch with you?' },
];

const SuggestionChips = ({ onSelect, disabled }) => {
  const handleChipClick = useCallback((prompt) => {
    if (!disabled) {
      onSelect(prompt);
    }
  }, [onSelect, disabled]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '0 4px',
        width: '100%',
        margin: '12px 0 4px 0',
      }}
    >
      {CHIPS.map((chip) => (
        <button
          key={chip.label}
          onClick={() => handleChipClick(chip.prompt)}
          disabled={disabled}
          className="focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-white focus-visible:ring-offset-[#0C0C0C]"
          style={{
            background: 'rgba(215, 226, 234, 0.04)',
            border: '1px solid rgba(215, 226, 234, 0.1)',
            borderRadius: '999px',
            color: '#D7E2EA',
            fontFamily: "'Kanit', sans-serif",
            fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
            fontWeight: 400,
            padding: '6px 14px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = 'rgba(118, 33, 176, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(118, 33, 176, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = 'rgba(215, 226, 234, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(215, 226, 234, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(SuggestionChips);
