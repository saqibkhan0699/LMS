import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './profile.css';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    resumeFilePath: ''
  });

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

      // Store userId in local storage
      localStorage.setItem('userId', response.data.userId);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage.');
        return;
      }

      const response = await axios.post('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Accounts/upload-resume', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Resume uploaded successfully:', response.data);
      fetchProfile(); // Fetch profile to update resume link
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage.');
        return;
      }

      const response = await axios.get('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Accounts/download-resume', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob' // Important for file download
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); // You can set the file name here
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Information</h2>
      </div>
      <div className="profile-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={profile.firstName} name="firstName" readOnly />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={profile.lastName} name="lastName" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume:</label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
          {profile.resumeFilePath && (
            <div>
                <i onClick={handleDownloadResume} className="fas fa-download"></i> Download Resume
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" value={profile.email} name="email" readOnly />
        </div>
      </div>
    </div>
  );
};

export default Profile;
