import React from 'react';
import { MemorySphere } from '@/components/MemorySphere';

// Import assets
import bgImage from '@assets/generated_images/dark_neon_void_background.png';
import img1 from '@assets/stock_images/cyberpunk_neon_city__bd633773.jpg';
import img2 from '@assets/stock_images/cyberpunk_neon_city__a875fcfd.jpg';
import img3 from '@assets/stock_images/cyberpunk_neon_city__fb2f223b.jpg';
import img4 from '@assets/stock_images/cyberpunk_neon_city__02e18628.jpg';
import img5 from '@assets/stock_images/cyberpunk_neon_city__74c30b18.jpg';
import img6 from '@assets/stock_images/cyberpunk_neon_city__c18ed190.jpg';
import img7 from '@assets/stock_images/cyberpunk_neon_city__232e9f29.jpg';
import img8 from '@assets/stock_images/cyberpunk_neon_city__1d57f2fd.jpg';

// Duplicate images to have enough points on the sphere
const galleryImages = [
  img1, img2, img3, img4, img5, img6, img7, img8,
  img1, img2, img3, img4, img5, img6, img7, img8,
  img1, img2, img3, img4
];

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 animate-pulse"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Floating Particles/Dust */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-secondary rounded-full animate-ping delay-700" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full blur-md opacity-20 animate-pulse" />
      </div>

      {/* Main 3D Memory Sphere - Immersive Mode */}
      <div className="absolute inset-0 z-10">
        <MemorySphere images={galleryImages} radius={800} autoPlayInterval={4000} />
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-start pointer-events-none">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            MEMORIES
          </h1>
          <p className="mt-2 text-primary/80 font-rajdhani text-lg tracking-[0.2em] uppercase">
            Auto-Replay Sequence
          </p>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-0 w-full z-20 flex justify-center pointer-events-none">
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full origin-left animate-[scaleX_4s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
