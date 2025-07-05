import React, { useState } from 'react';
import { BsBuildingsFill } from "react-icons/bs";
import Chart from 'react-apexcharts';
import { IoLocationSharp } from "react-icons/io5";

import { FaPhoneAlt } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { Users, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import imges from "./images.jpeg"
const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [toggleView, setToggleView] = useState<'table' | 'grid'>('table');

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

  const staffData = [
    {
      id: '01',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: '10th',
      role: 'Deparment Head',
      joinDate: '01, Jan 2022',
      status: 'A+',
    },
     {
      id: '02',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: '9th',
      role: 'Deparment Head',
      joinDate: '01, Jan 2022',
      status: 'B+',
    },
     {
      id: '03',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: '8th',
      role: 'Deparment Head',
      joinDate: '01, Jan 2022',
      status: 'A+',
    },
     {
      id: '04',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: '8th',
      role: 'Deparment Head',
      joinDate: '01, Jan 2022',
      status: 'A-',
    },
     {
      id: '05',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92403454324',
      course: '9th',
      role: 'Deparment Head',
      joinDate: '01, Jan 2022',
      status: 'B',
    },


   
  ];

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (department === '' || staff.course === department)
  );

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold">Total</p>
          <p className="text-2xl">40</p>
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
      <div
  className="flex justify-end items-end min-h-screen "
  style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: '0vh' }}
>
  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <Plus className="w-4 h-4" />
    <span>Add Student</span>
  </button>
</div>


      {/* Charts and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
           
          <h2 className="text-lg font-semibold mb-2">Staff</h2>
          <Chart options={chartOptions} series={series} type="bar" height={350} width={670} />
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow h-[200px]">
            <h2 className="text-lg font-semibold">Staff By Department</h2>
            <p className="text-gray-500 mt-4">No data</p>
          </div>
          <div className="bg-white p-4 rounded shadow h-[200px]">
            <h2 className="text-lg font-semibold">Leaved Staff</h2>
            <p className="text-gray-500 mt-4">No data</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-100 p-3 rounded-md shadow-sm">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 outline-none w-48 sm:w-64"
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm self-end"
        >
          <option value="">Department</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Computer Science">Computer Science</option>
        </select>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm self-end"
        >
          <option value="">Class</option>
          <option value="10th">10th</option>
          <option value="9th">9th</option>
          <option value="8th">8th</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setToggleView('table')}
            className={`p-2 rounded-md border ${toggleView === 'table' ? 'bg-blue-600 text-white' : 'bg-white'}`}
            title="Table View"
          >
            📋
          </button>
          <button
            onClick={() => setToggleView('grid')}
            className={`p-2 rounded-md border ${toggleView === 'grid' ? 'bg-blue-600 text-white' : 'bg-white'}`}
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
                <th className="p-2 border">ParentName</th>
                <th className="p-2 border">AdmissionDate</th>
                <th className="p-2 border">LastYearGrade</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => (
                <tr key={index} className="border-b">
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
                        staff.status === 'A+'
                          ? 'bg-green-100 text-green-700'
                          : staff.status === 'Away'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <Eye className="text-blue-500 cursor-pointer" size={16} />
                      <Edit className="text-yellow-500 cursor-pointer" size={16} />
                      <Trash2 className="text-red-500 cursor-pointer" size={16} />
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
              <button className="absolute top-3 right-3 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200">
                <Trash2 size={16} />
              </button>

              <div className="flex items-center gap-4 mb-2">
                <img
                  src={imges}
                  alt="avatar12"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{staff.name}</h3>
                  <p className="text-sm text-gray-500">{staff.role}</p>
                </div>
              </div>

              <div
  style={{ paddingTop: "20px" }}
  className="text-sm text-gray-700 space-y-1 mb-4"
>
  {/* Each span now uses flex to keep icon and text in one line with spacing */}
  
  <span style={{ display: "inline-flex", alignItems: "center", gap: "9px",paddingTop: "2px"  }}>
    <BsBuildingsFill size="18px" />
    8th
  </span>

  <span style={{ display: "inline-flex", alignItems: "center", gap: "9px",paddingTop: "2px" }}>
    <MdEmail size="18px" />
    muhammadjanzirki@gamil
  </span>

  <span style={{ display: "inline-flex", alignItems: "center", gap: "9px",paddingTop: "2px" }}>
    <FaPhoneAlt size="18px" />
    +92456789
  </span>

  <span style={{ display: "inline-flex", alignItems: "center", gap: "9px",paddingTop: "2px" }}>
    <IoLocationSharp size="18px" />
    As Salam, Saad bin Obadah
  </span>
</div>


              <div className="flex justify-between border-t pt-3">
                <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 font-medium text-sm hover:bg-blue-200">
                  View Profile
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
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

