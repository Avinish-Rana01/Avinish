import { useState, useCallback, useEffect } from 'react';
import { fetchMessages, deleteMessage as apiDeleteMessage } from '../api/inboxApi';

export default function useDeveloperInbox() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMessages();
      setMessages(data || []);
      setFilteredMessages(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load messages.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const [filterMode, setFilterMode] = useState('all');

  useEffect(() => {
    let filtered = messages;

    // Apply anonymous filter first
    if (filterMode === 'anonymous') {
      filtered = filtered.filter(msg => 
        msg.type === 'anonymous' || 
        !msg.email || 
        String(msg.email).toLowerCase() === 'anonymous' || 
        String(msg.name || '').toLowerCase() === 'anonymous'
      );
    }

    // Apply search query next
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          (msg.name && String(msg.name).toLowerCase().includes(query)) ||
          (msg.email && String(msg.email).toLowerCase().includes(query)) ||
          (msg.phone && String(msg.phone).toLowerCase().includes(query)) ||
          (msg.message && String(msg.message).toLowerCase().includes(query)) ||
          (msg.type && String(msg.type).toLowerCase().includes(query))
      );
    }
    
    setFilteredMessages(filtered);
  }, [searchQuery, filterMode, messages]);

  const deleteMessage = useCallback(
    async (id) => {
      setIsDeleting(true);
      setError(null);
      try {
        await apiDeleteMessage(id);
        // Optimistically remove from state
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete message.');
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    []
  );

  return {
    messages: filteredMessages,
    totalCount: messages.length,
    isLoading,
    error,
    isDeleting,
    searchQuery,
    setSearchQuery,
    filterMode,
    setFilterMode,
    refresh: loadMessages,
    deleteMessage,
  };
}
