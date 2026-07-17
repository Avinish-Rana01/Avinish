import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutSection from '../../sections/AboutSection';

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

describe('AboutSection', () => {
  it('renders the heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /About me/i })).toBeInTheDocument();
  });

  it('renders the about text', () => {
    render(<AboutSection />);
    const aboutText = screen.getAllByText(/scalable/i);
    expect(aboutText.length).toBeGreaterThan(0);
  });

  it('renders the certificate links', () => {
    render(<AboutSection />);
    const certLink = screen.getByRole('link', { name: /Certificate/i });
    expect(certLink).toBeInTheDocument();
    expect(certLink).toHaveAttribute('href', 'https://namastedev.com/ranaavinish25/certificates/namaste-javascript');
  });
});
