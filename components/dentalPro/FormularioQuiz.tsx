import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

type DatosPerfil = {
  gabinetes: number;
  facturacion: number;
  primerasVisitas: number;
  ratioConversion: number;
};

type FormularioQuizProps = {
  datos: DatosPerfil;
  setDatos: Dispatch<SetStateAction<DatosPerfil>>;
  onCalcular: () => void;
};

const FormularioQuiz = ({ datos, setDatos, onCalcular }: FormularioQuizProps) => {
  const handleChange = (campo: keyof DatosPerfil, valor: string) => {
    setDatos(prev => ({ ...prev, [campo]: Number(valor) }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-center mb-8">
        Calcula tu potencial con <span className="text-purple-400">DentalPro</span>
      </h3>
      
      <p className="text-center text-gray-300 mb-8">
        Responde estas preguntas y descubre cuánto podría mejorar tu clínica en 3 meses
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Número de gabinetes en tu clínica
          </label>
          <input
            type="number"
            min="1"
            value={datos.gabinetes}
            onChange={(e) => handleChange('gabinetes', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Facturación mensual actual (€)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={datos.facturacion}
            onChange={(e) => handleChange('facturacion', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Primeras visitas mensuales
          </label>
          <input
            type="number"
            min="0"
            value={datos.primerasVisitas}
            onChange={(e) => handleChange('primerasVisitas', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Ratio de conversión actual (%)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              value={datos.ratioConversion}
              onChange={(e) => handleChange('ratioConversion', e.target.value)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            />
            <span className="text-gray-300 min-w-[40px] text-center">{datos.ratioConversion}%</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      
      <div className="pt-6 flex justify-center">
        <button
          onClick={onCalcular}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
        >
          Calcular mi potencial
        </button>
      </div>
    </motion.div>
  );
};

export default FormularioQuiz; 