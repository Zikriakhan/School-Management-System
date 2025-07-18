import React from 'react';
import { useTranslation } from 'react-i18next';
// import Header from '../../Layout/TeacherLayout/Header';
import StatCard from '../../components/TeacherComponents/StatCard';
const Timetable = () => {
  const { t } = useTranslation();

  const handlePrint = () => {
    window.print();
  };

  const timetableData = [
    {
      day: 'Sunday-Thursday',
      course: t('common.programming'),
      class: t('common.python'),
      section: 'A',
      startTime: '08:00 AM',
      endTime: '08:45 AM'
    },
    {
      day: 'Sunday-Thursday',
      course: t('common.programming'),
      class: t('common.python'),
      section: 'A',
      startTime: '08:00 AM',
      endTime: '08:45 AM'
    },
    {
      day: 'Sunday-Thursday',
      course: t('common.programming'),
      class: t('common.python'),
      section: 'A',
      startTime: '08:00 AM',
      endTime: '08:45 AM'
    },
    {
      day: 'Friday & Saturday',
      course: '--',
      class: '--',
      section: '--',
      startTime: '--',
      endTime: '--'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header 
        title={t('timetable.title')} 
        showPrintButton={true}
        onPrint={handlePrint}
      /> */}
      
      <main className="p-6">
        {/* Today's Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{t('timetable.todayOverview')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title={t('timetable.todayClasses')} 
              value="6" 
              bgColor="bg-purple-500" 
            />
            <StatCard 
              title={t('timetable.classesTaken')} 
              value="4" 
              bgColor="bg-green-500" 
            />
            <StatCard 
              title={t('timetable.remainingClasses')} 
              value="2" 
              bgColor="bg-indigo-500" 
            />
          </div>
        </div>

        {/* Weekly Timetable */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">{t('timetable.weeklyTimetable')}</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b">
                  <th className="pb-3">{t('timetable.course')}</th>
                  <th className="pb-3">{t('timetable.class')}</th>
                  <th className="pb-3">{t('timetable.section')}</th>
                  <th className="pb-3">{t('timetable.startTime')}</th>
                  <th className="pb-3">{t('timetable.endTime')}</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 font-medium text-gray-700 bg-gray-50">
                          {item.day}
                        </td>
                      </tr>
                    )}
                    {index === 3 && (
                      <tr>
                        <td colSpan={5} className="py-4 font-medium text-gray-700 bg-gray-50">
                          {item.day}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t">
                      <td className="py-3 text-sm">{item.course}</td>
                      <td className="py-3 text-sm">{item.class}</td>
                      <td className="py-3 text-sm">{item.section}</td>
                      <td className="py-3 text-sm">{item.startTime}</td>
                      <td className="py-3 text-sm">{item.endTime}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timetable;