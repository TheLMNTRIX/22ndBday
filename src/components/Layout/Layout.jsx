import React from 'react';
import styles from './Layout.module.css';
import Navigation from './Navigation';
import Footer from './Footer';
import { useBirthdayCake } from '../../context/BirthdayCakeContext'; // Import context hook

// Remove isCountdownComplete prop from function signature
const Layout = ({ children }) => {
  // Get countdown state from context
  const { isCountdownComplete } = useBirthdayCake();

  return (
    <div className={styles.layoutContainer}>
      {/* Pass context state to Navigation */}
      <Navigation isCountdownComplete={isCountdownComplete} />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;