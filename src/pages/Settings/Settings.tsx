import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Bell, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <SettingsIcon className={`w-8 h-8 text-blue-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
          Settings
        </h1>
        <p className={`text-gray-600 mt-2 text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
          Manage your system preferences and configuration
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Bell className={`w-6 h-6 text-blue-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>
          <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
            Configure notification preferences and alert settings for the system.
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Manage Notifications
            </button>
          </div>
        </div>

        {/* Data & Backup Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Database className={`w-6 h-6 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <h2 className="text-xl font-semibold text-gray-900">Data & Backup</h2>
          </div>
          <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
            Manage data backup, export options, and system data maintenance.
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Backup Settings
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className={`text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-gray-500">Version:</span>
            <span className="ml-2 font-medium text-gray-900">v2.1.0</span>
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-gray-500">Last Updated:</span>
            <span className="ml-2 font-medium text-gray-900">Dec 2024</span>
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-gray-500">Status:</span>
            <span className="ml-2 font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;