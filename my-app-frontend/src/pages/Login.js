import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token && role) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        setError('Login failed: Missing token or role');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
     
        <div style={{ marginTop: '10px' }}>
        <p>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
            Register here
          </Link>
        </p>
      </div> </form>
      
    </div>
  );
};

export default Login;
