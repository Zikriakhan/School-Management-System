import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: typeof LucideIcon;
  color: 'purple' | 'green' | 'blue' | 'teal';
  trend: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      icon: 'text-purple-600',
      border: 'border-purple-200',
      text: 'text-white'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      icon: 'text-green-600',
      border: 'border-green-200',
      text: 'text-white'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      icon: 'text-blue-600',
      border: 'border-blue-200',
      text: 'text-white'
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-500 to-teal-600',
      icon: 'text-teal-600',
      border: 'border-teal-200',
      text: 'text-white'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} rounded-xl p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${colors.text} opacity-90 mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${colors.text} mb-2`}>{value}</p>
          <p className={`text-xs ${colors.text} opacity-75`}>{trend}</p>
        </div>
        <div className="p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm">
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;