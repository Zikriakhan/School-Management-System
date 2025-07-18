import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileQuestion,
  LogOut,
  GraduationCap,
  Calendar,
  X,
  Menu,
  Search,
  Globe,
  Bell
} from 'lucide-react';
// import Header from './Header';

const TeacherLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/teacher/timetable', icon: Calendar, label: 'Timetable' },
    { path: '/teacher/account', icon: User, label: 'Account' },
    { path: '/teacher/quiz', icon: FileQuestion, label: 'Quiz' },
  ];

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const menuItem = menuItems.find(item => item.path === currentPath);
    return menuItem ? menuItem.label : 'Dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const userName = localStorage.getItem('userName') || 'Teacher User';
  const userEmail = localStorage.getItem('userEmail') || 'teacher@example.com';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-blue-600 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
      `}>
        {/* Close button for mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 lg:hidden p-2 text-white hover:bg-blue-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Teacher Panel</h1>
              <p className="text-blue-100 text-sm">Education Management</p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-blue-700/50 rounded-lg p-3 border border-blue-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{userName}</p>
                <p className="text-blue-100 text-xs truncate">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-blue-100 hover:bg-blue-700/50 hover:text-white hover:transform hover:scale-105'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-blue-200 group-hover:text-white'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500 bg-blue-700/30">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 group-hover:transform group-hover:scale-110 transition-transform duration-200" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {getPageTitle()}
                  </h1>
                  <div className="hidden sm:block h-6 w-px bg-gray-300" />
                  {/* <span className="hidden sm:inline-block text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span> */}
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Search - Hidden on mobile */}
                {/* <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                  />
                </div> */}
                
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-2 sm:px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                  </span>
                </button>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                </button>
                
                {/* User Profile */}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <User className="w-5 h-5" />
                </button>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* <Header 
          title={getPageTitle()}
          onMenuClick={toggleSidebar}
          showMenuButton={true}
        /> */}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;