import { useState } from 'react';
import { motion } from 'framer-motion';
import FormularioQuiz from './FormularioQuiz';
import ResultadosProyeccion from './ResultadosProyeccion';
import RoadmapProceso from './RoadmapProceso';

type DatosPerfil = {
  gabinetes: number;
  facturacion: number;
  primerasVisitas: number;
  ratioConversion: number;
};

type ResultadosCalculados = {
  incrementoFacturacion: number;
  facturacionFinal: number;
  nuevosPacientes: number;
  totalPacientesMensual: number;
  mejoraConversion: number;
  nuevoRatio: number;
  retornoInversion: string;
};

const calcularProyeccion = (datos: DatosPerfil): ResultadosCalculados => {
  // Cálculos base
  const facturacionActualPorGabinete = datos.facturacion / datos.gabinetes;
  
  // Meta de facturación por gabinete (máximo 24.000€)
  const facturacionPotencialPorGabinete = Math.min(24000, facturacionActualPorGabinete * 1.5);
  
  // Incremento total de facturación
  const incrementoFacturacion = Math.round((facturacionPotencialPorGabinete - facturacionActualPorGabinete) * datos.gabinetes);
  
  // Multiplicador de primeras visitas según volumen actual
  const multiplicadorVisitas = datos.primerasVisitas < 15 ? 3 : 2;
  const nuevosPacientes = Math.round(datos.primerasVisitas * (multiplicadorVisitas - 1));
  
  // Mejora del ratio de conversión (20% de aumento, máximo 95%)
  const nuevoRatio = Math.min(95, Math.round(datos.ratioConversion * 1.2));
  const mejoraConversion = nuevoRatio - datos.ratioConversion;
  
  // ROI estimado (asumiendo un costo aproximado basado en facturación)
  const costoEstimado = datos.facturacion * 0.1; // Asumimos costo del 10% de facturación actual
  const retornoInversion = ((incrementoFacturacion * 3) / costoEstimado).toFixed(1);
  
  return {
    incrementoFacturacion,
    facturacionFinal: datos.facturacion + incrementoFacturacion,
    nuevosPacientes,
    totalPacientesMensual: datos.primerasVisitas + nuevosPacientes,
    mejoraConversion,
    nuevoRatio,
    retornoInversion
  };
};

const CalculadoraRentabilidad = () => {
  const [paso, setPaso] = useState(1); // 1: Quiz, 2: Resultados, 3: Roadmap
  const [datos, setDatos] = useState<DatosPerfil>({
    gabinetes: 3,
    facturacion: 20000,
    primerasVisitas: 40,
    ratioConversion: 60
  });
  const [resultados, setResultados] = useState<ResultadosCalculados | null>(null);

  const calcularResultados = () => {
    const result = calcularProyeccion(datos);
    setResultados(result);
    setPaso(2);
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-8 border border-purple-500/20 shadow-xl max-w-4xl mx-auto my-12">
      {paso === 1 && (
        <FormularioQuiz 
          datos={datos} 
          setDatos={setDatos} 
          onCalcular={calcularResultados} 
        />
      )}
      
      {paso === 2 && resultados && (
        <ResultadosProyeccion 
          datos={datos}
          resultados={resultados} 
          onVerRoadmap={() => setPaso(3)} 
        />
      )}
      
      {paso === 3 && (
        <RoadmapProceso 
          onVolver={() => setPaso(2)} 
        />
      )}
    </div>
  );
};

export default CalculadoraRentabilidad; 