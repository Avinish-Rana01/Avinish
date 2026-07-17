import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

// A component that intentionally throws an error
const BuggyComponent = () => {
  throw new Error('Test error!');
};

describe('ErrorBoundary Component', () => {
  // Prevent React from logging the expected error to the console during tests
  let consoleError;
  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="healthy-child">I am healthy</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('healthy-child')).toBeInTheDocument();
  });

  it('renders fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error!')).toBeInTheDocument();
  });

  it('provides a button to reload the page', () => {
    // Mock window.location.href assignment
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /Back to Home/i });
    fireEvent.click(button);

    expect(window.location.href).toBe('/');

    // Restore original location
    window.location = originalLocation;
  });
});
