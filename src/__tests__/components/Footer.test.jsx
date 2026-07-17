import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  it('renders footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText('Avinish Rana')).toBeInTheDocument();
    expect(screen.getByText(/Creative Frontend Engineer/i)).toBeInTheDocument();
  });

  it('renders social links with correct URLs', () => {
    render(<Footer />);
    
    // Using aria-labels to find links
    const githubLink = screen.getByLabelText(/GitHub Profile/i);
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
    
    const linkedinLink = screen.getByLabelText(/LinkedIn Profile/i);
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    
    const instaLink = screen.getByLabelText(/Instagram Profile/i);
    expect(instaLink).toHaveAttribute('href', 'https://instagram.com/ig_avinish01');
    
    const leetcodeLink = screen.getByLabelText(/LeetCode Profile/i);
    expect(leetcodeLink).toHaveAttribute('href', 'https://leetcode.com/u/Avinish-Rana01/');
    
    const emailLink = screen.getByLabelText(/Send Email/i);
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@avinish.dev');
  });
});
