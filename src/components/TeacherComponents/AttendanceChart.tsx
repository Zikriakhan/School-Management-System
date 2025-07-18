import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 70 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 90 },
  { name: 'Jul', value: 88 },
  { name: 'Aug', value: 92 },
  { name: 'Sep', value: 87 },
  { name: 'Oct', value: 95 },
  { name: 'Nov', value: 93 },
  { name: 'Dec', value: 89 }
];

const AttendanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Monthly Attendance Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;