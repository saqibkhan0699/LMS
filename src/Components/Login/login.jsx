import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Accounts/login', { email, password });
      if (response.status === 200) {
        const { token, userId } = response.data;
        
        // Store both token and userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        navigate('/front'); // Redirect to the dashboard upon successful login
      }
     } catch (error) {
      setError('Invalid email or password'); // Set error message if login fails
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#4caf50', marginRight: '5px' }}>Login</h2>
          <h2>To Tech-Learn</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Username or Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button style={{ backgroundColor: '#4caf50' }} type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if login fails */}
        </form>
        <p className="forgot-password-link"><Link to="/forgot-password">Forgot Password?</Link></p>
        <p className="signup-link">Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
