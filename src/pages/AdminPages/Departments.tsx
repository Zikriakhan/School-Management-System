import React, { useState } from 'react';
import { Building2, Plus, Search, Users, BookOpen, User, Edit, Trash2 } from 'lucide-react';
import DepartmentModal from '../../components/AdminComponents/DepartmentModal';
import ConfirmDialog from '../../components/AdminComponents/ConfirmDialog';

interface Department {
  id: number;
  name: string;
  head: string;
  staffCount: number;
  courseCount: number;
  description: string;
  color: string;
  established: string;
  courses: string[];
}

const Departments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'Computer Science',
      head: 'Dr. Sarah Johnson',
      staffCount: 12,
      courseCount: 25,
      description: 'Focused on software development, algorithms, and computing theory',
      color: 'bg-blue-500',
      established: '2010',
      courses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems', 'Machine Learning']
    },
    {
      id: 2,
      name: 'Mathematics',
      head: 'Prof. Michael Chen',
      staffCount: 8,
      courseCount: 18,
      description: 'Pure and applied mathematics, statistics, and mathematical modeling',
      color: 'bg-purple-500',
      established: '2008',
      courses: ['Calculus I', 'Calculus II', 'Linear Algebra', 'Statistics', 'Number Theory']
    },
    {
      id: 3,
      name: 'Biology',
      head: 'Dr. Emily Rodriguez',
      staffCount: 10,
      courseCount: 22,
      description: 'Life sciences, molecular biology, and environmental studies',
      color: 'bg-green-500',
      established: '2009',
      courses: ['Cell Biology', 'Genetics', 'Ecology', 'Microbiology', 'Biochemistry']
    },
    {
      id: 4,
      name: 'Physics',
      head: 'Dr. Robert Wilson',
      staffCount: 7,
      courseCount: 15,
      description: 'Theoretical and experimental physics, quantum mechanics',
      color: 'bg-teal-500',
      established: '2011',
      courses: ['Classical Mechanics', 'Quantum Physics', 'Thermodynamics', 'Electromagnetism']
    },
    {
      id: 5,
      name: 'Chemistry',
      head: 'Prof. Lisa Anderson',
      staffCount: 9,
      courseCount: 20,
      description: 'Organic, inorganic, and analytical chemistry',
      color: 'bg-orange-500',
      established: '2012',
      courses: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry']
    },
    {
      id: 6,
      name: 'English Literature',
      head: 'Dr. James Parker',
      staffCount: 6,
      courseCount: 16,
      description: 'Literature analysis, creative writing, and linguistics',
      color: 'bg-red-500',
      established: '2007',
      courses: ['Shakespeare Studies', 'Modern Literature', 'Creative Writing', 'Linguistics', 'Poetry Analysis']
    }
  ]);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddDepartment = () => {
    setModalMode('add');
    setSelectedDepartment(undefined);
    setIsModalOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setModalMode('edit');
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (departmentToDelete) {
      setDepartments(prev => prev.filter(dept => dept.id !== departmentToDelete.id));
      setDepartmentToDelete(null);
    }
  };

  const handleSaveDepartment = (departmentData: Department) => {
    if (modalMode === 'add') {
      setDepartments(prev => [...prev, departmentData]);
    } else {
      setDepartments(prev => prev.map(dept => 
        dept.id === departmentData.id ? departmentData : dept
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Building2 className="w-7 h-7 text-blue-600 mr-2" />
            Departments
          </h1>
          <p className="text-gray-600 mt-1">Manage university departments and courses</p>
        </div>
        <button 
          onClick={handleAddDepartment}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search departments, heads, or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`${department.color} h-2`}></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditDepartment(department)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit Department"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Department"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Est. {department.established}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {department.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>Department Head</span>
                  </div>
                  <span className="font-medium text-gray-900">{department.head}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Staff Members</span>
                  </div>
                  <span className="font-medium text-gray-900">{department.staffCount}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Courses</span>
                  </div>
                  <span className="font-medium text-gray-900">{department.courseCount}</span>
                </div>
              </div>

              {/* Courses List */}
              {department.courses.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Courses Offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {department.courses.slice(0, 3).map((course, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                    {department.courses.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{department.courses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => handleEditDepartment(department)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Edit Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  View Courses
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600">Try adjusting your search terms or add a new department.</p>
        </div>
      )}

      {/* Modals */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDepartment}
        department={selectedDepartment}
        mode={modalMode}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Department"
        message={`Are you sure you want to delete the ${departmentToDelete?.name} department? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Departments;