import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ContactButton = ({ id = 'contact-btn', text = 'Contact Me', className = '' }) => {
  return (
    <motion.a
      id={id}
      href="mailto:ranaavinish72@gmail.com"
      aria-label="Contact me via email"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        group relative inline-flex items-center justify-center gap-3
        rounded-full px-8 py-3.5 sm:px-10 sm:py-4 
        font-medium text-white cursor-pointer
        text-sm sm:text-base no-underline overflow-hidden
        bg-[#0C0C0C] border border-white/10
        transition-all duration-300
        hover:border-[#B600A8]/50 hover:shadow-[0_0_30px_rgba(182,0,168,0.2)]
        ${className}
      `}
    >
      {/* Animated glow background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
        style={{
          background: 'linear-gradient(123deg, rgba(182,0,168,0.15) 0%, rgba(118,33,176,0.15) 100%)',
        }}
      />
      
      {/* Button Content */}
      <span className="relative z-10 font-['Syne',sans-serif] font-semibold tracking-wide uppercase text-xs sm:text-sm">{text}</span>
      <ArrowRight size={16} className="relative z-10 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
    </motion.a>
  );
};

export default React.memo(ContactButton);
