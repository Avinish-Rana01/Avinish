import { renderHook, act } from '@testing-library/react';
import useAmbientMusic from '../hooks/useAmbientMusic';
import { vi } from 'vitest';

describe('useAmbientMusic', () => {
  let playMock;
  let pauseMock;
  
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();

    playMock = vi.fn().mockResolvedValue(undefined);
    pauseMock = vi.fn();

    // Mock HTMLAudioElement
    const audioMock = {
      play: playMock,
      pause: pauseMock,
      addEventListener: vi.fn((event, callback) => {
        if (event === 'canplaythrough') {
          callback();
        }
      }),
      volume: 0,
    };
    
    vi.stubGlobal('Audio', class {
      constructor() {
        return audioMock;
      }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('initializes with isPlaying false', () => {
    const { result } = renderHook(() => useAmbientMusic());
    expect(result.current.isPlaying).toBe(false);
  });

  it('toggles playback to play', async () => {
    const { result } = renderHook(() => useAmbientMusic());
    
    await act(async () => {
      result.current.toggle();
    });
    
    expect(playMock).toHaveBeenCalled();
    expect(result.current.isPlaying).toBe(true);
  });

  it('toggles playback to pause', async () => {
    const { result } = renderHook(() => useAmbientMusic());
    
    // First turn it on
    await act(async () => {
      result.current.toggle();
    });
    
    // Fast forward fade-in timer (duration is 2000ms by default in AMBIENT_DEFAULTS)
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    // Turn it off
    act(() => {
      result.current.toggle();
    });
    
    // Fast forward fade-out timer
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(pauseMock).toHaveBeenCalled();
    expect(result.current.isPlaying).toBe(false);
  });
});
