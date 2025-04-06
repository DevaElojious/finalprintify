import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Printify?",
      answer: "Printify is an online store that offers customizable printing solutions.",
    },
    {
      question: "How can I place an order?",
      answer: "Simply add products to your cart and proceed to checkout.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds within 7 days of purchase.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left font-semibold text-lg p-3 bg-white border rounded-md shadow-sm"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
          </button>
          {openIndex === index && <p className="p-3 bg-gray-200 rounded-md">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
