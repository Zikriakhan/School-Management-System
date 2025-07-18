import React from 'react';
import StatsCard from '../../components/AdminComponents/StatsCard';
import { Building2, Users, GraduationCap, BookOpen, TrendingUp, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Departments',
      value: '12',
      icon: Building2,
      color: 'purple' as const,
      trend: '+2 new this month'
    },
    {
      title: 'Staff Members',
      value: '148',
      icon: Users,
      color: 'green' as const,
      trend: '+8 new this month'
    },
    {
      title: 'Students',
      value: '2,847',
      icon: GraduationCap,
      color: 'blue' as const,
      trend: '+156 new this semester'
    },
    {
      title: 'Courses',
      value: '67',
      icon: BookOpen,
      color: 'teal' as const,
      trend: '+5 new this term'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New student John Doe registered', time: '2 minutes ago', type: 'student' },
    { id: 2, action: 'Course "Advanced Mathematics" updated', time: '15 minutes ago', type: 'course' },
    { id: 3, action: 'Staff member Sarah Johnson added', time: '1 hour ago', type: 'staff' },
    { id: 4, action: 'Computer Science department created', time: '2 hours ago', type: 'department' }
  ];

  const upcomingEvents = [
    { id: 1, event: 'Faculty Meeting', date: 'Today at 2:00 PM', type: 'meeting' },
    { id: 2, event: 'Student Orientation', date: 'Tomorrow at 9:00 AM', type: 'orientation' },
    { id: 3, event: 'Registration Deadline', date: 'March 15, 2024', type: 'deadline' },
    { id: 4, event: 'Semester Exams', date: 'April 1-15, 2024', type: 'exam' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your institution.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activities
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'student' ? 'bg-blue-500' :
                    activity.type === 'course' ? 'bg-teal-500' :
                    activity.type === 'staff' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Upcoming Events
              </h3>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline transition-colors">
                View Calendar
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                    event.type === 'orientation' ? 'bg-green-100 text-green-600' :
                    event.type === 'deadline' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;