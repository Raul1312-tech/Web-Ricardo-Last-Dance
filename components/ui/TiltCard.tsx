"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  backgroundClassName?: string;
  tiltAmount?: number;
  perspective?: number;
  glareOpacity?: number;
  showGlare?: boolean;
}

export const TiltCard = ({
  children,
  className,
  containerClassName,
  backgroundClassName,
  tiltAmount = 10, // Default tilt amount in degrees
  perspective = 1000, // Default perspective value
  glareOpacity = 0.3, // Default glare opacity
  showGlare = true, // Whether to show the glare effect
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smoother animation
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform values for rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  // Glare effect values
  const glareX = useTransform(springX, [-0.5, 0.5], ["-80%", "180%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["-80%", "180%"]);

  // Scale for hover effect
  const scale = useSpring(1, { stiffness: 150, damping: 20 });

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate position relative to the center of the card (-0.5 to 0.5)
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03); // Slightly scale up on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1); // Reset scale
  };

  const glareBackground = isHovered 
    ? `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,${glareOpacity}), transparent 80%)`
    : "none";

  return (
    <div 
      className={cn("relative", containerClassName)}
      style={{
        perspective: `${perspective}px`,
      }}
    >
      <motion.div
        ref={cardRef}
        className={cn(
          "w-full h-full relative overflow-hidden rounded-xl [transform-style:preserve-3d]",
          className
        )}
        style={{
          rotateX,
          rotateY,
          scale,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn("relative z-10 h-full", backgroundClassName)}>
          {children}
        </div>
        
        {showGlare && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
            style={{
              background: glareBackground,
              opacity: isHovered ? 1 : 0,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}; 