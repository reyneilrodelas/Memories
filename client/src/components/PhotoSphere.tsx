import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoSphereProps {
  images: string[];
  radius?: number;
}

export function PhotoSphere({ images, radius = 300 }: PhotoSphereProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Fibonacci Sphere Algorithm to distribute points evenly
  const points = images.map((img, i) => {
    const k = i;
    const n = images.length;
    
    // Golden angle in radians
    const phi = Math.acos(-1 + (2 * k) / n);
    const theta = Math.sqrt(n * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    return { x, y, z, img, id: i };
  });

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="scene w-full h-full flex items-center justify-center cursor-move perspective-[1000px]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {/* User Interaction Layer */}
      <motion.div 
        className="w-0 h-0 relative transform-style-3d"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
      >
        {/* Auto Rotation Layer */}
        <div 
          className="w-0 h-0 relative transform-style-3d animate-[rotate_60s_linear_infinite]"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {points.map((point) => (
            <div
              key={point.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backface-hidden group"
              style={{
                transform: `translate3d(${point.x}px, ${point.y}px, ${point.z}px) rotateY(${Math.atan2(point.x, point.z)}rad) rotateX(${-Math.asin(point.y / radius)}rad)`,
              }}
            >
              <div className="relative w-32 h-20 md:w-48 md:h-28 bg-black/80 border border-primary/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-300 group-hover:scale-150 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] group-hover:z-50">
                <img 
                  src={point.img} 
                  alt="Gallery Item" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-[10px] md:text-xs font-rajdhani text-primary font-bold tracking-widest uppercase">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
