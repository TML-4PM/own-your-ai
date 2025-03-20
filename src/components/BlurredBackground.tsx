
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BlurredBackgroundProps {
  className?: string;
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ className }) => {
  const blobsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!blobsRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const blobs = blobsRef.current?.children;
      
      if (!blobs) return;
      
      // Move blobs slightly based on mouse position for a subtle parallax effect
      Array.from(blobs).forEach((blob, index) => {
        const htmlBlob = blob as HTMLElement;
        const speed = 0.03 - (index * 0.01); // Each blob moves at a different speed
        
        const moveX = (clientX - window.innerWidth / 2) * speed;
        const moveY = (clientY - window.innerHeight / 2) * speed;
        
        htmlBlob.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + Math.abs(moveX) * 0.0003})`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className={cn("absolute inset-0 subtle-pattern noise opacity-30", className)} />
      
      {/* Animated gradient blobs */}
      <div ref={blobsRef} className="absolute inset-0">
        <div className="absolute top-[-10%] left-[10%] w-[30vw] h-[30vw] bg-primary/20 rounded-full filter blur-3xl animate-float opacity-50 transition-transform duration-700 ease-out" />
        <div className="absolute top-[40%] right-[-5%] w-[25vw] h-[25vw] bg-blue-400/20 rounded-full filter blur-3xl animate-float opacity-40 transition-transform duration-700 ease-out" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-[-5%] left-[30%] w-[20vw] h-[20vw] bg-violet-400/20 rounded-full filter blur-3xl animate-float opacity-30 transition-transform duration-700 ease-out" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[20%] left-[60%] w-[15vw] h-[15vw] bg-cyan-400/20 rounded-full filter blur-3xl animate-float opacity-20 transition-transform duration-700 ease-out" style={{ animationDelay: '-3s' }} />
      </div>
      
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/src/assets/patterns/grid.svg)",
          backgroundSize: "100px 100px"
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-blue-400/5 to-transparent opacity-30" />
    </div>
  );
};

export default BlurredBackground;
