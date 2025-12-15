import React, { useState } from 'react';
import { MemorySphere } from '@/components/MemorySphere';
import { motion } from 'framer-motion';

// Import assets
import bgImage from '@assets/generated_images/dark_neon_void_background.png';
import img1 from '@assets/stock_images/img1.jpeg';
import img2 from '@assets/stock_images/img2.jpg';
import img3 from '@assets/stock_images/img3.jpeg';
import img4 from '@assets/stock_images/img4.jpeg';
import img5 from '@assets/stock_images/img5.jpeg';
import img6 from '@assets/stock_images/img6.jpeg';
import img7 from '@assets/stock_images/img7.jpeg';
import img8 from '@assets/stock_images/img8.jpg';
import img9 from '@assets/stock_images/img9.jpeg';
import img10 from '@assets/stock_images/img10.jpeg';
import img11 from '@assets/stock_images/img11.jpeg';
import img12 from '@assets/stock_images/img12.jpeg';
import img13 from '@assets/stock_images/img13.jpeg';
import img14 from '@assets/stock_images/img14.jpeg';
import img15 from '@assets/stock_images/img15.jpeg';
import img16 from '@assets/stock_images/img16.jpg';
import img17 from '@assets/stock_images/img17.jpg';
import img18 from '@assets/stock_images/img18.jpeg';
import img19 from '@assets/stock_images/img19.jpeg';
import img20 from '@assets/stock_images/img20.jpg';
import img21 from '@assets/stock_images/img21.jpg';
import img22 from '@assets/stock_images/img22.jpeg';
import img23 from '@assets/stock_images/img23.jpg';
import img24 from '@assets/stock_images/img24.jpeg';
import img25 from '@assets/stock_images/img25.jpeg';
import img26 from '@assets/stock_images/img26.jpg';
import img27 from '@assets/stock_images/img27.jpeg';
import img28 from '@assets/stock_images/img28.jpg';
import img29 from '@assets/stock_images/img29.jpeg';
import img30 from '@assets/stock_images/img30.jpg';
import img31 from '@assets/stock_images/img31.jpeg';
import img32 from '@assets/stock_images/img32.jpg';
import img33 from '@assets/stock_images/img33.jpeg';
import img34 from '@assets/stock_images/img34.jpeg';
import img35 from '@assets/stock_images/img35.jpeg';
import img36 from '@assets/stock_images/img36.jpg';
import img37 from '@assets/stock_images/img37.jpeg';



// Duplicate images to have enough points on the sphere
const galleryImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37
];

// Floating particles for background animation
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-linear-to-br from-cyan-500/20 to-purple-500/20"
        style={
          {
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }
        }
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-linear-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/50 via-transparent to-black/80" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
      
      {/* Floating Particles */}
      <Particles />

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
          <MemorySphere 
            images={galleryImages} 
            radius={280} 
            onImageChange={setCurrentImageIndex}
          />
        </div>
      </div>

      {/* Header UI */}
      <motion.div 
        className="absolute top-0 left-0 w-full p-8 z-20 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="relative text-5xl md:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          College Memories
          <motion.span 
            className="absolute inset-0 bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 blur-md"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            College Memories
          </motion.span>
        </h1>
        <motion.p 
          className="text-sm font-mono text-cyan-400/70 mt-3 tracking-[0.5em] uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          2022-2026
        </motion.p>
      </motion.div>


      {/* Corner Decorations */}
      <div className="absolute top-8 right-8 z-20 pointer-events-none">
        <motion.div 
          className="w-24 h-24 border-t-2 border-r-2 border-cyan-500/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
        <motion.div 
          className="w-24 h-24 border-b-2 border-l-2 border-purple-500/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
        />
      </div>
    </div>
  );
}
