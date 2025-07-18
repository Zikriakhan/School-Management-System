import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Bell, User, Globe, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  showPrintButton?: boolean;
  onPrint?: () => void;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showPrintButton, 
  onPrint, 
  onMenuClick, 
  showMenuButton = false 
}) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {title}
              </h1>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <span className="hidden sm:inline-block text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on mobile */}

            {/* Print Button */}
            {showPrintButton && (
              <button
                onClick={onPrint}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <span className="hidden sm:inline">{t('timetable.printView')}</span>
                <span className="sm:hidden">Print</span>
              </button>
            )}
            
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
  );
};

export default Header;