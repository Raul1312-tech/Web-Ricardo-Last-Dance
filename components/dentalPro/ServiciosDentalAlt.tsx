"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Colores de marca
const brandColors = {
  primaryPurple: "#8B5CF6", // Morado principal
  darkPurple: "#6D28D9",    // Morado oscuro
  lightPurple: "#A78BFA",   // Morado claro
  neonGreen: "#4ADE80",     // Verde chicle
  darkNeonGreen: "#10B981", // Verde chicle oscuro
};

// Servicios con ilustraciones profesionales
const servicios = [
  {
    id: 1,
    title: "Captación de Pacientes",
    description: "Marketing dental puntero con Funnels y embudos en redes sociales",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V7C2 8.10457 2.89543 9 4 9H20C21.1046 9 22 8.10457 22 7V6C22 4.89543 21.1046 4 20 4Z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M18 9H6C4.89543 9 4 9.89543 4 11V12C4 13.1046 4.89543 14 6 14H18C19.1046 14 20 13.1046 20 12V11C20 9.89543 19.1046 9 18 9Z" fill="currentColor" fill-opacity="0.4"/>
      <path d="M16 14H8C6.89543 14 6 14.8954 6 16V17C6 18.1046 6.89543 19 8 19H16C17.1046 19 18 18.1046 18 17V16C18 14.8954 17.1046 14 16 14Z" fill="currentColor" fill-opacity="0.8"/>
      <path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7V6Z" stroke="currentColor" stroke-linecap="round"/>
      <path d="M5 11C5 10.4477 5.44772 10 6 10H18C18.5523 10 19 10.4477 19 11V12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12V11Z" stroke="currentColor" stroke-linecap="round"/>
      <path d="M7 16C7 15.4477 7.44772 15 8 15H16C16.5523 15 17 15.4477 17 16V17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17V16Z" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12 8V10M12 13V15" stroke="currentColor" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 2,
    title: "Auditoría Comercial",
    description: "Desde pre-venta telefónica hasta cierre de tratamientos de alto valor",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 8H21" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 6H7" stroke="currentColor" stroke-linecap="round"/>
      <path d="M10 6H11" stroke="currentColor" stroke-linecap="round"/>
      <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <path d="M7 19V14" stroke="currentColor" stroke-linecap="round"/>
      <path d="M10 19V11" stroke="currentColor" stroke-linecap="round"/>
      <path d="M13 19V14" stroke="currentColor" stroke-linecap="round"/>
      <path d="M17 19V10" stroke="currentColor" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 3,
    title: "Optimización de Procesos",
    description: "Auditoría de gastos, optimización de recursos y organización de proveedores",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M19 9C19.7956 9 20.5587 8.68393 21.1213 8.12132C21.6839 7.55871 22 6.79565 22 6C22 5.20435 21.6839 4.44129 21.1213 3.87868C20.5587 3.31607 19.7956 3 19 3C18.2044 3 17.4413 3.31607 16.8787 3.87868C16.3161 4.44129 16 5.20435 16 6C16 6.08 16.0059 6.1575 16.0094 6.2369C16.0238 6.57656 16.0309 6.74639 15.9344 6.87955C15.8379 7.01271 15.6758 7.08334 15.3516 7.2246L9.964 9.7385C9.83281 9.80401 9.76722 9.83677 9.69878 9.85306C9.63642 9.8678 9.57203 9.87462 9.50766 9.87334C9.4378 9.87192 9.36734 9.85775 9.2264 9.8294C8.9404 9.7615 8.7974 9.7276 8.6913 9.8C8.5852 9.87236 8.54 10.026 8.44959 10.3334L7.4166 13.4668C7.35661 13.6468 7.32661 13.7368 7.3256 13.8313C7.32471 13.9151 7.33833 13.9982 7.3657 14.0768C7.3959 14.1639 7.4497 14.2379 7.5573 14.386L7.83341 14.7668C7.93011 14.8995 7.97846 14.9658 8.04311 15.016C8.10101 15.0608 8.16713 15.0945 8.2384 15.1154C8.31781 15.1386 8.4057 15.1386 8.5814 15.1386H9.71059C9.8814 15.1386 9.967 15.1386 10.0419 15.1613C10.1093 15.1814 10.1712 15.214 10.2244 15.2573C10.2841 15.3062 10.3286 15.3714 10.4176 15.5018L11.1674 16.6266C11.24 16.7323 11.2763 16.7852 11.326 16.823C11.3705 16.8566 11.4224 16.8799 11.4774 16.8909C11.539 16.9034 11.604 16.8998 11.734 16.8926L13.39 16.7874C13.6425 16.7736 13.7688 16.7668 13.8501 16.7039C13.9315 16.641 13.9706 16.5311 14.049 16.3112L14.5024 14.9514C14.5808 14.7315 14.62 14.6216 14.6874 14.5469C14.7548 14.4722 14.8465 14.4366 15.03 14.3654L15.6136 14.1546C15.7916 14.086 15.8806 14.0517 15.944 13.9822C16.0074 13.9127 16.0338 13.8216 16.0867 13.6394L16.5864 11.6394C16.6393 11.4571 16.6658 11.366 16.64 11.2828C16.6142 11.1996 16.544 11.1366 16.4037 11.0106L15.7824 10.5106C15.6421 10.3845 15.5719 10.3215 15.484 10.2999C15.3961 10.2784 15.3028 10.3003 15.1164 10.3441L13.7104 10.6986C13.5239 10.7425 13.4307 10.7644 13.3518 10.8137C13.2728 10.863 13.2169 10.9359 13.105 11.0816L12.0596 12.4264C11.9477 12.5722 11.8918 12.645 11.8627 12.7328C11.8336 12.8206 11.8336 12.9142 11.8336 13.1014C11.8336 13.2886 11.8336 13.3822 11.7859 13.4542C11.7382 13.5261 11.6535 13.5711 11.484 13.661L10.6096 14.078C10.4401 14.1679 10.3553 14.2129 10.2698 14.2184C10.1844 14.2238 10.0963 14.1892 9.92021 14.1198L9.04541 13.7198C8.86931 13.6505 8.78131 13.6158 8.71121 13.6346C8.64111 13.6533 8.59239 13.7212 8.4949 13.857L7.91341 14.601" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12" stroke="currentColor" stroke-linecap="round"/>
      <path d="M15 12C15 13.6569 16.3431 15 18 15C19.6569 15 21 13.6569 21 12C21 10.3431 19.6569 9 18 9" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12 15C12 16.6569 10.6569 18 9 18C7.34315 18 6 16.6569 6 15C6 13.3431 7.34315 12 9 12" stroke="currentColor" stroke-linecap="round"/>
      <path d="M15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15" stroke="currentColor" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 4,
    title: "Implementación Tecnológica",
    description: "CRMs personalizados para productividad empresarial",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M2 10H22" stroke="currentColor" stroke-width="1.2"/>
      <path d="M10 21.0001L10 10" stroke="currentColor" stroke-width="1.2"/>
      <path d="M16.5 16.5H13.5V13.5H16.5V16.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M6.5 16.5H3.5V13.5H6.5V16.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M16.5 7.5H13.5V4.5H16.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M6.5 7.5H3.5V4.5H6.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M20.5 7.5H17.5V4.5H20.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M12.5 7.5H7.5V4.5H12.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M12.5 16.5H7.5V13.5H12.5V16.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M20.5 16.5H17.5V13.5H20.5V16.5Z" fill="currentColor" stroke="currentColor"/>
    </svg>`
  },
  {
    id: 5,
    title: "Recursos Humanos",
    description: "Formación, entrenamiento y motivación del equipo",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <circle cx="9" cy="7" r="3" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="15" cy="9" r="2" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="19" cy="11" r="1.5" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="5" cy="9" r="2" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <path d="M5.75737 13.1213C5.07534 13.8033 4.39331 14.4854 4.39331 15.1674C4.39331 15.8495 4.39331 16.5315 4.93097 16.9605C5.46863 17.3895 6.00629 17.4142 6.8517 17.4142C7.69711 17.4142 8.82383 17.4142 9.5 17.4142" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12.5 18C12.5 17.1716 13.1716 16.5 14 16.5H16C16.8284 16.5 17.5 17.1716 17.5 18V20H12.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M17.5 18C17.5 17.1716 18.1716 16.5 19 16.5H20C20.8284 16.5 21.5 17.1716 21.5 18V20H17.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M7.5 18C7.5 17.1716 8.17157 16.5 9 16.5H11C11.8284 16.5 12.5 17.1716 12.5 18V20H7.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M2.5 18C2.5 17.1716 3.17157 16.5 4 16.5H5C5.82843 16.5 6.5 17.1716 6.5 18V20H2.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M14 13L14 14.5" stroke="currentColor" stroke-linecap="round"/>
      <path d="M19 13L19 14.5" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 13L9 14.5" stroke="currentColor" stroke-linecap="round"/>
      <path d="M5 13L5 14.5" stroke="currentColor" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 6,
    title: "Control y Seguimiento",
    description: "Dashboards con KPIs y roadmaps para control exhaustivo",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M21 9H3" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 7H7" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 7H10" stroke="currentColor" stroke-linecap="round"/>
      <rect x="4" y="12" width="4" height="6" rx="0.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <rect x="10" y="12" width="4" height="6" rx="0.5" fill="currentColor" fill-opacity="0.6" stroke="currentColor"/>
      <rect x="16" y="12" width="4" height="6" rx="0.5" fill="currentColor" fill-opacity="0.8" stroke="currentColor"/>
      <path d="M6 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M8 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M12 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M14 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M18 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M20 12V18" stroke="currentColor" stroke-width="0.7"/>
    </svg>`
  },
];

