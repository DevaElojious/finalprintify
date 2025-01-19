import React from "react";
import Layout from "./../components/Layout/Layout";


const Policy = () => {
  return (
    <Layout title={"Policy - Printify"}>
      <div className="policy-container">
      <h1 className="text-center mt-4"  style={{color: "#293b79",fontFamily: "'Playfair Display', serif",}}>Our Policies</h1>        
        <div className="policy-content">
          <h3 className="mt-4">Privacy Policy</h3>
          <p>
            At Printify, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose personal information.
          </p>
          <ul>
            <li><strong>Information Collection:</strong> We collect personal information when you interact with our website and services.</li>
            <li><strong>Use of Information:</strong> We use your information to provide and improve our services.</li>
            <li><strong>Data Protection:</strong> We take appropriate measures to protect your personal data from unauthorized access.</li>
          </ul>

          <h3 className="mt-4">Terms of Service</h3>
          <p>
            These Terms of Service govern your access to and use of Printify’s services. By using our services, you agree to these terms.
          </p>
          <ul>
            <li><strong>Usage Guidelines:</strong> You agree to use the services in compliance with applicable laws.</li>
            <li><strong>Service Limitations:</strong> Printify is not responsible for delays or errors caused by third-party vendors.</li>
            <li><strong>Termination:</strong> We may suspend or terminate your access to our services in case of any violations of these terms.</li>
          </ul>

          <h3 className="mt-4">Refund and Cancellation Policy</h3>
          <p>
            Printify strives for customer satisfaction. If you are not satisfied with your purchase, you may request a refund or cancellation based on the terms outlined below.
          </p>
          <ul>
            <li><strong>Refund Eligibility:</strong> Refunds are available within 7 days of purchase for eligible products.</li>
            <li><strong>Cancellation Process:</strong> Cancellations must be requested within 24 hours of order placement.</li>
            <li><strong>Non-Refundable Items:</strong> Certain custom products and services may not be eligible for refunds.</li>
          </ul>

          <h3 className="mt-4">Shipping Policy</h3>
          <p>
            We provide detailed information about shipping options and delivery times to ensure a smooth experience.
          </p>
          <ul>
            <li><strong>Shipping Time:</strong> Orders are usually shipped within 3-5 business days.</li>
            <li><strong>Shipping Costs:</strong> Shipping costs depend on the delivery location and order size.</li>
            <li><strong>International Shipping:</strong> We offer international shipping to selected locations.</li>
          </ul>
        </div>
        
        <div className="policy-footer text-center mt-5">
          <p><strong>If you have any questions regarding our policies, please feel free to contact us.</strong></p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
