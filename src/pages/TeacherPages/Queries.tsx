import React from 'react';
import { useTranslation } from 'react-i18next';
// import Header from '../../Layout/TeacherLayout/Header';

import RecentQueries from '../../components/TeacherComponents/RecentQueries'

const Queries = () => {
  const { t } = useTranslation();

  return (
    <div className="ml-64 min-h-screen bg-gray-50">
      {/* <Header title={t('nav.queries')} /> */}
      
      <main className="p-6">
        <RecentQueries />
      </main>
    </div>
  );
};

export default Queries;