import React from 'react';
import '../styles/PlaygroundAnimation.css';

const PlaygroundBackground = () => {
  return (
    <div className="playground-anim-container pointer-events-none select-none">
      <div className="grid-plane" />
      
      <div className="stars-container">
        <div className="star-layer" />
        <div className="star-layer" />
        <div className="star-layer" />
      </div>

      <div className="loader-container">
        <div className="hologram-platform" />
        
        <div className="platform-rings">
          <div className="platform-ring" />
          <div className="platform-ring" />
          <div className="platform-ring" />
        </div>

        <div className="projection-beams">
          <div className="beam" />
          <div className="beam" />
          <div className="beam" />
          <div className="beam" />
        </div>

        <div className="holo-container">
          <div className="holo-sphere">
            <div className="holo-ring" />
            <div className="holo-ring" />
            <div className="holo-ring" />
            <div className="holo-ring" />
            <div className="holo-ring" />
            
            <div className="holo-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="holo-particle" />
              ))}
            </div>
          </div>
          
          <div className="glitch-effect" />
          <div className="lightning" />
        </div>

        <div className="code-lines">
          <div className="code-line">
            01001001 01001110 01001001 01010100 01001001 01000001 01001100 01001001
          </div>
          <div className="code-line">
            function initHolographicMatrix() {'{'} connectNodes(); {'}'}
          </div>
          <div className="code-line">
            01010011 01011001 01010011 01010100 01000101 01001101
          </div>
          <div className="code-line">
            class QuantumProcessor {'{'} constructor() {'{'} this.map = new Map(); {'}'}{'}'}
          </div>
          <div className="code-line">
            01010010 01000101 01001110 01000100 01000101 01010010
          </div>
          <div className="code-line">
            const matrix = [1.2, 0.8, 3.1, 2.7, 5.9, 4.3];
          </div>
          <div className="code-line">
            01010000 01010010 01001111 01000011 01000101 01010011
          </div>
          <div className="code-line">
            async function loadHolographicData() {'{'} await fetch('/api/quantum'); {'}'}
          </div>
        </div>

        <div className="holo-numbers">
          <div className="number" style={{ top: '40%', left: '30%', animationDelay: '0.5s' }}>0xFF</div>
          <div className="number" style={{ top: '50%', left: '60%', animationDelay: '1.5s' }}>0x0A</div>
          <div className="number" style={{ top: '60%', left: '40%', animationDelay: '2.5s' }}>0xB4</div>
          <div className="number" style={{ top: '30%', left: '50%', animationDelay: '3.5s' }}>0x3D</div>
          <div className="number" style={{ top: '70%', left: '20%', animationDelay: '4.5s' }}>0xC2</div>
          <div className="number" style={{ top: '20%', left: '70%', animationDelay: '5.5s' }}>0x19</div>
        </div>

        <div className="radial-indicators">
          <div className="radial-indicator" />
          <div className="radial-indicator" />
          <div className="radial-indicator" />
          <div className="radial-indicator" />
        </div>

        <div className="corner-decorations">
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
        </div>

      </div>
    </div>
  );
};

export default PlaygroundBackground;
