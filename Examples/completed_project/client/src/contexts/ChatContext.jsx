import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  // Fetch all chats on component mount
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/chats');
      setChats(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch chats');
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (title = 'New Chat') => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/chats', { title });
      setChats(prevChats => [response.data, ...prevChats]);
      setCurrentChat(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create chat');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateChatTitle = async (chatId, title) => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/v1/chats/${chatId}`, { title });
      setChats(prevChats => 
        prevChats.map(chat => 
          chat._id === chatId ? response.data : chat
        )
      );
      if (currentChat?._id === chatId) {
        setCurrentChat(response.data);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update chat title');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/v1/chats/${chatId}`);
      setChats(prevChats => prevChats.filter(chat => chat._id !== chatId));
      if (currentChat?._id === chatId) {
        setCurrentChat(null);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete chat');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chats,
    currentChat,
    loading,
    error,
    createChat,
    updateChatTitle,
    deleteChat,
    setCurrentChat,
    fetchChats
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 