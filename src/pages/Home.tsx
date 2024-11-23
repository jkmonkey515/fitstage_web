import React from 'react';
import Hero from '../components/Hero';
import LiveCompetitions from '../components/LiveCompetitions';
import FeaturedCompetitors from '../components/FeaturedCompetitors';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveCompetitions />
      <FeaturedCompetitors />
    </>
  );
}