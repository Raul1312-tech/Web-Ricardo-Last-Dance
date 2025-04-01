"use client";

import { serviciosItems } from "@/data/dentalPro";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ServiciosDentalAlt = () => {
  return (
    <div className="py-20" id="servicios">
      <h2 className="heading text-center mb-10">
        Nuestros <span className="text-purple">Servicios</span>
      </h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
        Aplicamos metodologías específicas para aumentar la facturación de clínicas dentales a través de estrategias especializadas en cada área del negocio.
      </p>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {serviciosItems.map((service) => (
          <TiltCard 
            key={service.id} 
            color={service.color}
            title={service.title}
            description={service.description}
            id={service.id}
          />
        ))}
      </div>
    </div>
  );
};

interface TiltCardProps {
  color: string;
  title: string;
  description: string;
  id: number;
}

const TiltCard = ({ color, title, description, id }: TiltCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Centro de la tarjeta
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcular rotación (máximo 40 grados - más pronunciado)
    const rotateX = ((y - centerY) / centerY) * -40;
    const rotateY = ((x - centerX) / centerX) * 40;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // Patrones gráficos según ID
  const getPatternStyle = () => {
    const baseColor = color.replace('#', '');
    const patterns = [
      `radial-gradient(circle at 15% 85%, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.1) 0%, transparent 35%)`,
      `linear-gradient(135deg, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.08) 0%, transparent 50%)`,
      `repeating-linear-gradient(45deg, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.05) 0%, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.05) 10px, transparent 10px, transparent 20px)`,
      `radial-gradient(circle at 85% 15%, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.1) 0%, transparent 35%)`,
      `linear-gradient(45deg, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.08) 0%, transparent 50%)`,
      `repeating-radial-gradient(circle at 50% 50%, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.05) 0%, rgba(${parseInt(baseColor.substring(0, 2), 16)}, ${parseInt(baseColor.substring(2, 4), 16)}, ${parseInt(baseColor.substring(4, 6), 16)}, 0.05) 10px, transparent 10px, transparent 20px)`,
    ];
    return patterns[(id - 1) % patterns.length];
  };
  
  return (
    <div 
      className="h-[350px] w-full perspective"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className={cn(
          "h-full w-full rounded-xl bg-black/90 border border-gray-800 p-6 flex flex-col shadow-xl overflow-hidden tilt-card",
          isHovered ? "shadow-2xl" : "shadow-md"
        )}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{
          type: "spring", 
          stiffness: 400, 
          damping: 10
        }}
      >
        {/* Elemento decorativo - círculos */}
        <div className="absolute right-4 top-1/3 w-20 h-20 rounded-full opacity-10" style={{ background: color, filter: "blur(20px)" }} />
        <div className="absolute left-2 bottom-1/4 w-12 h-12 rounded-full opacity-10" style={{ background: color, filter: "blur(15px)" }} />
        
        {/* Patrón decorativo basado en el ID */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: getPatternStyle() }}
        />
        
        {/* Contenido de la tarjeta */}
        <div className="relative z-10 h-full flex flex-col tilt-card-content">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 shadow-lg" 
              style={{ background: color, boxShadow: `0 0 15px ${color}33` }}>
            <span className="text-lg font-bold">{id}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-300 text-sm mb-6">{description}</p>
          
          <button 
            className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300 mt-auto group"
            style={{ color }}
          >
            <span>Descubre más</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        {/* Barra de color en la parte superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
        
        {/* Efecto de brillo */}
        <div 
          className="tilt-card-shine"
          style={{
            background: `radial-gradient(circle at ${rotation.y > 0 ? '80%' : '20%'} ${rotation.x > 0 ? '80%' : '20%'}, rgba(255,255,255,0.8), transparent 40%)`,
            opacity: isHovered ? 0.4 : 0,
            transition: "opacity 0.2s ease"
          }}
        />
        
        {/* Luz pequeña que sigue al cursor */}
        {isHovered && (
          <div
            className="absolute w-6 h-6 rounded-full pointer-events-none z-30"
            style={{
              background: `radial-gradient(circle, ${color}aa, transparent 70%)`,
              left: `${50 + rotation.y * 0.5}%`,
              top: `${50 + rotation.x * -0.5}%`,
              transform: "translate(-50%, -50%)",
              filter: "blur(5px)",
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ServiciosDentalAlt; 