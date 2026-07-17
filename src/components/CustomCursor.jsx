import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorEngine } from '../hooks/useCursorEngine';
import CursorCanvas from './CursorCanvas';

const CustomCursor = () => {
  const {
    mouseX, mouseY,
    cursorX, cursorY,
    dotX, dotY,
    isVisible, isIdle,
    hoverState, trailsRef,
    isDustEnabled
  } = useCursorEngine();

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {/* Canvas for trails and particles */}
      <CursorCanvas 
        isVisible={isVisible}
        isDustEnabled={isDustEnabled}
        dotX={dotX}
        dotY={dotY}
        mouseX={mouseX}
        mouseY={mouseY}
        trailsRef={trailsRef}
      />

      {/* Idle Orbiting Particles */}
      <AnimatePresence>
        {isIdle && isDustEnabled && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none"
            style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
          >
            <div className="absolute top-[-25px] left-[-2px] w-1.5 h-1.5 bg-[#C93CFF] rounded-full shadow-[0_0_5px_#C93CFF]" />
            <div className="absolute bottom-[-25px] right-[-2px] w-1 h-1 bg-[#00E5FF] rounded-full shadow-[0_0_5px_#00E5FF]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
