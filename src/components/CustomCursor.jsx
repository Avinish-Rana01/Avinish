import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useUI } from '../context/UIContext';

const CustomCursor = () => {
  const [hoverState, setHoverState] = useState('default'); // default, button, link, text, image, card
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);

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
  const canvasRef = useRef(null);
  const trailsRef = useRef([]);

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

    const handleMouseDown = (e) => {
      /* Click Dust Burst Effect (Commented out per user request)
      // Spawn burst particles
      for (let i = 0; i < 12; i++) {
        trailsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          life: 1,
          color: Math.random() > 0.5 ? '#C93CFF' : '#00E5FF',
          isBurst: true
        });
      }
      */
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      clearTimeout(idleTimerRef.current);
    };
  }, [hoverState]);

  // Trail Engine
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let lastX = mouseX.get();
    let lastY = mouseY.get();
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentX = dotX.get();
      const currentY = dotY.get();

      // Spawn trail if moving fast enough
      const dist = Math.hypot(currentX - lastX, currentY - lastY);
      if (isDustEnabled && dist > 5 && Math.random() > 0.3) {
        trailsRef.current.push({
          x: currentX,
          y: currentY,
          vx: (currentX - lastX) * 0.05,
          vy: (currentY - lastY) * 0.05,
          life: 1,
          color: Math.random() > 0.5 ? '#C93CFF' : '#00E5FF',
          isBurst: false
        });
      }
      lastX = currentX;
      lastY = currentY;

      // Update trails
      trailsRef.current = trailsRef.current.filter(p => {
        p.life -= p.isBurst ? 0.04 : 0.05; // Fade over ~300-400ms
        if (p.life <= 0) return false;
        
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isBurst ? 2 : 1, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        return true;
      });

      animId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isDustEnabled, dotX, dotY, mouseX, mouseY]);

  if (!isVisible) return null;

  // Derive visual states based on hover & idle
  const isText = hoverState === 'text';
  const isButton = hoverState === 'button';
  const isLink = hoverState === 'link';
  const isCard = hoverState === 'card';
  const isImage = hoverState === 'image';

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {/* Canvas for trails and particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />


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
