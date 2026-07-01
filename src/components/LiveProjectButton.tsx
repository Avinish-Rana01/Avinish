import React from 'react';

interface LiveProjectButtonProps {
  id?: string;
  href?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ id = 'live-project-btn', href = '#' }) => {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full border border-[#D7E2EA]/40 sm:border-2 sm:border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest cursor-pointer px-5 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-[0.65rem] sm:text-sm md:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 no-underline"
      style={{ background: 'transparent' }}
    >
      Live Project
    </a>
  );
};

export default LiveProjectButton;
