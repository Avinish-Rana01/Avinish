import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UIProvider, useUI } from '../context/UIContext';
import { vi } from 'vitest';

// Mock the hook used inside UIContext
vi.mock('../hooks/useAmbientMusic', () => ({
  default: () => ({
    isPlaying: false,
    toggle: vi.fn(),
  }),
}));

const TestComponent = () => {
  const {
    isChatOpen,
    hasChatOpenedOnce,
    toggleChat,
    closeChat,
    isDustEnabled,
    toggleDust,
  } = useUI();

  return (
    <div>
      <span data-testid="chat-open">{isChatOpen.toString()}</span>
      <span data-testid="chat-opened-once">{hasChatOpenedOnce.toString()}</span>
      <span data-testid="dust-enabled">{isDustEnabled.toString()}</span>
      <button data-testid="toggle-chat" onClick={toggleChat}>Toggle Chat</button>
      <button data-testid="close-chat" onClick={closeChat}>Close Chat</button>
      <button data-testid="toggle-dust" onClick={toggleDust}>Toggle Dust</button>
    </div>
  );
};

describe('UIContext', () => {
  it('provides default values', () => {
    render(
      <UIProvider>
        <TestComponent />
      </UIProvider>
    );

    expect(screen.getByTestId('chat-open').textContent).toBe('false');
    expect(screen.getByTestId('chat-opened-once').textContent).toBe('false');
    expect(screen.getByTestId('dust-enabled').textContent).toBe('true');
  });

  it('toggles chat state', () => {
    render(
      <UIProvider>
        <TestComponent />
      </UIProvider>
    );

    act(() => {
      screen.getByTestId('toggle-chat').click();
    });

    expect(screen.getByTestId('chat-open').textContent).toBe('true');
    expect(screen.getByTestId('chat-opened-once').textContent).toBe('true');
    
    act(() => {
      screen.getByTestId('toggle-chat').click();
    });

    expect(screen.getByTestId('chat-open').textContent).toBe('false');
    expect(screen.getByTestId('chat-opened-once').textContent).toBe('true');
  });

  it('closes chat explicitly', () => {
    render(
      <UIProvider>
        <TestComponent />
      </UIProvider>
    );

    act(() => {
      screen.getByTestId('toggle-chat').click();
    });
    
    expect(screen.getByTestId('chat-open').textContent).toBe('true');
    
    act(() => {
      screen.getByTestId('close-chat').click();
    });

    expect(screen.getByTestId('chat-open').textContent).toBe('false');
  });

  it('toggles dust state', () => {
    render(
      <UIProvider>
        <TestComponent />
      </UIProvider>
    );

    expect(screen.getByTestId('dust-enabled').textContent).toBe('true');

    act(() => {
      screen.getByTestId('toggle-dust').click();
    });

    expect(screen.getByTestId('dust-enabled').textContent).toBe('false');
  });
});
