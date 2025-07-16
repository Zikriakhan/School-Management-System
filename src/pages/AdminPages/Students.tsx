import React, { useState } from 'react';
import Chart from 'react-apexcharts';

import { BsBuildingsFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Users, Plus, Eye, Edit, Trash2, X } from 'lucide-react';
// Using a placeholder image from an external source
const imges = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1";

// TypeScript interface for Student data structure
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  role: string;
  joinDate: string;
  status: string;
  address?: string;
}

// TypeScript interface for the form data
interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  parentName: string;
  admissionDate: string;
  lastYearGrade: string;
  address: string;
}

const Students: React.FC = () => {
  // State management for search, filters, and view toggle
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [toggleView, setToggleView] = useState<'table' | 'grid'>('table');
  
  // State for controlling modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // State for the form data
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    parentName: '',
    admissionDate: '',
    lastYearGrade: '',
    address: ''
  });

  // Chart configuration
  const years = Array.from({ length: 18 }, (_, i) => (2012 + i).toString());
  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

  const chartOptions = {
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { columnWidth: '6%', distributed: true } },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: years,
      title: { text: 'Year' },
      labels: { style: { colors: colors, fontSize: '12px' } },
    },
    yaxis: {
      title: { text: 'Staff Count' },
    },
    colors: colors,
  };

  const series = [{ data: [4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 20, 22, 24, 28, 30, 32, 36, 40] }];

  // Convert staffData to stateful array so we can add new students
  const [staffData, setStaffData] = useState<Student[]>([
    {
      id: '01',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: '10th',
      role: 'Mr. Robert Johnson',
      joinDate: '01, Jan 2022',
      status: 'A+',
      address: '123 Main Street, Karachi, Pakistan'
    },
    {
      id: '02',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+92403454325',
      course: '9th',
      role: 'Mrs. Emily Davis',
      joinDate: '15, Feb 2022',
      status: 'B+',
      address: '456 Oak Avenue, Lahore, Pakistan'
    },
    {
      id: '03',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+92403454326',
      course: '8th',
      role: 'Mr. David Wilson',
      joinDate: '10, Mar 2022',
      status: 'A+',
      address: '789 Pine Road, Islamabad, Pakistan'
    },
    {
      id: '04',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+92403454327',
      course: '8th',
      role: 'Mrs. Lisa Brown',
      joinDate: '20, Apr 2022',
      status: 'A-',
      address: '321 Elm Street, Faisalabad, Pakistan'
    },
    {
      id: '05',
      name: 'Alex Brown',
      email: 'alex@example.com',
      phone: '+92403454328',
      course: '9th',
      role: 'Mr. James Taylor',
      joinDate: '05, May 2022',
      status: 'B',
      address: '654 Cedar Lane, Rawalpindi, Pakistan'
    },
  ]);

  // Filter students based on search term and department/class
  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (department === '' || staff.course === department) &&
      (classFilter === '' || staff.course === classFilter)
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for adding new student
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate new ID (increment from last ID)
    const newId = (staffData.length + 1).toString().padStart(2, '0');
    
    // Format admission date
    const formattedDate = new Date(formData.admissionDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    // Create new student object
    const newStudent: Student = {
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      role: formData.parentName,
      joinDate: formattedDate,
      status: formData.lastYearGrade,
      address: formData.address
    };

    // Add new student to the list
    setStaffData(prev => [...prev, newStudent]);

    // Reset form and close modal
    resetForm();
    setShowAddForm(false);
    
    // Show success message
    alert('Student added successfully!');
  };

  // Handle edit form submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) return;

    // Format admission date
    const formattedDate = new Date(formData.admissionDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    // Update student object
    const updatedStudent: Student = {
      ...selectedStudent,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      role: formData.parentName,
      joinDate: formattedDate,
      status: formData.lastYearGrade,
      address: formData.address
    };

    // Update student in the list
    setStaffData(prev => prev.map(student => 
      student.id === selectedStudent.id ? updatedStudent : student
    ));

    // Reset form and close modal
    resetForm();
    setShowEditForm(false);
    setSelectedStudent(null);
    
    // Show success message
    alert('Student updated successfully!');
  };

  // Handle view profile
  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setShowViewProfile(true);
  };

  // Handle edit student
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    // Pre-fill form with student data
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
      parentName: student.role,
      admissionDate: new Date(student.joinDate).toISOString().split('T')[0],
      lastYearGrade: student.status,
      address: student.address || ''
    });
    setShowEditForm(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteConfirm(true);
  };

  // Handle actual delete
  const handleDelete = () => {
    if (!selectedStudent) return;
    
    setStaffData(prev => prev.filter(student => student.id !== selectedStudent.id));
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
    
    alert('Student deleted successfully!');
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      parentName: '',
      admissionDate: '',
      lastYearGrade: '',
      address: ''
    });
  };

  // Handle form cancellation
  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedStudent(null);
  };

  // Close all modals
  const closeAllModals = () => {
    setShowViewProfile(false);
    setShowEditForm(false);
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold">Total</p>
          <p className="text-2xl">{staffData.length}</p>
        </div>
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold">Present</p>
          <p className="text-2xl">35</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold">Absent</p>
          <p className="text-2xl">5</p>
        </div>
        <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold">New</p>
          <p className="text-2xl">2</p>
        </div>
      </div>

      {/* Add Student Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Add New Student</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Parent Name and Admission Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admission Date *
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 4: Last Year Grade and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Year Grade *
                  </label>
                  <select
                    name="lastYearGrade"
                    value={formData.lastYearGrade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {showViewProfile && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Student Profile</h2>
              <button
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={imges}
                  alt="Student Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.course} Grade Student</p>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                    selectedStudent.status === 'A+' || selectedStudent.status === 'A'
                      ? 'bg-green-100 text-green-700'
                      : selectedStudent.status === 'B+' || selectedStudent.status === 'B'
                        ? 'bg-blue-100 text-blue-700'
                        : selectedStudent.status === 'A-' || selectedStudent.status === 'B-'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                  }`}>
                    Grade: {selectedStudent.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Student ID</label>
                    <p className="text-lg font-semibold text-gray-800">{selectedStudent.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-lg text-gray-800">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                    <p className="text-lg text-gray-800">{selectedStudent.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Class</label>
                    <p className="text-lg text-gray-800">{selectedStudent.course} Grade</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Parent/Guardian</label>
                    <p className="text-lg text-gray-800">{selectedStudent.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Admission Date</label>
                    <p className="text-lg text-gray-800">{selectedStudent.joinDate}</p>
                  </div>
                </div>
              </div>

              {selectedStudent.address && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                  <p className="text-lg text-gray-800">{selectedStudent.address}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
                <button
                  onClick={() => {
                    closeAllModals();
                    handleEditStudent(selectedStudent);
                  }}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                >
                  Edit Student
                </button>
                <button
                  onClick={closeAllModals}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditForm && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Same form as Add Student */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Parent Name and Admission Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admission Date *
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 4: Last Year Grade and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Year Grade *
                  </label>
                  <select
                    name="lastYearGrade"
                    value={formData.lastYearGrade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Student
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete <strong>{selectedStudent.name}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeAllModals}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Student Statistics</h2>
          <Chart options={chartOptions} series={series} type="bar" height={350} width={670} />
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow h-[200px]">
            <h2 className="text-lg font-semibold">Students By Department</h2>
            <p className="text-gray-500 mt-4">No data</p>
          </div>
          <div className="bg-white p-4 rounded shadow h-[200px]">
            <h2 className="text-lg font-semibold">Graduated Students</h2>
            <p className="text-gray-500 mt-4">No data</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-100 p-3 rounded-md shadow-sm">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 outline-none w-48 sm:w-64"
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="">All Departments</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Computer Science">Computer Science</option>
        </select>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="">All Classes</option>
          <option value="8th">8th Grade</option>
          <option value="9th">9th Grade</option>
          <option value="10th">10th Grade</option>
          <option value="11th">11th Grade</option>
          <option value="12th">12th Grade</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setToggleView('table')}
            className={`p-2 rounded-md border transition-colors ${toggleView === 'table' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
            title="Table View"
          >
            📋
          </button>
          <button
            onClick={() => setToggleView('grid')}
            className={`p-2 rounded-md border transition-colors ${toggleView === 'grid' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
            title="Grid View"
          >
            🔲
          </button>
        </div>
      </div>

      {/* Table View */}
      {toggleView === 'table' && (
        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left border mt-4">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Parent Name</th>
                <th className="p-2 border">Admission Date</th>
                <th className="p-2 border">Last Year Grade</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2 border">{staff.id}</td>
                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                      <img
                        src={imges}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{staff.name}</p>
                        <p className="text-xs text-gray-500">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border">{staff.phone}</td>
                  <td className="p-2 border">{staff.course}</td>
                  <td className="p-2 border">{staff.role}</td>
                  <td className="p-2 border">{staff.joinDate}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        staff.status === 'A+' || staff.status === 'A'
                          ? 'bg-green-100 text-green-700'
                          : staff.status === 'B+' || staff.status === 'B'
                            ? 'bg-blue-100 text-blue-700'
                            : staff.status === 'A-' || staff.status === 'B-'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <Eye 
                        className="text-blue-500 cursor-pointer hover:text-blue-700" 
                        size={16} 
                        onClick={() => handleViewProfile(staff)}
                      />
                      <Edit 
                        className="text-yellow-500 cursor-pointer hover:text-yellow-700" 
                        size={16} 
                        onClick={() => handleEditStudent(staff)}
                      />
                      <Trash2 
                        className="text-red-500 cursor-pointer hover:text-red-700" 
                        size={16} 
                        onClick={() => handleDeleteConfirm(staff)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {toggleView === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredStaff.map((staff, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 relative transition hover:shadow-lg"
            >
              <button 
                className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                onClick={() => handleDeleteConfirm(staff)}
              >
                <Trash2 size={16} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={imges}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{staff.name}</h3>
                  <p className="text-sm text-gray-500">{staff.course} Grade</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <BsBuildingsFill size={16} />
                  <span>{staff.course}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MdEmail size={16} />
                  <span className="truncate">{staff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaPhoneAlt size={16} />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <IoLocationSharp size={16} />
                  <span>Parent: {staff.role}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-3">
                <button 
                  className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 font-medium text-sm hover:bg-blue-200 transition-colors"
                  onClick={() => handleViewProfile(staff)}
                >
                  View Profile
                </button>
                <button 
                  className="px-3 py-1 rounded-md bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300 transition-colors"
                  onClick={() => handleEditStudent(staff)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;