import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemorySphereProps {
  images: string[];
  radius?: number;
  autoPlayInterval?: number;
}

export function MemorySphere({ images, radius = 300, autoPlayInterval = 3000 }: MemorySphereProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      
      {/* The Glass Orb Shell */}
      <div 
        className="relative z-50 rounded-full border border-white/20 bg-black/40 backdrop-blur-[4px] overflow-hidden flex items-center justify-center"
        style={{
          width: radius * 2,
          height: radius * 2,
          boxShadow: `
            inset 0 0 60px rgba(255, 255, 255, 0.1),
            inset 20px 0 80px rgba(255, 0, 255, 0.2),
            inset -20px 0 80px rgba(0, 255, 255, 0.2),
            0 0 50px rgba(0, 255, 255, 0.2),
            0 0 100px rgba(0, 0, 0, 0.5)
          `
        }}
      >
        {/* Shine/Reflection on the glass */}
        <div className="absolute top-0 left-0 w-full h-full z-20 rounded-full pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full z-20 rounded-full pointer-events-none bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.05)_0%,transparent_50%)]" />

        {/* Slideshow Content */}
        <div className="w-[90%] h-[90%] rounded-full overflow-hidden relative z-10 mask-image:radial-gradient(circle, black 80%, transparent 100%)">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={images[currentIndex]} 
                alt={`Memory ${currentIndex}`} 
                className="w-full h-full object-cover"
              />
              
              {/* Holographic Scanlines Overlay on the image itself */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Orb Surface Glitch/UI Elements */}
        <div className="absolute inset-0 z-30 pointer-events-none border-[1px] border-white/10 rounded-full opacity-50" />
      </div>

      {/* Pedestal / Base Glow */}
      <div 
        className="absolute w-[300px] h-[40px] bg-primary/30 blur-[50px] rounded-full"
        style={{ top: 'calc(50% + ' + radius + 'px)', transform: 'translateY(-50%) scaleX(1.5)' }}
      />
    </div>
  );
}
