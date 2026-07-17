import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicesSection from '../../sections/ServicesSection';
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

describe('ServicesSection', () => {
  it('renders heading', () => {
    render(<ServicesSection />);
    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
  });

  it('renders all service items', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Frontend & UI Architecture')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineering & APIs')).toBeInTheDocument();
    expect(screen.getByText('Database Management')).toBeInTheDocument();
    expect(screen.getByText('Cloud Infrastructure & DevOps')).toBeInTheDocument();
    expect(screen.getByText('AI & Third-Party Integrations')).toBeInTheDocument();
  });
});