const ServiciosDentalAlt = () => {
  return (
    <div className="py-20" id="servicios">
      <h2 className="text-4xl font-bold text-center mb-10">
        Nuestros <span className="text-purple">Servicios</span>
      </h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
        Aplicamos metodologías específicas para aumentar la facturación de clínicas dentales a través de estrategias especializadas en cada área del negocio.
      </p>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {servicios.map((servicio) => (
          <TiltCard 
            key={servicio.id} 
            id={servicio.id}
            title={servicio.title}
            description={servicio.description}
            icon={servicio.icon}
          />
        ))}
      </div>
    </div>
  );
};

interface TiltCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const TiltCard = ({ id, title, description, icon }: TiltCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Centro de la tarjeta
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcular rotación (máximo 40 grados - más pronunciado)
    const rotateX = ((y - centerY) / centerY) * -20; // Reducido a la mitad para menor inclinación
    const rotateY = ((x - centerX) / centerX) * 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // Patrones gráficos según ID
  const getPatternStyle = () => {
    const patterns = [
      `radial-gradient(circle at 15% 85%, ${brandColors.darkPurple}20 0%, transparent 35%)`,
      `linear-gradient(135deg, ${brandColors.darkPurple}20 0%, transparent 50%)`,
      `repeating-linear-gradient(45deg, ${brandColors.darkPurple}10 0%, ${brandColors.darkPurple}10 10px, transparent 10px, transparent 20px)`,
      `radial-gradient(circle at 85% 15%, ${brandColors.darkPurple}20 0%, transparent 35%)`,
      `linear-gradient(45deg, ${brandColors.darkPurple}20 0%, transparent 50%)`,
      `repeating-radial-gradient(circle at 50% 50%, ${brandColors.darkPurple}10 0%, ${brandColors.darkPurple}10 10px, transparent 10px, transparent 20px)`,
    ];
    return patterns[(id - 1) % patterns.length];
  };
  
  // Renderizar el icono animado con efectos visuales mejorados
  const renderEnhancedIcon = () => {
    return (
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1.1 : 1, 
            opacity: 1,
            rotate: isHovered ? 5 : 0
          }}
          transition={{
            scale: { 
              duration: 0.3,
              ease: "easeOut"
            },
            opacity: { duration: 0.3 },
            rotate: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
        >
          {/* Círculo exterior con glow */}
          <motion.div 
            className={`absolute w-[110px] h-[110px] rounded-full`}
            animate={{
              scale: isHovered ? [1, 1.05, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full rounded-full" 
              style={{ 
                backgroundImage: `radial-gradient(circle, ${brandColors.primaryPurple}20 0%, transparent 70%)`,
                boxShadow: `0 0 15px ${brandColors.primaryPurple}33, inset 0 0 10px ${brandColors.primaryPurple}40`
              }}
            />
          </motion.div>
          
          {/* Círculo principal */}
          <motion.div 
            className="absolute w-[95px] h-[95px] rounded-full"
            animate={{
              scale: isHovered ? [1, 1.03, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full rounded-full" 
              style={{ 
                backgroundImage: `linear-gradient(145deg, ${brandColors.darkPurple}30, ${brandColors.primaryPurple}10)`,
                boxShadow: `0 0 10px ${brandColors.darkPurple}33, inset 0 0 8px ${brandColors.primaryPurple}30` 
              }}
            />
          </motion.div>
          
          {/* Círculo interior */}
          <motion.div 
            className="absolute w-[80px] h-[80px] rounded-full"
            animate={{
              scale: isHovered ? [1, 1.02, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full rounded-full" 
              style={{ 
                backgroundImage: `radial-gradient(circle, ${brandColors.primaryPurple}40 0%, ${brandColors.darkPurple}10 70%)`,
                boxShadow: `inset 0 0 8px ${brandColors.darkPurple}30` 
              }}
            />
          </motion.div>
          
          {/* Icono SVG */}
          <motion.div 
            className="relative z-10 w-[64px] h-[64px] flex items-center justify-center"
            animate={{
              scale: isHovered ? [1, 1.08, 1] : 1,
              rotate: isHovered ? [0, -2, 0, 2, 0] : 0,
            }}
            transition={{
              scale: {
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              },
              rotate: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full flex items-center justify-center" 
              style={{ color: brandColors.neonGreen }}
              dangerouslySetInnerHTML={{ __html: icon }} 
            />
          </motion.div>
          
          {/* Partículas decorativas */}
          {isHovered && (
            <>
              <motion.div 
                className="absolute w-1.5 h-1.5 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, 30, 20], 
                  y: [0, -20, -40],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: brandColors.neonGreen, boxShadow: `0 0 5px ${brandColors.neonGreen}` }} 
                />
              </motion.div>
              <motion.div 
                className="absolute w-2 h-2 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, -35, -25], 
                  y: [0, -10, -30],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: brandColors.neonGreen, boxShadow: `0 0 5px ${brandColors.neonGreen}` }} 
                />
              </motion.div>
              <motion.div 
                className="absolute w-1 h-1 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, 25, 40], 
                  y: [0, 25, 10],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: brandColors.neonGreen, boxShadow: `0 0 5px ${brandColors.neonGreen}` }} 
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    );
  };
  
  return (
    <div 
      className="h-[450px] w-full perspective"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className={cn(
          "h-full w-full rounded-xl bg-black/90 border border-gray-800 p-6 flex flex-col shadow-xl overflow-hidden tilt-card",
          isHovered ? "shadow-2xl" : "shadow-md"
        )}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{
          type: "spring", 
          stiffness: 400, 
          damping: 10
        }}
      >
        <div 
          className="absolute inset-0 z-0" 
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, ${brandColors.darkPurple}40 100%)`
          }}
        />
        
        {/* Elemento decorativo - círculos */}
        <div className="absolute right-4 top-1/3 w-20 h-20 rounded-full opacity-10" 
          style={{ background: brandColors.primaryPurple, filter: "blur(20px)" }} 
        />
        <div className="absolute left-2 bottom-1/4 w-12 h-12 rounded-full opacity-10" 
          style={{ background: brandColors.neonGreen, filter: "blur(15px)" }} 
        />
        
        {/* Patrón decorativo basado en el ID */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: getPatternStyle() }}
        />
        
        {/* Contenido de la tarjeta */}
        <div className="relative z-10 h-full flex flex-col tilt-card-content">
          {/* Icono animado y mejorado - Centrado */}
          {renderEnhancedIcon()}
          
          {/* Contenido de texto - Bajado aún más */}
          <div className="mt-[220px]">
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-300 text-sm mb-6">{description}</p>
            
            <button 
              className="text-sm font-medium flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300 mt-auto mx-auto group"
              style={{ color: brandColors.neonGreen }}
            >
              <span>Descubre más</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
        
        {/* Barra de color en la parte superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: brandColors.neonGreen }}
        />
        
        {/* Efecto de brillo */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${rotation.y > 0 ? '80%' : '20%'} ${rotation.x > 0 ? '80%' : '20%'}, rgba(255,255,255,0.8), transparent 40%)`,
            opacity: isHovered ? 0.4 : 0,
            transition: "opacity 0.2s ease"
          }}
        />
        
        {/* Luz pequeña que sigue al cursor */}
        {isHovered && (
          <div
            className="absolute w-6 h-6 rounded-full pointer-events-none z-30"
            style={{
              background: `radial-gradient(circle, ${brandColors.neonGreen}aa, transparent 70%)`,
              left: `${50 + rotation.y * 0.5}%`,
              top: `${50 + rotation.x * -0.5}%`,
              transform: "translate(-50%, -50%)",
              filter: "blur(5px)",
              boxShadow: `0 0 10px ${brandColors.neonGreen}`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ServiciosDentalAlt; 