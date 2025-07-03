import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Settings,
  LogOut,
  X,
  School
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { path: '/', name: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/staff', name: t('nav.staff'), icon: Users },
    { path: '/students', name: t('nav.students'), icon: GraduationCap },
    { path: '/departments', name: t('nav.departments'), icon: Building2 },
    { path: '/courses', name: t('nav.courses'), icon: BookOpen },
    { path: '/settings', name: t('nav.settings'), icon: Settings },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 rtl:left-auto rtl:right-0 rtl:${sidebarOpen ? '-translate-x-0' : 'translate-x-full'
          } rtl:lg:translate-x-0`}
      >
        <div style={{
          height:"150px"
        }} className="flex items-center justify-center h-16 px-6 bg-blue-900">
          <div className="flex flex-col items-center space-y-1">
            <School className="w-8 h-8 text-white" />
            <span className="text-white text-lg font-semibold">School </span>
          </div>
        </div>


        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t('nav.logout')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;