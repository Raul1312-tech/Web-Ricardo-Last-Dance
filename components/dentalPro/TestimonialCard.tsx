"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from '../ui/TiltCard';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    clinica: string;
    logoPlaceholder: string;
    testimonioCorto: string;
    ubicacion: string;
  };
  onExpandClick: (id: number) => void;
  index?: number;
  feature?: boolean;
  isSmall?: boolean;
}

const TestimonialCard = ({ 
  testimonial, 
  onExpandClick, 
  index = 0, 
  feature = false,
  isSmall = false
}: TestimonialCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  // Variantes para animaciones
  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { 
      scale: 0.98,
      rotate: [0, -1, 1, -0.5, 0],
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="h-full"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      custom={index}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <TiltCard 
        className={`w-full h-full ${isSmall ? 'min-h-[200px]' : 'min-h-[280px]'} cursor-pointer`}
        tiltAmount={feature ? 8 : 12} // Mayor efecto de inclinación en tarjetas laterales
        perspective={1500}
        glareOpacity={0.15}
        backgroundClassName={`relative bg-gradient-to-br ${
          feature 
            ? 'from-purple-950 to-black shadow-xl shadow-purple-900/20' 
            : 'from-black/80 to-purple-950/30'
        } backdrop-blur-md border ${
          feature ? 'border-purple-500/50' : 'border-purple-500/10'
        } rounded-xl p-6 h-full flex flex-col ${feature ? 'bg-opacity-100' : ''}`}
      >
        <div 
          className={`absolute inset-0 overflow-hidden rounded-xl ${feature ? 'bg-black' : ''}`}
          style={{ opacity: feature ? 0.95 : 0.1 }}
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-900/30 backdrop-blur-[3px] ${feature ? 'from-purple-600/50 to-purple-950/80' : ''}`}
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 15s ease infinite',
            }}
          />
        </div>

        <div className={`flex flex-col justify-between h-full z-10 relative ${feature ? 'bg-opacity-100' : ''}`}>
          <div>
            <div className="flex justify-between items-center mb-5">
              <div className={`bg-white/10 rounded-lg h-14 ${isSmall ? 'w-28' : 'w-40'} p-2 flex items-center justify-center`}>
                {/* Logo como texto en lugar de imagen */}
                <div className="max-h-10 w-auto relative">
                  <div className="h-10 w-full flex items-center justify-center text-purple-300 text-sm font-medium">
                    {testimonial.clinica}
                  </div>
                </div>
              </div>
              <span className={`text-sm text-purple-300 ${isSmall ? 'text-xs' : ''}`}>{testimonial.ubicacion}</span>
            </div>
            <p className={`text-white ${feature ? 'text-xl' : isSmall ? 'text-sm' : 'text-base'} font-medium leading-relaxed mb-6`}>
              &ldquo;{testimonial.testimonioCorto}&rdquo;
            </p>
          </div>
          
          <motion.button
            onClick={() => onExpandClick(testimonial.id)}
            className={`self-start px-5 py-2.5 rounded-full text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium mt-auto shadow-lg ${
              feature ? 'shadow-purple-500/30 hover:shadow-purple-500/50' : ''
            } ${isSmall ? 'text-xs px-4 py-2' : ''}`}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Ver caso completo
          </motion.button>
        </div>
        
        {/* Efectos decorativos */}
        <motion.div 
          className={`absolute bottom-0 right-0 ${feature ? 'w-40 h-40' : 'w-24 h-24'} rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-xl`}
          animate={{
            scale: isHovering ? [1, 1.3, 1.1] : 1,
            opacity: isHovering ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: isHovering ? Infinity : 0,
            repeatType: "reverse"
          }}
        />
        
        {/* Punto brillante que sigue al cursor */}
        {isHovering && (
          <motion.div 
            className="absolute w-16 h-16 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
              filter: "blur(8px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.6
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        )}
      </TiltCard>
    </motion.div>
  );
};

export default TestimonialCard; 