import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  bgColor, 
  textColor = 'text-white' 
}) => {
  return (
    <div className={`${bgColor} ${textColor} p-6 rounded-xl shadow-sm`}>
      <h3 className="text-lg font-medium opacity-90 mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;