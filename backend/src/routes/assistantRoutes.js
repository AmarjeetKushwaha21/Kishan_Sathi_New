import express from 'express';
import { handleAssistantChat } from '../controllers/assistantController.js';

const router = express.Router();

// Chat endpoint (accessible to farmers and guests)
router.post('/chat', handleAssistantChat);

export default router;
