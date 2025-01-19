import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        {/* Business Information */}
        <div className="text-center mb-3">
          <h4>Printify</h4>
          <p>56 Print Lane, Design City, Mumbai, Maharashtra, India</p>
          <p>Phone: (+91) 9876543210 </p>
          <p>Email: printifybusiness@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div className="row text-center">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/policy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <p>
              <a href="https://facebook.com" className="text-light text-decoration-none me-3" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" className="text-light text-decoration-none me-3" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" className="text-light text-decoration-none" target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
          </div>

          {/* Business Hours */}
          <div className="col-md-4">
            <h5>Business Hours</h5>
            <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat: 10:00 AM - 4:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-4">
          <p className="mb-0">© 2025 Printify. All rights reserved. | <Link to="/policy" className="text-light text-decoration-none">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
