import { resultados } from "@/data/dentalPro";
import { MovingBorder } from "../ui/MovingBorders";
import { BackgroundGradientAnimation } from "../ui/GradientBg";

const ResultadosDental = () => {
  return (
    <div className="py-20 relative overflow-hidden">
      <BackgroundGradientAnimation 
        gradientBackgroundStart="rgb(25, 25, 25)" 
        gradientBackgroundEnd="rgb(25, 25, 70)"
        firstColor="75, 70, 229"
        secondColor="139, 92, 246"
        thirdColor="236, 72, 153"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10 py-10">
          <h2 className="heading mb-10">
            Resultados <span className="text-purple">Comprobados</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resultados.map((resultado) => (
              <div key={resultado.id} className="flex flex-col items-center justify-center p-4">
                <div className="rounded-2xl border border-gray-700 bg-black/50 backdrop-blur-md p-8 h-full w-full relative overflow-hidden">
                  <MovingBorder
                    duration={6000}
                    rx="30%"
                    ry="30%"
                  >
                    <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(#8B5CF6_40%,transparent_60%)]" />
                  </MovingBorder>
                  <div className="flex flex-col items-center justify-center h-full relative z-10">
                    <h3 className="text-4xl font-bold text-purple mb-2">{resultado.title}</h3>
                    <p className="text-sm text-gray-300">{resultado.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default ResultadosDental; 