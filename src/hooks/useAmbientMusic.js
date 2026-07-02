import { useState, useRef, useCallback, useEffect } from 'react';
import { AMBIENT_AUDIO_URL, AMBIENT_DEFAULTS } from '../constants/audio';

const STORAGE_KEY = 'ambient-music';

function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage might be unavailable
  }
}

export default function useAmbientMusic() {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const savedPrefs = useRef(loadPrefs());

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore volume from prefs or use default
  const targetVolume = savedPrefs.current?.volume ?? AMBIENT_DEFAULTS.volume;

  // Lazy-load: create Audio element only on first play
  const getAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(AMBIENT_AUDIO_URL);
    audio.loop = AMBIENT_DEFAULTS.loop;
    audio.volume = 0; // start silent for fade-in
    audio.preload = 'none';

    // Restore playback position if available
    if (savedPrefs.current?.currentTime) {
      audio.currentTime = savedPrefs.current.currentTime;
    }

    audio.addEventListener('canplaythrough', () => setIsLoaded(true), { once: true });

    audioRef.current = audio;
    setIsLoaded(true);
    return audio;
  }, []);

  // Smooth fade helper
  const fade = useCallback((audio, from, to, duration, onComplete) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const steps = 30; // ~30 increments
    const stepTime = duration / steps;
    const delta = (to - from) / steps;
    let currentStep = 0;

    audio.volume = from;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVol = Math.min(1, Math.max(0, from + delta * currentStep));
      audio.volume = newVol;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audio.volume = to;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }, []);

  const play = useCallback(() => {
    const audio = getAudio();

    audio.play().then(() => {
      setIsPlaying(true);
      fade(audio, 0, targetVolume, AMBIENT_DEFAULTS.fadeDuration);
      savePrefs({ enabled: true, volume: targetVolume, currentTime: audio.currentTime });
    }).catch((err) => {
      console.warn('Ambient audio play failed:', err);
    });
  }, [getAudio, fade, targetVolume]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    fade(audio, audio.volume, 0, AMBIENT_DEFAULTS.fadeDuration, () => {
      audio.pause();
      setIsPlaying(false);
      savePrefs({ enabled: false, volume: targetVolume, currentTime: audio.currentTime });
    });
  }, [fade, targetVolume]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Persist playback position periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        savePrefs({ enabled: true, volume: targetVolume, currentTime: audio.currentTime });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [targetVolume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      const audio = audioRef.current;
      if (audio) {
        savePrefs({ enabled: !audio.paused, volume: targetVolume, currentTime: audio.currentTime });
        audio.pause();
      }
    };
  }, [targetVolume]);

  return {
    isPlaying,
    isLoaded,
    toggle,
  };
}
