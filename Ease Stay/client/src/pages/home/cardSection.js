import React from 'react'
import Cards from '../../components/Cards';

function CardSection() {
  return (
    <div className='bg-[#F0EFF4]  w-auto h-auto  text-center py-8 space-y-6 md:py-4 md:space-y-3 sm:py-3 sm:space-y-2'>
     <div>
     <h1 className='text-2xl sm:text-xl text-black font:bold'>Handpicked Luxury Hotels</h1>
      <div className='bg-first w-[30px] h-[2px] mx-auto sm:w-[20px] sm:h-[2px]'></div>
     </div>
      <h3 className='text-first text-lg sm:text-xs md:text-base '>Stop scrolling through hundreds of hotels. <br /> Indulge in the finest luxury hotels curated by a team of hospitality enthusiasts</h3>
      <div className="flex">
      <Cards/>
      </div>
      
    </div>
  )
}

export default CardSection;