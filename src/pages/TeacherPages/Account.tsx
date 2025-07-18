import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import Header from '../../Layout/TeacherLayout/Header';
import StatCard from '../../components/TeacherComponents/StatCard';

const Account = () => {
  const { t } = useTranslation();

  const teachingHoursData = [
    { name: '0', hoursSpent: 0, hoursTarget: 0 },
    { name: '1', hoursSpent: 300, hoursTarget: 250 },
    { name: '2', hoursSpent: 200, hoursTarget: 300 },
    { name: '3', hoursSpent: 400, hoursTarget: 350 },
    { name: '4', hoursSpent: 250, hoursTarget: 400 },
    { name: '5', hoursSpent: 500, hoursTarget: 450 },
    { name: '6', hoursSpent: 350, hoursTarget: 500 },
    { name: '7', hoursSpent: 400, hoursTarget: 350 },
    { name: '8', hoursSpent: 300, hoursTarget: 400 }
  ];

  const salaryData = [
    {
      month: 'January',
      salaryStatus: t('account.paid'),
      paidDate: '11-07-2025',
      dueDate: '15-07-2025'
    },
    {
      month: 'January',
      salaryStatus: t('account.paid'),
      paidDate: '11-07-2025',
      dueDate: '15-07-2025'
    },
    {
      month: 'January',
      salaryStatus: t('account.paid'),
      paidDate: '11-07-2025',
      dueDate: '15-07-2025'
    },
    {
      month: 'January',
      salaryStatus: t('account.paid'),
      paidDate: '11-07-2025',
      dueDate: '15-07-2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header title={t('account.title')} /> */}
      
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title={t('account.totalPaid')} 
            value="$200" 
            bgColor="bg-purple-500" 
          />
          <StatCard 
            title={t('account.unpaidBalance')} 
            value="$102" 
            bgColor="bg-green-500" 
          />
          <StatCard 
            title={t('account.absentBalance')} 
            value="$23" 
            bgColor="bg-indigo-500" 
          />
        </div>

        {/* Teaching Hours Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">{t('account.teachingHours')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teachingHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="hoursSpent" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name={t('common.hoursSpent')}
              />
              <Line 
                type="monotone" 
                dataKey="hoursTarget" 
                stroke="#22C55E" 
                strokeWidth={2}
                name="Hours Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Status Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('account.salaryStatus')}</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              {t('dashboard.viewAll')}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b">
                  <th className="pb-3">{t('account.month')}</th>
                  <th className="pb-3">{t('account.salaryStatus')}</th>
                  <th className="pb-3">{t('account.paidDate')}</th>
                  <th className="pb-3">{t('account.dueDate')}</th>
                </tr>
              </thead>
              <tbody>
                {salaryData.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 text-sm">{item.month}</td>
                    <td className="py-3 text-sm">{item.salaryStatus}</td>
                    <td className="py-3 text-sm">{item.paidDate}</td>
                    <td className="py-3 text-sm">{item.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;