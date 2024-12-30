import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Home />} />  {/* Home Page route */}
        <Route path="/admin" element={<AdminPage />} />  {/* Admin Page route */}
        <Route path="/Home" element={<Home />} /> {/* Optional - This will allow '/Home' route */}
      </Routes>
    </Router>
  );
};

export default App;
