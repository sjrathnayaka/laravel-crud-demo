import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth'; // Custom hook for auth logic

const App = () => {
  const { isAuthenticated } = useAuth(); // Custom hook for auth status
  const [loading, setLoading] = useState(true); // Loading state to wait for auth status

  // Check if authentication status is loaded
  useEffect(() => {
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while auth status is being determined
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Default route: always go to login page on first visit */}
        <Route
          path="/"
          element={<Navigate to="/login" />} // Always redirect to login first
        />

        {/* Private routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={<Home />}
              requiredRole={null} // Any authenticated user can access
            />
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<AdminPage />}
              requiredRole="admin" // Only admin users can access
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
