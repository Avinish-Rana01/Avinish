import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AmbientPlayer from '../../components/AmbientPlayer';
import { UIProvider } from '../../context/UIContext';
import { vi } from 'vitest';

// Mock the hook
vi.mock('../../hooks/useAmbientMusic', () => ({
  default: () => ({
    isPlaying: false,
    toggle: vi.fn(),
  }),
}));

describe('AmbientPlayer Component', () => {
  it('renders correctly', () => {
    render(
      <UIProvider>
        <AmbientPlayer isOpen={false} />
      </UIProvider>
    );

    const button = screen.getByRole('button', { name: /Play ambient music/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles audio on click', () => {
    render(
      <UIProvider>
        <AmbientPlayer isOpen={false} />
      </UIProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Toast should appear
    expect(screen.getByText('♪ Ambient Mode Enabled')).toBeInTheDocument();
  });
});
