import React, { useState } from "react";
import { Camera, MapPin, Heart } from "lucide-react";
import { PhotoReelItem } from "../types";
import { motion } from "motion/react";

interface PhotoReelProps {
  photos: PhotoReelItem[];
}

export default function PhotoReel({ photos }: PhotoReelProps) {
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Alternates tilt angles for nice paper polaroid aesthetic
  const getTiltClass = (index: number) => {
    const tilts = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1"];
    return tilts[index % tilts.length];
  };

  return (
    <div className="space-y-6 animate-fade-in" id="photo-reel-section">
      <div className="flex items-center justify-between" id="photo-reel-header">
        <div className="space-y-1 text-left">
          <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
            <Camera className="text-[#ff2a2a]" size={18} />
            <span>A Day in the Life</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            A real-time looking glass into my hobbies, work environments, and coffee habits.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#ff2a2a] text-white px-2.5 py-1 border-2 border-black dark:border-white rounded-full rotate-2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
          REEL SLIDES
        </span>
      </div>

      {/* Horizontal Carousel Container */}
      <div 
        id="photo-reel-tray"
        className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 scrollbar-thin flex-nowrap select-none snap-x"
      >
        {photos.map((photo, index) => {
          const isLiked = likedPhotos[photo.id];
          return (
            <motion.div
              key={photo.id}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                zIndex: 40,
                transition: { type: "spring", stiffness: 300, damping: 15 } 
              }}
              className={`snap-center shrink-0 w-64 sm:w-72 bg-white dark:bg-stone-900 border-2 border-black dark:border-white p-3.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-between transform ${getTiltClass(
                index
              )} transition-all duration-200 hover:shadow-[7px_7px_0px_0px_#ff2a2a] dark:hover:shadow-[7px_7px_0px_0px_#ff2a2a] cursor-pointer`}
            >
              {/* Image Frame with realistic camera ratio */}
              <div className="relative w-full aspect-square bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden group">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                />

                {/* Location Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-md text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 shadow-sm">
                  <MapPin size={8} className="text-[#ff2a2a]" />
                  <span>{photo.location}</span>
                </div>

                {/* Love Button overlay */}
                <button
                  onClick={(e) => toggleLike(photo.id, e)}
                  style={{ background: "transparent" }}
                  className="absolute bottom-2 right-2 border-none cursor-pointer focus:outline-none"
                >
                  <div className={`p-1.5 rounded-full backdrop-blur-md border border-white/25 transition-all shadow-md ${
                    isLiked ? "bg-red-500 scale-110 text-white animate-heart" : "bg-black/80 text-white/80 hover:text-red-400 hover:scale-110"
                  }`}>
                    <Heart size={10} fill={isLiked ? "currentColor" : "none"} />
                  </div>
                </button>
              </div>

              {/* Polaroid bottom caption details */}
              <div className="mt-3.5 space-y-1 text-left">
                <p className="text-[11px] font-sans font-medium text-stone-700 dark:text-stone-300 leading-snug">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-between text-[9px] font-mono font-extrabold text-stone-400 dark:text-stone-500 pt-1.5 border-t border-dotted border-stone-200 dark:border-stone-700">
                  <span>CAPTION REEL ©</span>
                  <span className="text-[#ff2a2a] uppercase tracking-wider">{isLiked ? "LOVED" : "HEART!"}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
