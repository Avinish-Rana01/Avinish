import React from 'react';
import { motion } from 'framer-motion';

const CHARACTER_IMAGE_URL = 'https://res.cloudinary.com/dvxemrtys/image/upload/v1782889880/ggggggggg-removebg-preview_nauqds.png';

const GuideCharacter = () => {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0, scale: 0.9 }}
      animate={{ 
        y: 0, 
        opacity: 1, 
        scale: 1,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 120,
          delay: 0.3
        }
      }}
      exit={{ 
        y: '100%', 
        opacity: 0, 
        scale: 0.95,
        transition: { duration: 0.4, ease: 'easeIn' }
      }}
      whileHover={{ 
        scale: 1.04, 
        rotate: 1.5,
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      className="fixed bottom-0 left-0 xs:left-4 sm:left-10 z-[9970] pointer-events-auto select-none origin-bottom"
      style={{
        width: 'clamp(200px, 32vw, 420px)',
        filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 25px rgba(182, 0, 168, 0.25))',
      }}
    >
      <img
        src={CHARACTER_IMAGE_URL}
        alt="Avinish Rana - DevLab Mentor Guide"
        className="w-full h-auto object-contain block"
        draggable={false}
        fetchPriority="high"
      />
    </motion.div>
  );
};

export default React.memo(GuideCharacter);
