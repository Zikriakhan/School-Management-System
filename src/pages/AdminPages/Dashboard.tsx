import React from 'react';
import { useTranslation } from 'react-i18next';
import StatsCard from '../../components/AdminComponents/StatsCard';
import { Building2, Users, GraduationCap, BookOpen, TrendingUp, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('dashboard.departments'),
      value: t('dashboard.departmentsCount'),
      icon: Building2,
      color: 'purple' as const,
      trend: t('dashboard.departmentsTrend')
    },
    {
      title: t('dashboard.staff'),
      value: t('dashboard.staffCount'),
      icon: Users,
      color: 'green' as const,
      trend: t('dashboard.staffTrend')
    },
    {
      title: t('dashboard.students'),
      value: t('dashboard.studentsCount'),
      icon: GraduationCap,
      color: 'blue' as const,
      trend: t('dashboard.studentsTrend')
    },
    {
      title: t('dashboard.courses'),
      value: t('dashboard.coursesCount'),
      icon: BookOpen,
      color: 'teal' as const,
      trend: t('dashboard.coursesTrend')
    }
  ];

  const recentActivities = [
    { id: 1, action: t('dashboard.activities.newStudent'), time: t('dashboard.timeAgo.2min'), type: 'student' },
    { id: 2, action: t('dashboard.activities.courseUpdated'), time: t('dashboard.timeAgo.15min'), type: 'course' },
    { id: 3, action: t('dashboard.activities.staffAdded'), time: t('dashboard.timeAgo.1hour'), type: 'staff' },
    { id: 4, action: t('dashboard.activities.departmentCreated'), time: t('dashboard.timeAgo.2hours'), type: 'department' }
  ];

  const upcomingEvents = [
    { id: 1, event: t('dashboard.events.facultyMeeting'), date: t('dashboard.eventDates.today2pm'), type: 'meeting' },
    { id: 2, event: t('dashboard.events.studentOrientation'), date: t('dashboard.eventDates.tomorrow9am'), type: 'orientation' },
    { id: 3, event: t('dashboard.events.registrationDeadline'), date: t('dashboard.eventDates.march15'), type: 'deadline' },
    { id: 4, event: t('dashboard.events.semesterExams'), date: t('dashboard.eventDates.april1-15'), type: 'exam' }
  ];

  return (
    <div className="space-y-6">
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-blue-600" />
              {t('dashboard.recentActivities')}
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t('dashboard.viewAll')}
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'student' ? 'bg-blue-500' :
                  activity.type === 'course' ? 'bg-teal-500' :
                  activity.type === 'staff' ? 'bg-green-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-purple-600" />
              {t('dashboard.upcomingEvents')}
            </h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              {t('dashboard.viewCalendar')}
            </button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                  event.type === 'orientation' ? 'bg-green-100 text-green-600' :
                  event.type === 'deadline' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;