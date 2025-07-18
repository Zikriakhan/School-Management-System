import React from 'react';
import { useTranslation } from 'react-i18next';
// import Header from '../../Layout/TeacherLayout/Header';
import StatCard from '../../components/TeacherComponents/StatCard';
import AttendanceChart from '../../components/TeacherComponents/AttendanceChart';
import AttendanceRatio  from '../../components/TeacherComponents/AttendanceRatio';
import RecentQueries   from '../../components/TeacherComponents/RecentQueries';

const Dashboard = () => {
  const { t } = useTranslation();

  const upcomingEvents = [
    { title: 'Faculty Meeting', date: 'March 15', color: 'bg-blue-100 text-blue-800' },
    { title: 'Student Orientation', date: 'March 18', color: 'bg-green-100 text-green-800' },
    { title: 'Course Registration Deadline', date: 'March 20', color: 'bg-red-100 text-red-800' },
    { title: 'Science Fair', date: 'March 25', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title={t('dashboard.classes')} 
            value="6" 
            bgColor="bg-purple-500" 
          />
          <StatCard 
            title={t('dashboard.present')} 
            value="23" 
            bgColor="bg-green-500" 
          />
          <StatCard 
            title={t('dashboard.absent')} 
            value="2" 
            bgColor="bg-indigo-500" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance Chart */}
          <AttendanceChart />

          {/* Current Day Overview */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{t('dashboard.currentDayOverview')}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('dashboard.classesToday')}</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('dashboard.taken')}</span>
                <span className="text-2xl font-bold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('dashboard.remaining')}</span>
                <span className="text-2xl font-bold">1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{t('dashboard.upcomingEvents')}</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Ratio */}

          {/* Recent Queries */}
          <div className="lg:col-span-1">
          </div>
          <AttendanceRatio />
        </div>
            <RecentQueries />
      </main>
    </div>
  );
};

export default Dashboard;