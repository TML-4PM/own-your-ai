
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurredBackgroundProps {
  className?: string;
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ className }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className={cn("absolute inset-0 subtle-pattern noise opacity-30", className)} />
      
      {/* Animated gradient blobs */}
      <div className="absolute top-[-10%] left-[10%] w-[30vw] h-[30vw] bg-primary/20 rounded-full filter blur-3xl animate-float opacity-50" />
      <div className="absolute top-[40%] right-[-5%] w-[25vw] h-[25vw] bg-blue-400/20 rounded-full filter blur-3xl animate-float opacity-40" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-[-5%] left-[30%] w-[20vw] h-[20vw] bg-violet-400/20 rounded-full filter blur-3xl animate-float opacity-30" style={{ animationDelay: '-4s' }} />
      
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/src/assets/patterns/grid.svg)",
          backgroundSize: "100px 100px"
        }}
      />
    </div>
  );
};

export default BlurredBackground;
