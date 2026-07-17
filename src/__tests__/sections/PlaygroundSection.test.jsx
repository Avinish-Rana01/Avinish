import React from 'react';
import { render, screen } from '@testing-library/react';
import PlaygroundSection from '../../sections/PlaygroundSection';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: vi.fn(), on: vi.fn() } }),
    useTransform: () => 1,
    motion: {
      ...actual.motion,
      div: React.forwardRef((props, ref) => {
        const { variants, initial, whileInView, viewport, ...rest } = props;
        return <div ref={ref} {...rest} />;
      }),
    },
  };
});

describe('PlaygroundSection', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <PlaygroundSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Playground/i })).toBeInTheDocument();
    
    const link = screen.getByRole('link', { name: /Launch DevLab/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/playground');
  });
});
