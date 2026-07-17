import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechnologyPill = ({ tech }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center flex-shrink-0 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={tech.name}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full mb-6 sm:mb-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl whitespace-nowrap pointer-events-none"
            style={{
              background: 'rgba(12, 12, 12, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `0 8px 32px ${tech.brandColor.replace('0.5', '0.15')}`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">{tech.name}</span>
              <span className="text-white/60 text-[0.65rem] sm:text-[0.75rem] font-light">{tech.tooltip}</span>
            </div>
            {/* Tooltip arrow */}
            <div 
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{
                background: 'rgba(12, 12, 12, 0.85)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Container */}
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex flex-col items-center justify-center gap-3 sm:gap-4 outline-none relative"
      >
        {/* Subtle Ambient Glow behind logo */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full blur-xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: tech.brandColor,
            opacity: isHovered ? 0.3 : 0,
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300"
             style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
          <img
            src={tech.logo}
            alt={`${tech.name} logo`}
            className="w-full h-full object-contain drop-shadow-sm transition-all duration-300"
            style={{
              filter: isHovered 
                ? `drop-shadow(0 8px 16px ${tech.brandColor.replace('0.5', '0.2')}) ${tech.invert ? 'invert(1) brightness(2)' : ''}` 
                : (tech.invert ? 'invert(1) brightness(2)' : 'none'),
            }}
            loading="lazy"
          />
        </div>

        {/* Name */}
        <span 
          className="font-medium text-[0.65rem] sm:text-xs tracking-widest uppercase transition-colors duration-300 text-center"
          style={{
            color: isHovered ? '#FFFFFF' : 'rgba(215, 226, 234, 0.4)',
          }}
        >
          {tech.name}
        </span>
      </motion.div>
    </div>
  );
};

export default React.memo(TechnologyPill);
