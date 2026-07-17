import React, { useEffect, useRef } from 'react';

const CursorCanvas = ({ isVisible, isDustEnabled, dotX, dotY, mouseX, mouseY, trailsRef }) => {
  const canvasRef = useRef(null);

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
  }, [isVisible, isDustEnabled, dotX, dotY, mouseX, mouseY, trailsRef]);

  if (!isVisible) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export default React.memo(CursorCanvas);
