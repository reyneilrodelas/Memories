import React from 'react';
import { PhotoSphere } from '@/components/PhotoSphere';

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
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-primary selection:text-white">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* UI Layer */}
      <div className="absolute top-0 left-0 w-full p-8 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
            NEON NEXUS
          </h1>
          <p className="mt-2 text-primary/80 font-rajdhani text-lg tracking-[0.2em] uppercase">
            Immersive Digital Gallery
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs font-mono text-muted-foreground">SYS.STATUS: ONLINE</div>
          <div className="text-xs font-mono text-muted-foreground">RENDER: CSS3D</div>
          <div className="text-xs font-mono text-primary animate-pulse">● LIVE</div>
        </div>
      </div>

      {/* Main 3D Sphere */}
      <div className="absolute inset-0 z-0 pt-20">
        <PhotoSphere images={galleryImages} radius={350} />
      </div>

      {/* Footer UI */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 text-sm font-rajdhani text-white/70 pointer-events-auto hover:bg-white/10 transition-colors cursor-help border-l-primary border-r-secondary border-l-2 border-r-2">
          DRAG TO ROTATE • HOVER TO INSPECT
        </div>
      </div>
    </div>
  );
}
