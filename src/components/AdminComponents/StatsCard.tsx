import React from 'react';
import { useTranslation } from 'react-i18next';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  color: 'purple' | 'green' | 'blue' | 'teal';
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const { i18n } = useTranslation();
  
  const colorClasses = {
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    teal: 'bg-gradient-to-r from-teal-500 to-teal-600',
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className={`flex items-center justify-between ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <div className={i18n.language === 'ar' ? 'text-right' : ''}>
          <h3 className="text-white/90 text-sm font-medium uppercase tracking-wide">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className="text-white/80 text-sm mt-1">{trend}</p>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;