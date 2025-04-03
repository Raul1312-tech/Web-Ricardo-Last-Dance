import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "../MagicButton";
import { Spotlight } from "../ui/Spotlight";

const ContactoDental = () => {
  return (
    <div className="py-20 relative">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="#9d4edd"
      />
      
      {/* Fondos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/3 w-96 h-96 bg-gradient-to-r from-black via-black to-purple-900/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-gradient-to-r from-black via-black to-fuchsia-900/15 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="heading mb-6">
          Transforma tu <span className="text-verde-chicle">Clínica Dental</span>
        </h2>
        
        <p className="text-lg mb-10 text-gray-300">
          Aplica la metodología Dental Pro y lleva tu negocio al siguiente nivel.
          Contáctanos hoy para una consulta gratuita.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-purple-500/20">
            <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+34 900 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>info@dentalpro.es</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Calle Principal 123, Madrid</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-purple-500/20">
            <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
            <ul className="space-y-3 text-left">
              <li className="flex justify-between">
                <span>Lunes - Viernes:</span>
                <span>9:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados:</span>
                <span>10:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos:</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center">
          <a href="mailto:info@dentalpro.es">
            <MagicButton
              title="Solicitar información"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactoDental; 