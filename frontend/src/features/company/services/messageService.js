import initialMessages from '../data/messages.json';

const STORAGE_KEY = 'ks_company_conversations';

function readStoredMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialMessages;
  } catch {
    return initialMessages;
  }
}

export const messageService = {
  async getConversations() {
    return new Promise((resolve) => setTimeout(() => resolve([...readStoredMessages()]), 50));
  },

  async sendMessage(conversationId, text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversations = readStoredMessages();
        const updated = conversations.map((conv) => {
          if (conv.id === conversationId) {
            const newMsg = {
              sender: 'company',
              text,
              time: 'Just now',
            };
            return {
              ...conv,
              lastMessage: text,
              time: 'Just now',
              messages: [...conv.messages, newMsg],
            };
          }
          return conv;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(true);
      }, 50);
    });
  },
};

export default messageService;
