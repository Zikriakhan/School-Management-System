import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Bell, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{t('nav.dashboard')}</h1>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <LanguageSwitcher />
          
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{t('header.adminUser')}</p>
              <p className="text-xs text-gray-500">{t('header.administrator')}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;