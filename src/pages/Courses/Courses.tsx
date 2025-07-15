import React from 'react';

const Courses: React.FC = () => {
  const departments = [
    { name: 'Total', count: 5, bg: 'bg-green-800' },
    { name: 'Active', count: 3, bg: 'bg-yellow-800' },
    { name: 'In Active', count: 5, bg: 'bg-purple-800' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {departments.map((dept, index) => (
        <div
          key={index}
          className={`${dept.bg} relative overflow-hidden text-white p-5 rounded-md shadow text-center`}
        >
          {/* Bubbles */}
          <div className="absolute -bottom-5 -left-5 flex items-center opacity-20">
            <div className="w-24 h-24 rounded-full bg-white mr-2"></div>
            <div className="w-16 h-16 rounded-full bg-white mr-2"></div>
            <div className="w-10 h-10 rounded-full bg-white mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>

          {/* Text Content */}
          <h3 className="text-xl font-bold relative z-10">{dept.name}</h3>
          <p className="text-3xl mt-2 relative z-10">{dept.count}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
