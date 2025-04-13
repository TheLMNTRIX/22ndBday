import React from 'react';
import { motion } from 'framer-motion';
import styles from './BirthdayCake.module.css';

const Candle = ({ id, style, isBlown, onBlow }) => {
  return (
    <div className={styles.candleWrapper} style={style}>
      <div className={styles.candle} onClick={onBlow}>
        {!isBlown && (
          <motion.div 
            className={styles.flame}
            animate={{ 
              scaleY: [0.8, 1.2, 0.9, 1.1, 0.8],
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <motion.div 
              className={styles.innerFlame}
              animate={{ 
                scaleY: [0.9, 1.3, 1, 1.2, 0.9],
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          </motion.div>
        )}
        <div className={styles.candleStick} />
      </div>
    </div>
  );
};

export default Candle;