import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Plus, Search, Filter, Clock, Users, Star } from 'lucide-react';

const Courses: React.FC = () => {

  const departments = [
  { name: 'Total', count: 5, bg: 'bg-green-800' },
  { name: 'Active', count: 3, bg: 'bg-yellow-800' },
  { name: 'In Active', count: 5, bg: 'bg-purple-800' },
  
];

  

 

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  

  return (
    
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {departments.map((dept, index) => (
          <div
            key={index}
            className={`${dept.bg} text-white p-5 rounded-md shadow text-center`}
          >
            <h3 className="text-xl font-bold">{dept.name}</h3>
            <p className="text-3xl mt-2">{dept.count}</p>
          </div>
        ))}
      </div>
     
    
  );
};

export default Courses;