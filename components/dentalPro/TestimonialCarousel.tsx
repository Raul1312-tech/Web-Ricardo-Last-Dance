"use client";

import { useState, useRef, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import TestimonialDetail from './TestimonialDetail';
import { Modal } from '../ui/Modal';
import { testimoniales } from '@/data/testimoniales';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Configurar y limpiar reproducción automática
  useEffect(() => {
    if (autoPlay) {
      autoPlayInterval.current = setInterval(() => {
        nextSlide();
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

  const prevSlide = () => {
    // Prevenir múltiples clics rápidos
    if (isDragging) return;
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 500);
    
    // Pausar reproducción automática temporalmente
    setAutoPlay(false);
    
    // Actualizar índice
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimoniales.length) % testimoniales.length);
    
    // Reanudar reproducción automática después de un tiempo
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const nextSlide = () => {
    // Prevenir múltiples clics rápidos
    if (isDragging) return;
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 500);
    
    // Pausar reproducción automática temporalmente
    setAutoPlay(false);
    
    // Actualizar índice
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimoniales.length);
    
    // Reanudar reproducción automática después de un tiempo
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    
    // Pausar reproducción automática temporalmente
    setAutoPlay(false);
    
    // Actualizar índice
    setCurrentIndex(index);
    
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
      prevSlide();
    } else if (diff < -threshold) {
      nextSlide();
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

  // Manejar clic para botones de navegación
  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    prevSlide();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    nextSlide();
  };

  // Manejar clic para indicadores de página
  const handlePaginateClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    goToSlide(index);
  };

  // CSS para la transición entre slides
  const slideStyles = {
    transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
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
        className="relative mx-auto px-4 h-[500px] sm:h-[420px] md:h-[450px] overflow-hidden"
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
          <div 
            className="absolute max-w-xs md:max-w-sm w-full transform"
            style={{ 
              ...slideStyles,
              transform: 'translateX(-35%) scale(0.85)',
              opacity: 0.7,
              zIndex: 20
            }}
          >
            <TestimonialCard 
              testimonial={testimoniales[prevIndex]} 
              onExpandClick={handleExpandClick} 
              index={prevIndex}
              isSmall={true}
            />
          </div>

          {/* Tarjeta central (destacada) */}
          <div 
            className="absolute max-w-md md:max-w-lg w-full z-30"
            style={{ 
              ...slideStyles,
              transform: 'translateX(0) scale(1)',
              opacity: 1,
              zIndex: 30
            }}
          >
            <TestimonialCard 
              testimonial={testimoniales[currentIndex]} 
              onExpandClick={handleExpandClick} 
              index={currentIndex}
              feature={true}
            />
          </div>

          {/* Tarjeta derecha */}
          <div 
            className="absolute max-w-xs md:max-w-sm w-full"
            style={{ 
              ...slideStyles,
              transform: 'translateX(35%) scale(0.85)',
              opacity: 0.7,
              zIndex: 20
            }}
          >
            <TestimonialCard 
              testimonial={testimoniales[nextIndex]} 
              onExpandClick={handleExpandClick} 
              index={nextIndex}
              isSmall={true}
            />
          </div>
        </div>

        {/* Flechas de navegación (a los lados) */}
        <div className="absolute w-full flex justify-between items-center top-1/2 transform -translate-y-1/2 px-4 z-40">
          <button
            type="button"
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/10 shadow-lg hover:bg-purple-600/20 transition-colors"
            onClick={handlePrevClick}
            aria-label="Testimonio anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            type="button"
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/10 shadow-lg hover:bg-purple-600/20 transition-colors"
            onClick={handleNextClick}
            aria-label="Siguiente testimonio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores de página (puntos) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 mt-8 pb-6">
          {testimoniales.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-500 w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={(e) => handlePaginateClick(index, e)}
              aria-label={`Ir al testimonio ${index + 1}`}
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
          <button
            type="button"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-purple-500/20"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            Cerrar caso
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TestimonialCarousel; 