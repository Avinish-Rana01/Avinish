import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../sections/HeroSection';

// Mock framer-motion and Magnet
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
      nav: React.forwardRef((props, ref) => {
        const { variants, initial, whileInView, viewport, ...rest } = props;
        return <nav ref={ref} {...rest} />;
      }),
    },
  };
});

vi.mock('../../components/Magnet', () => ({
  default: ({ children }) => <div data-testid="magnet-mock">{children}</div>,
}));

describe('HeroSection', () => {
  it('renders navbar links correctly', () => {
    render(<HeroSection />);
    const links = ['About', 'Skills', 'Projects', 'Resume', 'Contact'];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders the main heading', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(/Hi, I'm/i);
    expect(heading).toHaveTextContent(/avinish/i);
  });

  it('renders portrait image', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('Avinish Rana');
    expect(img).toBeInTheDocument();
  });

  it('renders the tagline and contact button', () => {
    render(<HeroSection />);
    expect(screen.getByText(/a frontend developer driven by crafting responsive/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Me/i })).toBeInTheDocument();
  });
});
