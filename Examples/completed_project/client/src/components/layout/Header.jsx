import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 