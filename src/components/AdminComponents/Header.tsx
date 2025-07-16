// src/components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Bell, User, X, CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '../cammonFiles/LanguageSwitcher';
interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, message: t('notifications.welcome'), date: '2025-07-11', isNew: true },
    { id: 2, message: t('notifications.update'), date: '2025-07-10', isNew: false },
    { id: 3, message: t('notifications.reminder'), date: '2025-07-09', isNew: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 relative">
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

        <div className="flex items-center space-x-4 rtl:space-x-reverse relative">
          <LanguageSwitcher />

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div
              ref={notificationsRef}
              className="absolute right-16 top-14 w-96 bg-white shadow-xl border rounded-xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-100">
                <h2 className="font-semibold text-gray-800 text-sm">
                  {t('header.notifications')}
                </h2>
                <button onClick={() => setShowNotifications(false)}>
                  <X className="w-4 h-4 text-gray-500 hover:text-black" />
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                <ul className="divide-y">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`p-4 hover:bg-gray-50 transition-all ${
                        notif.isNew ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <CheckCircle2
                          className={`w-5 h-5 mt-1 ${
                            notif.isNew ? 'text-blue-500' : 'text-gray-400'
                          }`}
                        />
                        <div>
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-500">{notif.date}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-4 py-2 border-t text-center bg-gray-50">
                <button className="text-xs text-blue-600 hover:underline">
                  Mark all as read
                </button>
              </div>
            </div>
          )}

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
