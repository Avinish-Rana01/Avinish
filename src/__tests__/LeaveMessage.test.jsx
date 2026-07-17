import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeaveMessage from '../components/LeaveMessage/LeaveMessage';
import { vi } from 'vitest';
import * as contactApi from '../api/contactApi';

// Mock the API module
vi.mock('../api/contactApi', () => ({
  submitContactForm: vi.fn(),
}));

// Mock framer-motion to avoid animation delays in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: {
      ...actual.motion,
      div: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
      span: React.forwardRef((props, ref) => <span ref={ref} {...props} />),
      h2: React.forwardRef((props, ref) => <h2 ref={ref} {...props} />),
      h3: React.forwardRef((props, ref) => <h3 ref={ref} {...props} />),
      p: React.forwardRef((props, ref) => <p ref={ref} {...props} />),
      button: React.forwardRef((props, ref) => <button ref={ref} {...props} />),
      textarea: React.forwardRef((props, ref) => <textarea ref={ref} {...props} />),
    },
  };
});

describe('LeaveMessage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the mode selector initially', () => {
    render(<LeaveMessage />);
    expect(screen.getByText(/Choose how you'd like to connect/i)).toBeInTheDocument();
    expect(screen.getByText(/Say Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/Leave a Thought/i)).toBeInTheDocument();
  });

  it('navigates to Reply mode when selected', async () => {
    const user = userEvent.setup();
    render(<LeaveMessage />);
    
    await user.click(screen.getByRole('button', { name: /Say Hello/i }));
    
    // Check if form elements appear
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('navigates to Anonymous mode when selected', async () => {
    const user = userEvent.setup();
    render(<LeaveMessage />);
    
    await user.click(screen.getByRole('button', { name: /Leave a Thought/i }));
    
    // Name and Email should not exist
    expect(screen.queryByLabelText(/Full Name/i)).not.toBeInTheDocument();
    // But textarea should
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Leave Anonymous Thought/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty reply form', async () => {
    const user = userEvent.setup();
    render(<LeaveMessage />);
    
    await user.click(screen.getByRole('button', { name: /Say Hello/i }));
    await user.click(screen.getByRole('button', { name: /Send Message/i }));
    
    expect(await screen.findByText('Name must be at least 2 characters.')).toBeInTheDocument();
    expect(await screen.findByText('Message must be at least 10 characters.')).toBeInTheDocument();
  });

  it('submits form successfully and shows overlay', async () => {
    contactApi.submitContactForm.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<LeaveMessage />);
    
    await user.click(screen.getByRole('button', { name: /Leave a Thought/i }));
    await user.type(screen.getByLabelText(/Your Message/i), 'Testing anonymous mode, long enough message');
    await user.click(screen.getByRole('button', { name: /Leave Anonymous Thought/i }));
    
    expect(contactApi.submitContactForm).toHaveBeenCalledWith({
      type: 'anonymous',
      name: 'Anonymous',
      phone: 'Anonymous',
      email: 'Anonymous',
      message: 'Testing anonymous mode, long enough message',
    });
    
    expect(await screen.findByText(/Message Delivered/i)).toBeInTheDocument();
  });
});
