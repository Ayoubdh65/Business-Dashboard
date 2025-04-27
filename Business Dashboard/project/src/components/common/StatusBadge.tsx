import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'processing' | 'completed' | 'cancelled';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-success-50 text-success-700';
      case 'inactive':
      case 'cancelled':
        return 'bg-error-50 text-error-700';
      case 'pending':
        return 'bg-warning-50 text-warning-700';
      case 'processing':
        return 'bg-secondary-50 text-secondary-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <span
      className={clsx(
        'px-2.5 py-1 rounded-full text-xs font-medium capitalize',
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;