import React from 'react';
import '../App.css';
import Cards from '../css/Cards';
import HeroSection from '../css/HeroSection';
import Footer from '../css/Footer';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <div>
      <Helmet>
        <title>Maharashtra Town Planning Consultant</title>
        <meta name="description" content="Here you will find the latest UDPCR book and new acts and rules. you can also consult our expert over numerous topics related to town planning." />
      </Helmet>
      <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
    </div>
   
  );
}

export default Home;
