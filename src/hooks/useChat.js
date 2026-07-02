import { useState, useEffect, useCallback, useRef } from 'react';
import { sendChatMessage } from '../services/chatApi';

const SESSION_STORAGE_KEY = 'avinish-ai-chat-history';

export default function useChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // True while text is streaming
  const activeStreamIdRef = useRef(null);

  // Sync messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat history to sessionStorage', e);
    }
  }, [messages]);

  // Clean up streaming on unmount
  useEffect(() => {
    return () => {
      if (activeStreamIdRef.current) {
        clearInterval(activeStreamIdRef.current);
      }
    };
  }, []);

  // Stream simulation function (Word by Word)
  const streamResponse = useCallback((fullText, messageId) => {
    setIsTyping(true);
    const words = fullText.split(' ');
    let currentText = '';
    let wordIndex = 0;

    if (activeStreamIdRef.current) {
      clearInterval(activeStreamIdRef.current);
    }

    activeStreamIdRef.current = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: currentText } : msg
          )
        );
        wordIndex++;
      } else {
        clearInterval(activeStreamIdRef.current);
        activeStreamIdRef.current = null;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, isStreaming: false } : msg
          )
        );
        setIsTyping(false);
      }
    }, 25); // Speed of word typing
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isThinking || isTyping) return;

    // 1. Add User Message
    const userMsgId = Date.now();
    const newUserMsg = { id: userMsgId, sender: 'user', text };
    setMessages((prev) => [...prev, newUserMsg]);

    setIsThinking(true);

    try {
      // 2. Fetch API Response
      const reply = await sendChatMessage(text);
      setIsThinking(false);

      // 3. Spawn Streaming Placeholder
      const aiMsgId = Date.now() + 1;
      const newAiMsg = { id: aiMsgId, sender: 'ai', text: '', isStreaming: true };
      setMessages((prev) => [...prev, newAiMsg]);

      // 4. Stream response text
      streamResponse(reply, aiMsgId);
    } catch (error) {
      setIsThinking(false);

      // 5. Add Error Message
      const errorMsgId = Date.now() + 1;
      const errorText = "I'm having trouble connecting right now. Please try again in a moment.";
      const errorMsg = { id: errorMsgId, sender: 'ai', text: errorText, isError: true };
      setMessages((prev) => [...prev, errorMsg]);
    }
  }, [isThinking, isTyping, streamResponse]);

  const clearChat = useCallback(() => {
    if (activeStreamIdRef.current) {
      clearInterval(activeStreamIdRef.current);
      activeStreamIdRef.current = null;
    }
    setMessages([]);
    setIsThinking(false);
    setIsTyping(false);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  return {
    messages,
    isThinking,
    isTyping,
    sendMessage,
    clearChat,
  };
}
