import React, { useState } from 'react';
import Sidebar from '../../components/AdminComponents/Sidebar';
import Header from '../../components/AdminComponents/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar receives state to open/close */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main layout section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          setSidebarOpen={setSidebarOpen}
          showPrintButton={false} // optional
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
