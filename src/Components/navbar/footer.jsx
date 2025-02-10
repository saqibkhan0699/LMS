import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>TECH-LEARN is the specialized platform from preparation to testing for coders and programmers </p>
          </div>
          <div className="footer-column">
            <h3>What we provide?</h3>
            <ul>
              <li>Skills preparation</li>
              <li>Testing skills</li>
              <li>Code testing</li>
              <li>Job recommendations</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>123 Main Street, City</p>
            <p>Email: info@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
