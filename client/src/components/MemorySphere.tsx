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

  const blendVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 2, ease: "easeInOut" }, // Long, smooth blend
        scale: { duration: autoPlayInterval / 1000, ease: "linear" } // Subtle movement
      }
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 1,
      transition: {
        opacity: { duration: 2, ease: "easeInOut" }
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      
      {/* The Glass Orb Shell */}
      <div 
        className="relative z-50 rounded-full border border-white/10 bg-black/60 backdrop-blur-[2px] overflow-hidden flex items-center justify-center"
        style={{
          width: radius * 2,
          height: radius * 2,
          boxShadow: `
            inset 0 0 60px rgba(255, 255, 255, 0.1),
            inset 20px 0 80px rgba(255, 0, 255, 0.1),
            inset -20px 0 80px rgba(0, 255, 255, 0.1),
            0 0 50px rgba(0, 255, 255, 0.15),
            0 0 100px rgba(0, 0, 0, 0.8)
          `
        }}
      >
        {/* Shine/Reflection on the glass */}
        <div className="absolute top-0 left-0 w-full h-full z-20 rounded-full pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
        
        {/* Slideshow Content */}
        {/* We use a radial mask to blend the edges of the images into the sphere's darkness */}
        <div className="w-full h-full relative z-10 mask-image:radial-gradient(circle, black 60%, transparent 95%)">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              variants={blendVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <img 
                src={images[currentIndex]} 
                alt={`Memory ${currentIndex}`} 
                className="w-full h-full object-cover opacity-90 mix-blend-screen" 
              />
              
              {/* Overlay to unify colors */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-purple-900/30 mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Scanline/Hologram texture overlay on top of everything */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_3px] opacity-30" />
      </div>

      {/* Pedestal / Base Glow */}
      <div 
        className="absolute w-[300px] h-[40px] bg-primary/20 blur-[60px] rounded-full"
        style={{ top: 'calc(50% + ' + radius + 'px)', transform: 'translateY(-50%) scaleX(1.5)' }}
      />
    </div>
  );
}
