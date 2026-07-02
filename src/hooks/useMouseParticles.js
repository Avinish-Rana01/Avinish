import { useEffect, useRef } from 'react';

const MAX_PARTICLES = 60;
const COLOR_PALETTE = ['#7621B0', '#8E2DE2', '#4A00E0', '#B600A8', '#9B51E0'];

export default function useMouseParticles(canvasRef) {
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isHovering: false });
  const requestRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disabled = motionQuery.matches;

    const handleMotionChange = (e) => {
      disabled = e.matches;
      if (disabled) {
        particlesRef.current = [];
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // 2. Responsive check
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (disabled || isMobile) {
      return () => {
        motionQuery.removeEventListener('change', handleMotionChange);
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Factory
    const createParticle = (x, y, isClick = false) => {
      const typeRand = Math.random();
      let type = 'circle';
      if (typeRand > 0.97) {
        type = 'sparkle';
      } else if (typeRand > 0.95) {
        type = 'diamond';
      }

      const hoverMultiplier = mouseRef.current.isHovering ? 1.5 : 1.0;
      const size = Math.random() * 3 + 2; // 2px to 5px
      const lifetime = Math.random() * 400 + 500; // 500ms to 900ms
      const speedScale = isClick ? 1.8 : 0.8;

      // Random color variation around #7621B0
      const color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * speedScale * hoverMultiplier,
        vy: (Math.random() - 0.5) * speedScale * hoverMultiplier,
        size,
        type,
        color,
        alpha: mouseRef.current.isHovering ? 0.35 : 0.20, // 10-20% base, brighter on hover
        createdAt: performance.now(),
        lifetime,
      };
    };

    // Spawn helper
    const spawnParticles = (e) => {
      const mouse = mouseRef.current;
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Check if hovering over interactive elements
      const target = e.target;
      mouse.isHovering = !!(target && target.closest('a, button, [role="button"], .interactive-card, .hover-target'));

      // Calculate motion vector
      const dx = currentX - mouse.lastX;
      const dy = currentY - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 2) {
        const count = isTablet ? 1 : (Math.random() > 0.5 ? 3 : 2); // 2-3 particles (1 on tablet)
        for (let i = 0; i < count; i++) {
          if (particlesRef.current.length >= MAX_PARTICLES) {
            particlesRef.current.shift(); // Recycle oldest
          }

          // Spawn slightly behind the cursor
          const spawnFactor = Math.random() * 0.5 + 0.3; // 30% to 80% behind
          const spawnX = currentX - dx * spawnFactor + (Math.random() - 0.5) * 4;
          const spawnY = currentY - dy * spawnFactor + (Math.random() - 0.5) * 4;

          particlesRef.current.push(createParticle(spawnX, spawnY));
        }
      }

      mouse.lastX = currentX;
      mouse.lastY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
    };

    // Handle click burst
    const handleClick = (e) => {
      const target = e.target;
      const isInteractive = !!(target && target.closest('a, button, [role="button"], .interactive-card, .hover-target'));

      // Always delay the dust burst to follow the Camera Shutter sparkle
      setTimeout(() => {
        const count = isInteractive 
          ? (isTablet ? 2 : Math.floor(Math.random() * 3) + 3) // 3-5 particles (2 on tablet)
          : (isTablet ? 4 : Math.floor(Math.random() * 3) + 6); // 6-8 particles (4 on tablet)
        for (let i = 0; i < count; i++) {
          if (particlesRef.current.length >= MAX_PARTICLES) {
            particlesRef.current.shift();
          }
          // Spawn slightly offset from click coordinates
          const spawnX = e.clientX + (Math.random() - 0.5) * 6;
          const spawnY = e.clientY + (Math.random() - 0.5) * 6;
          particlesRef.current.push(createParticle(spawnX, spawnY, true));
        }
      }, 180); // sparkle disappears within 180-250ms
    };

    window.addEventListener('mousemove', spawnParticles, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Drawing helper for custom particle types
    const drawParticle = (p, currentAlpha) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = currentAlpha;

      if (p.type === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'diamond') {
        const size = p.size;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - size / 2);
        ctx.lineTo(p.x + size / 2, p.y);
        ctx.lineTo(p.x, p.y + size / 2);
        ctx.lineTo(p.x - size / 2, p.y);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'sparkle') {
        const size = p.size * 1.2;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - size / 2);
        ctx.lineTo(p.x, p.y + size / 2);
        ctx.moveTo(p.x - size / 2, p.y);
        ctx.lineTo(p.x + size / 2, p.y);
        ctx.stroke();
      }
    };

    // Animation Loop
    const update = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const pushRadius = 50; // pixels to interact
      const pushForce = 0.08; // subtle acceleration multiplier

      // Update and render particles
      particlesRef.current = particles.filter((p) => {
        const age = timestamp - p.createdAt;
        if (age >= p.lifetime) return false; // remove expired

        // Gentle cursor push physics
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pushRadius && dist > 0) {
          const force = (pushRadius - dist) / pushRadius;
          const angle = Math.atan2(dy, dx);
          // Apply outward acceleration
          p.vx += Math.cos(angle) * force * pushForce;
          p.vy += Math.sin(angle) * force * pushForce;
        }

        // Apply friction/drag so they slow down gently
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Calculate opacity fade out
        const remainingRatio = 1 - age / p.lifetime;
        const currentAlpha = p.alpha * remainingRatio;

        drawParticle(p, currentAlpha);
        return true;
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', spawnParticles);
      window.removeEventListener('click', handleClick);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [canvasRef]);
}
