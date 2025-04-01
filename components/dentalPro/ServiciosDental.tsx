"use client";
import { useState, useEffect } from "react";
import { serviciosItems } from "@/data/dentalPro";
import { roadmapData } from "@/data/roadmapData";
import { PinContainer } from "../ui/Pin";
import { Modal } from "../ui/Modal";
import { Roadmap } from "../ui/Roadmap";

const ServiciosDental = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Asegurarnos de que el componente esté montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenModal = (serviceId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedService(serviceId);
    console.log("Modal abierto para servicio:", serviceId); // Depuración
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    console.log("Modal cerrado"); // Depuración
  };

  const getServiceRoadmap = (serviceId: number) => {
    return roadmapData.find(item => item.id === serviceId);
  };

  if (!isMounted) {
    return null; // No renderizar nada en SSR
  }

  return (
    <div className="py-20" id="servicios">
      <h2 className="heading text-center mb-10">
        Nuestros <span className="text-purple">Servicios</span>
      </h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
        Aplicamos metodologías específicas para aumentar la facturación de clínicas dentales a través de estrategias especializadas en cada área del negocio.
      </p>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
        {serviciosItems.map((service) => (
          <div key={service.id} className="h-[350px] md:h-[450px] flex items-center justify-center">
            <PinContainer 
              title={service.title}
              containerClassName="w-full h-full"
            >
              <div className="flex flex-col justify-between bg-black/90 backdrop-blur-sm shadow-xl rounded-2xl border border-white/[0.08] h-[250px] w-full max-w-[300px] p-6">
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-4" 
                      style={{ background: service.color }}>
                    <span className="text-lg font-bold">{service.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
                
                <div className="w-full">
                  <button 
                    className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300 mt-4"
                    style={{ color: service.color }}
                    onClick={(e) => handleOpenModal(service.id, e)}
                    aria-label={`Ver detalles de ${service.title}`}
                  >
                    <span>Descubre más</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                
                <div 
                  className="absolute -bottom-3 left-0 right-0 h-1.5 rounded-full"
                  style={{ background: service.color }}
                ></div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Modales para cada servicio */}
      {serviciosItems.map((service) => {
        const roadmap = getServiceRoadmap(service.id);
        if (!roadmap) return null;
        
        return (
          <Modal
            key={service.id}
            isOpen={selectedService === service.id}
            onClose={handleCloseModal}
            title={service.title}
          >
            <div className="text-white">
              <p className="text-gray-300 mb-8 text-lg">{roadmap.introduction}</p>
              
              <Roadmap 
                steps={roadmap.steps} 
                color={service.color}
              />
            </div>
          </Modal>
        );
      })}
    </div>
  );
};

export default ServiciosDental; 