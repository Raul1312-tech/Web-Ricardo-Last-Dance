import { metodologia } from "@/data/dentalPro";
import { LayoutGrid } from "../ui/LayoutGrid";
import { Button } from "../ui/MovingBorders";
import CalculadoraRentabilidad from "./CalculadoraRentabilidad";

const MetodologiaDental = () => {
  return (
    <div className="py-20 relative">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4">
          Nuestra <span className="text-purple">Metodología</span>
        </h2>
        
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-8">
          Sistema de gestión integral para clínicas dentales con resultados comprobados
        </p>
        
        {/* Calculadora de rentabilidad */}
        <CalculadoraRentabilidad />
        
        <div className="flex justify-center my-12">
          <Button
            borderRadius="1.75rem"
            className="bg-black dark:bg-slate-900 text-white border-neutral-200 dark:border-slate-800"
          >
            Descubre cómo <span className="ml-2">→</span>
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <LayoutGrid cards={metodologia.map(metodo => ({
            id: metodo.id,
            content: (
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-4xl mb-4">{metodo.icono}</div>
                <h3 className="text-xl font-bold mb-2">{metodo.titulo}</h3>
                <p className="text-sm text-gray-300 text-center">{metodo.descripcion}</p>
              </div>
            ),
            className: "bg-black/[0.7] border border-gray-800",
            thumbnail: ""
          }))} />
        </div>
      </div>
    </div>
  );
};

export default MetodologiaDental; 