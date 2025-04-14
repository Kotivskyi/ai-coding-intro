import { Link, useLocation } from 'react-router-dom';
import { useChat } from '../../contexts/ChatContext';

const Sidebar = () => {
  const location = useLocation();
  const { chats = [], loading, error, createChat } = useChat();

  const handleNewChat = async () => {
    try {
      await createChat();
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-64 bg-white shadow-lg flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">AI Chat</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Chat</h1>
      </div>
      
      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className="mx-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
      >
        <span className="mr-2">+</span>
        New Chat
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {error && (
          <div className="px-4 py-3 text-red-500">
            {error}
          </div>
        )}
        {Array.isArray(chats) && chats.map((chat) => (
          <Link
            key={chat._id}
            to={`/chat/${chat._id}`}
            className={`flex flex-col px-4 py-3 hover:bg-gray-100 border-b border-gray-200 ${
              location.pathname === `/chat/${chat._id}` ? 'bg-gray-100' : ''
            }`}
          >
            <span className="font-medium text-gray-800">{chat.title}</span>
            <span className="text-sm text-gray-500">
              {new Date(chat.updatedAt).toLocaleDateString()}
            </span>
          </Link>
        ))}
        {!error && Array.isArray(chats) && chats.length === 0 && (
          <div className="px-4 py-3 text-gray-500 text-center">
            No chats yet. Create a new one!
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="mt-auto border-t border-gray-200 py-4">
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <span className="mr-3">⚙️</span>
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 