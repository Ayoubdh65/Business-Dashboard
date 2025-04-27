import React from 'react';
import { 
  Bell, 
  Search, 
  Sun, 
  Moon,
  User 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const Header: React.FC = () => {
  const { sidebarOpen, darkMode, toggleDarkMode } = useApp();
  
  return (
    <header className={clsx(
      'fixed top-0 right-0 bg-white border-b border-gray-200 z-10 transition-all duration-300',
      sidebarOpen ? 'left-64' : 'left-20'
    )}>
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="relative md:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </span>
          </button>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Youssef Ben Ali</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;