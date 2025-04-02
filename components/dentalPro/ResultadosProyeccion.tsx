import { motion } from 'framer-motion';

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

type ResultadosProyeccionProps = {
  datos: DatosPerfil;
  resultados: ResultadosCalculados;
  onVerRoadmap: () => void;
};

const ResultadosProyeccion = ({ datos, resultados, onVerRoadmap }: ResultadosProyeccionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h3 className="text-2xl font-bold text-center mb-4">
        Tu potencial con <span className="text-purple-400">DentalPro</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facturación */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20">
          <h4 className="text-lg font-medium mb-4">Facturación mensual</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold text-green-400">
                {resultados.facturacionFinal.toLocaleString()}€
              </p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                +{resultados.incrementoFacturacion.toLocaleString()}€/mes
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-24">
                <div className="absolute bottom-0 left-0 w-8 h-12 bg-gray-700 rounded-sm"></div>
                <div className="absolute bottom-0 right-0 w-8 h-16 bg-green-500 rounded-sm"></div>
                <div className="absolute bottom-0 left-2 text-xs text-gray-300">Actual</div>
                <div className="absolute bottom-0 right-1 text-xs text-gray-300">Meta</div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Comparativa</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Facturación por gabinete: {Math.round(resultados.facturacionFinal / datos.gabinetes).toLocaleString()}€
          </p>
        </div>
        
        {/* Primeras visitas */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20">
          <h4 className="text-lg font-medium mb-4">Primeras visitas mensuales</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold text-blue-400">
                {resultados.totalPacientesMensual}
              </p>
              <p className="text-sm text-blue-400 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                +{resultados.nuevosPacientes} pacientes/mes
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="flex gap-1 items-end">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-5 rounded-t-sm ${i < 2 ? 'bg-gray-700' : 'bg-blue-500'}`}
                    style={{ height: `${(i+1) * 8}px` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Incremento desde tus {datos.primerasVisitas} visitas actuales
          </p>
        </div>
        
        {/* Ratio de conversión */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20">
          <h4 className="text-lg font-medium mb-4">Ratio de conversión</h4>
          
          <div className="flex items-center space-x-4">
            <div className="relative h-24 w-24">
              <div className="h-full w-full rounded-full border-4 border-gray-700 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-purple-500"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${resultados.nuevoRatio <= 25 
                      ? `${50 + 50 * Math.sin(Math.PI * 2 * resultados.nuevoRatio / 100)}% ${50 - 50 * Math.cos(Math.PI * 2 * resultados.nuevoRatio / 100)}%` 
                      : '100% 0%'}, ${resultados.nuevoRatio > 25 && resultados.nuevoRatio <= 50 
                        ? `100% ${50 - 50 * Math.cos(Math.PI * 2 * (resultados.nuevoRatio - 25) / 100)}%` 
                        : resultados.nuevoRatio > 25 ? '100% 50%' : ''}, ${resultados.nuevoRatio > 50 && resultados.nuevoRatio <= 75 
                          ? `${50 + 50 * Math.sin(Math.PI * 2 * (resultados.nuevoRatio - 50) / 100)}% 100%` 
                          : resultados.nuevoRatio > 50 ? '50% 100%' : ''}, ${resultados.nuevoRatio > 75 
                            ? `${50 - 50 * Math.sin(Math.PI * 2 * (resultados.nuevoRatio - 75) / 100)}% ${50 + 50 * Math.cos(Math.PI * 2 * (resultados.nuevoRatio - 75) / 100)}%` 
                            : ''})`
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg font-bold">{resultados.nuevoRatio}%</p>
                  <p className="text-xs text-green-400">+{resultados.mejoraConversion}%</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-300 mb-2">
                • De {datos.ratioConversion}% a {resultados.nuevoRatio}% de aceptación
              </p>
              <p className="text-sm text-gray-300 mb-2">
                • Mayor efectividad en presupuestos
              </p>
              <p className="text-sm text-gray-300">
                • Mejor experiencia para pacientes
              </p>
            </div>
          </div>
        </div>
        
        {/* ROI */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20">
          <h4 className="text-lg font-medium mb-4">ROI estimado a 3 meses</h4>
          
          <p className="text-4xl font-bold text-purple-400 text-center">
            {resultados.retornoInversion}x
          </p>
          
          <p className="text-sm text-gray-300 mt-4 text-center">
            Por cada euro invertido, recuperas {resultados.retornoInversion} euros
          </p>
          
          <div className="mt-6">
            <p className="text-sm text-gray-400">
              • Basado en un incremento de {resultados.incrementoFacturacion.toLocaleString()}€/mes
            </p>
            <p className="text-sm text-gray-400">
              • Con resultados visibles desde el primer mes
            </p>
          </div>
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
          onClick={onVerRoadmap}
          className="px-8 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-700 transition-all"
        >
          Ver plan de implementación →
        </button>
      </div>
    </motion.div>
  );
};

export default ResultadosProyeccion; 