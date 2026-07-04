import { useState, useEffect, useCallback } from 'react';

export const useDevLabGuide = (onComplete) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if intro has been seen in current session
    const introSeen = sessionStorage.getItem('devlab_intro_seen');
    if (!introSeen) {
      setIsVisible(true);
    }
  }, []);

  const completeIntro = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem('devlab_intro_seen', 'true');
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // Handle keyboard events (Escape or Enter to dismiss)
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        completeIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, completeIntro]);

  return {
    isVisible,
    completeIntro
  };
};
