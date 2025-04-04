import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Spotlight } from "../ui/Spotlight";

// Definición de tipos
interface TeamMember {
  id: number;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  image: string;
  placeholder: string; // Color para placeholder
}

interface TeamCardProps {
  member: TeamMember;
  onClick: () => void;
}

interface MemberDetailPopupProps {
  member: TeamMember;
  onClose: () => void;
}

// Variantes para la animación de tarjetas
const cardVariants = {
  initial: { 
    rotateX: 0,
    rotateY: 0,
    y: 0,
    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)"
  },
  hover: { 
    rotateX: 30,
    rotateY: 0,
    y: -10,
    z: 10,
    boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.7)",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20,
      duration: 0.4 
    } 
  }
};

// Datos de los miembros del equipo
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ricardo Hernández",
    role: "CEO & Director",
    shortBio: "Reconocido líder empresarial con amplio palmarés en gestión corporativa y optimización de procesos clínicos.",
    fullBio: "Ricardo Hernández cuenta con un impresionante recorrido empresarial, siendo CEO y Director de múltiples compañías industriales y de consultoría corporativa. Su excepcional habilidad para las ventas y su profundo conocimiento en la aplicación de la ciencia del Management le han permitido transformar radicalmente la trayectoria de numerosas clínicas dentales, optimizando sus procesos hasta alcanzar niveles de eficiencia sin precedentes. Su visión estratégica y capacidad para identificar oportunidades de crecimiento son reconocidas en todo el sector.",
    image: "/team/ricardo.jpg",
    placeholder: "bg-gradient-to-br from-purple-600 to-blue-800"
  },
  {
    id: 2,
    name: "Carlos Cuevas",
    role: "Consultor Senior",
    shortBio: "Propietario de 2 clínicas dentales con experiencia en protocolos y procesos de optimización clínica.",
    fullBio: "Carlos Cuevas conoce a la perfección las necesidades de los profesionales dentales al ser él mismo propietario de dos exitosas clínicas. Su vasta experiencia le ha permitido desarrollar e implementar protocolos innovadores que han revolucionado la eficiencia operativa en numerosos centros dentales. Como consultor, su profundo conocimiento del área comercial y su enfoque práctico en la optimización de procesos ha ayudado a decenas de clínicas a multiplicar su rentabilidad mientras mejoran la calidad asistencial.",
    image: "/team/carlos.jpg",
    placeholder: "bg-gradient-to-br from-blue-600 to-cyan-800"
  },
  {
    id: 3,
    name: "Nerea Campos",
    role: "Consultora Especializada",
    shortBio: "Experta en optimización de procesos clínicos y desarrollo de estrategias comerciales efectivas.",
    fullBio: "Nerea Campos ha demostrado una extraordinaria capacidad para transformar clínicas dentales mediante la implementación de metodologías avanzadas y estrategias comerciales de alto impacto. Su enfoque único combina una profunda comprensión del sector dental con innovadoras técnicas de gestión empresarial. Ha colaborado en la optimización de más de 50 clínicas en toda España, logrando incrementos de facturación superiores al 40% en el primer año de implementación de sus protocolos.",
    image: "/team/nerea.jpg",
    placeholder: "bg-gradient-to-br from-pink-600 to-purple-800"
  },
  {
    id: 4,
    name: "Daniel Campos",
    role: "Consultor Estratégico",
    shortBio: "Especialista en transformación digital y optimización de flujos de trabajo en entornos clínicos.",
    fullBio: "Daniel Campos ha desarrollado una metodología única que integra las últimas innovaciones tecnológicas con procesos clínicos optimizados, logrando que las clínicas dentales alcancen su máximo potencial. Su enfoque en la transformación digital ha permitido a numerosos profesionales incrementar significativamente su productividad mientras mejoran la experiencia del paciente. Como consultor estratégico, ha diseñado e implementado sistemas de gestión innovadores que han revolucionado el sector dental.",
    image: "/team/daniel.jpg",
    placeholder: "bg-gradient-to-br from-green-600 to-blue-800"
  }
];

