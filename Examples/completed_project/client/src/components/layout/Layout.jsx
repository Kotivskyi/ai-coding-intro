import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ${!isHomePage ? 'container mx-auto px-6 py-8' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 