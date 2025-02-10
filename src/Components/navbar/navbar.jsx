import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import prphile from '../Assets/prphile.webp';
import logo from '../Assets/pngegg.png';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [authenticated, setAuthenticated] = useState(false); // State for authentication status

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in local storage.');
          setAuthenticated(false);
          return;
        }

        const response = await axios.get('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Accounts/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setProfile(response.data);
        setAuthenticated(true);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={{ color: "#4caf50" }}>
          TECH-LEARN
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/front" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notes" className="nav-link">
                Prepare
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quiz-attempt" className="nav-link">
                Assess
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Compiler" className="nav-link">
                Test Code
              </Link>
            </li>
          </ul>
          <div className="ms-lg-auto">
            {authenticated ? (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "black" }}
                  >
                    <img
                      src={prphile}
                      alt="Profile Pic"
                      className="rounded-circle me-2"
                      width="32"
                      height="32"
                    />
                    <span style={{ color: "white" }}>{profile.firstName} {profile.lastName}</span> {/* Adjust color here */}
                    </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        See Full Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
