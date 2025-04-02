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

  // Calcular índices para la vista de 3 tarjetas
  const prevIndex = (currentIndex - 1 + testimoniales.length) % testimoniales.length;
  const nextIndex = (currentIndex + 1) % testimoniales.length;

  // Variantes de animación mejoradas para el efecto 3D
  const cardVariants = {
    // Tarjeta central (destacada)
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 30,
      filter: "blur(0px)",
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    // Tarjeta izquierda
    left: {
      x: '-35%',
      opacity: 0.7,
      scale: 0.85,
      rotateY: 5,
      zIndex: 20,
      filter: "blur(1px)",
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    // Tarjeta derecha
    right: {
      x: '35%',
      opacity: 0.7,
      scale: 0.85,
      rotateY: -5,
      zIndex: 20,
      filter: "blur(1px)",
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    // Entrada desde la izquierda
    enterLeft: {
      x: '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: 5,
      filter: "blur(2px)",
      zIndex: 10
    },
    // Entrada desde la derecha
    enterRight: {
      x: '100%',
      opacity: 0,
      scale: 0.8,
      rotateY: -5,
      filter: "blur(2px)",
      zIndex: 10
    },
    // Salida por la izquierda
    exitLeft: {
      x: '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: 5,
      filter: "blur(2px)",
      zIndex: 10,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    // Salida por la derecha
    exitRight: {
      x: '100%',
      opacity: 0,
      scale: 0.8,
      rotateY: -5,
      filter: "blur(2px)",
      zIndex: 10,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
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

  const prev = () => {
    // Prevenir múltiples clics rápidos
    if (isDragging) return;
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 500);
    
    // Pausar reproducción automática temporalmente
    setAutoPlay(false);
    
    // Configurar dirección y actualizar índice
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimoniales.length) % testimoniales.length);
    
    // Efecto visual en el botón
    const button = document.querySelector('[aria-label="Testimonio anterior"]');
    if (button instanceof HTMLElement) {
      button.classList.add('active-nav');
      setTimeout(() => button.classList.remove('active-nav'), 300);
    }
    
    // Reanudar reproducción automática después de un tiempo
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const next = () => {
    // Prevenir múltiples clics rápidos
    if (isDragging) return;
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 500);
    
    // Pausar reproducción automática temporalmente
    setAutoPlay(false);
    
    // Configurar dirección y actualizar índice
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimoniales.length);
    
    // Efecto visual en el botón
    const button = document.querySelector('[aria-label="Siguiente testimonio"]');
    if (button instanceof HTMLElement) {
      button.classList.add('active-nav');
      setTimeout(() => button.classList.remove('active-nav'), 300);
    }
    
    // Reanudar reproducción automática después de un tiempo
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const paginate = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    
    // Pausar reproducción automática temporalmente
    setAutoPlay(false);
    
    // Determinar dirección basada en el índice actual y nuevo
    const newDirection = newIndex > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(newIndex);
    
    // Reanudar reproducción automática después de un tiempo
    setTimeout(() => setAutoPlay(true), 5000);
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
    const threshold = 50; // Mínimo desplazamiento para cambiar de slide (reducido para mayor sensibilidad)
    
    if (diff > threshold) {
      prev();
    } else if (diff < -threshold) {
      next();
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
  };

  // Manejar clic para ver caso completo
  const handleExpandClick = (id: number) => {
    const testimonial = testimoniales.find(t => t.id === id);
    if (testimonial) {
      openModal(testimonial);
    }
  };

  // Agregar CSS para animación de botones de navegación
  useEffect(() => {
    // Crear un elemento de estilo para añadir las animaciones CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .active-nav {
        transform: scale(0.9);
        background-color: rgba(168, 85, 247, 0.3);
        transition: all 0.2s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
        className="relative mx-auto px-4 h-[500px] sm:h-[420px] md:h-[450px] overflow-hidden perspective-1000"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Tarjeta izquierda */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`left-${prevIndex}`}
              className="absolute max-w-xs md:max-w-sm w-full"
              initial={direction === 1 ? "enterLeft" : "exitRight"}
              animate="left"
              exit={direction === 1 ? "exitLeft" : "enterRight"}
              variants={cardVariants}
              style={{ perspective: 1000 }}
            >
              <TestimonialCard 
                testimonial={testimoniales[prevIndex]} 
                onExpandClick={handleExpandClick} 
                index={prevIndex}
                isSmall={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tarjeta central (destacada) */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`center-${currentIndex}`}
              className="absolute max-w-md md:max-w-lg w-full z-30"
              initial={direction === 1 ? "enterRight" : "enterLeft"}
              animate="center"
              exit={direction === 1 ? "exitLeft" : "exitRight"}
              variants={cardVariants}
              style={{ perspective: 1000 }}
            >
              <TestimonialCard 
                testimonial={testimoniales[currentIndex]} 
                onExpandClick={handleExpandClick} 
                index={currentIndex}
                feature={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tarjeta derecha */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`right-${nextIndex}`}
              className="absolute max-w-xs md:max-w-sm w-full"
              initial={direction === 1 ? "exitLeft" : "enterLeft"}
              animate="right"
              exit={direction === 1 ? "enterRight" : "exitLeft"}
              variants={cardVariants}
              style={{ perspective: 1000 }}
            >
              <TestimonialCard 
                testimonial={testimoniales[nextIndex]} 
                onExpandClick={handleExpandClick} 
                index={nextIndex}
                isSmall={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flechas de navegación (a los lados) */}
        <div className="absolute w-full flex justify-between items-center top-1/2 transform -translate-y-1/2 px-4 z-40">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/10 shadow-lg hover:bg-purple-600/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              prev();
            }}
            aria-label="Testimonio anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/10 shadow-lg hover:bg-purple-600/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              next();
            }}
            aria-label="Siguiente testimonio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Indicadores de página (puntos) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 mt-8 pb-6">
          {testimoniales.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-500 w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => paginate(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
        
        {/* Indicación de deslizar para móviles */}
        <div className="absolute bottom-0 left-0 right-0 text-center mb-14 text-sm text-gray-400 md:hidden">
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