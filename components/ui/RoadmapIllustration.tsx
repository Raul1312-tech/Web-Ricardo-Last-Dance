"use client";
import React from "react";
import { motion } from "framer-motion";

interface RoadmapIllustrationProps {
  type: string;
  color: string;
  step: number;
}

export const RoadmapIllustration = ({ type, color, step }: RoadmapIllustrationProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Determinar qué ilustración mostrar según el tipo y paso
  const renderIllustration = () => {
    switch (type) {
      case "chart":
        return <BarChart color={color} />;
      case "diagram":
        return <StepDiagram color={color} />;
      case "process":
        return <ProcessFlow color={color} />;
      case "timeline":
        return <Timeline color={color} />;
      case "team":
        return <TeamIllustration color={color} />;
      case "dashboard":
        return <Dashboard color={color} />;
      default:
        return <PlaceholderIllustration color={color} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
      onClick={handleClick}
    >
      {renderIllustration()}
    </motion.div>
  );
};

// Componentes de ilustración individuales
const BarChart = ({ color }: { color: string }) => (
  <div className="p-6 rounded-lg bg-black/40" style={{ border: `1px solid ${color}40` }}>
    <h4 className="text-white text-sm mb-3 font-medium">Evolución de Métricas</h4>
    <div className="h-44 flex items-end justify-between gap-3">
      {[40, 65, 35, 80, 55, 90].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="w-full rounded-t-md"
          style={{ background: `${color}${90 - (i * 10)}` }}
        />
      ))}
    </div>
    <div className="flex justify-between mt-2 text-xs text-gray-400">
      <span>Ene</span>
      <span>Feb</span>
      <span>Mar</span>
      <span>Abr</span>
      <span>May</span>
      <span>Jun</span>
    </div>
  </div>
);

const StepDiagram = ({ color }: { color: string }) => (
  <div className="p-6 rounded-lg bg-black/40" style={{ border: `1px solid ${color}40` }}>
    <h4 className="text-white text-sm mb-5 font-medium">Escalera de Valor</h4>
    <div className="relative h-36">
      {[1, 2, 3, 4].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.15 }}
          className="absolute flex items-center gap-3"
          style={{ bottom: `${i * 30}%`, left: `${i * 10}%` }}
        >
          <div 
            className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold"
            style={{ background: color }}
          >
            {step}
          </div>
          <div className="text-white text-sm">
            {i === 0 && "Servicio inicial"}
            {i === 1 && "Tratamiento medio"}
            {i === 2 && "Tratamiento avanzado"}
            {i === 3 && "Premium"}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ProcessFlow = ({ color }: { color: string }) => (
  <div className="p-6 rounded-lg bg-black/40" style={{ border: `1px solid ${color}40` }}>
    <h4 className="text-white text-sm mb-5 font-medium">Flujo de Proceso Optimizado</h4>
    <div className="flex justify-between items-center">
      {["Entrada", "Proceso", "Revisión", "Salida"].map((step, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
              style={{ background: `${color}30` }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: color }}
              >
                <span className="text-white">{i + 1}</span>
              </div>
            </div>
            <span className="text-white text-xs">{step}</span>
          </motion.div>
          
          {i < 3 && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="h-0.5" 
              style={{ background: color }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Timeline = ({ color }: { color: string }) => (
  <div className="p-6 rounded-lg bg-black/40" style={{ border: `1px solid ${color}40` }}>
    <h4 className="text-white text-sm mb-5 font-medium">Cronograma de Revisiones</h4>
    <div className="relative pt-10 pb-2">
      <div className="absolute left-0 right-0 h-0.5 top-10" style={{ background: `${color}30` }} />
      
      {["Semana 1", "Semana 2", "Mes 1", "Mes 3"].map((period, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.15 }}
          className="absolute flex flex-col items-center gap-2"
          style={{ left: `${(i * 30) + 5}%`, top: 0 }}
        >
          <div className="text-white text-xs">{period}</div>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ background: color }}
          />
          <div className="text-gray-400 text-xs text-center">
            {i === 0 && "Revisión inicial"}
            {i === 1 && "Ajustes rápidos"}
            {i === 2 && "Evaluación KPIs"}
            {i === 3 && "Reporte completo"}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const TeamIllustration = ({ color }: { color: string }) => (
  <div className="p-6 rounded-lg bg-black/40" style={{ border: `1px solid ${color}40` }}>
    <h4 className="text-white text-sm mb-5 font-medium">Estructura de Equipo</h4>
    <div className="relative h-32 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
      >
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
          style={{ background: color }}
        >
          <span className="text-white text-sm">DIR</span>
        </div>
        <div className="text-white text-xs text-center">Dirección</div>
      </motion.div>
      
      <div className="absolute top-20 w-full flex justify-between">
        {["ADM", "COM", "CLN"].map((dept, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
              style={{ background: `${color}80` }}
            >
              <span className="text-white text-xs">{dept}</span>
            </div>
            <div className="text-white text-xs text-center">
              {i === 0 && "Administración"}
              {i === 1 && "Comercial"}
              {i === 2 && "Clínica"}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = ({ color }: { color: string }) => (
  <div className="p-6 rounded-lg bg-black/40" style={{ border: `1px solid ${color}40` }}>
    <h4 className="text-white text-sm mb-3 font-medium">Dashboard de KPIs</h4>
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Pacientes", value: "84%", icon: "👥" },
        { label: "Facturación", value: "62%", icon: "💰" },
        { label: "Conversión", value: "45%", icon: "📈" },
        { label: "Satisfacción", value: "92%", icon: "⭐" }
      ].map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="bg-black/30 rounded-lg p-3 flex flex-col"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs">{metric.label}</span>
            <span className="text-lg">{metric.icon}</span>
          </div>
          <div 
            className="text-lg font-bold"
            style={{ color }}
          >
            {metric.value}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const PlaceholderIllustration = ({ color }: { color: string }) => (
  <div 
    className="p-6 rounded-lg bg-black/40 h-48 flex items-center justify-center"
    style={{ border: `1px solid ${color}40` }}
  >
    <div className="text-center">
      <div 
        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3"
        style={{ background: `${color}30` }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: color }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      <p className="text-gray-400 text-sm">Ilustración personalizada</p>
    </div>
  </div>
); 