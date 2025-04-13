// filepath: src/pages/TimelinePage.jsx
import React, { useEffect } from 'react'; // Import useEffect
import Timeline from '../components/Timeline/Timeline';
import Layout from '../components/Layout/Layout';

const TimelinePage = () => {
  // Scroll to top smoothly when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add this option
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Layout>
      <Timeline />
    </Layout>
  );
};

export default TimelinePage;