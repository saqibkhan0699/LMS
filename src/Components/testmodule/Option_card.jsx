import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./optioncard.css";
import flowchart from "../Assets/flowchart.jpg";
import test from "../Assets/test.png";

const Option_card = () => {
  return (
    <>
      <Link to="/">
        <FaArrowLeft className="back-button" />
      </Link>
      <div className="scrollable-container">
        <div className="services-container">
          <Link
            to="/quiz-attempt"
            style={{ textDecoration: "none" }}
          >
            {/* Link to Technical_questions.jsx */}
            <div className="card">
              <img src={flowchart} alt="Technical Skills" />
              <div className="card-content">
                <h3>Technical Skill Test</h3>
                <p>Test your technical skill</p>
              </div>
            </div>
          </Link>
          {/* <Link to="/Verbal_question_test" style={{ textDecoration: "none" }}>
            <div className="card">
              <img src={test} alt="Vocabulary Skills" />
              <div className="card-content">
                <h3>Verbal Skills Test</h3>
                <p>Test your verbal skill</p>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Option_card;
