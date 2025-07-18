import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Admin pages
import AdminLayout from './Layout/AdminLayout/Layout';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import Staff from './pages/AdminPages/Staff';
import Students from './pages/AdminPages/Students';
import Departments from './pages/AdminPages/Departments';
import Courses from './pages/AdminPages/Courses';
import Settings from './pages/AdminPages/Settings';
import Login from './pages/AdminPages/Login';
import AdminQueryTable from "./pages/AdminPages/AdminQueryTable";

// Teacher pages
import Sidebar from './Layout/TeacherLayout/Sidebar';
import TeacherDashboard from './pages/TeacherPages/Dashboard';
import Timetable from './pages/TeacherPages/Timetable';
import Account from './pages/TeacherPages/Account';
import Quiz from './pages/TeacherPages/Quiz';

const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

const getUserRole = () => {
  return localStorage.getItem('userRole') || 'admin'; // Default to admin
};

function AppWrapper() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const userRole = getUserRole();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to={userRole === 'teacher' ? '/teacher/dashboard' : '/admin/dashboard'} replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate to={userRole === 'teacher' ? '/teacher/dashboard' : '/admin/dashboard'} replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/staff"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <Staff />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/students"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <Students />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/departments"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <Departments />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/courses"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <Courses />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/queries"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <AdminQueryTable />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/settings"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <AdminLayout>
              <Settings />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher/dashboard"
        element={
          isAuthenticated() && userRole === 'teacher' ? (
            <Sidebar>
              <TeacherDashboard />
            </Sidebar>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/timetable"
        element={
          isAuthenticated() && userRole === 'teacher' ? (
            <Sidebar>
              <Timetable />
            </Sidebar>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/account"
        element={
          isAuthenticated() && userRole === 'teacher' ? (
            <Sidebar>
              <Account />
            </Sidebar>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/quiz"
        element={
          isAuthenticated() && userRole === 'teacher' ? (
            <Sidebar>
              <Quiz />
            </Sidebar>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Legacy routes for backward compatibility */}
      <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/staff" element={<Navigate to="/admin/staff" replace />} />
      <Route path="/students" element={<Navigate to="/admin/students" replace />} />
      <Route path="/departments" element={<Navigate to="/admin/departments" replace />} />
      <Route path="/courses" element={<Navigate to="/admin/courses" replace />} />
      <Route path="/queries" element={<Navigate to="/admin/queries" replace />} />
      <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />

      {/* Redirect all other routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}