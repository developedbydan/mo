"use client";

import { useEffect, useRef, useState } from "react";

import { AppConfig } from "@/types/gallery";

import { GalleryApp } from "./GalleryApp";
import VideoModal from "./VideoModal";

interface CircularGalleryProps {
  items?: { image: string; text: string; videoUrl?: string }[];
  bend?: number;
  borderRadius?: number;
}

export default function Gallery({
  items,
  bend = 1,
  borderRadius = 0,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<GalleryApp | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const config: AppConfig = {
      items,
      bend,
      borderRadius,
      onVideoClick: (videoUrl: string) => {
        setSelectedVideo(videoUrl);
        setIsModalOpen(true);
      },
      isModalOpen,
    };

    appRef.current = new GalleryApp(containerRef.current, config);

    return () => {
      if (appRef.current) {
        appRef.current.destroy();
      }
    };
  }, [items, bend, borderRadius, isModalOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {selectedVideo && (
        <VideoModal videoUrl={selectedVideo} onClose={handleModalClose} />
      )}
    </div>
  );
}
