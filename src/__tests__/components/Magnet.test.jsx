import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Magnet from '../../components/Magnet';

describe('Magnet Component', () => {
  it('renders children correctly', () => {
    render(
      <Magnet>
        <button>Magnetic Button</button>
      </Magnet>
    );
    expect(screen.getByText('Magnetic Button')).toBeInTheDocument();
  });

  it('applies transform on mouse move', () => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = () => ({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      right: 150,
      bottom: 150,
    });

    const { container } = render(
      <Magnet padding={50} strength={2}>
        <div data-testid="magnet-child">Child</div>
      </Magnet>
    );
    
    const childWrapper = screen.getByTestId('magnet-child').parentElement;
    
    // Initial transform
    expect(childWrapper.style.transform).toBe('translate3d(0px, 0px, 0)');

    // Fire mousemove on window to trigger magnetic effect
    // Center is (125, 125). Let's move to (135, 125)
    fireEvent.mouseMove(window, { clientX: 135, clientY: 125 });
    
    // The translation should be dx / strength = (135 - 125) / 2 = 5
    expect(childWrapper.style.transform).toBe('translate3d(5px, 0px, 0)');
  });
});
