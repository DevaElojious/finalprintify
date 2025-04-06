import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaMoon, FaSun } from "react-icons/fa";
import Modal from "react-modal";

const HomePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const featuredProducts = [
    {
      name: "Wedding Card",
      image: "/images/weddingcard.jpg",
      desc: "High-quality Wedding Cards are available.",
    },
    {
      name: "Stationery",
      image: "/images/a2.png",
      desc: "You can buy stationery from us!!",
    },
    {
      name: "2025 Diary",
      image: "/images/a2.png",
      desc: "Buy your 2025 Diary now!!!",
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} transition-all duration-500`}>
      <div className="bg-[#f9f9ff] dark:bg-gray-900 text-black dark:text-white">
        <Layout title="Welcome to Printify">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end p-4">
            <button
              onClick={toggleDarkMode}
              className="bg-yellow-300 dark:bg-gray-700 p-2 rounded-full shadow-md hover:scale-105 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Hero Section */}
          <div className="text-center px-6 py-10">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Welcome to <span className="text-yellow-400">Printify</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl mb-6"
            >
              Your one-stop shop for premium custom prints and products.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/all-products")}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-500 transition"
            >
              Explore Products
            </motion.button>
          </div>

          {/* Featured Carousel */}
          <div className="py-12 bg-gray-100 dark:bg-gray-800">
            <h2 className="text-center text-3xl font-bold mb-6">Featured Products</h2>
            <div className="max-w-3xl mx-auto">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={4000}
              >
                {featuredProducts.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center gap-4 p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-64 w-auto object-contain rounded shadow-lg mx-auto"
                    />
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* About Section */}
          <div className="py-12 px-6 md:px-16">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              At Printify, we believe in delivering premium print solutions with a personal touch.
              Whether it's elegant wedding cards, professional catalogues, or handy diaries — we do
              it all with love and care.
            </p>
          </div>

          {/* Testimonials Section */}
          <div className="py-12 px-6 bg-indigo-50 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <p>"Printify made our wedding truly special with beautiful invitation cards!"</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">- Priya & Rahul</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <p>"Amazing quality and fast service. Highly recommend!"</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">- Mr. Sharma</p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="py-12 px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Watch Our Print Process</h2>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="px-5 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-500 transition"
            >
              Play Video
            </button>
          </div>

          <Modal
            isOpen={isVideoOpen}
            onRequestClose={() => setIsVideoOpen(false)}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-70"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden p-4 relative max-w-xl w-full">
              <button
                className="absolute top-2 right-2 text-black dark:text-white text-xl"
                onClick={() => setIsVideoOpen(false)}
              >
                ✖
              </button>
              <video controls className="w-full h-auto rounded">
                <source src="/videos/printify-bg.mp4" type="video/mp4" />
              </video>
            </div>
          </Modal>
        </Layout>
      </div>
    </div>
  );
};

export default HomePage;
