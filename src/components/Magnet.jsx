import React, { useRef, useState, useCallback, useEffect } from 'react';

const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (!rectRef.current) {
      rectRef.current = el.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = Math.max(rect.width, rect.height) / 2 + padding;

    if (dist < threshold) {
      if (!isActive) setIsActive(true);
      setTranslate({ x: dx / strength, y: dy / strength });
    } else {
      if (isActive) {
        setIsActive(false);
        setTranslate({ x: 0, y: 0 });
      }
    }
  }, [isActive, padding, strength]);

  useEffect(() => {
    const handleScrollOrResize = () => {
      rectRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [handleMouseMove]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
