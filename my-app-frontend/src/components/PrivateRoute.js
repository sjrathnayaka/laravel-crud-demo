import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if role doesn't match
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/home" />;
  }

  // Ensure that element is rendered as a React component
  return React.cloneElement(element);
};

export default PrivateRoute;
