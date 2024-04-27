
import React, { useState, useEffect } from 'react';

function Hero() {
  const images = [ 
    './images/taj.jpg',
    './Hotels/hotel3.png',
    './Hotels/hotel2.png',
    './images/india-gate.jpg',
    './images/hero2.jpg',
    './images/hero3.jpg',
    './images/hero4.jpg'
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const preloadNextImage = () => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      const img = new Image();
      img.src = images[nextIndex];
    };

    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      preloadNextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  const getImageHeight = () => {
    const screenWidth = window.innerWidth;
    let height = 300; 
    if (screenWidth >= 1024) {
      height = 500;
    } else if (screenWidth >= 768) {
      height = 400; 
    }
    return height;
  };

  return (
    <div
      className='bg-cover bg-center flex justify-end py-10 items-center text-white flex-col gap-10 h-[80vh] w-full
      md:h-[65vh] md:gap-8 sm:h-[40vh] bg-slate-200'
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${images[currentImageIndex]})`, height: getImageHeight() }}>


      <h1 className='text-4xl md:text-3xl sm:text-2xl text-white  sm:px-2 font-not-italic font-bold ' style={{ textShadow: '2px 3px 1px rgba(0, 0, 0, 1)' }}>Explore with ease, relax with us</h1>

    </div>
  );
}

export default Hero;



