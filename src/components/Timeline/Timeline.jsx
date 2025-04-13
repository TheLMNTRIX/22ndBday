// filepath: src/components/Timeline/Timeline.jsx
import React, { useState } from 'react';
import TimelineEvent from './TimelineEvent';
import timelineData from '../../data/timelineData';
import styles from './timeline.module.css';
import { motion } from 'framer-motion';

const Timeline = () => {
  // State to track the ID of the currently open event
  const [openEventId, setOpenEventId] = useState(null);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  // Function to handle toggling an event's details
  const handleToggleEvent = (eventId) => {
    // Only allow toggling once animations are complete
    if (animationsComplete) {
      // If the clicked event is already open, close it. Otherwise, open the clicked one.
      setOpenEventId(prevOpenId => (prevOpenId === eventId ? null : eventId));
    }
  };

  // Animation timings
  const baseDelay = 0.5; // Delay after title appears
  const itemDelay = 0.3; // Delay between each timeline item

  // Calculate total animation duration to know when all animations complete
  

  return (
    <div className={styles.timelineContainer}>
      {/* Title with initial animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Our Journey Together
      </motion.h2>
      
      <div className={styles.timeline}>
        {timelineData.map((event, index) => {
          // Calculate delay for this item (node + date)
          const nodeDelay = baseDelay + (index * itemDelay * 2);
          // Calculate delay for the line after this node
          const lineDelay = nodeDelay + itemDelay;
          
          return (
            <React.Fragment key={event.id}>
              {/* Timeline event (node + date) */}
              <TimelineEvent
                event={event}
                index={index} 
                isOpen={openEventId === event.id}
                onToggle={handleToggleEvent}
                onClose={() => setOpenEventId(null)}
                animationDelay={nodeDelay}
                animationsComplete={animationsComplete}
              />
              
              {/* Line segment grows downward after the node */}
              {index < timelineData.length - 1 && (
                <motion.div 
                  className={styles.lineSegment}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: 1, 
                    opacity: 1,
                  }}
                  transition={{ 
                    delay: lineDelay, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Final message and line after the last node */}
              {index === timelineData.length - 1 && (
                <>
                  <motion.div 
                    className={styles.lineSegment}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ 
                      scaleY: 1, 
                      opacity: 1,
                    }}
                    transition={{ 
                      delay: lineDelay,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  />
                  <div style={{ height: '20px' }}></div>
                  <motion.div 
                    className={styles.futureMessage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                    }}
                    transition={{ 
                      delay: lineDelay + 0.5,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    onAnimationComplete={() => {
                      // Set animations complete after the full sequence ends
                      setTimeout(() => setAnimationsComplete(true), 500);
                    }}
                  >
                    "Every moment with you is a treasure; our story has just begun, with countless chapters yet to be written..."
                  </motion.div>
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;