import React from 'react';
import { render, screen } from '@testing-library/react';
import PlaygroundPage from '../../sections/PlaygroundPage';
import { MemoryRouter } from 'react-router-dom';
import { UIProvider } from '../../context/UIContext';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: {
      ...actual.motion,
      section: React.forwardRef((props, ref) => {
        const { initial, animate, exit, transition, ...rest } = props;
        return <section ref={ref} {...rest} />;
      }),
      div: React.forwardRef((props, ref) => {
        const { initial, animate, exit, transition, ...rest } = props;
        return <div ref={ref} {...rest} />;
      }),
    },
  };
});

describe('PlaygroundPage', () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.IntersectionObserver = MockIntersectionObserver;
    
    // Mock monaco editor
    vi.mock('@monaco-editor/react', () => {
      return {
        default: () => <div data-testid="monaco-editor-mock" />
      };
    });
  });

  it('renders correctly', () => {
    render(
      <UIProvider>
        <MemoryRouter>
          <PlaygroundPage />
        </MemoryRouter>
      </UIProvider>
    );

    // It should render the initial hero screen before starting workspace
    expect(screen.getByText(/Avinish DevLab/i)).toBeInTheDocument();
  });
});
