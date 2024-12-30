import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to know if it's loaded
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const role = localStorage.getItem('role'); // Assuming role is stored after login
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []); // Only run this effect once after component mounts

  return { isAuthenticated, userRole };
};
