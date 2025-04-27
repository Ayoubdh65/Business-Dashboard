import React from 'react';
import StatsCard from '../common/StatsCard';
import { Users, ShoppingBag, ShoppingCart, CreditCard } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

const SummaryStats: React.FC = () => {
  const { users, products, orders } = useData();
  
  // Calculate total revenue
  const totalRevenue = orders.reduce((total, order) => {
    if (order.status !== 'cancelled') {
      return total + order.totalAmount;
    }
    return total;
  }, 0);
  
  // Calculate active users count
  const activeUsers = users.filter(user => user.status === 'active').length;
  
  // Calculate pending orders count
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        change={8.2}
        icon={<CreditCard size={24} />}
      />
      <StatsCard
        title="Active Users"
        value={activeUsers}
        change={12.5}
        icon={<Users size={24} />}
      />
      <StatsCard
        title="Products In Stock"
        value={products.length}
        change={-2.3}
        icon={<ShoppingBag size={24} />}
      />
      <StatsCard
        title="Pending Orders"
        value={pendingOrders}
        change={5.4}
        icon={<ShoppingCart size={24} />}
      />
    </div>
  );
};

export default SummaryStats;