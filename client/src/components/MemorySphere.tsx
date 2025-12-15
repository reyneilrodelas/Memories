import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemorySphereProps {
  images: string[];
  radius?: number;
  autoPlayInterval?: number;
}

export function MemorySphere({ images, radius = 300, autoPlayInterval = 4000 }: MemorySphereProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      
      {/* 
        REALISTIC SPHERE CONTAINER 
        We build this up in layers:
        1. Back of sphere (darkness/refraction)
        2. The Image Content (distorted/masked)
        3. Inner Volume Shadows (vignette)
        4. Front Surface Reflections (specular highlights)
        5. Glass Edge/Fresnel (rim light)
      */}
      
      <div 
        className="relative z-50 rounded-full flex items-center justify-center"
        style={{
          width: radius * 2,
          height: radius * 2,
          // Base shadow to ground it
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8))' 
        }}
      >
        {/* Layer 1: Backing/Darkness */}
        <div className="absolute inset-0 rounded-full bg-black shadow-[inset_0_0_50px_rgba(0,0,0,1)] z-0" />

        {/* Layer 2: The Image Display */}
        {/* We use a slightly smaller container for the image to simulate glass thickness */}
        <div className="absolute inset-[2px] rounded-full overflow-hidden z-10 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={images[currentIndex]} 
                alt={`Memory ${currentIndex}`} 
                className="w-full h-full object-cover scale-[1.15]" // Slight overscale to hide edges during rotation simulation
                style={{
                    // Subtle fisheye simulation via scale
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layer 3: Inner Volume & Lens Distortion Simulation */}
        {/* Deep inner shadow to simulate spherical curvature darkening the edges */}
        <div className="absolute inset-0 z-20 rounded-full pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />
        
        {/* Layer 4: Glass Material & Surface Imperfections */}
        {/* Add noise texture for realism */}
        <div className="absolute inset-0 z-30 rounded-full opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Layer 5: Reflections & Specular Highlights (The "Glass" Look) */}
        
        {/* Top-Left Soft Soft Light (Environment Reflection) */}
        <div className="absolute inset-0 z-40 rounded-full pointer-events-none bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
        
        {/* Hard Specular Highlight (The "Hotspot") */}
        <div className="absolute top-[15%] left-[20%] w-[15%] h-[10%] z-40 rounded-[50%] bg-white blur-[8px] opacity-60 rotate-[-45deg] pointer-events-none mix-blend-overlay" />
        
        {/* Secondary Reflection (Bottom Right, bouncing light) */}
        <div className="absolute bottom-[15%] right-[20%] w-[40%] h-[20%] z-40 rounded-[50%] bg-blue-400/20 blur-[20px] rotate-[-45deg] pointer-events-none mix-blend-screen" />

        {/* Rim Light / Fresnel Effect (The Edge of the Glass) */}
        <div className="absolute inset-0 z-50 rounded-full pointer-events-none border-[1px] border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
        
        {/* Caustics / Light refraction at the bottom (Glass lens effect) */}
        <div className="absolute bottom-0 w-full h-1/2 z-30 rounded-b-full bg-gradient-to-t from-white/10 to-transparent opacity-30 pointer-events-none" />

      </div>

      {/* External Pedestal / Ground Reflection */}
      {/* This grounds the object in the scene */}
      <div 
        className="absolute w-[80%] h-[60px] bg-white/5 blur-[40px] rounded-full"
        style={{ top: 'calc(50% + ' + (radius - 20) + 'px)' }}
      />
    </div>
  );
}
