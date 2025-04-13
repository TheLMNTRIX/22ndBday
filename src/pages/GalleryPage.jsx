// filepath: c:\Users\rohit\OneDrive\Desktop\22nd Bday\birthday-website\src\pages\GalleryPage.jsx
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import styles from '../components/PhotoGallery/PhotoGallery.module.css'; // Reuse styles for title/intro
import { motion } from 'framer-motion';

const GalleryPage = () => {
  // Scroll to top smoothly on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Layout>
      <motion.h2
        className={styles.galleryTitle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Our Beautiful Moments
      </motion.h2>
      <motion.p
        className={styles.galleryIntro}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        A collection of memories shaped like my heart, filled with love for you. Each picture holds a story, a laugh, a feeling. Click on any photo to see it closer and relive the moment.
      </motion.p>
      <PhotoGallery />
    </Layout>
  );
};

export default GalleryPage;