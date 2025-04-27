import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DataTable from '../components/common/DataTable';
import { Search, Filter, Clock, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import StatusBadge from '../components/common/StatusBadge';
import { Order } from '../types';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  const { orders } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === '' || order.status === statusFilter)
  );

  const columns = [
    {
      header: 'Order ID',
      accessor: 'id',
    },
    {
      header: 'Customer',
      accessor: (order: Order) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
          <div className="text-sm text-gray-500">{order.customer.email}</div>
        </div>
      ),
    },
    {
      header: 'Date',
      accessor: (order: Order) => formatDate(order.date),
    },
    {
      header: 'Status',
      accessor: (order: Order) => <StatusBadge status={order.status} />,
    },
    {
      header: 'Total',
      accessor: (order: Order) => formatCurrency(order.totalAmount),
      className: 'text-right',
    },
    {
      header: 'Actions',
      accessor: (order: Order) => (
        <div className="flex space-x-2">
          <Link
            to={`/orders/${order.id}`}
            className="p-1 text-gray-500 hover:text-primary-600 transition-colors flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye size={18} className="mr-1" />
            <span className="text-sm">View</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-500">View and manage customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="flex space-x-2">
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter size={18} className="mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          keyExtractor={(order) => order.id}
          emptyMessage="No orders found matching your search criteria."
        />
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Processing Timeline</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex flex-col items-center">
              <div className="bg-primary-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                <Clock size={18} />
              </div>
              <div className="h-16 w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium">Order Received</h3>
              <p className="text-sm text-gray-500 mt-1">
                Order is received and payment is confirmed
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center text-white">
                <Clock size={18} />
              </div>
              <div className="h-16 w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium">Processing</h3>
              <p className="text-sm text-gray-500 mt-1">
                Order is being processed and items are being prepared
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center text-white">
                <Clock size={18} />
              </div>
              <div className="h-16 w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium">Shipped</h3>
              <p className="text-sm text-gray-500 mt-1">
                Order has been shipped and is on its way
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center text-white">
                <Clock size={18} />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium">Delivered</h3>
              <p className="text-sm text-gray-500 mt-1">
                Order has been delivered to the customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;