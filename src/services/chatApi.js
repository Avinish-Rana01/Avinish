const API_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage(message) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error in sendChatMessage service:', error);
    throw error;
  }
}
