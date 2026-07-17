import React from 'react';
import { render, screen } from '@testing-library/react';
import ResumeSection from '../../sections/ResumeSection';
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
      a: React.forwardRef((props, ref) => {
        const { variants, initial, whileInView, viewport, ...rest } = props;
        return <a ref={ref} {...rest} />;
      }),
    },
  };
});

describe('ResumeSection', () => {
  it('renders section heading', () => {
    render(<ResumeSection />);
    expect(screen.getByRole('heading', { name: /Resume/i })).toBeInTheDocument();
  });

  it('renders download button', () => {
    render(<ResumeSection />);
    const downloadBtn = screen.getByRole('button', { name: /Download CV/i });
    expect(downloadBtn).toBeInTheDocument();
  });
});
