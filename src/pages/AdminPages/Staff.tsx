import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Users, Plus, Eye, Edit, Trash2, Search, Filter, Download, Upload, Grid, List } from 'lucide-react';
import { BsBuildingsFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TeacherModal from '../../components/AdminComponents/StaffTeacherModal';
import ConfirmDialog from '../../components/AdminComponents/StaffConfirmDialog';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  role: string;
  joinDate: string;
  status: string;
  address: string;
  salary: number;
  qualification: string;
  experience: number;
  subjects: string[];
  dateOfBirth: string;
  emergencyContact: string;
  employeeType: 'Full-time' | 'Part-time' | 'Contract';
}

const Staff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [toggleView, setToggleView] = useState<'table' | 'grid'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  const [teacherData, setTeacherData] = useState<Teacher[]>([
    {
      id: '01',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: 'Computer Science',
      role: 'Professor',
      joinDate: '2022-01-01',
      status: 'Active',
      address: '123 Main St, City, Country',
      salary: 75000,
      qualification: 'Ph.D. in Computer Science',
      experience: 10,
      subjects: ['Data Structures', 'Algorithms', 'Programming'],
      dateOfBirth: '1980-05-15',
      emergencyContact: '+92403454325',
      employeeType: 'Full-time'
    },
    {
      id: '02',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+92403454324',
      course: 'Mathematics',
      role: 'Associate Professor',
      joinDate: '2023-02-15',
      status: 'Away',
      address: '456 Oak Ave, City, Country',
      salary: 65000,
      qualification: 'Ph.D. in Mathematics',
      experience: 8,
      subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
      dateOfBirth: '1985-08-22',
      emergencyContact: '+92403454326',
      employeeType: 'Full-time'
    },
    {
      id: '03',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+92403454324',
      course: 'Physics',
      role: 'Lecturer',
      joinDate: '2024-03-10',
      status: 'Active',
      address: '789 Pine St, City, Country',
      salary: 55000,
      qualification: 'M.S. in Physics',
      experience: 5,
      subjects: ['Quantum Physics', 'Thermodynamics'],
      dateOfBirth: '1990-12-03',
      emergencyContact: '+92403454327',
      employeeType: 'Full-time'
    }
  ]);

  const years = Array.from({ length: 18 }, (_, i) => (2012 + i).toString());
  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

  const chartOptions = {
    chart: { type: 'bar' as const, height: 350 },
    plotOptions: { bar: { columnWidth: '60%', distributed: true } },
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

  const series = [{ 
    name: 'Staff Count',
    data: [4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 20, 22, 24, 28, 30, 32, 36, 40] 
  }];

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature'];
  const statuses = ['Active', 'Away', 'On Leave', 'Inactive'];
  const roles = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Teaching Assistant'];

  // Calculate stats
  const stats = {
    total: teacherData.length,
    present: teacherData.filter(t => t.status === 'Active').length,
    absent: teacherData.filter(t => t.status === 'Away').length,
    onLeave: teacherData.filter(t => t.status === 'On Leave').length
  };

  const filteredTeachers = teacherData.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = department === '' || teacher.course === department;
    const matchesStatus = statusFilter === '' || teacher.status === statusFilter;
    const matchesRole = roleFilter === '' || teacher.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
  });

  const handleAddTeacher = () => {
    setModalMode('add');
    setSelectedTeacher(undefined);
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setModalMode('edit');
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setModalMode('view');
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteTeacher = (teacher: Teacher) => {
    setTeacherToDelete(teacher);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      setTeacherData(prev => prev.filter(teacher => teacher.id !== teacherToDelete.id));
      setTeacherToDelete(null);
    }
  };

  const handleSaveTeacher = (teacher: Teacher) => {
    if (modalMode === 'add') {
      setTeacherData(prev => [...prev, teacher]);
    } else {
      setTeacherData(prev => prev.map(t => 
        t.id === teacher.id ? teacher : t
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Away': return 'bg-yellow-100 text-yellow-700';
      case 'On Leave': return 'bg-blue-100 text-blue-700';
      case 'Inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Department', 'Role', 'Status', 'Join Date', 'Salary'].join(','),
      ...filteredTeachers.map(teacher => [
        teacher.id,
        teacher.name,
        teacher.email,
        teacher.phone,
        teacher.course,
        teacher.role,
        teacher.status,
        teacher.joinDate,
        teacher.salary
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            Teacher Management
          </h1>
          <p className="text-gray-600 mt-1">Manage teachers and their information</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          
          <button
            onClick={handleAddTeacher}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Teachers</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Present</p>
              <p className="text-3xl font-bold">{stats.present}</p>
            </div>
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Away</p>
              <p className="text-3xl font-bold">{stats.absent}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">On Leave</p>
              <p className="text-3xl font-bold">{stats.onLeave}</p>
            </div>
            <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Teacher Growth Over Years</h2>
          <Chart options={chartOptions} series={series} type="bar" height={350} />
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
            <div className="space-y-3">
              {departments.slice(0, 4).map((dept, index) => {
                const count = teacherData.filter(t => t.course === dept).length;
                const percentage = (count / teacherData.length) * 100;
                return (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{dept}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New teacher added</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Department updated</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Teacher on leave</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setToggleView('table')}
              className={`p-2 rounded-lg border transition-colors ${
                toggleView === 'table' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setToggleView('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                toggleView === 'grid' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {toggleView === 'table' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                          <div className="text-sm text-gray-500">ID: {teacher.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.email}</div>
                      <div className="text-sm text-gray-500">{teacher.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(teacher.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewTeacher(teacher)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditTeacher(teacher)}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {toggleView === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-500">{teacher.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTeacher(teacher)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <BsBuildingsFill className="w-4 h-4" />
                  <span>{teacher.course}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <MdEmail className="w-4 h-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <FaPhoneAlt className="w-4 h-4" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <IoLocationSharp className="w-4 h-4" />
                  <span className="truncate">{teacher.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                  {teacher.status}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(teacher.joinDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewTeacher(teacher)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleEditTeacher(teacher)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Modals */}
      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTeacher}
        teacher={selectedTeacher}
        mode={modalMode}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Teacher"
        message={`Are you sure you want to delete ${teacherToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Staff;