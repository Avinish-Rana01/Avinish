import { renderHook, act } from '@testing-library/react';
import useChat from '../hooks/useChat';
import { sendChatMessage } from '../services/chatApi';
import { vi } from 'vitest';

vi.mock('../services/chatApi', () => ({
  sendChatMessage: vi.fn(),
}));

describe('useChat', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with empty messages', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toEqual([]);
    expect(result.current.isThinking).toBe(false);
  });

  it('sends a message and handles API response successfully', async () => {
    sendChatMessage.mockResolvedValue('Hello there!');
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Hi');
    });
    
    // User message and streaming placeholder should be added
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toMatchObject({ sender: 'user', text: 'Hi' });
    expect(result.current.messages[1]).toMatchObject({ sender: 'ai', text: '', isStreaming: true });
    
    // Fast forward to complete the streaming of "Hello there!"
    act(() => {
      vi.runAllTimers();
    });
    
    expect(result.current.messages[1].text).toBe('Hello there!');
    expect(result.current.messages[1].isStreaming).toBe(false);
  });

  it('handles API errors', async () => {
    sendChatMessage.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Hi');
    });
    
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].isError).toBe(true);
    expect(result.current.isThinking).toBe(false);
  });

  it('clears chat', async () => {
    sendChatMessage.mockResolvedValue('Hi back');
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Hi');
    });
    
    act(() => {
      result.current.clearChat();
    });
    
    expect(result.current.messages).toEqual([]);
  });
});
