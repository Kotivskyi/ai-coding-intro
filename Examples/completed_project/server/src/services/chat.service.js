const Chat = require('../models/chat.model');

class ChatService {
  static async createChat(userId, title) {
    try {
      const chat = new Chat({
        title,
        userId,
        messages: []
      });
      await chat.save();
      return chat;
    } catch (error) {
      throw error;
    }
  }

  static async getChats(userId) {
    try {
      return await Chat.find({ userId })
        .sort({ updatedAt: -1 })
        .select('title createdAt updatedAt');
    } catch (error) {
      throw error;
    }
  }

  static async getChatById(chatId, userId) {
    try {
      const chat = await Chat.findOne({ _id: chatId, userId });
      if (!chat) {
        throw new Error('Chat not found');
      }
      return chat;
    } catch (error) {
      throw error;
    }
  }

  static async updateChatTitle(chatId, userId, title) {
    try {
      const chat = await this.getChatById(chatId, userId);
      chat.title = title;
      await chat.save();
      return chat;
    } catch (error) {
      throw error;
    }
  }

  static async addMessage(chatId, userId, content, role) {
    try {
      const chat = await this.getChatById(chatId, userId);
      chat.messages.push({ content, role });
      await chat.save();
      return chat;
    } catch (error) {
      throw error;
    }
  }

  static async deleteChat(chatId, userId) {
    try {
      const result = await Chat.deleteOne({ _id: chatId, userId });
      if (result.deletedCount === 0) {
        throw new Error('Chat not found');
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ChatService; 