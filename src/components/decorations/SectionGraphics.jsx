import React from 'react';

export const CodeBracketDecor = ({ flip = false }) => (
  <svg
    width="140"
    height="140"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <circle cx="70" cy="70" r="70" fill="rgba(118,33,176,0.08)" />
    <circle cx="70" cy="70" r="55" stroke="rgba(118,33,176,0.15)" strokeWidth="1" />
    <path d="M55 50L35 70L55 90" stroke="#7621B0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M85 50L105 70L85 90" stroke="#B600A8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M75 44L65 96" stroke="#D7E2EA" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const ReactLogoDecor = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="60" cy="60" r="60" fill="rgba(182,0,168,0.07)" />
    {/* React atom orbits */}
    <ellipse cx="60" cy="60" rx="45" ry="18" stroke="rgba(215,226,234,0.2)" strokeWidth="1.5" />
    <ellipse cx="60" cy="60" rx="45" ry="18" stroke="rgba(215,226,234,0.2)" strokeWidth="1.5" transform="rotate(60 60 60)" />
    <ellipse cx="60" cy="60" rx="45" ry="18" stroke="rgba(215,226,234,0.2)" strokeWidth="1.5" transform="rotate(120 60 60)" />
    <circle cx="60" cy="60" r="7" fill="#61DAFB" opacity="0.8" />
    {/* orbiting dots */}
    <circle cx="105" cy="60" r="4" fill="#B600A8" opacity="0.7" />
    <circle cx="37.5" cy="99" r="4" fill="#7621B0" opacity="0.7" />
    <circle cx="37.5" cy="21" r="4" fill="#BE4C00" opacity="0.7" />
  </svg>
);

export const TerminalDecor = () => (
  <svg
    width="160"
    height="100"
    viewBox="0 0 160 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="160" height="100" rx="14" fill="rgba(12,12,12,0.7)" stroke="rgba(215,226,234,0.12)" strokeWidth="1" />
    {/* Traffic lights */}
    <circle cx="20" cy="18" r="5" fill="#FF5F57" />
    <circle cx="34" cy="18" r="5" fill="#FFBD2E" />
    <circle cx="48" cy="18" r="5" fill="#28CA40" />
    {/* Code lines */}
    <path d="M14 38L28 52L14 66" stroke="#7621B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="36" y="49" width="60" height="6" rx="3" fill="rgba(215,226,234,0.15)" />
    <rect x="36" y="62" width="40" height="6" rx="3" fill="rgba(182,0,168,0.4)" />
    <rect x="36" y="75" width="75" height="6" rx="3" fill="rgba(215,226,234,0.08)" />
  </svg>
);

export const ComponentDecor = () => (
  <svg
    width="140"
    height="130"
    viewBox="0 0 140 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="10" width="120" height="50" rx="10" fill="rgba(118,33,176,0.1)" stroke="rgba(118,33,176,0.3)" strokeWidth="1.5" />
    <rect x="25" y="22" width="50" height="8" rx="4" fill="rgba(215,226,234,0.2)" />
    <rect x="25" y="36" width="90" height="6" rx="3" fill="rgba(215,226,234,0.1)" />
    <rect x="25" y="48" width="70" height="6" rx="3" fill="rgba(182,0,168,0.3)" />
    {/* Arrow down */}
    <path d="M70 65V80" stroke="rgba(215,226,234,0.3)" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M65 76L70 82L75 76" stroke="rgba(215,226,234,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="85" width="55" height="35" rx="8" fill="rgba(182,0,168,0.1)" stroke="rgba(182,0,168,0.25)" strokeWidth="1.5" />
    <rect x="75" y="85" width="55" height="35" rx="8" fill="rgba(190,76,0,0.1)" stroke="rgba(190,76,0,0.25)" strokeWidth="1.5" />
    <rect x="20" y="96" width="35" height="5" rx="2.5" fill="rgba(215,226,234,0.15)" />
    <rect x="85" y="96" width="35" height="5" rx="2.5" fill="rgba(215,226,234,0.15)" />
  </svg>
);

export const GridDecor = () => (
  <svg
    width="180"
    height="180"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="90" cy="90" r="90" fill="rgba(118,33,176,0.03)" />
    <circle cx="90" cy="90" r="70" stroke="rgba(118,33,176,0.06)" strokeWidth="1" strokeDasharray="4 4" />
    <path d="M20 90H160" stroke="rgba(118,33,176,0.08)" strokeWidth="1" />
    <path d="M90 20V160" stroke="rgba(118,33,176,0.08)" strokeWidth="1" />
  </svg>
);
