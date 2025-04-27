import React from 'react';
import SummaryStats from '../components/dashboard/SummaryStats';
import SalesChart from '../components/dashboard/SalesChart';
import RecentOrders from '../components/dashboard/RecentOrders';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's what's happening with your business today.</p>
      </div>
      
      <SummaryStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="text-sm font-semibold">3.6%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Average Order Value</span>
                <span className="text-sm font-semibold">$124.35</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Customer Retention</span>
                <span className="text-sm font-semibold">68.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Top Product</span>
                <span className="text-sm font-semibold">Premium Headphones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;