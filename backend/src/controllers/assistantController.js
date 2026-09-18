import { askGemini } from '../services/geminiService.js';

/**
 * Handle AI Assistant chat messages
 * POST /api/assistant/chat
 */
export async function handleAssistantChat(req, res, next) {
  try {
    const { message, history = [], farmContext = {} } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message text is required.',
      });
    }

    // Attach authenticated farmer info if available
    const enrichedContext = {
      ...farmContext,
      farmerName: req.user?.fullName,
      location: farmContext.location || req.user?.state || req.user?.district,
    };

    const result = await askGemini(message.trim(), history, enrichedContext);

    return res.status(200).json({
      success: true,
      reply: result.reply,
      provider: result.provider,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

export default {
  handleAssistantChat,
};
