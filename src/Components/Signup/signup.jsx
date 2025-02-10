import React, { useState } from 'react';
import './signup.css'; // Import the CSS file for styling
import pngegg from '../Assets/signup.png';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Accounts/register', {
        userName,
        firstName,
        lastName,
        email,
        password
      });
      console.log(response.data);
      setError('');
      setFormErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Array.isArray(error.response.data) ? 
          error.response.data.map(err => err.description).join(', ') : 
          error.response.data.description || 'Registration failed';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!userName) errors.userName = "User Name is required.";
    if (!firstName) errors.firstName = "First Name is required.";
    if (!lastName) errors.lastName = "Last Name is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) {
      errors.email = "Invalid email format. Please use a Gmail address.";
    }
    if (!password) errors.password = "Password is required.";
    return errors;
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: '#4caf50' }}>Sign Up</h2>
            <h2>To Tech-Learn</h2>
          </div>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="User Name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
              />
              {formErrors.userName && <p className="error-message">{formErrors.userName}</p>}
            </div>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="First Name"
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
              {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}
            </div>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
              {formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              {formErrors.email && <p className="error-message">{formErrors.email}</p>}
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {formErrors.password && <p className="error-message">{formErrors.password}</p>}
            </div>
            <button style={{ backgroundColor: '#4caf50' }} type="submit">Sign Up</button>
          </form>
          {error && <p className="error-message">{error}</p>} {/* Display error message if signup fails */}
          <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </>
  );
}

export default Signup;
