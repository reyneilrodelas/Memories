import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemorySphereProps {
  images: string[];
  radius?: number;
  autoPlaySpeed?: number;
}

export function MemorySphere({ images, radius = 300, autoPlaySpeed = 0.2 }: MemorySphereProps) {
  const [rotation, setRotation] = useState(0);

  // Fibonacci Sphere Algorithm for distributing points INSIDE the volume
  // or on the surface of an inner sphere.
  const points = useMemo(() => {
    return images.map((img, i) => {
      const k = i;
      const n = images.length;
      
      const phi = Math.acos(1 - (2 * (k + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (k + 0.5);

      // Reduce radius slightly to fit inside the glass shell
      const r = radius * 0.7; 

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      return { x, y, z, img, id: i, phi, theta };
    });
  }, [images, radius]);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotation(prev => (prev + autoPlaySpeed) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoPlaySpeed]);

  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-[1000px]">
      
      {/* The Glass Orb Shell */}
      <div 
        className="absolute z-50 rounded-full border border-white/20 bg-white/5 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_0_50px_rgba(0,255,255,0.2)]"
        style={{
          width: radius * 2,
          height: radius * 2,
          boxShadow: `
            inset 0 0 60px rgba(255, 255, 255, 0.1),
            inset 20px 0 80px rgba(255, 0, 255, 0.2),
            inset -20px 0 80px rgba(0, 255, 255, 0.2),
            0 0 50px rgba(0, 255, 255, 0.3)
          `
        }}
      >
        {/* Shine/Reflection on the glass */}
        <div className="absolute top-10 left-10 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-xl" />
      </div>

      {/* Inner Rotating Content */}
      <div className="scene w-full h-full flex items-center justify-center transform-style-3d">
        <motion.div 
          className="relative transform-style-3d"
          style={{
            transform: `rotateY(${rotation}deg) rotateX(15deg)`,
          }}
        >
          {points.map((point, i) => {
            return (
              <div
                key={point.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backface-visible"
                style={{
                  transform: `translate3d(${point.x}px, ${point.y}px, ${point.z}px) rotateY(${-rotation}deg)`, // Counter-rotate items to face front? Or let them rotate with sphere?
                  // Let's make them face the viewer always (billboarding) or face center?
                  // User wants "memories inside". Floating cards look cool if they billboard slightly.
                }}
              >
                {/* Billboarding rotation to keep images facing somewhat forward or just rotating with sphere */}
                <div 
                  className="w-24 h-16 md:w-32 md:h-20 relative group transition-all duration-500 hover:scale-150 hover:z-50"
                  style={{
                    transform: `rotateY(${rotation}deg) rotateX(-15deg)` // Invert parent rotation to face viewer
                  }}
                >
                  <div className="w-full h-full rounded-lg overflow-hidden border border-primary/50 bg-black/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <img 
                      src={point.img} 
                      alt="Memory" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  {/* Connecting lines to center - optional/complex */}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Pedestal / Base Glow (Optional, to ground the sphere) */}
      <div 
        className="absolute bottom-1/4 w-[400px] h-[50px] bg-primary/20 blur-[60px] rounded-full transform rotate-x-[80deg]"
        style={{ bottom: 'calc(50% - ' + (radius + 50) + 'px)' }}
      />
    </div>
  );
}
