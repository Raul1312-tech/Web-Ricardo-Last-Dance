"use client";

import { useState } from 'react';
import { TiltCard } from '../ui/TiltCard';

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

  return (
    <div
      className="h-full transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
          
          <button
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onExpandClick(testimonial.id);
            }}
            className={`self-start px-5 py-2.5 rounded-full text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium mt-auto shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 ${
              feature ? 'shadow-purple-500/30 hover:shadow-purple-500/50' : ''
            } ${isSmall ? 'text-xs px-4 py-2' : ''}`}
          >
            Ver caso completo
          </button>
        </div>
        
        {/* Efectos decorativos */}
        <div 
          className={`absolute bottom-0 right-0 ${feature ? 'w-40 h-40' : 'w-24 h-24'} rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-xl transition-opacity duration-500`}
          style={{
            opacity: isHovering ? 0.4 : 0.2
          }}
        />
      </TiltCard>
    </div>
  );
};

export default TestimonialCard; 