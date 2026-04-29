import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';

const Home = () => (
  <main className="protocol-flow" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Hero />
    <Features />
    <HowItWorks />
  </main>
);

export default Home;