const EquipoDental = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  return (
    <div className="w-full py-20 relative">
      {/* Elementos decorativos de fondo */}
      <Spotlight
        className="-top-40 left-0 md:left-60 h-screen"
        fill="rgba(74, 222, 128, 0.15)"
      />
      
      {/* Fondos decorativos con blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, rgba(0, 0, 0, 0.5) 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-10 left-20 w-96 h-96 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, rgba(0, 0, 0, 0.5) 70%)', filter: 'blur(70px)' }} />
      </div>
      
      <div className="relative z-10">
        <div className="text-center max-w-2xl mx-auto px-4 mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-white">Nuestro </span>
            <span className="text-green-400">Equipo</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Contamos con profesionales de primer nivel que combinan experiencia empresarial, 
            conocimiento clínico y visión estratégica para transformar tu clínica dental.
          </p>
          <div className="w-24 h-1 bg-green-400 mx-auto"></div>
        </div>
        
        {/* Contenedor responsive: horizontal en desktop, vertical en móvil */}
        <div className="flex justify-center px-4 pt-20 pb-10 mx-auto overflow-visible">
          {/* En móvil (flex-col) y en desktop (flex-row) */}
          <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-8 md:gap-5 justify-center items-center max-w-7xl">
            {teamMembers.map((member) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {selectedMember && (
        <MemberDetailPopup 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}
    </div>
  );
};

const TeamCard = ({ member, onClick }: TeamCardProps) => {
  return (
    <div className="perspective min-h-[450px] w-full md:w-[300px] max-w-[350px] p-2 z-10 mb-6 md:mb-0">
      <motion.div
        className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden w-full shadow-lg border border-gray-800 group cursor-pointer"
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onClick={onClick}
        style={{ 
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
          position: "relative",
          zIndex: 20
        }}
      >
        {/* Imagen/parte superior */}
        <motion.div 
          className="relative h-60 md:h-64 w-full overflow-hidden"
          style={{ 
            transformStyle: "preserve-3d",
          }}
          variants={{
            hover: {
              scaleX: 1.08,
              scaleY: 1.02,
              perspective: 1000,
              transition: {
                duration: 0.4
              }
            }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
          
          {/* Imagen o placeholder con degradado */}
          <div className={`h-60 md:h-64 w-full relative ${member.placeholder}`}>
            {/* Cuando tengamos imágenes reales, descomentar esto: */}
            {/*
            <Image 
              src={member.image}
              alt={member.name}
              layout="fill"
              objectFit="cover"
              className="opacity-80"
            />
            */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-800/60 flex items-center justify-center">
                <span className="text-5xl md:text-6xl text-gray-500">?</span>
              </div>
            </div>
          </div>
          
          {/* Efecto de brillo al pasar el ratón */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        </motion.div>
        
        {/* Contenido/parte inferior */}
        <motion.div 
          className="p-5 md:p-6"
          style={{ 
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
            transformOrigin: "center bottom"
          }}
          whileHover={{
            scaleX: 0.92,
            scaleY: 0.98,
            transition: {
              duration: 0.4
            }
          }}
        >
          <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-green-400 text-sm mb-3">{member.role}</p>
          <p className="text-gray-400 text-sm mb-4">{member.shortBio}</p>
          
          <button 
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300"
          >
            Ver recorrido completo
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const MemberDetailPopup = ({ member, onClose }: MemberDetailPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4">
      <motion.div 
        className="bg-gray-900/90 backdrop-blur-md rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Elementos decorativos para el popup */}
        <div className="absolute top-5 right-5 w-32 h-32 rounded-full opacity-10" 
          style={{ 
            background: `radial-gradient(circle, rgba(74, 222, 128, 0.5) 0%, transparent 70%)`,
            filter: "blur(40px)"
          }}
        />
        <div className="absolute bottom-5 left-5 w-32 h-32 rounded-full opacity-10"
          style={{ 
            background: `radial-gradient(circle, rgba(74, 222, 128, 0.5) 0%, transparent 70%)`,
            filter: "blur(30px)"
          }}
        />
        
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-800 relative z-10">
          <h3 className="text-xl md:text-2xl font-bold text-white">{member.name}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 md:p-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className={`w-full md:w-1/3 relative h-56 md:h-auto rounded-lg overflow-hidden ${member.placeholder}`}>
              {/* Cuando tengamos imágenes reales, descomentar esto: */}
              {/*
              <Image 
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="opacity-90"
              />
              */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-800/60 flex items-center justify-center">
                  <span className="text-5xl md:text-6xl text-gray-500">?</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h4 className="text-green-400 text-lg mb-3">{member.role}</h4>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                {member.fullBio}
              </p>
              
              <div className="border-t border-gray-800 pt-4 mt-4">
                <h5 className="text-white font-semibold mb-2">Áreas de Expertise:</h5>
                <ul className="text-gray-400 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Optimización de procesos
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Estrategia empresarial
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Gestión de equipos
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Protocolos clínicos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 border-t border-gray-800 flex justify-end relative z-10">
          <button 
            onClick={onClose}
            className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EquipoDental; 