import { metodologia } from "@/data/dentalPro";
import { LayoutGrid } from "../ui/LayoutGrid";

const MetodologiaDental = () => {
  return (
    <div className="py-20">
      <h2 className="heading text-center mb-10">
        Nuestra <span className="text-purple">Metodología</span>
      </h2>
      
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
  );
};

export default MetodologiaDental; 