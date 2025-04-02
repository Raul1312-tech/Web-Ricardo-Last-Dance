"use client";

import { useState, useRef } from "react";

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
  const [glarePosition, setGlarePosition] = useState({ x: 0.5, y: 0.5 });
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
    const rotateY = Math.max(-tiltAmount, Math.min(tiltAmount, (x - 0.5) * tiltAmount * 2));
    const rotateX = Math.max(-tiltAmount, Math.min(tiltAmount, (0.5 - y) * tiltAmount * 2));
    
    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 0.5, y: 0.5 });
  };

  return (
    <div
      ref={cardRef}
      className={`${className} overflow-hidden relative`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform"
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
            mixBlendMode: "overlay"
          }}
        />
      )}
    </div>
  );
}; 