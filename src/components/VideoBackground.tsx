"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface VideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  overlayOpacity?: string;
  children?: React.ReactNode;
}

export default function VideoBackground({
  videoSrc,
  posterSrc = "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1920&auto=format&fit=crop",
  overlayOpacity = "bg-[#101828]/80",
  children,
}: VideoBackgroundProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-float-slow"
          />
        ) : (
          /* High-Impact Ambient Motion & Responsive SVG Pattern */
          <div className="w-full h-full relative">
            <div className="block md:hidden absolute inset-0 w-full h-full bg-pamtech-mobile opacity-45 scale-105" />
            <div className="hidden md:block absolute inset-0 w-full h-full bg-pamtech-desktop opacity-40 scale-105" />
            {posterSrc && (
              <div
                className="w-full h-full bg-cover bg-center opacity-70 mix-blend-overlay"
                style={{ backgroundImage: `url(${posterSrc})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#101828]/80 via-[#460809]/60 to-[#162456]/80 mix-blend-multiply" />
          </div>
        )}

        {/* Deep Gradient & Vignette Overlay */}
        <div className={`absolute inset-0 ${overlayOpacity} backdrop-blur-[2px]`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-[#101828]/60" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-11/12 max-w-7xl mx-auto py-24 sm:py-32">
        {children}
      </div>

      {/* Floating Ambient Controls */}
      {videoSrc && (
        <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full p-1.5 border border-white/10 text-white">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
