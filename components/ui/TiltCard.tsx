"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  backgroundClassName?: string;
  tiltAmount?: number;
  perspective?: number;
  glareOpacity?: number;
  glareColor?: string;
}

export const TiltCard = ({
  children,
  className = "",
  backgroundClassName = "",
  tiltAmount = 10,
  perspective = 1000,
  glareOpacity = 0.1,
  glareColor = "#ffffff"
}: TiltCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calcular posición relativa del cursor dentro de la tarjeta (0-1)
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;
    
    // Mapear a rotación con el rango deseado
    const rotateY = (x - 0.5) * tiltAmount;
    const rotateX = (0.5 - y) * tiltAmount;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${className} overflow-hidden relative`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 300, damping: 30 },
        rotateY: { type: "spring", stiffness: 300, damping: 30 },
      }}
    >
      <div className={backgroundClassName}>
        {children}
      </div>
      
      {/* Efecto de brillo */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${glarePosition.x * 100}% ${glarePosition.y * 100}%,
              ${glareColor} 0%,
              transparent 75%
            )`,
            opacity: glareOpacity,
            transform: "translateZ(1px)",
            mixBlendMode: "overlay"
          }}
        />
      )}
    </motion.div>
  );
}; 