import { testimonios } from "@/data/dentalPro";
import TestimonialCarousel from "./TestimonialCarousel";

// Estilos CSS para la perspectiva 3D
const styles = `
  .carousel-perspective {
    perspective: 2000px;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
    position: relative;
    z-index: 1;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const TestimoniosDental = () => {
  return (
    <div className="py-20 relative">
      {/* Estilos adicionales para efectos 3D */}
      <style jsx global>{styles}</style>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-black via-black to-purple-900/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-black via-black to-fuchsia-900/15 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <h2 className="heading text-center mb-10">
        Lo que dicen <span className="text-verde-chicle">nuestros clientes</span>
      </h2>
      
      <div className="carousel-perspective">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default TestimoniosDental; 