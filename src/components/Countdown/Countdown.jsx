import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Countdown.module.css';
import DigitFlip from './DigitFlip'; // Import the new component
import { useBirthdayCake } from '../../context/BirthdayCakeContext'; // Import the context hook

// Helper to pad numbers and split into digits
const formatTimeUnit = (value) => {
  return String(value).padStart(2, '0').split('');
};

// Helper to get random digit
const getRandomDigit = () => Math.floor(Math.random() * 10);

// Add onCountdownComplete prop
const Countdown = ({ onCountdownComplete }) => {
  // Get targetDate from context
  const { targetDate } = useBirthdayCake();

  const [isRandomFlipping, setIsRandomFlipping] = useState(false);
  const [isShowingZeros, setIsShowingZeros] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const randomFlipTimeoutRef = useRef(null);
  const randomFlipIntervalRef = useRef(null);
  const celebrationTimerRef = useRef(null);

  const calculateTimeLeft = (isCurrentlyExpired = false) => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      const justExpired = !isCurrentlyExpired;
      return {
        days: 0, hours: 0, minutes: 0, seconds: 0,
        isExpired: true,
        hasJustExpired: justExpired
      };
    }

    const timeLeftResult = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
      hasJustExpired: false
    };
    return timeLeftResult;
  };

  const initialTimeLeft = useMemo(() => calculateTimeLeft(), [targetDate]);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [previousTimeLeft, setPreviousTimeLeft] = useState(initialTimeLeft);
  const [randomDigits, setRandomDigits] = useState({
    days: ['0', '0'], hours: ['0', '0'], minutes: ['0', '0'], seconds: ['0', '0']
  });

  const startRandomFlipSequence = () => {
    if (isRandomFlipping || isShowingZeros || showCelebration) return;
    setIsRandomFlipping(true);

    randomFlipIntervalRef.current = setInterval(() => {
      setRandomDigits({
        days: [getRandomDigit(), getRandomDigit()],
        hours: [getRandomDigit(), getRandomDigit()],
        minutes: [getRandomDigit(), getRandomDigit()],
        seconds: [getRandomDigit(), getRandomDigit()],
      });
    }, 80);

    randomFlipTimeoutRef.current = setTimeout(() => {
      clearInterval(randomFlipIntervalRef.current);
      setPreviousTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, hasJustExpired: false });
      setIsRandomFlipping(false);
      setIsShowingZeros(true);
    }, 1500);
  };

  useEffect(() => {
    if (isShowingZeros) {
      celebrationTimerRef.current = setTimeout(() => {
        setShowCelebration(true);
        setIsShowingZeros(false);
        // Call the callback when celebration starts
        if (onCountdownComplete) {
          onCountdownComplete();
        }
      }, 1000);
      return () => {
        clearTimeout(celebrationTimerRef.current);
      }
    }
  }, [isShowingZeros, onCountdownComplete]); // Add onCountdownComplete dependency

  useEffect(() => {
    if (!initialTimeLeft.isExpired) {
        setIsShowingZeros(false);
        setIsRandomFlipping(false);
        setShowCelebration(false);
        // Also reset timeLeft and previousTimeLeft to the new initialTimeLeft
        setTimeLeft(initialTimeLeft);
        setPreviousTimeLeft(initialTimeLeft);
    }

    if (initialTimeLeft.isExpired && !showCelebration && !isShowingZeros && !isRandomFlipping) {
      startRandomFlipSequence();
      return;
    }

    if (isShowingZeros || showCelebration || isRandomFlipping) {
      return; // Stop interval if in any of the final/transitional states
    }

    const timer = setInterval(() => {
      setTimeLeft(currentTime => {
        setPreviousTimeLeft(currentTime);
        const newTime = calculateTimeLeft(currentTime.isExpired);

        if (newTime.hasJustExpired) {
          startRandomFlipSequence();
          return currentTime;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(randomFlipIntervalRef.current);
      clearTimeout(randomFlipTimeoutRef.current);
      clearTimeout(celebrationTimerRef.current);
    };
  }, [initialTimeLeft]); // Keep dependencies minimal to avoid re-running unnecessarily

  // Prepare digits for rendering
  const formatDigits = (unitValue) => formatTimeUnit(unitValue);

  // Determine 'from' and 'to' digits based on the current state
  let fromDays, fromHours, fromMinutes, fromSeconds;
  let displayDays, displayHours, displayMinutes, displaySeconds;

  if (isRandomFlipping) {
    fromDays = randomDigits.days;
    fromHours = randomDigits.hours;
    fromMinutes = randomDigits.minutes;
    fromSeconds = randomDigits.seconds;
    displayDays = randomDigits.days;
    displayHours = randomDigits.hours;
    displayMinutes = randomDigits.minutes;
    displaySeconds = randomDigits.seconds;
  } else {
    fromDays = formatDigits(previousTimeLeft.days);
    fromHours = formatDigits(previousTimeLeft.hours);
    fromMinutes = formatDigits(previousTimeLeft.minutes);
    fromSeconds = formatDigits(previousTimeLeft.seconds);
    displayDays = formatDigits(timeLeft.days);
    displayHours = formatDigits(timeLeft.hours);
    displayMinutes = formatDigits(timeLeft.minutes);
    displaySeconds = formatDigits(timeLeft.seconds);
  }

  // Render Countdown or Celebration
  if (showCelebration) {
    return (
      <motion.div
        className={styles.celebration}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/assets/images/confetti.gif"
          alt="Confetti"
          className={styles.confettiImage}
        />
        <h1>Happy Birthday Cutie Pie!</h1>
        <div className={styles.celebrationText}>
          <p>Today is all about celebrating you and the amazing person you are!</p>
        </div>
      </motion.div>
    );
  }

  // Render the countdown (handles normal, random flip, and showing zeros states)
  return (
    <div className={styles.countdownContainer}>
      <h2>Counting Down to Your Special Day</h2>
      <div className={styles.countdownWrapper}>
        {/* Days */}
        <div className={styles.countdownUnit}>
          <div className={styles.digitPair}>
            <DigitFlip currentDigit={fromDays[0]} nextDigit={displayDays[0]} />
            <DigitFlip currentDigit={fromDays[1]} nextDigit={displayDays[1]} />
          </div>
          <div className={styles.countdownLabel}>Days</div>
        </div>
        <div className={styles.separator}>:</div>

        {/* Hours */}
        <div className={styles.countdownUnit}>
          <div className={styles.digitPair}>
            <DigitFlip currentDigit={fromHours[0]} nextDigit={displayHours[0]} />
            <DigitFlip currentDigit={fromHours[1]} nextDigit={displayHours[1]} />
          </div>
          <div className={styles.countdownLabel}>Hours</div>
        </div>
        <div className={styles.separator}>:</div>

        {/* Minutes */}
        <div className={styles.countdownUnit}>
          <div className={styles.digitPair}>
            <DigitFlip currentDigit={fromMinutes[0]} nextDigit={displayMinutes[0]} />
            <DigitFlip currentDigit={fromMinutes[1]} nextDigit={displayMinutes[1]} />
          </div>
          <div className={styles.countdownLabel}>Minutes</div>
        </div>
        <div className={styles.separator}>:</div>

        {/* Seconds */}
        <div className={styles.countdownUnit}>
          <div className={styles.digitPair}>
            <DigitFlip currentDigit={fromSeconds[0]} nextDigit={displaySeconds[0]} />
            <DigitFlip currentDigit={fromSeconds[1]} nextDigit={displaySeconds[1]} />
          </div>
          <div className={styles.countdownLabel}>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;