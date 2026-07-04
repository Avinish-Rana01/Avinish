import React, { createContext, useContext, useState, useCallback } from 'react';
import useAmbientMusic from '../hooks/useAmbientMusic';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasChatOpenedOnce, setHasChatOpenedOnce] = useState(false);
  const { isPlaying: isAudioPlaying, toggle: toggleAudio } = useAmbientMusic();

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
    setHasChatOpenedOnce(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return (
    <UIContext.Provider
      value={{
        isChatOpen,
        hasChatOpenedOnce,
        toggleChat,
        closeChat,
        isAudioPlaying,
        toggleAudio,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
