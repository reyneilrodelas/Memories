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
  img1, img2, img3, img4, img5, img6, img7, img8
];

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="relative w-full h-full max-w-4xl max-h-[800px] flex items-center justify-center">
          <MemorySphere images={galleryImages} radius={250} autoPlaySpeed={0.3} />
        </div>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex flex-col items-center pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
          ORB_MEMORY
        </h1>
        <p className="text-xs font-mono text-cyan-500/60 mt-2 tracking-[0.5em]">CONTAINMENT FIELD ACTIVE</p>
      </div>
    </div>
  );
}
