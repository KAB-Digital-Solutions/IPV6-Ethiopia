import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabaseClient';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import toast from 'react-hot-toast';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Updated logout accepts optional showSuccess flag (default true)
  const handleLogout = async (showSuccess = true) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
        toast.error('Failed to log out');
      } else {
        if (showSuccess) {
          toast.success('Logged out successfully');
        }
        setSession(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('An unexpected error occurred during logout');
    }
  };
  // Add this function BEFORE the return statement (before JSX)
const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute
              session={session}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
