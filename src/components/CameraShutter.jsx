import React, { useEffect } from 'react';
import '../styles/cameraShutter.css';

const CameraShutter = () => {
  useEffect(() => {
    // Check user preferences for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = motionQuery.matches;

    const handleMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const handleClick = (e) => {
      if (isReducedMotion) return;

      const target = e.target;
      const interactiveEl = target.closest('a, button, [role="button"], .interactive-card, .hover-target');

      // 1. Spawning Sparkle Reflection on ANY click
      const clientX = e.clientX;
      const clientY = e.clientY;

      const size = Math.floor(Math.random() * 17) + 40; // 40px to 56px
      const sparkle = document.createElement('div');
      sparkle.className = 'camera-shutter-sparkle';
      sparkle.style.left = `${clientX}px`;
      sparkle.style.top = `${clientY}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;

      // Elegant 8-point star SVG with optimized soft drop-shadow glow for visibility
      sparkle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.95));">
          <path d="M12 0C12 5.5 10.5 10.5 5 12C10.5 13.5 12 18.5 12 24C12 18.5 13.5 13.5 19 12C13.5 10.5 12 5.5 12 0Z" fill="white"/>
          <path d="M12 3C12 7.5 10.5 10.5 6 12C10.5 13.5 12 16.5 12 21C12 16.5 13.5 13.5 18 12C13.5 10.5 12 7.5 12 3Z" fill="white" opacity="0.75" transform="rotate(45, 12, 12)"/>
        </svg>
      `;

      document.body.appendChild(sparkle);

      // Remove element after animation completes
      setTimeout(() => {
        sparkle.remove();
      }, 250);

      // 2. Clicked Element Scale Feedback (0.985 for 80ms) - only on interactive elements
      if (interactiveEl) {
        if (interactiveEl.dataset.shutterClicking === 'true') return;
        interactiveEl.dataset.shutterClicking = 'true';

        const originalTransition = interactiveEl.style.transition;
        const originalTransform = interactiveEl.style.transform;

        // Apply feedback transform scale
        interactiveEl.style.transition = 'transform 80ms ease-out';
        
        // Safely append scale without breaking existing scale patterns
        const cleanTransform = originalTransform ? originalTransform.replace(/scale\([^)]*\)/g, '').trim() : '';
        interactiveEl.style.transform = `${cleanTransform} scale(0.985)`.trim();

        setTimeout(() => {
          // Smoothly restore transition and transform
          interactiveEl.style.transition = originalTransition;
          interactiveEl.style.transform = originalTransform;
          delete interactiveEl.dataset.shutterClicking;
        }, 80);
      }
    };

    window.addEventListener('click', handleClick, { capture: true, passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return null; // Side-effect only component
};

export default CameraShutter;
