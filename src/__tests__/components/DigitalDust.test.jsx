import React from 'react';
import { render } from '@testing-library/react';
import DigitalDust from '../../components/DigitalDust';
import { UIProvider } from '../../context/UIContext';
import { vi } from 'vitest';

vi.mock('../../hooks/useMouseParticles', () => ({
  default: vi.fn(),
}));

describe('DigitalDust Component', () => {
  it('renders canvas when dust is enabled', () => {
    const { container } = render(
      <UIProvider>
        <DigitalDust />
      </UIProvider>
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('digital-dust-canvas');
  });
});
