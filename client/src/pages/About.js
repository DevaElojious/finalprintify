import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Printify"}>
      <div className="about-container">
        <img
          src="/images/about.png"
          alt="about us"
          className="about-image"
        />
        <div className="about-content">
          {/* <h1 className="text-center">About Us</h1> */}
          <p className="text-justify">
            Welcome to <h5 style={{color: "#293b79",fontFamily: "'Playfair Display', serif",}}><strong>Printify,</strong></h5> where creativity meets excellence.
          </p>
          <p>
            At Printify, we specialize in providing top-quality printing solutions that bring your ideas to life. From personalized merchandise to professional business materials, we are dedicated to making every project a masterpiece.
          </p>
          <h3>Who We Are</h3>
          <p>
            We are a passionate team of designers, printers, and innovators based in Mumbai, India. With years of experience in the printing industry, our mission is to offer high-quality, reliable, and affordable printing services to businesses and individuals alike.
          </p>
          <h3>Our Vision</h3>
          <p>
            To be the most trusted and innovative printing partner, empowering people and businesses to share their unique stories and ideas with the world.
          </p>
          <h3>What We Do</h3>
          <ul>
            <li>Custom Printing Services: From t-shirts and mugs to posters and brochures, we provide tailored solutions for all your printing needs.</li>
            <li>Eco-Friendly Solutions: We prioritize sustainability by offering environmentally friendly printing options.</li>
            <li>Creative Design Support: Need help designing? Our creative team is here to assist you every step of the way.</li>
          </ul>
          <h3>Why Choose Us</h3>
          <ul>
            <li>Quality Assurance: We use the latest printing technology to ensure exceptional results every time.</li>
            <li>Affordable Pricing: Get premium printing solutions at competitive prices.</li>
            <li>Fast Turnaround: On-time delivery, every time.</li>
          </ul>
          <h3>Our Commitment</h3>
          <p>
            At Printify, we believe in building lasting relationships with our customers by providing unmatched quality and service. Your satisfaction is our priority, and we strive to exceed your expectations in everything we do.
          </p>
          <h3>Contact Us</h3>
          <p>
            Have a question or need assistance? We’re here to help! Feel free to reach out to us via:
          </p>
          <ul>
            <li>Email: <strong>printifybusiness@gmail.com</strong></li>
            <li>Phone: <strong>+91 9876543210</strong></li>
          </ul>
          <p className="about-footer">
            <strong>Thank you for choosing Printify. Let’s create something amazing together!</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
