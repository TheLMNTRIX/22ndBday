import React from 'react';
import styles from './Layout.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMessage}>
          Made for Simzie with love by Roh ❤️
        </div>
        <div className={styles.footerQuote}>
          "Every moment with you is a treasure; our story has just begun..."
        </div>
      </div>
    </footer>
  );
};

export default Footer;