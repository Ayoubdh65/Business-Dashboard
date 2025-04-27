import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useApp();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={clsx('flex-1 flex flex-col transition-all duration-300', 
        sidebarOpen ? 'ml-64' : 'ml-20'
      )}>
        <Header />
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;