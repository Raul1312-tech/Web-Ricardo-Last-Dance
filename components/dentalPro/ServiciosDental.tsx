import { serviciosItems } from "@/data/dentalPro";
import { PinContainer } from "../ui/Pin";

const ServiciosDental = () => {
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
    </div>
  );
};

export default ServiciosDental; 