import React from 'react';
import Header from '../../components/Header';
import Hero from './hero';
import CardSection from './cardSection';
import Footer from './footer';
function Home() {
  return (
    <div>
     <Header/>
     <Hero/>
     <CardSection/>
     <Footer/>
    </div>
  )
}

export default Home;