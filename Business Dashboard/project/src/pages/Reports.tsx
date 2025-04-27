import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatCurrency } from '../utils/helpers';
import { Download, Calendar } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports: React.FC = () => {
  const { orders, products } = useData();
  const [dateRange, setDateRange] = useState('30days');

  // Calculate data for reports
  const totalSales = orders.reduce((total, order) => {
    if (order.status !== 'cancelled') {
      return total + order.totalAmount;
    }
    return total;
  }, 0);

  const totalOrders = orders.filter(order => order.status !== 'cancelled').length;
  
  const averageOrderValue = totalOrders > 0
    ? totalSales / totalOrders
    : 0;

  // Data for top products chart
  const productSales = products.map(product => {
    const sales = orders
      .filter(order => order.status !== 'cancelled')
      .flatMap(order => order.products)
      .filter(p => p.id === product.id)
      .reduce((total, p) => total + (p.price * p.quantity), 0);
    
    return {
      id: product.id,
      name: product.name,
      sales
    };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  const chartData = {
    labels: productSales.map(p => p.name),
    datasets: [
      {
        label: 'Sales',
        data: productSales.map(p => p.sales),
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return formatCurrency(context.raw);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500">View and analyze your business data</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="year">This year</option>
            </select>
            <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Sales</h3>
          <p className="text-2xl font-semibold">{formatCurrency(totalSales)}</p>
          <div className="mt-2 flex items-center">
            <span className="text-xs px-2 py-0.5 rounded bg-success-50 text-success-700">
              +12.5%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Orders</h3>
          <p className="text-2xl font-semibold">{totalOrders}</p>
          <div className="mt-2 flex items-center">
            <span className="text-xs px-2 py-0.5 rounded bg-success-50 text-success-700">
              +8.3%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Average Order Value</h3>
          <p className="text-2xl font-semibold">{formatCurrency(averageOrderValue)}</p>
          <div className="mt-2 flex items-center">
            <span className="text-xs px-2 py-0.5 rounded bg-success-50 text-success-700">
              +4.2%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products by Sales</h2>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h2>
          <div className="h-80 flex items-center justify-center">
            <div className="space-y-4 w-full">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Electronics</span>
                <span className="text-sm font-semibold">$12,458.32</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fashion</span>
                <span className="text-sm font-semibold">$8,320.50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium">Furniture</span>
                <span className="text-sm font-semibold">$4,125.75</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium">Health</span>
                <span className="text-sm font-semibold">$1,845.20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue (Last 6 Months)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">June 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">156</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(18624.42)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded bg-success-50 text-success-700">+12.3%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">May 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">142</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(16582.75)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded bg-success-50 text-success-700">+8.5%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">April 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">125</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(15284.30)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded bg-success-50 text-success-700">+5.2%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">March 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">118</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(14528.95)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded bg-error-50 text-error-700">-2.1%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">February 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">132</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(14842.18)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded bg-success-50 text-success-700">+3.8%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">January 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">121</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(14298.55)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded bg-success-50 text-success-700">+1.2%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;