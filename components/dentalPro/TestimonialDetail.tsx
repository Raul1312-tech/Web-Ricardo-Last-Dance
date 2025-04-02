"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialDetailProps {
  testimonial: {
    id: number;
    clinica: string;
    ubicacion: string;
    logo: string;
    logoPlaceholder: string;
    director: string;
    situacionInicial: string;
    desafios: string[];
    proceso: { fase: string; descripcion: string }[];
    resultados: {
      pacientes?: string;
      conversion?: string;
      facturacion?: string;
      roi?: string;
      pacientesNuevos?: string;
      costes?: string;
      ticketMedio?: string;
      retencion?: string;
      reactivacion?: string;
      eficiencia?: string;
      [key: string]: string | undefined;
    };
    testimonioDetallado: string;
    imagenDestacada: string;
    testimonioCorto?: string;
  };
}

const TestimonialDetail = ({ testimonial }: TestimonialDetailProps) => {
  // Animaciones para los elementos
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        {/* Cabecera */}
        <div className="flex-1">
          <motion.div 
            custom={0} 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mb-4"
          >
            <div className="bg-white/10 rounded-lg h-16 w-40 p-2 flex items-center justify-center">
              {/* Logo como texto */}
              <div className="h-12 w-full flex items-center justify-center text-purple-300 text-sm font-medium">
                {testimonial.clinica}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {testimonial.clinica}
              </h3>
              <p className="text-purple-300">{testimonial.ubicacion}</p>
            </div>
          </motion.div>
          
          <motion.p 
            custom={1} 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="text-gray-300 mb-6 leading-relaxed"
          >
            {testimonial.situacionInicial}
          </motion.p>
        </div>
        
        {/* Imagen destacada */}
        <motion.div 
          custom={2} 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          className="w-full md:w-2/5 h-64 relative rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black/70 flex items-center justify-center">
            <span className="text-white text-lg">{testimonial.clinica}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm italic">Director/a: {testimonial.director}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Desafíos */}
      <motion.div 
        custom={3} 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible"
        className="mb-8"
      >
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </span>
          Desafíos
        </h4>
        <ul className="space-y-2 pl-10">
          {testimonial.desafios.map((desafio, index) => (
            <motion.li 
              key={index}
              custom={index + 4} 
              variants={fadeInUp} 
              initial="hidden" 
              animate="visible"
              className="text-gray-300 list-disc"
            >
              {desafio}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      {/* Proceso */}
      <motion.div 
        custom={7} 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible"
        className="mb-8"
      >
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </span>
          Solución implementada
        </h4>
        
        <div className="pl-10 relative">
          {/* Línea vertical */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
          
          {testimonial.proceso.map((paso, index) => (
            <motion.div 
              key={index}
              custom={index + 8} 
              variants={fadeInUp} 
              initial="hidden" 
              animate="visible"
              className="mb-6 relative"
            >
              {/* Punto en la línea temporal */}
              <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <h5 className="text-purple-400 font-medium mb-1">{paso.fase}</h5>
              <p className="text-gray-300">{paso.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Resultados */}
      <motion.div 
        custom={12} 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible"
        className="bg-gradient-to-br from-purple-900/20 to-black/30 rounded-lg p-6 mb-8 border border-purple-500/20"
      >
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-2 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </span>
          Resultados obtenidos
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(testimonial.resultados).map(([key, value], index) => (
            <motion.div 
              key={key}
              custom={index + 13} 
              variants={fadeInUp} 
              initial="hidden" 
              animate="visible"
              className="bg-black/40 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-green-400 mb-1">{value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {key === 'roi' ? 'ROI' : 
                  key === 'pacientes' ? 'Pacientes' : 
                  key === 'conversion' ? 'Conversión' : 
                  key === 'facturacion' ? 'Facturación' :
                  key === 'costes' ? 'Reducción de costes' :
                  key === 'reactivacion' ? 'Reactivación' :
                  key === 'eficiencia' ? 'Eficiencia' : 
                  key === 'ticketMedio' ? 'Ticket medio' :
                  key === 'retencion' ? 'Retención' :
                  key === 'pacientesNuevos' ? 'Pacientes nuevos' : key}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Testimonio */}
      <motion.div 
        custom={17} 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible"
        className="text-center"
      >
        <svg className="w-8 h-8 mx-auto mb-4 text-purple-500/50" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,7L4,7L4,17L10,17L10,12L6,12L10,7Z"></path>
          <path d="M20,7L14,7L14,17L20,17L20,12L16,12L20,7Z"></path>
        </svg>
        <p className="text-xl text-gray-300/90 mb-8 italic">
          &ldquo;{testimonial.testimonioDetallado}&rdquo;
        </p>
        <p className="text-purple-400 font-medium">{testimonial.director} - {testimonial.clinica}</p>
      </motion.div>
    </div>
  );
};

export default TestimonialDetail; 