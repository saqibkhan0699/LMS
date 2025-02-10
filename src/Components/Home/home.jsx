
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../Assets/pngegg.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import Frontscreen from '../HomePage/frontscreen';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const Profile = () => {
    const [profile, setProfile] = useState({
      userName: '',
      email: '',
      firstName:'',
      lastName:''
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found in local storage.');
            return;
          }
  
          const response = await axios.get('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Accounts/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
  
      fetchProfile();
    }, []);
  
  }

  return (
    <div className={`home-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Toggle button for mobile */}
      <div className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="brand-name">Tech-Learn</div>
        </div>
        {/* Link to Home */}
        <Link to="/" className="menu-item">
          Home
        </Link>
        {/* Links to other pages */}
        <Link to="/login" className="menu-item">
          Prepare Skill
        </Link>
        <Link to="/test-skill" className="menu-item">
          Test Skill
        </Link>
        <Link to="/test-code" className="menu-item">
          Test Code
        </Link>
        <Link to="/profile" className="menu-item profile-item">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Home;
