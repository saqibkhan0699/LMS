import React, { useState, useEffect } from 'react';
import './jobRecommendation.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Modal Component
const JobModal = ({ job, closeModal }) => {
  return (
    <div className="job-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{job.title}</h2>
        <p className="company">{job.company}</p>
        <p className="description"  dangerouslySetInnerHTML={{ __html: job.description}}/>
      </div>
    </div>
  );
};

const JobRecommendation = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Jobs/ListofJobs');
        setJobs(response.data); // Assuming your API response is an array of job objects
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="job-recommendation-page">
      <header className="header">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>
        <h1 style={{ marginTop: '5px' }}>Job Recommendations</h1>
      </header>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card" onClick={() => openModal(job)}>
            <strong>
              <h2>{job.title}</h2>
            </strong>
            <p className="company">{job.company}</p>
          </div>
        ))}
      </div>
      {selectedJob && <JobModal job={selectedJob} closeModal={closeModal} />}
    </div>
  );
};

export default JobRecommendation;
