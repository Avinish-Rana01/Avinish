/**
 * API utility for the Developer Inbox.
 * Uses JSONP for GET requests to bypass strict browser CORS policies and adblockers.
 */

const TIMEOUT_MS = 15_000;

export async function fetchMessages() {
  const baseUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (!baseUrl) {
    throw new Error('VITE_GOOGLE_SCRIPT_URL is not configured.');
  }

  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    // Create timeout
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Request timed out. Please check your connection.'));
    }, TIMEOUT_MS);

    // Define JSONP callback
    window[callbackName] = (data) => {
      cleanup();
      
      if (Array.isArray(data)) {
        // Fallback for older script without standard response object
        resolve(data.map(msg => ({
          ...msg,
          id: msg.id || (msg.timestamp ? new Date(msg.timestamp).getTime().toString() : Math.random().toString())
        })).reverse());
      } else if (data && data.success) {
        resolve(data.data);
      } else {
        reject(new Error(data?.error || 'Failed to fetch messages.'));
      }
    };

    const script = document.createElement('script');
    
    const cleanup = () => {
      clearTimeout(timeoutId);
      if (script.parentNode) script.parentNode.removeChild(script);
      delete window[callbackName];
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Network error or blocked by browser extension. Please ensure your Google Apps Script is updated to support JSONP.'));
    };

    // Construct URL with action=get and callback
    const url = new URL(baseUrl);
    url.searchParams.append('action', 'get');
    url.searchParams.append('callback', callbackName);
    
    script.src = url.toString();
    document.body.appendChild(script);
  });
}

export async function deleteMessage(id) {
  const baseUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (!baseUrl) {
    throw new Error('VITE_GOOGLE_SCRIPT_URL is not configured.');
  }

  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Request timed out. Please check your connection.'));
    }, TIMEOUT_MS);

    window[callbackName] = (data) => {
      cleanup();
      
      if (data && data.success) {
        resolve(true);
      } else {
        reject(new Error(data?.error || 'Failed to delete message. Please ensure you updated your Google Apps Script code.'));
      }
    };

    const script = document.createElement('script');
    
    const cleanup = () => {
      clearTimeout(timeoutId);
      if (script.parentNode) script.parentNode.removeChild(script);
      delete window[callbackName];
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Network error or blocked by browser extension. Please ensure your Google Apps Script is updated.'));
    };

    const url = new URL(baseUrl);
    url.searchParams.append('action', 'delete');
    url.searchParams.append('id', id);
    url.searchParams.append('callback', callbackName);
    
    script.src = url.toString();
    document.body.appendChild(script);
  });
}
