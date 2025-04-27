import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  className,
}) => {
  return (
    <div className={clsx('bg-white rounded-lg shadow p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span
                className={clsx(
                  'text-xs font-medium px-2 py-0.5 rounded',
                  change >= 0
                    ? 'text-success-700 bg-success-50'
                    : 'text-error-700 bg-error-50'
                )}
              >
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-primary-50 rounded-full text-primary-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;