import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, User, School, Bell, Shield, Database, Palette, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const tabs = [
    { id: 'general', name: t('settings.tabs.general'), icon: SettingsIcon },
    { id: 'school', name: t('settings.tabs.school'), icon: School },
    { id: 'users', name: t('settings.tabs.users'), icon: User },
    { id: 'notifications', name: t('settings.tabs.notifications'), icon: Bell },
    { id: 'security', name: t('settings.tabs.security'), icon: Shield },
    { id: 'data', name: t('settings.tabs.data'), icon: Database },
    { id: 'appearance', name: t('settings.tabs.appearance'), icon: Palette },
    { id: 'localization', name: t('settings.tabs.localization'), icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.general.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.general.systemName')}
                </label>
                <input
                  type="text"
                  defaultValue="EduManage System"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.general.systemVersion')}
                </label>
                <input
                  type="text"
                  defaultValue="v2.1.0"
                  disabled
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.general.timeZone')}
                </label>
                <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}>
                  <option>UTC-05:00 (Eastern Time)</option>
                  <option>UTC-06:00 (Central Time)</option>
                  <option>UTC-07:00 (Mountain Time)</option>
                  <option>UTC-08:00 (Pacific Time)</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.general.dateFormat')}
                </label>
                <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}>
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'school':
        return (
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.school.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.school.schoolName')}
                </label>
                <input
                  type="text"
                  defaultValue="Springfield High School"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.school.address')}
                </label>
                <textarea
                  rows={3}
                  defaultValue="123 Education Street, Springfield, ST 12345"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.school.phoneNumber')}
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.school.email')}
                </label>
                <input
                  type="email"
                  defaultValue="info@springfield.edu"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.school.website')}
                </label>
                <input
                  type="url"
                  defaultValue="https://www.springfield.edu"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('settings.school.establishedYear')}
                </label>
                <input
                  type="number"
                  defaultValue="1985"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.title')}</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className={`font-medium text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.passwordPolicy')}</h4>
                <div className="space-y-3">
                  <label className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" defaultChecked className={`rounded border-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className={`text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.requireMinChars')}</span>
                  </label>
                  <label className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" defaultChecked className={`rounded border-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className={`text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.requireUpperLower')}</span>
                  </label>
                  <label className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" defaultChecked className={`rounded border-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className={`text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.requireNumbers')}</span>
                  </label>
                  <label className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" className={`rounded border-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className={`text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.requireSpecialChars')}</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className={`font-medium text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.security.sessionManagement')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('settings.security.sessionTimeout')}
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('settings.security.maxLoginAttempts')}
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`text-center py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-gray-400 mb-4">
              <SettingsIcon className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('settings.comingSoon')}</h3>
            <p className="text-gray-600">{t('settings.comingSoonDesc')}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <SettingsIcon className={`w-7 h-7 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('settings.title')}
        </h1>
        <p className={`text-gray-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('settings.subtitle')}</p>
      </div>

      <div className={`flex flex-col lg:flex-row gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'space-x-3 text-left'} ${
                      activeTab === tab.id
                        ? `bg-blue-50 text-blue-600 ${isRTL ? 'border-l-2' : 'border-r-2'} border-blue-600`
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
            
            <div className={`flex justify-end mt-8 pt-6 border-t border-gray-200 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-3'}`}>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                {t('settings.cancel')}
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {t('settings.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;