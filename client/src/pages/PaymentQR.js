import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentQR = () => {
  const [step, setStep] = useState(1); // Tracks the step (1: QR Code, 2: Payment Details)
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: "",
    screenshot: null,
  });
  const navigate = useNavigate();

  const handleDetailsSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!paymentDetails.transactionId || !paymentDetails.screenshot) {
      toast.error("Please provide both transaction ID and screenshot!");
      return;
    }

    // Simulate form submission
    toast.success("Payment details submitted! Pending verification.");
    setStep(3); // Go to step 3 (Verification)
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
              onClick={() => setStep(2)} // Proceed to Step 2
            >
              I Have Paid
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Submit Payment Details</h2>
            <p>Please provide the following payment details to verify your transaction:</p>
            <form onSubmit={handleDetailsSubmit}>
              <div className="mb-3">
                <label htmlFor="transactionId" className="form-label">
                  Transaction ID / Reference Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="transactionId"
                  value={paymentDetails.transactionId}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      transactionId: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="screenshot" className="form-label">
                  Upload Payment Screenshot
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="screenshot"
                  accept="image/*"
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      screenshot: e.target.files[0],
                    })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit Payment Details
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Payment Under Verification</h2>
            <p>
              Your payment details have been submitted and are currently under verification.
              You will be notified once the process is complete.
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/dashboard/user/orders")} // Redirect to the orders page
            >
              Go to Orders
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PaymentQR;
