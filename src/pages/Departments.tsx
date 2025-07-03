import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, Search, Users, BookOpen, User } from 'lucide-react';

const Departments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const departments = [
    {
      id: 1,
      name: 'Computer Science',
      head: 'Dr. Sarah Johnson',
      staffCount: 12,
      courseCount: 25,
      description: 'Focused on software development, algorithms, and computing theory',
      color: 'bg-blue-500',
      established: '2010'
    },
    {
      id: 2,
      name: 'Mathematics',
      head: 'Prof. Michael Chen',
      staffCount: 8,
      courseCount: 18,
      description: 'Pure and applied mathematics, statistics, and mathematical modeling',
      color: 'bg-purple-500',
      established: '2008'
    },
    {
      id: 3,
      name: 'Biology',
      head: 'Dr. Emily Rodriguez',
      staffCount: 10,
      courseCount: 22,
      description: 'Life sciences, molecular biology, and environmental studies',
      color: 'bg-green-500',
      established: '2009'
    },
    {
      id: 4,
      name: 'Physics',
      head: 'Dr. Robert Wilson',
      staffCount: 7,
      courseCount: 15,
      description: 'Theoretical and experimental physics, quantum mechanics',
      color: 'bg-teal-500',
      established: '2011'
    },
    {
      id: 5,
      name: 'Chemistry',
      head: 'Prof. Lisa Anderson',
      staffCount: 9,
      courseCount: 20,
      description: 'Organic, inorganic, and analytical chemistry',
      color: 'bg-orange-500',
      established: '2012'
    },
    {
      id: 6,
      name: 'English Literature',
      head: 'Dr. James Parker',
      staffCount: 6,
      courseCount: 16,
      description: 'Literature analysis, creative writing, and linguistics',
      color: 'bg-red-500',
      established: '2007'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Building2 className={`w-7 h-7 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('departments.title')}
          </h1>
          <p className={`text-gray-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('departments.subtitle')}</p>
        </div>
        <button className={`mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
          <Plus className="w-4 h-4" />
          <span>{t('departments.addDepartment')}</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={t('departments.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`}
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`${department.color} h-2`}></div>
            
            <div className="p-6">
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{department.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {t('departments.established')} {department.established}
                </span>
              </div>

              <p className={`text-sm text-gray-600 mb-4 line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {department.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('departments.departmentHead')}</span>
                  </div>
                  <span className="font-medium text-gray-900">{department.head}</span>
                </div>

                <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('departments.staffMembers')}</span>
                  </div>
                  <span className="font-medium text-gray-900">{department.staffCount}</span>
                </div>

                <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <BookOpen className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('departments.courses')}</span>
                  </div>
                  <span className="font-medium text-gray-900">{department.courseCount}</span>
                </div>
              </div>

              <div className={`flex pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  {t('departments.viewDetails')}
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  {t('departments.edit')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className={`text-center py-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('departments.noDepartmentsFound')}</h3>
          <p className="text-gray-600">{t('departments.adjustSearch')}</p>
        </div>
      )}
    </div>
  );
};

export default Departments;