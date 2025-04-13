// filepath: src/pages/ReasonsPage.jsx
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import ReasonsILoveYou from '../components/ReasonsILoveYou/ReasonsILoveYou'; // Updated import path

const ReasonsPage = () => {
  // Scroll to top smoothly on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Layout>
      <ReasonsILoveYou />
    </Layout>
  );
};

export default ReasonsPage;