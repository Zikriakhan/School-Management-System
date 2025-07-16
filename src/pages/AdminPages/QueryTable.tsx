import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { X, Plus } from 'lucide-react';

// TypeScript interface for Query data structure
interface Query {
  id: string;
  from: string;
  to: string;
  msg: string;
  fwd: string;
  type: string;
  date: string;
  status?: string;
  priority?: string;
}

// TypeScript interface for the form data
interface QueryFormData {
  from: string;
  to: string;
  msg: string;
  fwd: string;
  type: string;
  date: string;
  status: string;
  priority: string;
}

const departments = [
  { name: 'Total', count: 5, bg: 'bg-green-800' },
  { name: 'New', count: 3, bg: 'bg-yellow-800' },
  { name: 'Leave', count: 5, bg: 'bg-purple-800' },
  { name: 'Fee', count: 25, bg: 'bg-green-800' },
  { name: 'Exam', count: 3, bg: 'bg-yellow-800' },
  { name: 'Meeting', count: 5, bg: 'bg-purple-800' },
  { name: 'Other', count: 5, bg: 'bg-purple-800' },
];

const QueryTable = () => {
  // State for controlling modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  
  // State for the form data
  const [formData, setFormData] = useState<QueryFormData>({
    from: '',
    to: '',
    msg: '',
    fwd: '',
    type: '',
    date: '',
    status: 'Pending',
    priority: 'Medium'
  });

  // Convert queries to stateful array so we can add/edit/delete
  const [queries, setQueries] = useState<Query[]>([
    { 
      id: '01',
      from: 'John Doe', 
      to: 'Jane Smith', 
      msg: 'Request for leave approval', 
      fwd: 'HR Manager', 
      type: 'Leave', 
      date: '24, Jan 2025',
      status: 'Pending',
      priority: 'High'
    },
    { 
      id: '02',
      from: 'Alice Johnson', 
      to: 'Bob Wilson', 
      msg: 'Fee payment inquiry', 
      fwd: 'Finance Head', 
      type: 'Fee', 
      date: '23, Jan 2025',
      status: 'Resolved',
      priority: 'Medium'
    },
    { 
      id: '03',
      from: 'Mike Brown', 
      to: 'Sarah Davis', 
      msg: 'Exam schedule clarification', 
      fwd: 'Academic Head', 
      type: 'Exam', 
      date: '22, Jan 2025',
      status: 'In Progress',
      priority: 'Low'
    },
  ]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for adding new query
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate new ID
    const newId = (queries.length + 1).toString().padStart(2, '0');
    
    // Format date
    const formattedDate = new Date(formData.date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    // Create new query object
    const newQuery: Query = {
      id: newId,
      from: formData.from,
      to: formData.to,
      msg: formData.msg,
      fwd: formData.fwd,
      type: formData.type,
      date: formattedDate,
      status: formData.status,
      priority: formData.priority
    };

    // Add new query to the list
    setQueries(prev => [...prev, newQuery]);

    // Reset form and close modal
    resetForm();
    setShowAddForm(false);
    
    alert('Query added successfully!');
  };

  // Handle edit form submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedQuery) return;

    // Format date
    const formattedDate = new Date(formData.date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    // Update query object
    const updatedQuery: Query = {
      ...selectedQuery,
      from: formData.from,
      to: formData.to,
      msg: formData.msg,
      fwd: formData.fwd,
      type: formData.type,
      date: formattedDate,
      status: formData.status,
      priority: formData.priority
    };

    // Update query in the list
    setQueries(prev => prev.map(query => 
      query.id === selectedQuery.id ? updatedQuery : query
    ));

    // Reset form and close modal
    resetForm();
    setShowEditForm(false);
    setSelectedQuery(null);
    
    alert('Query updated successfully!');
  };

  // Handle view query
  const handleViewQuery = (query: Query) => {
    setSelectedQuery(query);
    setShowViewModal(true);
  };

  // Handle edit query
  const handleEditQuery = (query: Query) => {
    setSelectedQuery(query);
    // Pre-fill form with query data
    setFormData({
      from: query.from,
      to: query.to,
      msg: query.msg,
      fwd: query.fwd,
      type: query.type,
      date: new Date().toISOString().split('T')[0], // Current date as placeholder
      status: query.status || 'Pending',
      priority: query.priority || 'Medium'
    });
    setShowEditForm(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (query: Query) => {
    setSelectedQuery(query);
    setShowDeleteConfirm(true);
  };

  // Handle actual delete
  const handleDelete = () => {
    if (!selectedQuery) return;
    
    setQueries(prev => prev.filter(query => query.id !== selectedQuery.id));
    setShowDeleteConfirm(false);
    setSelectedQuery(null);
    
    alert('Query deleted successfully!');
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      from: '',
      to: '',
      msg: '',
      fwd: '',
      type: '',
      date: '',
      status: 'Pending',
      priority: 'Medium'
    });
  };

  // Handle form cancellation
  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedQuery(null);
  };

  // Close all modals
  const closeAllModals = () => {
    setShowViewModal(false);
    setShowEditForm(false);
    setShowDeleteConfirm(false);
    setSelectedQuery(null);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Department Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {departments.map((dept, index) => (
          <div
            key={index}
            className={`${dept.bg} text-white p-5 rounded-md shadow text-center`}
          >
            <h3 className="text-xl font-bold">{dept.name}</h3>
            <p className="text-3xl mt-2">{dept.count}</p>
          </div>
        ))}
      </div>

      {/* Add Query Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Query</span>
        </button>
      </div>

      {/* Queries Table */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Applications/Queries</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3">S.No</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Message</th>
                <th className="p-3">Frwd By</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{q.from}</td>
                  <td className="p-3">{q.to}</td>
                  <td className="p-3 max-w-xs truncate" title={q.msg}>{q.msg}</td>
                  <td className="p-3">{q.fwd}</td>
                  <td className="p-3">
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      {q.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(q.status || 'Pending')}`}>
                      {q.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-3">{q.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <FaEye 
                        className="text-green-600 cursor-pointer hover:text-green-800 transition-colors" 
                        onClick={() => handleViewQuery(q)}
                        title="View Details"
                      />
                      <FaEdit 
                        className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" 
                        onClick={() => handleEditQuery(q)}
                        title="Edit Query"
                      />
                      <FaTrash 
                        className="text-red-600 cursor-pointer hover:text-red-800 transition-colors" 
                        onClick={() => handleDeleteConfirm(q)}
                        title="Delete Query"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Query Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Add New Query</h2>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From *</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Sender name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To *</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Recipient name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="msg"
                  value={formData.msg}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Forwarded By *</label>
                  <input
                    type="text"
                    name="fwd"
                    value={formData.fwd}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Forwarded by"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Leave">Leave</option>
                    <option value="Fee">Fee</option>
                    <option value="Exam">Exam</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Query Modal */}
      {showViewModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Query Details</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Query ID</label>
                  <p className="text-lg font-semibold text-gray-800">{selectedQuery.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                  <p className="text-lg text-gray-800">{selectedQuery.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">From</label>
                  <p className="text-lg text-gray-800">{selectedQuery.from}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">To</label>
                  <p className="text-lg text-gray-800">{selectedQuery.to}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Forwarded By</label>
                  <p className="text-lg text-gray-800">{selectedQuery.fwd}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Type</label>
                  <span className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-semibold">
                    {selectedQuery.type}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                <p className="text-lg text-gray-800 bg-gray-50 p-4 rounded-lg">{selectedQuery.msg}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${getStatusColor(selectedQuery.status || 'Pending')}`}>
                    {selectedQuery.status || 'Pending'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Priority</label>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${getPriorityColor(selectedQuery.priority || 'Medium')}`}>
                    {selectedQuery.priority || 'Medium'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  onClick={() => {
                    closeAllModals();
                    handleEditQuery(selectedQuery);
                  }}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Edit Query
                </button>
                <button
                  onClick={closeAllModals}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Query Modal */}
      {showEditForm && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Edit Query</h2>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From *</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To *</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="msg"
                  value={formData.msg}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Forwarded By *</label>
                  <input
                    type="text"
                    name="fwd"
                    value={formData.fwd}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Leave">Leave</option>
                    <option value="Fee">Fee</option>
                    <option value="Exam">Exam</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Update Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <FaTrash className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Query
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this query from <strong>{selectedQuery.from}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeAllModals}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryTable;