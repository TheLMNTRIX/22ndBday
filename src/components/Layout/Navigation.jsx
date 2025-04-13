import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

// Receive isCountdownComplete prop
const Navigation = ({ isCountdownComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    // Only allow toggling if countdown is complete
    if (isCountdownComplete) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // Close menu if countdown becomes incomplete (edge case, but good practice)
  React.useEffect(() => {
    if (!isCountdownComplete) {
      setIsMenuOpen(false);
    }
  }, [isCountdownComplete]);

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          Simzie 22nd Birthday
        </Link>

        {/* Only show menu button if countdown is complete */}
        {isCountdownComplete && (
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen} // Add aria-expanded
          >
            <span className={styles.menuIcon}></span>
          </button>
        )}

        {/* Conditionally render the links container based on countdown completion */}
        {isCountdownComplete && (
          <div className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <Link to="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/timeline" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              Our Timeline
            </Link>
            <Link to="/gallery" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              Gallery
            </Link>
            <Link to="/reasons" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              22 Reasons
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;