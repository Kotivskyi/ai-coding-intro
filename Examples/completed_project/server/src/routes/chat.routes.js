const express = require('express');
const router = express.Router();
const ChatService = require('../services/chat.service');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

/**
 * @route   POST /api/v1/chats
 * @desc    Create a new chat
 * @access  Private
 */
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await ChatService.createChat(req.user.id, title);
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/v1/chats
 * @desc    Get all chats for the user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const chats = await ChatService.getChats(req.user.id);
    res.json(chats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/v1/chats/:id
 * @desc    Get a specific chat
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const chat = await ChatService.getChatById(req.params.id, req.user.id);
    res.json(chat);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @route   PATCH /api/v1/chats/:id
 * @desc    Update a chat's title
 * @access  Private
 */
router.patch('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await ChatService.updateChatTitle(req.params.id, req.user.id, title);
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   POST /api/v1/chats/:id/messages
 * @desc    Add a message to a chat
 * @access  Private
 */
router.post('/:id/messages', async (req, res) => {
  try {
    const { content, role } = req.body;
    const chat = await ChatService.addMessage(req.params.id, req.user.id, content, role);
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/v1/chats/:id
 * @desc    Delete a chat
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    await ChatService.deleteChat(req.params.id, req.user.id);
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router; 