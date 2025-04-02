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
        className={`w-full h-full ${isSmall ? 'min-h-[180px]' : 'min-h-[250px]'} cursor-pointer`}
        tiltAmount={5}
        perspective={1500}
        glareOpacity={0.15}
        backgroundClassName={`relative bg-gradient-to-br ${feature ? 'from-purple-950/40 to-black/80' : 'from-black/80 to-purple-950/30'} backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full flex flex-col`}
      >
        <div 
          className="absolute inset-0 overflow-hidden rounded-xl"
          style={{ opacity: 0.05 }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-[2px]"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 15s ease infinite',
            }}
          />
        </div>

        <div className="flex flex-col justify-between h-full z-10 relative">
          <div>
            <div className="flex justify-between items-center mb-5">
              <div className={`bg-white/10 rounded-lg h-16 ${isSmall ? 'w-28' : 'w-40'} p-2 flex items-center justify-center`}>
                <Image 
                  src={testimonial.logoPlaceholder} 
                  alt={testimonial.clinica}
                  width={150}
                  height={80}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <span className={`text-sm text-purple-300 ${isSmall ? 'text-xs' : ''}`}>{testimonial.ubicacion}</span>
            </div>
            <p className={`text-white ${feature ? 'text-xl' : isSmall ? 'text-sm' : 'text-lg'} font-medium leading-relaxed mb-6`}>
              "{testimonial.testimonioCorto}"
            </p>
          </div>
          
          <motion.button
            onClick={() => onExpandClick(testimonial.id)}
            className={`self-start px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium mt-auto ${isSmall ? 'text-xs px-3 py-1.5' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver caso completo
          </motion.button>
        </div>
        
        <motion.div 
          className={`absolute bottom-0 right-0 ${feature ? 'w-32 h-32' : 'w-20 h-20'} rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-xl`}
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
      </TiltCard>
    </motion.div>
  );
};

export default TestimonialCard; 