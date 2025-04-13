import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Countdown.module.css'; // Reuse Countdown styles for now

const DigitFlip = ({ currentDigit, nextDigit }) => {
  const digit = parseInt(currentDigit, 10);
  const next = parseInt(nextDigit, 10);

  // Simple key based on the next digit to trigger animation on change
  const key = `digit-${next}`;

  const variants = {
    initial: { rotateX: -90, opacity: 0, y: -15 },
    animate: { rotateX: 0, opacity: 1, y: 0 },
    exit: { rotateX: 90, opacity: 0, y: 15 },
  };

  return (
    <div className={styles.digitContainer}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={key}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.4 }}
          className={styles.digitSpan}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default DigitFlip;