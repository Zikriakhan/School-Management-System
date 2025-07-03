import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Plus, Search, Filter, Mail, Calendar, Award } from 'lucide-react';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const students = [
    {
      id: 1,
      name: 'Alex Thompson',
      studentId: 'ST2024001',
      grade: 'Grade 12',
      class: '12-A',
      email: 'alex.thompson@student.edu',
      enrollDate: '2023-09-01',
      gpa: '3.8',
      avatar: 'AT',
      status: 'active'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      studentId: 'ST2024002',
      grade: 'Grade 11',
      class: '11-B',
      email: 'maria.garcia@student.edu',
      enrollDate: '2023-09-01',
      gpa: '3.9',
      avatar: 'MG',
      status: 'active'
    },
    {
      id: 3,
      name: 'David Kim',
      studentId: 'ST2024003',
      grade: 'Grade 10',
      class: '10-C',
      email: 'david.kim@student.edu',
      enrollDate: '2023-09-01',
      gpa: '3.7',
      avatar: 'DK',
      status: 'active'
    },
    {
      id: 4,
      name: 'Sophie Williams',
      studentId: 'ST2024004',
      grade: 'Grade 12',
      class: '12-B',
      email: 'sophie.williams@student.edu',
      enrollDate: '2023-09-01',
      gpa: '4.0',
      avatar: 'SW',
      status: 'honor'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <GraduationCap className={`w-7 h-7 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('students.title')}
          </h1>
          <p className={`text-gray-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('students.subtitle')}</p>
        </div>
        <button className={`mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
          <Plus className="w-4 h-4" />
          <span>{t('students.addStudent')}</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className={`flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 ${isRTL ? 'sm:space-x-reverse' : 'sm:space-x-4'}`}>
          <div className="flex-1 relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={t('students.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`}
            />
          </div>
          <button className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
            <Filter className="w-4 h-4" />
            <span>{t('students.filter')}</span>
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {student.avatar}
              </div>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.studentId}</p>
                <div className={`flex items-center mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`w-2 h-2 rounded-full ${isRTL ? 'ml-2' : 'mr-2'} ${
                    student.status === 'honor' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                  <span className="text-xs text-gray-500 capitalize">
                    {t(`students.status.${student.status}`)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-600">{t('students.gradeClass')}</span>
                <span className="font-medium">{student.grade} - {student.class}</span>
              </div>
              
              <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="truncate">{student.email}</span>
              </div>
              
              <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('students.enrolled')}: {new Date(student.enrollDate).toLocaleDateString()}</span>
              </div>
              
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Award className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>{t('students.gpa')}</span>
                </div>
                <span className={`font-semibold ${
                  parseFloat(student.gpa) >= 3.8 ? 'text-green-600' : 
                  parseFloat(student.gpa) >= 3.0 ? 'text-blue-600' : 'text-yellow-600'
                }`}>
                  {student.gpa}
                </span>
              </div>
            </div>

            <div className={`flex mt-4 pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
              <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                {t('students.viewProfile')}
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                {t('students.edit')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className={`text-center py-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('students.noStudentsFound')}</h3>
          <p className="text-gray-600">{t('students.adjustSearch')}</p>
        </div>
      )}
    </div>
  );
};

export default Students;