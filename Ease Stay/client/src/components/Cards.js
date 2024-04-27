import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardSlider.css'; 
import { data } from '../resources/cardData'; // Importing card data

function Card({ card }) {
  return (
    <div className='card'>
      {/* Card content */}
      <img className='card-image' src={card.image} alt={card.title} />
      <div className='card-content'>
        <h1 className='card-title'>{card.title}</h1>
        <h3 className='card-location'>{card.location}</h3>
        <p className='card-description'>{card.description}</p>
      </div>
      <div className='card-footer px-2'>
        <div className='price-container flex flex-col'>
          <h3 className='price-label'>Starts at</h3>
          <h1 className='price'>{card.price}</h1>
        </div>
        <a href={card.Book_URL} className='book-now-button'>Book now</a>
      </div>
    </div>
  );
}

function Cards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % data.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentCardIndex(prevIndex => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  }, []);

  return (
    <div className='card-slider-container'>
      <Slider
        dots={false}
        infinite={true}
        speed={500}
        slidesToShow={5}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            }
          }
        ]}
      >
        {data.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </Slider>
      <button className='prev-button' onClick={handlePrev}><i className="ri-arrow-left-line"></i></button>
      <button className='next-button' onClick={handleNext}><i className="ri-arrow-right-line"></i></button>
    </div>
  );
}

export default Cards;
