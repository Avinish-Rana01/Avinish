import React from 'react';
import { render, screen } from '@testing-library/react';
import MarqueeSection from '../../sections/MarqueeSection';
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

describe('MarqueeSection', () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.IntersectionObserver = MockIntersectionObserver;
  });

  it('renders correctly', () => {
    render(<MarqueeSection />);
    // The marquee should render many poster images initially (lazy loading)
    const images = screen.getAllByAltText('Project preview frame');
    expect(images.length).toBeGreaterThan(10);
  });
});
