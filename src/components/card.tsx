"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Interface defining the props for the Card component
interface CardProps {
  i: number; // Index of the card in the sequence
  src: string; // Video source URL
  range: [number, number]; // Scroll range for animations
  targetScale: number; // Target scale for the card animation
  progress: number; // Scroll progress value
}

const Card = ({ i, src, range, targetScale, progress }: CardProps) => {
  // Refs for container and video element
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile and update on window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll animation setup using Framer Motion
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Transform values for animations
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]); // Scale from 2x to 1x
  const progressMotion = useTransform(scrollYProgress, range, [0, 1]);
  const scale = useTransform(progressMotion, range, [1, targetScale]);

  // Handle video playback based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const cardStart = i * window.innerHeight * 0.25;
      const cardEnd = (i + 0.5) * window.innerHeight * 0.25;
      const nextCardStart = (i + 1) * window.innerHeight * 0.25;
      const isLastCard = i === 4;

      // Stop video when:
      // 1. Scrolling past current card
      // 2. Scrolling to next card
      // 3. Scrolling up past current card (for last card)
      if (
        scrollY > cardEnd ||
        (!isLastCard && scrollY > nextCardStart) ||
        (isLastCard && scrollY < cardStart)
      ) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [i]);

  // Toggle video playback on click
  const handleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      ref={container}
      className="cardContainer h-screen flex items-center justify-center sticky top-0 px-5"
    >
      <motion.div
        className="card relative w-[400px] rounded-3xl overflow-hidden cursor-pointer bg-black"
        style={{
          scale: isMobile ? 1 : scale, // Disable scale animation on mobile
          top: isMobile ? 0 : `calc(-5vh + ${i * 25}px)`, // Disable top offset on mobile
        }}
        onClick={handleClick}
      >
        <div className="aspect-[3/4] relative">
          <motion.div
            style={{ scale: isMobile ? 1 : imageScale }} // Disable image scale on mobile
            className="w-full h-full"
          >
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-contain"
              loop
              playsInline
              onLoadedData={() => setIsLoaded(true)}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
