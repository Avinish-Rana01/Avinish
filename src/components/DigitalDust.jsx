import React, { useRef } from 'react';
import useMouseParticles from '../hooks/useMouseParticles';
import '../styles/digitalDust.css';

import { useUI } from '../context/UIContext';

const DigitalDust = () => {
  const canvasRef = useRef(null);
  const { isDustEnabled } = useUI();

  // Bind simulation hooks to the canvas element
  useMouseParticles(canvasRef);

  if (!isDustEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="digital-dust-canvas"
      aria-hidden="true"
    />
  );
};

export default DigitalDust;
