import { equipo } from "@/data/dentalPro";
import { InfiniteMovingCards } from "../ui/InfiniteCards";
import { HoverBorderGradient } from "../ui/HoverBorder";

const EquipoDental = () => {
  const equipoCards = equipo.map((miembro) => ({
    quote: miembro.descripcion,
    name: miembro.nombre,
    title: miembro.puesto,
  }));

  return (
    <div className="py-20">
      <h2 className="heading text-center mb-10">
        Nuestro <span className="text-purple">Equipo</span>
      </h2>
      
      <div className="mb-20">
        <InfiniteMovingCards 
          items={equipoCards}
          speed="slow"
          pauseOnHover={true}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-20">
        {equipo.map((miembro) => (
          <div key={miembro.id} className="flex justify-center">
            <HoverBorderGradient className="border border-purple-500/20 bg-black/80 backdrop-blur-md rounded-xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 overflow-hidden rounded-full mb-4">
                  <img 
                    src={miembro.img} 
                    alt={miembro.nombre} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{miembro.nombre}</h3>
                <p className="text-purple-400 text-sm mb-3">{miembro.puesto}</p>
                <p className="text-gray-300 text-sm">{miembro.descripcion}</p>
              </div>
            </HoverBorderGradient>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipoDental; 