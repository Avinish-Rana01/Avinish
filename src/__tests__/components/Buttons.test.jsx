import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactButton from '../../components/ContactButton';
import LiveProjectButton from '../../components/LiveProjectButton';

describe('Buttons', () => {
  describe('ContactButton', () => {
    it('renders correctly with default props', () => {
      render(<ContactButton />);
      const btn = screen.getByRole('link', { name: /Contact Me/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute('href', 'mailto:ranaavinish72@gmail.com');
      expect(btn).toHaveAttribute('id', 'contact-btn');
    });

    it('accepts custom id', () => {
      render(<ContactButton id="custom-id" />);
      expect(screen.getByRole('link')).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('LiveProjectButton', () => {
    it('renders correctly with default props', () => {
      render(<LiveProjectButton />);
      const btn = screen.getByRole('link', { name: /Live Project/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute('href', '#');
      expect(btn).toHaveAttribute('target', '_blank');
      expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('accepts custom href and id', () => {
      render(<LiveProjectButton id="live-1" href="https://example.com" />);
      const btn = screen.getByRole('link');
      expect(btn).toHaveAttribute('id', 'live-1');
      expect(btn).toHaveAttribute('href', 'https://example.com');
    });
  });
});
