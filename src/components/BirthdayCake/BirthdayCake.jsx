import React, { Suspense, useRef } from 'react'; // Removed useState, useMemo
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import styles from './BirthdayCake.module.css';
import { useBirthdayCake } from '../../context/BirthdayCakeContext'; // Import the context hook

// --- 3D Candle Component (Keep as is) ---
function Candle3D({ id, position, isBlown, onBlow }) {
  const candleHeight = 0.8;
  const flameHeight = 0.3;
  const candleRadius = 0.08;
  const flameRef = useRef();
  const initialFlameY = candleHeight / 2 + flameHeight / 2 + 0.05;

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isBlown) {
      onBlow(id);
    }
  };

  useFrame(({ clock }) => {
    if (flameRef.current) {
      const time = clock.getElapsedTime();
      const flickerSpeed1 = 6;
      const flickerAmplitude1 = 0.2;
      const flickerSpeed2 = 4;
      const flickerAmplitude2 = 0.1;
      const pulseY = 1 + Math.sin(time * flickerSpeed1) * flickerAmplitude1 + Math.sin(time * flickerSpeed2) * flickerAmplitude2;
      flameRef.current.scale.y = pulseY;
      flameRef.current.scale.x = 1 + (pulseY - 1) * 0.5;
      flameRef.current.scale.z = 1 + (pulseY - 1) * 0.5;
      const verticalBobSpeed = 3;
      const verticalBobAmplitude = 0.03;
      flameRef.current.position.y = initialFlameY + Math.sin(time * verticalBobSpeed) * verticalBobAmplitude;
      const intensitySpeed = 5;
      const intensityAmplitude = 0.7;
      const baseIntensity = 1.8;
      flameRef.current.material.emissiveIntensity = baseIntensity + Math.sin(time * intensitySpeed) * intensityAmplitude;
      const swaySpeed = 2;
      const swayAmplitude = 0.01;
      flameRef.current.position.x = Math.sin(time * swaySpeed) * swayAmplitude;
    }
  });

  return (
    <group position={position} onClick={handleClick}>
      <mesh>
        <cylinderGeometry args={[candleRadius, candleRadius, candleHeight, 16]} />
        <meshStandardMaterial color="#FFDAE0" />
      </mesh>
      <mesh position={[0, candleHeight / 2 + 0.02, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {!isBlown && (
        <mesh
          ref={flameRef}
          position={[0, initialFlameY, 0]}
        >
          <coneGeometry args={[candleRadius * 0.8, flameHeight, 8]} />
          <meshStandardMaterial
            color="#FFA500"
            emissive="#FFBF00"
            emissiveIntensity={1.8}
            transparent
            opacity={0.85}
          />
        </mesh>
      )}
    </group>
  );
}

// --- 3D Cake Component (Keep mostly as is, receives props from parent) ---
function Cake3D({ candlePositions, blownCandles, handleBlowCandle }) {
  const bottomTierRadius = 2.5;
  const bottomTierHeight = 1;
  const topTierRadius = 1.8;
  const topTierHeight = 0.8;
  const plateRadius = 3;
  const plateHeight = 0.2;

  return (
    <group>
      <mesh position={[0, -plateHeight / 2, 0]}>
        <cylinderGeometry args={[plateRadius, plateRadius, plateHeight, 64]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0, bottomTierHeight / 2, 0]}>
        <cylinderGeometry args={[bottomTierRadius, bottomTierRadius, bottomTierHeight, 64]} />
        <meshStandardMaterial color="#FFE0E6" metalness={0.1} roughness={0.7} />
      </mesh>
      <mesh position={[0, bottomTierHeight + topTierHeight / 2, 0]}>
        <cylinderGeometry args={[topTierRadius, topTierRadius, topTierHeight, 64]} />
        <meshStandardMaterial color="#F4ACB7" metalness={0.1} roughness={0.7} />
      </mesh>
      <Text
        position={[0, bottomTierHeight + topTierHeight + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.4}
        color="#4A4A4A"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wWw.ttf"
        outlineWidth={0.01}
        outlineColor="#FFFFFF"
        maxWidth={topTierRadius * 1.8}
        textAlign="center"
      >
        Happy Birthday Simzie!
      </Text>
      {candlePositions.map((candle) => (
        <Candle3D
          key={candle.id}
          id={candle.id}
          position={candle.position}
          isBlown={blownCandles.includes(candle.id)}
          onBlow={handleBlowCandle}
        />
      ))}
    </group>
  );
}

// --- Main BirthdayCake Component using Context ---
const BirthdayCake = () => {
  // Get state and functions from context
  const {
    blownCandles,
    wishMade,
    wish,
    setWish,
    showWishInput,
    totalCandles,
    handleBlowCandle,
    handleWishSubmit,
    candlePositions,
  } = useBirthdayCake();

  return (
    <div className={styles.cakeContainer}>
      <h2>Make a Birthday Wish</h2>
      <div className={styles.cakeWrapper} style={{ height: '700px' }}>
        <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 7]} intensity={1} />
          <Suspense fallback={null}>
            <Cake3D
              candlePositions={candlePositions}
              blownCandles={blownCandles}
              handleBlowCandle={handleBlowCandle}
            />
            {!wishMade && blownCandles.length < totalCandles && (
              <Text
                position={[0, 3.75, 0]}
                fontSize={0.3}
                color="#4A4A4A"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wWw.ttf"
              >
                Click candles to blow them out ({blownCandles.length}/{totalCandles})
              </Text>
            )}
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3} />
        </Canvas>

        <div className={styles.instructions}>
          {/* Instructions text moved to 3D Text */}
        </div>

        {showWishInput && !wishMade && (
          <motion.div
            className={styles.wishForm}
            style={{
              position: 'absolute',
              top: '25%',
              left: '25%',
              zIndex: 10
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>All candles are blown out! Make your wish:</h3>
            <form onSubmit={handleWishSubmit}>
              <input
                type="text"
                value={wish}
                onChange={(e) => setWish(e.target.value)} // Use setWish from context
                placeholder="Type your wish here..."
                className={styles.wishInput}
              />
              <button type="submit" className={styles.wishButton}>
                Make Wish
              </button>
            </form>
          </motion.div>
        )}

        {wishMade && (
          <motion.div
            className={styles.celebration}
            style={{
              position: 'absolute',
              top: '30%',
              left: '30%',
              zIndex: 10,
              background: 'rgba(255, 248, 240, 0.95)',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <img
              src="/assets/images/confetti.gif"
              alt="Confetti"
              className={styles.confettiImage}
            />
            <h3 className={styles.celebrationTitle}>Happy 22nd Bday Simzie!</h3>
            <p>Your wish has been made!</p>
            <p className={styles.wishText}>"{wish}"</p>
            <p>May all your dreams come true! ✨</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCake;