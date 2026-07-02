import React, { useRef } from 'react';
import useMouseParticles from '../hooks/useMouseParticles';
import '../styles/digitalDust.css';

const DigitalDust = () => {
  const canvasRef = useRef(null);

  // Bind simulation hooks to the canvas element
  useMouseParticles(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="digital-dust-canvas"
      aria-hidden="true"
    />
  );
};

export default DigitalDust;
