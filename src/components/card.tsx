"use client";
import React from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface CardProps {
  i: number;
  src: string;
  range: [number, number];
  targetScale: number;
  progress: number;
}

const Card = ({ i, src, range, targetScale, progress }: CardProps) => {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const progressMotion = useTransform(scrollYProgress, range, [0, 1]);
  const scale = useTransform(progressMotion, range, [1, targetScale]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const cardStart = i * window.innerHeight * 0.25;
      const cardEnd = (i + 0.5) * window.innerHeight * 0.25;
      const nextCardStart = (i + 1) * window.innerHeight * 0.25;
      const isLastCard = i === 4; // Since we have 5 cards (0-4)

      // Stop video when:
      // 1. Scrolling past current card's end
      // 2. Scrolling to next card (if not last card)
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
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        onClick={handleClick}
      >
        <div className="aspect-[3/4] relative">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-cover"
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
