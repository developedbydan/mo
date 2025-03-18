import { useEffect } from "react";

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-2.5 md:p-0"
      onClick={onClose}
    >
      <div
        className="relative w-auto h-[85vh] md:h-[90vh] aspect-[9/16] bg-black rounded-sm md:rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-1 right-1 md:top-2 md:right-2 bg-black/50 border border-white/30 md:border-2 rounded-full text-white text-base md:text-lg cursor-pointer p-1 md:p-1 w-7 h-7 md:w-7 md:h-7 flex items-center justify-center transition-all duration-200 hover:bg-black/70 hover:border-white/50 z-[51] leading-none"
        >
          <span className="flex items-center justify-center w-full h-full -mt-0.5">
            ✕
          </span>
        </button>
      </div>
    </div>
  );
}
