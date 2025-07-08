import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Staff from './pages/Staff';
import Students from './pages/Students';
import Departments from './pages/Departments';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Queries from "./pages/Queries"

const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

function AppWrapper() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/staff"
        element={
          isAuthenticated() ? (
            <Layout>
              <Staff />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/students"
        element={
          isAuthenticated() ? (
            <Layout>
              <Students />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/departments"
        element={
          isAuthenticated() ? (
            <Layout>
              <Departments />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/courses"
        element={
          isAuthenticated() ? (
            <Layout>
              <Courses />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
       <Route
        path="/Queries"
        element={
          isAuthenticated() ? (
            <Layout>
              <Queries />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated() ? (
            <Layout>
              <Settings />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
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

