import React from 'react';
import { useTranslation } from 'react-i18next';

const RecentQueries = () => {
  const { t } = useTranslation();

  const queries = [
    {
      sno: 1,
      studentName: 'Alice Johnson',
      subject: 'Mathematics',
      type: 'Homework',
      status: 'Pending'
    },
    {
      sno: 2,
      studentName: 'Bob Smith',
      subject: 'Science',
      type: 'Assignment',
      status: 'Done'
    },
    {
      sno: 3,
      studentName: 'Carol Davis',
      subject: 'English',
      type: 'Quiz',
      status: 'Pending'
    },
    {
      sno: 4,
      studentName: 'David Wilson',
      subject: 'History',
      type: 'Project',
      status: 'Done'
    }
  ];

  return (
    <div className="bg-white  rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t('dashboard.recentQueries')}</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          {t('dashboard.viewAll')}
        </button>
      </div>
      <br />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="pb-3">S.No</th>
              <th className="pb-3">Student Name</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">{t('common.type')}</th>
              <th className="pb-3">{t('common.status')}</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.sno} className="border-t">
                <td className="py-3 text-sm">{query.sno}</td>
                <td className="py-3 text-sm">{query.studentName}</td>
                <td className="py-3 text-sm">{query.subject}</td>
                <td className="py-3 text-sm">{query.type}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    query.status === 'Done' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {query.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentQueries;