// filepath: src/pages/ReasonsILoveYou.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reasonsData from '../../data/reasonsData';
import styles from './ReasonsILoveYou.module.css';

// Define multiple Text Reveal animations
const textRevealAnimations = [
  { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } },
  { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.4, ease: 'easeOut' } },
  { initial: { opacity: 0, rotateY: 90 }, animate: { opacity: 1, rotateY: 0 }, transition: { duration: 0.6 } },
  { initial: { filter: 'blur(10px)', opacity: 0 }, animate: { filter: 'blur(0px)', opacity: 1 }, transition: { duration: 0.5 } },
  { initial: { clipPath: 'inset(0 100% 0 0)' }, animate: { clipPath: 'inset(0 0% 0 0)' }, transition: { duration: 0.7, ease: 'easeInOut' } },
];

// Define Ribbon Unwrap Animations
const ribbonUnwrapAnimations = [
  { exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5, ease: 'easeOut' } } },
  { exit: { y: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } } },
  { exit: { scaleX: 0, transformOrigin: 'center', transition: { duration: 0.4, ease: 'easeIn' } } },
  { exit: { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', transition: { duration: 0.5, ease: 'circOut' } } },
  { exit: { filter: 'blur(10px)', opacity: 0, transition: { duration: 0.5 } } },
  { exit: { rotate: 90, scale: 0, transition: { duration: 0.6, ease: 'backInOut' } } },
];

// Define Gift Wrap Style Classes
const giftWrapClasses = [
  styles.giftWrap1, styles.giftWrap2, styles.giftWrap3,
  styles.giftWrap4, styles.giftWrap5, styles.giftWrap6
];

// Fisher-Yates (Knuth) Shuffle function
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Function to get random element from an array (keep for fallback if needed, but not used for assignment)
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// --- Component Definition ---
const ReasonsILoveYou = () => {
  const [revealedReasons, setRevealedReasons] = useState(new Set());
  const [reasonVisuals, setReasonVisuals] = useState({});

  useEffect(() => {
    // Create shuffled copies of the arrays to ensure variety
    const shuffledGiftWraps = shuffleArray([...giftWrapClasses]);
    const shuffledRibbonAnimations = shuffleArray([...ribbonUnwrapAnimations]);
    const shuffledTextAnimations = shuffleArray([...textRevealAnimations]);

    const visuals = {};
    reasonsData.forEach((reason, index) => {
      visuals[reason.id] = {
        // Assign cyclically using modulo operator
        giftWrapClass: shuffledGiftWraps[index % shuffledGiftWraps.length],
        ribbonUnwrapAnimation: shuffledRibbonAnimations[index % shuffledRibbonAnimations.length],
        textRevealAnimation: shuffledTextAnimations[index % shuffledTextAnimations.length],
      };
    });
    setReasonVisuals(visuals);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleReveal = (id) => {
    setRevealedReasons(prev => new Set(prev).add(id));
  };

  const cardAppearVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const defaultVisuals = {
    giftWrapClass: giftWrapClasses[0],
    ribbonUnwrapAnimation: ribbonUnwrapAnimations[0],
    textRevealAnimation: textRevealAnimations[0],
  };

  return (
    <motion.div
      className={styles.reasonsContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        22 Reasons Why I Love You
      </motion.h2>
      <motion.p
        className={styles.intro}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Each card holds a special reason... Click the ribbon to unwrap them.
      </motion.p>

      <ul className={styles.reasonsList}>
        {reasonsData.map((reason, index) => {
          const isRevealed = revealedReasons.has(reason.id);
          const visuals = reasonVisuals[reason.id] || defaultVisuals;
          const unwrapDuration = visuals.ribbonUnwrapAnimation.exit.transition?.duration || 0.5;

          return (
            <motion.li
              key={reason.id}
              className={`${styles.reasonItem}`}
              custom={index}
              variants={cardAppearVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              layout
            >
              <AnimatePresence initial={false}>
                {!isRevealed && (
                  <motion.div
                    key="ribbon"
                    className={`${styles.ribbonOverlay} ${visuals.giftWrapClass}`}
                    initial={{ opacity: 1 }}
                    exit={visuals.ribbonUnwrapAnimation.exit}
                    transition={visuals.ribbonUnwrapAnimation.exit.transition || { duration: 0.5 }}
                    onClick={() => handleReveal(reason.id)}
                  >
                    {/* Ribbon visuals are now applied via giftWrapClass background + ::before/::after pseudo-elements */}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className={styles.cardContentWrapper}
                initial={false}
                animate={{ opacity: 1 }}
              >
                <span className={styles.reasonNumber}>{reason.id}</span>
                <div className={styles.reasonContent}>
                  <AnimatePresence mode="wait">
                    {isRevealed && (
                      <motion.p
                        key={`text-${reason.id}`}
                        className={styles.reasonText}
                        initial={visuals.textRevealAnimation.initial}
                        animate={visuals.textRevealAnimation.animate}
                        transition={{ ...visuals.textRevealAnimation.transition, delay: 0.1 }}
                      >
                        {reason.text}
                      </motion.p>
                    )}
                    {!isRevealed && (
                      <div className={styles.placeholderText}></div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default ReasonsILoveYou;