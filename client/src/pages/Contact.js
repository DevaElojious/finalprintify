import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="contactus">
        <div className="col-md-6">
          <img src="/images/contactus.png" alt="contactus" style={{ width: "90%" }} />
        </div>
        <div className="col-md-4">
        <h1 className="bg-custom p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-3 fs-5">
            For queries or more information about the product, call us between:
            <br />
            Monday to Friday: 9 AM to 6 PM<br />
            Saturday: 10 AM to 4 PM<br />
            Sunday: Closed
          </p>
          <div className="contact-info mt-3">
            <p className="fs-5">
              <BiMailSend /> : www.printifybusiness@gmail.com
            </p>
            <p className="fs-5">
              <BiPhoneCall /> : +91 9876543210
            </p>
            <p className="fs-5">
              <BiSupport /> : 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
