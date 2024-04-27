
import React from 'react';
import Header from '../components/Header';
import Footer from '../pages/home/footer';

const AboutPage = () => {
  return (
    <>
    <Header/>
    <div className="container px-4 py-8 grid grid-cols-2 gap-8 items-center bg-slate-100">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className=" mb-6">
          Welcome to our hotel booking website! At EaseStay, we are dedicated to providing you with the best hotel booking experience. Whether you're planning a vacation, a business trip, or a quick getaway, we have the perfect accommodation for you.
        </p>
        <p className=" mb-6">
          Our journey began with a passion for travel and a desire to make hotel booking simple and hassle-free. Over the years, we have built strong partnerships with hotels around the world to offer you a wide range of options to choose from.
        </p>
        <p className=" mb-6">
          At EaseStay, we believe in transparency and customer satisfaction. That's why we provide detailed information about each hotel, including photos, amenities, and customer reviews, to help you make informed decisions.
        </p>
        <p className=" mb-6">
          Our team is committed to excellence and dedicated to ensuring that your booking experience is seamless from start to finish. Whether you need assistance with finding the perfect hotel or have questions about your reservation, our friendly customer support team is here to help.
        </p>
        <p className=" mb-6">
          Thank you for choosing EaseStay for your hotel booking needs. We look forward to helping you plan your next unforgettable journey!
        </p>
      </div>
      <div>
        <img src="./images/hero1.jpg" alt="About Us" className="w-full rounded-lg" />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;