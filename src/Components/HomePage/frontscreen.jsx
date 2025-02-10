import React from "react";
import "./frontscreen.css";
import pngegg from "../Assets/pngegg.png";
import test from "../Assets/test.png";
import jobs from "../Assets/jobs.jpeg";
import compiler from "../Assets/compiler.jpeg";
import flowchart from "../Assets/flowchart.jpg";
import { Link } from "react-router-dom";
const FrontScreen = () => {
  return (
    <div>
      <div className="scrollable-container">
        <div className="logo-heading-container">
          <h2 className="heading">
            <span>Welcome to</span>
            <span>, TECH-LEARN</span>
          </h2>
        </div>
        <div className="services-container">
          <Link to="/notes" style={{ textDecoration: "none" }}>
            <div className="card">
              <img src={flowchart} alt="Service 1" />
              <div className="card-content">
                <h3>Preparation</h3>
                <p>Prepare the skill and boost your development career</p>
              </div>
            </div>
          </Link>
          <Link to="/Option_card" style={{ textDecoration: "none" }}>
            <div className="card">
              <img src={test} alt="Service 2" />
              <div className="card-content">
                <h3>Test Skills</h3>
                <p>Analyze yourself and strengthen your skills</p>
              </div>
            </div>
          </Link>
          {/* <Link to="/jobRecommendation" style={{ textDecoration: "none" }}>
          <div className="card">
            <img src={jobs} alt="Service 3" />
            <div className="card-content">
              <h3>We will recommend the job</h3>
              <p>On the basis of report generation we will recommend the job</p>
            </div>
          </div>
          </Link> */}
          <Link to="/Compiler" style={{ textDecoration: "none" }}>
          <div className="card">
            <img src={compiler} alt="Service 4" />
            <div className="card-content">
              <h3>Compile your code</h3>
              <p>We have an online compiler for you to test your code</p>
            </div>
          </div>
          </Link>
        </div>

        {/* Pagination dots */}
      </div>
    </div>
  );
};

export default FrontScreen;
