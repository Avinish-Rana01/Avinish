import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedText from '../../components/AnimatedText';
import FadeIn from '../../components/FadeIn';

// Mock framer-motion so we don't have to deal with IntersectionObserver and scroll hooks in jsdom
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
        const { style, ...rest } = props;
        return <span ref={ref} {...rest} />;
      }),
      section: React.forwardRef((props, ref) => {
        const { variants, initial, whileInView, viewport, ...rest } = props;
        return <section ref={ref} {...rest} />;
      }),
    },
  };
});

describe('Animation Components', () => {
  describe('AnimatedText', () => {
    it('renders text split into words', () => {
      render(<AnimatedText text="Hello World Animated" />);
      // AnimatedText wraps each word in spans. 
      // It also renders an invisible placeholder span.
      const words = screen.getAllByText(/Hello|World|Animated/);
      // Because there are two spans per word (invisible and animated), there will be 6 matches
      expect(words).toHaveLength(6);
    });
  });

  describe('FadeIn', () => {
    it('renders children', () => {
      render(
        <FadeIn>
          <div data-testid="fade-child">Faded Child</div>
        </FadeIn>
      );
      expect(screen.getByTestId('fade-child')).toBeInTheDocument();
    });

    it('renders as different component type', () => {
      render(
        <FadeIn as="section" className="test-class">
          <p>Section child</p>
        </FadeIn>
      );
      
      const element = screen.getByText('Section child').parentElement;
      expect(element.tagName).toBe('SECTION');
      expect(element).toHaveClass('test-class');
    });
  });
});
