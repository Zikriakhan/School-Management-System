import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Plus, Search, Filter, Clock, Users, Star } from 'lucide-react';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      code: 'MATH301',
      department: 'Mathematics',
      instructor: 'Prof. Michael Chen',
      credits: 4,
      duration: '16 weeks',
      students: 45,
      rating: 4.8,
      schedule: 'Mon, Wed, Fri 10:00 AM',
      description: 'Advanced topics in calculus and linear algebra',
      level: 'advanced',
      status: 'active'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      code: 'CS201',
      department: 'Computer Science',
      instructor: 'Dr. Sarah Johnson',
      credits: 3,
      duration: '14 weeks',
      students: 38,
      rating: 4.9,
      schedule: 'Tue, Thu 2:00 PM',
      description: 'Fundamental data structures and algorithmic problem solving',
      level: 'intermediate',
      status: 'active'
    },
    {
      id: 3,
      title: 'Organic Chemistry',
      code: 'CHEM201',
      department: 'Chemistry',
      instructor: 'Prof. Lisa Anderson',
      credits: 4,
      duration: '16 weeks',
      students: 32,
      rating: 4.6,
      schedule: 'Mon, Wed, Fri 2:00 PM',
      description: 'Structure, properties, and reactions of organic compounds',
      level: 'intermediate',
      status: 'active'
    },
    {
      id: 4,
      title: 'Quantum Physics',
      code: 'PHYS401',
      department: 'Physics',
      instructor: 'Dr. Robert Wilson',
      credits: 5,
      duration: '16 weeks',
      students: 24,
      rating: 4.7,
      schedule: 'Tue, Thu 10:00 AM',
      description: 'Introduction to quantum mechanics and wave functions',
      level: 'advanced',
      status: 'active'
    },
    {
      id: 5,
      title: 'Molecular Biology',
      code: 'BIO301',
      department: 'Biology',
      instructor: 'Dr. Emily Rodriguez',
      credits: 4,
      duration: '14 weeks',
      students: 29,
      rating: 4.5,
      schedule: 'Mon, Wed 1:00 PM',
      description: 'Cellular processes and molecular mechanisms',
      level: 'advanced',
      status: 'active'
    },
    {
      id: 6,
      title: 'Modern Literature',
      code: 'ENG202',
      department: 'English Literature',
      instructor: 'Dr. James Parker',
      credits: 3,
      duration: '12 weeks',
      students: 41,
      rating: 4.4,
      schedule: 'Tue, Thu 11:00 AM',
      description: 'Contemporary literary works and critical analysis',
      level: 'intermediate',
      status: 'enrolling'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'enrolling': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <BookOpen className={`w-7 h-7 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('courses.title')}
          </h1>
          <p className={`text-gray-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('courses.subtitle')}</p>
        </div>
        <button className={`mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
          <Plus className="w-4 h-4" />
          <span>{t('courses.addCourse')}</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className={`flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 ${isRTL ? 'sm:space-x-reverse' : 'sm:space-x-4'}`}>
          <div className="flex-1 relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={t('courses.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`}
            />
          </div>
          <button className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
            <Filter className="w-4 h-4" />
            <span>{t('courses.filter')}</span>
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.code} • {course.department}</p>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
              <div className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse mr-4' : 'space-x-2 ml-4'}`}>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(course.level)}`}>
                  {t(`courses.level.${course.level}`)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(course.status)}`}>
                  {t(`courses.status.${course.status}`)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('courses.instructor')}</span>
              </div>
              <div className={`text-gray-900 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{course.instructor}</div>

              <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('courses.schedule')}</span>
              </div>
              <div className={`text-gray-900 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{course.schedule}</div>

              <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <BookOpen className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('courses.credits')}</span>
              </div>
              <div className={`text-gray-900 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{course.credits} {t('courses.credits').toLowerCase()}</div>

              <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('courses.students')}</span>
              </div>
              <div className={`text-gray-900 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{course.students} {t('courses.enrolled')}</div>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-1'}`}>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                <span className="text-sm text-gray-500">{t('courses.rating')}</span>
              </div>

              <div className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}>
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                  {t('courses.viewDetails')}
                </button>
                <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                  {t('courses.edit')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className={`text-center py-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('courses.noCoursesFound')}</h3>
          <p className="text-gray-600">{t('courses.adjustSearch')}</p>
        </div>
      )}
    </div>
  );
};

export default Courses;