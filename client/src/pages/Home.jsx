import React from 'react';
import Hero from '../components/home/Hero';
import Introduction from '../components/home/Introduction';
import QuickLinks from '../components/home/QuickLinks';
import ReviewsSection from '../components/home/ReviewsSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <Introduction />
      <QuickLinks />
      <ReviewsSection />
    </div>
  );
};

export default Home;