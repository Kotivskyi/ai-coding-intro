import { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';

const ChatHeader = ({ chatId }) => {
  const { currentChat, updateChatTitle, loading } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(currentChat?.title || 'New Chat');

  const handleTitleSubmit = async () => {
    try {
      await updateChatTitle(chatId, title);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update chat title:', error);
    }
  };

  if (loading) {
    return (
      <div className="border-b border-gray-200 p-4">
        <div className="animate-pulse h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 p-4 flex items-center">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
          className="border border-gray-300 rounded px-2 py-1 w-full max-w-md"
          autoFocus
        />
      ) : (
        <h2
          className="text-xl font-semibold text-gray-800 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          onClick={() => setIsEditing(true)}
        >
          {currentChat?.title || 'New Chat'}
        </h2>
      )}
    </div>
  );
};

export default ChatHeader; 