import React, { createContext, useState, useMemo, useCallback, useContext, useEffect } from 'react';
import * as THREE from 'three';

const BirthdayCakeContext = createContext();

export const useBirthdayCake = () => useContext(BirthdayCakeContext);

export const BirthdayCakeProvider = ({ children }) => {
    const [blownCandles, setBlownCandles] = useState([]);
    const [wishMade, setWishMade] = useState(false);
    const [wish, setWish] = useState('');
    const [showWishInput, setShowWishInput] = useState(false);
    const totalCandles = 22;

    const [isCountdownComplete, setIsCountdownComplete] = useState(false);
    const targetDate = useMemo(() => new Date('2025-04-15T00:00:00'), []);

    useEffect(() => {
        if (new Date() >= targetDate) {
            setIsCountdownComplete(true);
        }
    }, [targetDate]);

    const handleCountdownComplete = useCallback(() => {
        setIsCountdownComplete(true);
    }, []);

    const handleBlowCandle = useCallback((candleId) => {
        if (!blownCandles.includes(candleId)) {
            const blowSound = new Audio('/assets/audio/blow.mp3');
            blowSound.play().catch(error => console.log('Audio play failed:', error));
            setBlownCandles(prev => {
                const newBlownCandles = [...prev, candleId];
                if (newBlownCandles.length === totalCandles) {
                    setTimeout(() => setShowWishInput(true), 1000);
                }
                return newBlownCandles;
            });
        }
    }, [blownCandles]);

    const handleWishSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (wish.trim()) {
            setWishMade(true);
            setShowWishInput(false);
            console.log('Wish made:', wish);
            localStorage.setItem('birthdayWish', wish);

            const formspreeEndpoint = 'https://formspree.io/f/mqapnnjr';

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        message: `Simzie's Birthday Wish: ${wish}`
                    })
                });

                if (response.ok) {
                    console.log('Wish successfully sent via Formspree!');
                } else {
                    console.error('Formspree submission failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error sending wish via Formspree:', error);
            }

            const celebrationSound = new Audio('/assets/audio/celebration.mp3');
            celebrationSound.play().catch(error => console.log('Audio play failed:', error));
        }
    }, [wish]);

    const candlePositions = useMemo(() => {
        const positions = [];
        const topTierY = 1 + 0.8;
        const bottomTierY = 1;
        const topTierCandleRadius = 1.8 * 0.85;
        const bottomTierCandleRadius = 2.5 * 0.9;
        const candleBaseOffset = 0.8 / 2;

        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            positions.push({
                id: i,
                position: new THREE.Vector3(
                    Math.cos(angle) * topTierCandleRadius,
                    topTierY + candleBaseOffset,
                    Math.sin(angle) * topTierCandleRadius
                ),
            });
        }
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            positions.push({
                id: i + 12,
                position: new THREE.Vector3(
                    Math.cos(angle) * bottomTierCandleRadius,
                    bottomTierY + candleBaseOffset,
                    Math.sin(angle) * bottomTierCandleRadius
                ),
            });
        }
        return positions;
    }, []);

    const value = {
        blownCandles,
        wishMade,
        wish,
        setWish,
        showWishInput,
        totalCandles,
        handleBlowCandle,
        handleWishSubmit,
        candlePositions,
        isCountdownComplete,
        handleCountdownComplete,
        targetDate,
    };

    return (
        <BirthdayCakeContext.Provider value={value}>
            {children}
        </BirthdayCakeContext.Provider>
    );
};