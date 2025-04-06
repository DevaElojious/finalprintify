import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentQR = () => {
  const [step, setStep] = useState(1); // Tracks the step
  const navigate = useNavigate();

  // Temporary version: no cart, just confirm and redirect
  const handleConfirmPayment = () => {
    try {
      toast.success("Payment confirmed! Redirecting to your orders...");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="container text-center mt-4">
        {step === 1 && (
          <>
            <h2>Scan to Pay</h2>
            <p>Use Google Pay to scan this QR code and complete your payment.</p>
            <img
              src="/images/qrcode.png"
              alt="GPay QR Code"
              width="300"
              height="300"
            />
            <br />
            <button
              className="btn btn-primary mt-3"
              onClick={() => setStep(2)} // Proceed to step 2
            >
              I Have Paid
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Submit Payment Details</h2>
            <p>
              Please fill this Google Form to submit your transaction ID and screenshot:
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe1FFw23Y2q__KL3Fb7Lyij9ZeRAidStGeDjOX3AfQ6TXtHEA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              Fill Google Form
            </a>

            <p className="mt-4">
              After submitting the form, click the button below to confirm and proceed.
            </p>
            <button
              className="btn btn-success"
              onClick={handleConfirmPayment}
            >
              I Have Filled the Form
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PaymentQR;
