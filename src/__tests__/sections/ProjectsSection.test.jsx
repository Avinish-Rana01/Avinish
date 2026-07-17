import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectsSection from '../../sections/ProjectsSection';
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
      span: React.forwardRef((props, ref) => {
        const { variants, initial, whileInView, viewport, ...rest } = props;
        return <span ref={ref} {...rest} />;
      }),
    },
  };
});

describe('ProjectsSection', () => {
  it('renders section title', () => {
    render(<ProjectsSection />);
    expect(screen.getByRole('heading', { name: /Projects/i })).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<ProjectsSection />);
    // Checking for known project titles
    expect(screen.getByText('Food Ordering App')).toBeInTheDocument();
    expect(screen.getByText('Dazk Cloud Analytics')).toBeInTheDocument();
  });
});
