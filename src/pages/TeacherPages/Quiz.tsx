import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, Edit, Eye, Trash2, Plus, Download, Upload } from 'lucide-react';
import StatCard from '../../components/TeacherComponents/StatCard';
import QuizModal from '../../components/TeacherComponents/QuizModal';
import QuizFilters from '../../components/TeacherComponents/QuizFilters';
// import Header from '../../Layout/TeacherLayout/Header';


interface Quiz {
  id: number;
  title: string;
  class: string;
  section: string;
  subject: string;
  submitted: number;
  totalToSubmit: number;
  dueDate: string;
  createdAt: string;
  status: 'active' | 'completed' | 'overdue';
  totalQuestions: number;
  duration: number;
  description: string;
}

const Quiz = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    subject: '',
    startDate: '',
    endDate: '',
    searchTerm: ''
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: 'Mathematics Quiz - Algebra Basics',
      class: 'Grade 8',
      section: 'A',
      subject: 'Mathematics',
      submitted: 23,
      totalToSubmit: 30,
      dueDate: '2025-01-25T23:59',
      createdAt: '2025-01-15T10:00',
      status: 'active',
      totalQuestions: 20,
      duration: 45,
      description: 'Basic algebra concepts and problem solving'
    },
    {
      id: 2,
      title: 'Science Quiz - Human Body Systems',
      class: 'Grade 7',
      section: 'B',
      subject: 'Science',
      submitted: 18,
      totalToSubmit: 25,
      dueDate: '2025-01-28T23:59',
      createdAt: '2025-01-16T14:30',
      status: 'active',
      totalQuestions: 15,
      duration: 30,
      description: 'Understanding human body systems and functions'
    },
    {
      id: 3,
      title: 'English Literature - Poetry Analysis',
      class: 'Grade 9',
      section: 'A',
      subject: 'English',
      submitted: 28,
      totalToSubmit: 28,
      dueDate: '2025-01-20T23:59',
      createdAt: '2025-01-10T09:15',
      status: 'completed',
      totalQuestions: 25,
      duration: 60,
      description: 'Analysis of classic poetry and literary devices'
    },
    {
      id: 4,
      title: 'Programming Fundamentals - Python Basics',
      class: 'Grade 10',
      section: 'C',
      subject: 'Programming',
      submitted: 12,
      totalToSubmit: 20,
      dueDate: '2025-01-18T23:59',
      createdAt: '2025-01-12T11:45',
      status: 'overdue',
      totalQuestions: 30,
      duration: 90,
      description: 'Basic Python programming concepts and syntax'
    },
    {
      id: 5,
      title: 'History Quiz - World War II',
      class: 'Grade 9',
      section: 'B',
      subject: 'History',
      submitted: 15,
      totalToSubmit: 22,
      dueDate: '2025-01-30T23:59',
      createdAt: '2025-01-17T16:20',
      status: 'active',
      totalQuestions: 18,
      duration: 40,
      description: 'Major events and impacts of World War II'
    }
  ]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with filters:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      class: '',
      section: '',
      subject: '',
      startDate: '',
      endDate: '',
      searchTerm: ''
    });
  };

  const handleCreateQuiz = () => {
    setModalMode('create');
    setSelectedQuiz(null);
    setIsModalOpen(true);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setModalMode('edit');
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleViewQuiz = (quiz: Quiz) => {
    setModalMode('view');
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleDeleteQuiz = (quizId: number) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
    }
  };

  const handleSaveQuiz = (quizData: Omit<Quiz, 'id' | 'submitted' | 'status' | 'createdAt'>) => {
    
    if (modalMode === 'create') {
      const newQuiz: Quiz = {
        ...quizData,
        id: Math.max(...quizzes.map(q => q.id)) + 1,
        submitted: 0,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setQuizzes(prev => [...prev, newQuiz]);
    } else if (modalMode === 'edit' && selectedQuiz) {
      setQuizzes(prev => prev.map(quiz => 
        quiz.id === selectedQuiz.id 
          ? { ...quiz, ...quizData }
          : quiz
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalQuizzes = quizzes.length;
  const checkedQuizzes = quizzes.filter(q => q.status === 'completed').length;
  const remainingQuizzes = quizzes.filter(q => q.status === 'active').length;

  return (
    <div className=" min-h-screen bg-gray-50">
      {/* <Header title={t('quiz.title')} /> */}
      
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title={t('quiz.totalQuizzes')} 
            value={totalQuizzes.toString()} 
            bgColor="bg-purple-500" 
          />
          <StatCard 
            title={t('quiz.checkedQuizzes')} 
            value={checkedQuizzes.toString()} 
            bgColor="bg-green-500" 
          />
          <StatCard 
            title={t('quiz.remainingQuizzes')} 
            value={remainingQuizzes.toString()} 
            bgColor="bg-indigo-500" 
          />
        </div>

        {/* Filters */}
        <QuizFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleResetFilters}
        />

        {/* Quiz Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('quiz.quizTable')}</h3>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateQuiz}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Quiz</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b">
                  <th className="pb-3">{t('quiz.sno')}</th>
                  <th className="pb-3">{t('quiz.title')}</th>
                  <th className="pb-3">{t('quiz.class')}</th>
                  <th className="pb-3">Section</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">{t('quiz.submitted')}</th>
                  <th className="pb-3">{t('quiz.totalToSubmit')}</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">{t('quiz.dueDate')}</th>
                  <th className="pb-3">{t('quiz.createdAt')}</th>
                  <th className="pb-3">{t('quiz.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz, index) => (
                  <tr key={quiz.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 text-sm">{index + 1}</td>
                    <td className="py-3 text-sm">{quiz.title}</td>
                    <td className="py-3 text-sm">{quiz.class}</td>
                    <td className="py-3 text-sm">{quiz.section}</td>
                    <td className="py-3 text-sm">{quiz.subject}</td>
                    <td className="py-3 text-sm">{quiz.submitted}</td>
                    <td className="py-3 text-sm">{quiz.totalToSubmit}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(quiz.status)}`}>
                        {quiz.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm">{formatDate(quiz.dueDate)}</td>
                    <td className="py-3 text-sm">{formatDate(quiz.createdAt)}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete Quiz"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditQuiz(quiz)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Edit Quiz"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleViewQuiz(quiz)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Quiz"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quiz Modal */}
        <QuizModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuiz}
          quiz={selectedQuiz}
          mode={modalMode}
        />
      </main>
    </div>
  );
};

export default Quiz;