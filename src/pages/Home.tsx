import React from 'react';
import Hero from '../components/Hero';
import LiveCompetitions from '../components/LiveCompetitions';
import FeaturedCompetitors from '../components/FeaturedCompetitors';
import CommunityPreview from '../components/CommunityPreview';
import VotingGuide from '../components/VotingGuide';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveCompetitions />
      <FeaturedCompetitors />
      <CommunityPreview />
      <VotingGuide />
    </>
  );
}