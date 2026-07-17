import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useUI } from '../context/UIContext';

export const useCursorEngine = () => {
  const [hoverState, setHoverState] = useState('default'); // default, button, link, text, image, card
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailsRef = useRef([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring (smooth trailing)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Inner dot (fast, near 1:1 tracking)
  const dotSpringConfig = { damping: 30, stiffness: 600, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  const idleTimerRef = useRef(null);
  const { isDustEnabled } = useUI();

  useEffect(() => {
    // Disable on touch devices
    if (window.innerWidth <= 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;
    setIsVisible(true);

    let currentTarget = null;

    const handleMouseMove = (e) => {
      setIsIdle(false);
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);

      // Handle magnetic attraction
      if (currentTarget && (hoverState === 'button' || hoverState === 'link')) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // 15% attraction towards center
        mouseX.set(centerX + distanceX * 0.15);
        mouseY.set(centerY + distanceY * 0.15);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.closest('button, [role="button"], .btn, .launch-devlab-btn, .contact-glow-btn')) {
        setHoverState('button');
        currentTarget = target.closest('button, [role="button"], .btn, .launch-devlab-btn, .contact-glow-btn');
      } else if (target.closest('a')) {
        setHoverState('link');
        currentTarget = target.closest('a');
      } else if (target.closest('.card, .project-card, .interactive-card, [class*="card"]')) {
        setHoverState('card');
        currentTarget = null;
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, span, input, textarea')) {
        setHoverState('text');
        currentTarget = null;
      } else if (target.closest('img, svg, picture')) {
        setHoverState('image');
        currentTarget = null;
      } else {
        setHoverState('default');
        currentTarget = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(idleTimerRef.current);
    };
  }, [hoverState, mouseX, mouseY]);

  return {
    mouseX, mouseY,
    cursorX, cursorY,
    dotX, dotY,
    isVisible, isIdle,
    hoverState, trailsRef,
    isDustEnabled
  };
};
