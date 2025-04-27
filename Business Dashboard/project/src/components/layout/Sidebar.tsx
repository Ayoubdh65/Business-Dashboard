import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  ShoppingCart, 
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMinimized: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isMinimized }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex items-center p-3 rounded-lg transition-all duration-200 group',
          isActive
            ? 'bg-primary-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        )
      }
    >
      <span className="flex items-center justify-center">{icon}</span>
      <span
        className={clsx(
          'ml-3 whitespace-nowrap transition-all',
          isMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
        )}
      >
        {label}
      </span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useApp();

  return (
    <aside 
      className={clsx(
        'fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-10',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-5 flex items-center">
        <div className="flex items-center">
          <Layers size={28} className="text-primary-600" />
          <span
            className={clsx(
              'text-xl font-bold ml-2 transition-all duration-200',
              sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            )}
          >
            AdminHub
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="ml-auto p-1 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <NavItem
          to="/"
          icon={<Home size={20} />}
          label="Dashboard"
          isMinimized={!sidebarOpen}
        />
        <NavItem
          to="/users"
          icon={<Users size={20} />}
          label="Users"
          isMinimized={!sidebarOpen}
        />
        <NavItem
          to="/products"
          icon={<ShoppingBag size={20} />}
          label="Products"
          isMinimized={!sidebarOpen}
        />
        <NavItem
          to="/orders"
          icon={<ShoppingCart size={20} />}
          label="Orders"
          isMinimized={!sidebarOpen}
        />
        <NavItem
          to="/reports"
          icon={<BarChart3 size={20} />}
          label="Reports"
          isMinimized={!sidebarOpen}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <NavItem
          to="/settings"
          icon={<Settings size={20} />}
          label="Settings"
          isMinimized={!sidebarOpen}
        />
        <button
          className={clsx(
            'flex items-center p-3 rounded-lg w-full mt-2',
            'text-gray-600 hover:bg-gray-100 transition-all duration-200'
          )}
        >
          <LogOut size={20} />
          <span
            className={clsx(
              'ml-3 whitespace-nowrap transition-all',
              sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;