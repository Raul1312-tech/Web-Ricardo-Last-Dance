import { metodologia } from "@/data/dentalPro";
import { LayoutGrid } from "../ui/LayoutGrid";
import { Button } from "../ui/MovingBorders";
import CalculadoraRentabilidad from "./CalculadoraRentabilidad";

const MetodologiaDental = () => {
  return (
    <div className="py-20 relative">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(172, 68, 171, 0.2) 0%, rgba(0, 0, 0, 0.95) 50%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(146, 35, 164, 0.2) 0%, rgba(0, 0, 0, 0.95) 50%)', filter: 'blur(70px)' }} />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4">
          Nuestra <span className="text-verde-chicle">Metodología</span>
        </h2>
        
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-8">
          Sistema de gestión integral para clínicas dentales con resultados comprobados
        </p>
        
        {/* Calculadora de rentabilidad */}
        <CalculadoraRentabilidad />
        
        <div className="flex justify-center my-12">
          <Button
            borderRadius="1.75rem"
            className="bg-black dark:bg-slate-900 text-white border-neutral-200 dark:border-slate-800 px-8 py-4 text-lg font-medium"
            containerClassName="min-w-[220px]"
          >
            Descubre cómo <span className="ml-4">→</span>
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