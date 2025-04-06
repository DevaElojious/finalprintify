import React from "react";
import FAQ from "../components/FAQ";
import Layout from "./../components/Layout/Layout";

const FAQPage = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center py-10">
      <FAQ />
    </div>
    </Layout>
  );
};

export default FAQPage;
