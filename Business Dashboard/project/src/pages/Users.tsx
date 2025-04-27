import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DataTable from '../components/common/DataTable';
import { Edit, Trash, UserPlus, Search, Filter } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { formatDateTime } from '../utils/helpers';
import { User } from '../types';

const Users: React.FC = () => {
  const { users, deleteUser } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'User',
      accessor: (user: User) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={user.avatar}
              alt={user.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
    },
    {
      header: 'Status',
      accessor: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      header: 'Last Active',
      accessor: (user: User) => formatDateTime(user.lastActive),
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(user);
              // Edit user logic would go here
              console.log('Edit user:', user);
            }}
            className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(user);
              setShowDeleteConfirm(true);
            }}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Manage your users and their permissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <UserPlus size={18} className="mr-2" />
            Add New User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredUsers}
          keyExtractor={(user) => user.id}
          onRowClick={(user) => {
            setSelectedUser(user);
            // View user details logic would go here
            console.log('View user details:', user);
          }}
          emptyMessage="No users found matching your search criteria."
        />
      </div>

      {showDeleteConfirm && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete the user <span className="font-medium">{selectedUser.name}</span>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;