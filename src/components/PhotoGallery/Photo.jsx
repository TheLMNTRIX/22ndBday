"use client"
import { motion } from "framer-motion"
import styles from "./PhotoGallery.module.css"

const Photo = ({ photo, style, onClick }) => {
  return (
    <motion.div
      className={styles.collageImageWrapper}
      style={{
        ...style,
        willChange: "transform", // Hint to browser to optimize for transforms
        backfaceVisibility: "hidden", // Helps with hardware acceleration
      }}
      // Reduced scale and simplified animation
      whileHover={{
        scale: 1.2, // Reduced from 1.6 to be less intensive
        // Use transform for shadows instead of boxShadow for better performance
        y: -5, // Slight lift effect instead of large scale
      }}
      // Optimized transition
      transition={{
        type: "tween", // Using tween instead of spring for more predictable performance
        duration: 0.2, // Short, quick transition
        ease: "easeOut", // Smooth easing
      }}
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.url || "/placeholder.svg"}
        alt={photo.alt}
        className={styles.collageImage}
        loading="lazy"
        style={{
          transform: "translateZ(0)", // Force hardware acceleration
        }}
        onError={(e) => {
          console.error(`Failed to load image: ${photo.url}`)
          e.target.style.display = "none"
        }}
      />
    </motion.div>
  )
}

export default Photo
