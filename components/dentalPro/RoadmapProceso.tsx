import { motion } from 'framer-motion';

type RoadmapProcesoProps = {
  onVolver: () => void;
};

const RoadmapProceso = ({ onVolver }: RoadmapProcesoProps) => {
  const pasos = [
    {
      id: 1,
      titulo: "Auditoría inicial",
      descripcion: "Análisis completo de la situación actual de tu clínica",
      duracion: "Semana 1",
      icono: "🔍"
    },
    {
      id: 2,
      titulo: "Plan estratégico",
      descripcion: "Diseño de estrategias personalizadas según objetivos",
      duracion: "Semana 1-2",
      icono: "📝"
    },
    {
      id: 3,
      titulo: "Implementación tecnológica",
      descripcion: "Instalación y configuración de herramientas necesarias",
      duracion: "Semana 2-3",
      icono: "💻"
    },
    {
      id: 4,
      titulo: "Formación del equipo",
      descripcion: "Capacitación del personal en nuevos procesos",
      duracion: "Semana 3",
      icono: "👥"
    },
    {
      id: 5,
      titulo: "Lanzamiento de captación",
      descripcion: "Activación de campañas de marketing dental",
      duracion: "Semana 4",
      icono: "🚀"
    },
    {
      id: 6,
      titulo: "Optimización contínua",
      descripcion: "Ajustes según resultados y seguimiento mensual",
      duracion: "Mensual",
      icono: "📈"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h3 className="text-2xl font-bold text-center mb-4">
        Plan de implementación <span className="text-purple-400">DentalPro</span>
      </h3>
      
      <p className="text-center text-gray-300 mb-8">
        Proceso estructurado en 4 semanas para transformar tu clínica dental
      </p>
      
      <div className="relative">
        {/* Línea de tiempo vertical */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-purple-700/50"></div>
        
        <div className="space-y-8">
          {pasos.map((paso, index) => (
            <div key={paso.id} className="flex">
              <div className="relative z-10 flex items-center justify-center flex-shrink-0 w-16 h-16 mx-1 bg-gray-900 rounded-full border-2 border-purple-600 shadow-md">
                <span className="text-2xl">{paso.icono}</span>
              </div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 ml-4 p-4 bg-gray-900/50 rounded-xl border border-purple-500/20"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold">{paso.titulo}</h4>
                  <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full text-purple-300">{paso.duracion}</span>
                </div>
                <p className="text-gray-300 mt-2">{paso.descripcion}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-6 flex justify-center gap-4">
        <button
          onClick={() => window.location.href = "#contacto"}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
        >
          Solicitar asesoramiento
        </button>
        
        <button
          onClick={onVolver}
          className="px-8 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-700 transition-all"
        >
          ← Volver a resultados
        </button>
      </div>
    </motion.div>
  );
};

export default RoadmapProceso; 