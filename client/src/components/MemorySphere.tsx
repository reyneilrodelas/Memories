import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemorySphereProps {
  images: string[];
  radius?: number;
  autoPlayInterval?: number;
}

export function MemorySphere({ images, radius = 800, autoPlayInterval = 5000 }: MemorySphereProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fibonacci Sphere Algorithm
  const points = useMemo(() => {
    return images.map((img, i) => {
      const k = i;
      const n = images.length;
      
      const phi = Math.acos(1 - (2 * (k + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (k + 0.5);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return { x, y, z, img, id: i, phi, theta };
    });
  }, [images, radius]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % points.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [points.length, autoPlayInterval]);

  // Calculate rotation to face the active point
  // We want the active point to be at (0, 0, -radius) or (0, 0, radius) depending on perspective
  // Let's assume we are INSIDE looking forward (positive Z or negative Z).
  // If we are at 0,0,0, and we want to look at point P, we effectively rotate the WORLD so P comes to center view.
  
  const activePoint = points[activeIndex];
  
  // Rotation to bring point (phi, theta) to front (theta=0, phi=PI/2)
  // This is an approximation using Euler angles. 
  // Ideally we'd use quaternions but CSS uses rotateX/Y.
  
  const rotateY = (-activePoint.theta * 180) / Math.PI - 90;
  const rotateX = (activePoint.phi * 180) / Math.PI - 90;

  return (
    <div className="scene w-full h-full flex items-center justify-center perspective-[800px] overflow-hidden">
      <motion.div 
        className="sphere-container relative transform-style-3d"
        animate={{
          rotateX: -rotateX, // Invert because we rotate the world, not the camera
          rotateY: -rotateY,
          z: 200 // Pull the sphere closer/around us
        }}
        transition={{ 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        {points.map((point, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={point.id}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backface-visible`}
              style={{
                transform: `translate3d(${point.x}px, ${point.y}px, ${point.z}px) rotateY(${point.theta}rad) rotateX(${-point.phi + Math.PI/2}rad)`,
              }}
            >
              <motion.div 
                className={`
                  relative overflow-hidden rounded-xl border border-primary/20 bg-black/50 backdrop-blur-sm
                  ${isActive ? 'z-50 border-primary shadow-[0_0_50px_rgba(255,0,255,0.5)]' : 'opacity-40 grayscale'}
                `}
                animate={{
                  width: isActive ? 400 : 200,
                  height: isActive ? 300 : 150,
                  scale: isActive ? 1.1 : 0.8,
                }}
                transition={{ duration: 1 }}
              >
                <motion.img 
                  src={point.img} 
                  alt="Memory" 
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isActive ? 1.2 : 1, // Ken Burns effect
                  }}
                  transition={{ 
                    duration: autoPlayInterval / 1000, 
                    ease: "linear" 
                  }}
                />
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
                    >
                      <h3 className="text-2xl font-bold text-white mb-1">MEMORY_LOG_{point.id + 1}</h3>
                      <p className="text-primary font-mono text-sm">REPLAYING SEQUENTIAL DATA...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Vignette Overlay for "Inside" feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-50" />
    </div>
  );
}
