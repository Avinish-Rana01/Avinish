import { renderHook, act } from '@testing-library/react';
import { useDevLabGuide } from '../hooks/useDevLabGuide';
import { vi } from 'vitest';

describe('useDevLabGuide', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('shows intro if not seen previously', () => {
    const { result } = renderHook(() => useDevLabGuide());
    expect(result.current.isVisible).toBe(true);
  });

  it('does not show intro if seen previously', () => {
    sessionStorage.setItem('devlab_intro_seen', 'true');
    const { result } = renderHook(() => useDevLabGuide());
    expect(result.current.isVisible).toBe(false);
  });

  it('completes intro and updates sessionStorage', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useDevLabGuide(onComplete));
    
    act(() => {
      result.current.completeIntro();
    });
    
    expect(result.current.isVisible).toBe(false);
    expect(sessionStorage.getItem('devlab_intro_seen')).toBe('true');
    expect(onComplete).toHaveBeenCalled();
  });
});
