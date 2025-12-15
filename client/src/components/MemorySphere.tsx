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
        ENHANCED REALISTIC SPHERE
        To make the photo look "inside", we need to simulate:
        1. Refraction (Distortion at edges)
        2. Depth (Separation between glass surface and image)
        3. Internal Reflection (Light bouncing inside)
        4. Chromatic Aberration (Subtle color fringing)
      */}
      
      <div 
        className="relative z-50 rounded-full flex items-center justify-center"
        style={{
          width: radius * 2,
          height: radius * 2,
          filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))' 
        }}
      >
        {/* Layer 0: Deep Space Black backing */}
        <div className="absolute inset-0 rounded-full bg-black z-0" />

        {/* Layer 1: Internal Light Scatter (The "Glow" of the memory inside the glass) */}
        {/* We use a blurred version of the current image behind the main one to simulate light filling the volume */}
        <div className="absolute inset-0 rounded-full z-10 overflow-hidden opacity-40">
           <AnimatePresence mode="wait">
            <motion.div
              key={`blur-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={images[currentIndex]} 
                alt="" 
                className="w-full h-full object-cover scale-150 blur-xl saturate-200"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layer 2: The Main Image (The Memory) */}
        {/* Simulating "Inset" depth with padding and shadow */}
        <div className="absolute inset-[4px] rounded-full overflow-hidden z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
              animate={{ opacity: 1, scale: 1.05, filter: 'blur(0px)' }} // Scale > 1 to hide edges
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={images[currentIndex]} 
                alt={`Memory ${currentIndex}`} 
                className="w-full h-full object-cover"
              />
              {/* Fisheye Vignette: Darkens edges heavily to fake curvature */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_95%,black_100%)]" />
              
              {/* Scanline Texture on the image itself */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_3px,3px_100%] z-10 pointer-events-none mix-blend-overlay opacity-50" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layer 3: Glass Volume Shadows (The "Thick Glass" look) */}
        {/* Strong inset shadow to simulate the glass being thick and curving away */}
        <div className="absolute inset-0 z-30 rounded-full pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,1)]" />

        {/* Layer 4: Front Surface Reflections (The "Shiny" look) */}
        
        {/* Top-Right Soft Reflection (Window light) */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] z-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_60%)] blur-md pointer-events-none" />
        
        {/* Bottom-Left Caustic Reflection (Internal bounce) */}
        <div className="absolute bottom-[5%] left-[10%] w-[50%] h-[30%] z-40 rounded-full bg-gradient-to-tr from-cyan-500/10 to-transparent blur-xl rotate-45 pointer-events-none" />

        {/* Specular Highlight (The Sun/Light Source) */}
        <div className="absolute top-[18%] left-[22%] w-[40px] h-[20px] z-50 rounded-[50%] bg-white blur-[2px] opacity-90 rotate-[-45deg] pointer-events-none mix-blend-overlay shadow-[0_0_10px_white]" />
        
        {/* Glass Edge Definition (Fresnel) */}
        <div className="absolute inset-0 z-50 rounded-full pointer-events-none border-[1px] border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]" />

      </div>

      {/* External Glow / Ambience */}
      <div 
        className="absolute w-[90%] h-[80%] bg-primary/10 blur-[100px] rounded-full z-0 animate-pulse"
      />
    </div>
  );
}
