// filepath: c:\Users\rohit\OneDrive\Desktop\22nd Bday\birthday-website\src\components\PhotoGallery\PhotoGallery.jsx
import React, { useState, useMemo, useEffect } from 'react';
import Photo from './Photo';
import FullscreenPhoto from './FullscreenPhoto';
import galleryData from '../../data/galleryData';
import styles from './PhotoGallery.module.css';

// Function to shuffle array (Fisher-Yates)
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);

  // Shuffle photos and initiate preloading on mount
  useEffect(() => {
    const photosToShuffle = [...galleryData];
    setShuffledPhotos(shuffleArray(photosToShuffle));

    // Preload images
    photosToShuffle.forEach((photo) => {
      const img = new Image();
      img.src = photo.url;
    });

  }, []); // Empty dependency array ensures this runs only once

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseFullscreen = () => {
    setSelectedPhoto(null);
  };

  // Calculate positions (adjust grid size as needed)
  const gridCols = 8; // e.g., 8 columns
  const gridRows = Math.ceil(shuffledPhotos.length / gridCols);

  const photoElements = useMemo(() => {
    return shuffledPhotos.map((photo, index) => {
      const col = index % gridCols;
      const row = Math.floor(index / gridCols);
      const style = {
        left: `${(col / gridCols) * 100}%`,
        top: `${(row / gridRows) * 100}%`,
        width: `${100 / gridCols}%`,
        height: `${100 / gridRows}%`,
      };
      return (
        <Photo
          key={photo.id}
          photo={photo}
          style={style}
          onClick={handlePhotoClick}
        />
      );
    });
  }, [shuffledPhotos, gridCols, gridRows]); // Recalculate only if photos or grid changes

  return (
    <div className={styles.galleryContainer}>
      {/* SVG for Heart Clip Path */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <clipPath id="heart-clip-gallery" clipPathUnits="objectBoundingBox">
          {/* Path adjusted for sharper bottom tip */}
          {/* Old path: d="M0.5,0.2 C0.65,0.05 0.8,0.05 0.9,0.2 C0.98,0.3 1,0.45 1,0.55 C1,0.75 0.75,0.95 0.5,1 C0.25,0.95 0,0.75 0,0.55 C0,0.45 0.02,0.3 0.1,0.2 C0.2,0.05 0.35,0.05 0.5,0.2 Z" */}
          <path d="M0.5,0.87 C0.95,0.72 1.12,0.33 0.93,0.15 C0.73,-0.02 0.5,0.21 0.5,0.21 C0.5,0.21 0.27,-0.02 0.07,0.15 C-0.12,0.33 0.05,0.72 0.5,0.87 Z"/>
          </clipPath>
      </svg>

      <div className={styles.heartContainer}>
        <div className={styles.collageContainer}>
          {photoElements}
        </div>
        {/* Optional: Add a border effect using pseudo-elements if desired */}
        {/* <div className={styles.heartBorder}></div> */}
      </div>

      <FullscreenPhoto photo={selectedPhoto} onClose={handleCloseFullscreen} />
    </div>
  );
};

export default PhotoGallery;