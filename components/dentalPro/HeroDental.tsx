import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "../MagicButton";
import { Spotlight } from "../ui/Spotlight";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

const HeroDental = () => {
  return (
    <div className="pb-20 pt-48 md:pt-52 lg:pt-56">
      {/* Spotlights para efectos de iluminación */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="#4F46E5"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="rgb(74, 222, 128)"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#EC4899" />
      </div>

      {/* Fondos decorativos con gradientes */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-black via-black to-purple-900/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-black via-black to-fuchsia-900/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Grid de fondo */}
      <div
        className="h-screen w-full bg-grid-white/[0.015]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center
         [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Consultoría Dental Especializada
          </p>

          <TextGenerateEffect
            words="Transformamos Clínicas Dentales en Negocios Rentables"
            className="text-center text-[40px] md:text-5xl lg:text-6xl mt-3"
          />

          <p className="text-center md:tracking-wider my-6 text-sm md:text-lg lg:text-2xl">
            Aplicamos la ciencia de los negocios corporativos a clínicas dentales familiares
          </p>

          <a href="#servicios" className="mt-3">
            <MagicButton
              title="Descubre cómo"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroDental; 