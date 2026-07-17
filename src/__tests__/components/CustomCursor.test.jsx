import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CustomCursor from '../../components/CustomCursor';
import { UIProvider } from '../../context/UIContext';
import { vi } from 'vitest';

describe('CustomCursor Component', () => {
  let originalInnerWidth;
  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    if ('ontouchstart' in window) {
      delete window.ontouchstart;
    }
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true });
    
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      closePath: vi.fn(),
    }));
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    vi.unstubAllGlobals();
  });

  it('renders on desktop', async () => {
    // It renders a fixed div with a canvas inside
    const { container } = render(
      <UIProvider>
        <CustomCursor />
      </UIProvider>
    );

    await waitFor(() => {
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });
});
