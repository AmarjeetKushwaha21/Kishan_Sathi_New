import httpClient from '@/api/httpClient';

/**
 * Send a message to AI Sathi backend
 * @param {string} message - User's question
 * @param {Array} history - Previous messages [{ role: 'user'|'assistant', text: string }]
 * @param {Object} farmContext - Optional context (location, crop, weather)
 */
export async function sendChatMessage(message, history = [], farmContext = {}) {
  try {
    const formattedHistory = history.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      text: m.text,
    }));

    const response = await httpClient.post('/assistant/chat', {
      message,
      history: formattedHistory,
      farmContext,
    });

    return response.data;
  } catch (error) {
    console.warn('[assistantService] API chat request failed:', error.message);
    throw error;
  }
}

export default {
  sendChatMessage,
};
