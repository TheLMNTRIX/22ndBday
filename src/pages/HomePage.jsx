import React from 'react'; // Removed useState, useEffect
import Layout from '../components/Layout/Layout';
import Countdown from '../components/Countdown/Countdown';
import BirthdayCake from '../components/BirthdayCake/BirthdayCake';
import styles from './HomePage.module.css';
import { useBirthdayCake } from '../context/BirthdayCakeContext'; // Import context hook

const HomePage = () => {
  // Get countdown state and handler from context
  const { isCountdownComplete, handleCountdownComplete } = useBirthdayCake();

  // Removed local state and useEffect for initial check (now handled in context)

  return (
    // Layout now gets state from context internally
    <Layout>
      {/* Conditionally render the hero section based on context state */}
      {isCountdownComplete && (
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Happy 22nd Birthday!</h1>
          <h2 className={styles.heroSubtitle}>Celebrating 5 Amazing Years Together</h2>
        </div>
      )}

      <div className={styles.countdownSection}>
        {/* Pass the context handler to the Countdown component */}
        <Countdown onCountdownComplete={handleCountdownComplete} />
      </div>

      {/* Conditionally render the cake and message sections based on context state */}
      {isCountdownComplete && (
        <>
          <div className={styles.cakeSection}>
            <BirthdayCake />
          </div>

          <div className={styles.messageSection}>
            <div className={styles.message}>
              <h3>My Dearest Simzie,</h3>
              <p>
                Happy 22nd birthday to the most wonderful person I know. These past 5 years have been
                the most beautiful journey of my life, and I'm so grateful we get to celebrate another
                year together. I know you have been very busy these days with studies and preperations,
                but this day is for you, i want you to turn your head off for one day, relax, enjoy and
                make this day a very memorable day. Lets have some fun shall we. I wanted to do much more
                than this but didnt have too much time and no money either XD. Anyway enjoy this webpage.
                Hopefully we look back at this and remember all the fun we had someday in the future. 
                I LOVE YOU A LOT SIMRAN!!!
              </p>
              <p>
                Enjoy our timeline (I didnt remember the exact dates, SORRY!!), look at some of our photos in the gallery, and see the 22 reasons
                why you mean the world to me. I hope this birthday is as special as you are.
              </p>
              <p className={styles.signature}>With all my love, Roh</p>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;