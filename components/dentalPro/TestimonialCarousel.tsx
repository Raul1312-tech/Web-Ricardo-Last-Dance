"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import TestimonialDetail from './TestimonialDetail';
import { Modal } from '../ui/Modal';
import { testimoniales } from '@/data/testimoniales';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(testimoniales[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 10 : -10,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.4 }
      }
    })
  };

  // Configurar y limpiar reproducción automática
  useEffect(() => {
    if (autoPlay) {
      autoPlayInterval.current = setInterval(() => {
        next();
      }, 6000);
    }
    
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [autoPlay, currentIndex]);

  // Pausar reproducción automática durante la interacción o cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      setAutoPlay(false);
    }
  }, [isModalOpen]);

  const openModal = (testimonial: typeof testimoniales[0]) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reanudar reproducción automática después de un tiempo
    setTimeout(() => setAutoPlay(true), 1000);
  };

  const prevIndex = (currentIndex - 1 + testimoniales.length) % testimoniales.length;
  const nextIndex = (currentIndex + 1) % testimoniales.length;

  const next = () => {
    setDirection(1);
    setCurrentIndex(nextIndex);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex);
  };

  const paginate = (newIndex: number) => {
    const newDirection = newIndex > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  };

  // Eventos de arrastre para navegación táctil
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoPlay(false);
    
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setTimeout(() => setAutoPlay(true), 1000);
    
    let endX = 0;
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }
    
    const diff = endX - startX;
    const threshold = 100; // Mínimo desplazamiento para cambiar de slide
    
    if (diff > threshold) {
      prev();
    } else if (diff < -threshold) {
      next();
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    
    // No hacemos nada con el movimiento, solo evitamos comportamientos predeterminados
  };

  // Manejar clic para ver caso completo
  const handleExpandClick = (id: number) => {
    const testimonial = testimoniales.find(t => t.id === id);
    if (testimonial) {
      openModal(testimonial);
    }
  };

  return (
    <div className="relative overflow-hidden py-12">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Título de la sección */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Resultados Comprobados</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Conoce cómo otras clínicas han mejorado su rendimiento con nuestras soluciones.
        </p>
      </div>
      
      {/* Carrusel */}
      <div 
        className="relative max-w-5xl mx-auto px-4"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-wrap justify-center gap-4 md:gap-6 py-6"
          >
            <div className="w-full md:w-2/3">
              <TestimonialCard 
                testimonial={testimoniales[currentIndex]} 
                onExpandClick={handleExpandClick} 
                feature 
                index={currentIndex}
              />
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-4 md:gap-6">
              <div className="h-1/2">
                <TestimonialCard 
                  testimonial={testimoniales[prevIndex]} 
                  onExpandClick={handleExpandClick} 
                  isSmall 
                  index={prevIndex}
                />
              </div>
              <div className="h-1/2">
                <TestimonialCard 
                  testimonial={testimoniales[nextIndex]} 
                  onExpandClick={handleExpandClick} 
                  isSmall 
                  index={nextIndex}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegación */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-purple-500/20 transition-colors"
            onClick={prev}
            aria-label="Testimonio anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <div className="flex gap-2">
            {testimoniales.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-purple-500' : 'bg-white/30'}`}
                onClick={() => paginate(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-purple-500/20 transition-colors"
            onClick={next}
            aria-label="Siguiente testimonio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Indicación de deslizar para móviles */}
        <div className="text-center mt-6 text-sm text-gray-400 md:hidden">
          <p>Desliza para ver más testimonios</p>
        </div>
      </div>
      
      {/* Modal para ver detalles del testimonio */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedTestimonial.clinica}
      >
        <TestimonialDetail testimonial={selectedTestimonial} />
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-purple-500/20"
            onClick={closeModal}
          >
            Cerrar caso
          </motion.button>
        </div>
      </Modal>
    </div>
  );
};

export default TestimonialCarousel; 