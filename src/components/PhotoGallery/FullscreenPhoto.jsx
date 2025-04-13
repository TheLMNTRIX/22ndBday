// filepath: c:\Users\rohit\OneDrive\Desktop\22nd Bday\birthday-website\src\components\PhotoGallery\FullscreenPhoto.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PhotoGallery.module.css';

const FullscreenPhoto = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.fullscreenBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close when clicking the backdrop
      >
        <motion.div
          className={styles.fullscreenContent}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/modal itself
        >
          <img src={photo.url} alt={photo.alt} className={styles.fullscreenImage} />
          <button className={styles.closeButton} onClick={onClose} aria-label="Close fullscreen view">
            &times;
          </button>
          <p className={styles.fullscreenCaption}>{photo.alt}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullscreenPhoto;