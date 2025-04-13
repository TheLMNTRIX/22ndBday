// filepath: src/components/Timeline/TimelineEvent.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './timeline.module.css';

const TimelineEvent = ({ event, index, isOpen, onToggle, onClose, animationDelay, animationsComplete }) => {
  // Determine side based on index (even index = date left, details right | odd index = date right, details left)
  const isLeftSideDate = index % 2 === 0;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Node animation variants
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: animationDelay,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    hover: { scale: 1.15, transition: { duration: 0.2 } },
    tap: { scale: 0.9 }
  };

  // Date section animation variants
  const dateSectionVariants = {
    initial: { opacity: 0, x: isLeftSideDate ? -20 : 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: animationDelay + 0.15, // Slight delay after the node
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Details animation variants - Originating from the node's side
  const detailsVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      originX: isLeftSideDate ? 0 : 1, 
      originY: 0.5
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={styles.event}>
      {/* Node container with staggered animation */}
      <div className={styles.nodeContainer}>
        <motion.div
          className={styles.node}
          onClick={() => onToggle(event.id)}
          aria-expanded={isOpen}
          variants={nodeVariants}
          initial="initial"
          animate="animate"
          whileHover={animationsComplete ? "hover" : ""}
          whileTap={animationsComplete ? "tap" : ""}
        />
      </div>

      {/* Date display with staggered animation */}
      <motion.div 
        className={`${styles.dateSection} ${isLeftSideDate ? styles.dateSectionLeft : styles.dateSectionRight}`}
        variants={dateSectionVariants}
        initial="initial"
        animate="animate"
      >
        <span className={styles.year}>{event.year}</span>
        <span className={styles.date}>{formatDate(event.date)}</span>
      </motion.div>

      {/* Details section with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.details} ${isLeftSideDate ? styles.detailsRight : styles.detailsLeft}`}
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden={!isOpen}
          >
            {/* Fixed pointer logic */}
            <div 
              className={`${styles.pointer} ${isLeftSideDate ? styles.pointerLeft : styles.pointerRight}`}
            ></div>

            {/* Close button */}
            <button className={styles.closeButton} onClick={() => onClose()} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Content */}
            <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
            <h4>{event.title}</h4>
            <p className={styles.eventDate}>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{event.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelineEvent;