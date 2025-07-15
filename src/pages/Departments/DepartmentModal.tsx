import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

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

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (department: Department) => void;
  department?: Department;
  mode: 'add' | 'edit';
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  department,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    staffCount: 0,
    description: '',
    color: 'bg-blue-500',
    established: new Date().getFullYear().toString(),
    courses: [] as string[]
  });

  const [newCourse, setNewCourse] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-teal-500', label: 'Teal' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-indigo-500', label: 'Indigo' }
  ];

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        head: department.head,
        staffCount: department.staffCount,
        description: department.description,
        color: department.color,
        established: department.established,
        courses: [...department.courses]
      });
    } else {
      setFormData({
        name: '',
        head: '',
        staffCount: 0,
        description: '',
        color: 'bg-blue-500',
        established: new Date().getFullYear().toString(),
        courses: []
      });
    }
  }, [department]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Department name is required';
    if (!formData.head.trim()) newErrors.head = 'Department head is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.staffCount < 0) newErrors.staffCount = 'Staff count cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const departmentData: Department = {
      id: department?.id || Date.now(),
      name: formData.name,
      head: formData.head,
      staffCount: formData.staffCount,
      courseCount: formData.courses.length,
      description: formData.description,
      color: formData.color,
      established: formData.established,
      courses: formData.courses
    };

    onSave(departmentData);
    onClose();
  };

  const addCourse = () => {
    if (newCourse.trim() && !formData.courses.includes(newCourse.trim())) {
      setFormData(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse.trim()]
      }));
      setNewCourse('');
    }
  };

  const removeCourse = (courseToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course !== courseToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'add' ? 'Add Department' : 'Edit Department'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter department name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Head
              </label>
              <input
                type="text"
                value={formData.head}
                onChange={(e) => setFormData(prev => ({ ...prev, head: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.head ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter department head name"
              />
              {errors.head && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.head}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff Count
              </label>
              <input
                type="number"
                value={formData.staffCount}
                onChange={(e) => setFormData(prev => ({ ...prev, staffCount: parseInt(e.target.value) || 0 }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.staffCount ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
              />
              {errors.staffCount && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.staffCount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Established Year
              </label>
              <input
                type="text"
                value={formData.established}
                onChange={(e) => setFormData(prev => ({ ...prev, established: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2023"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color: option.value }))}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      formData.color === option.value
                        ? 'border-gray-400 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-4 rounded ${option.value}`}></div>
                    <span className="text-xs text-gray-600 mt-1 block">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter department description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Courses
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter course name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCourse())}
              />
              <button
                type="button"
                onClick={addCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {formData.courses.length > 0 && (
              <div className="space-y-2">
                {formData.courses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{course}</span>
                    <button
                      type="button"
                      onClick={() => removeCourse(course)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'add' ? 'Add Department' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;