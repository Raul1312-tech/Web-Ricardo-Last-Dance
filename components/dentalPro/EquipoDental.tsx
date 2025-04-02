import { useEffect } from "react";

const EquipoDental = () => {
  useEffect(() => {
    // Cargar el script de particlesJS
    const loadParticlesScript = () => {
      const tsparticlesEngine = document.createElement("script");
      tsparticlesEngine.src = "https://cdn.jsdelivr.net/npm/tsparticles-engine@2.12.0/tsparticles.engine.min.js";
      tsparticlesEngine.async = true;

      const tsparticles = document.createElement("script");
      tsparticles.src = "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.min.js";
      tsparticles.async = true;

      document.body.appendChild(tsparticlesEngine);
      document.body.appendChild(tsparticles);
      
      // Después de cargar los scripts, cargar el contenido del iframe
      tsparticles.onload = () => {
        const iframe = document.getElementById('equipo-iframe') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          iframe.style.height = '100vh';
        }
      };
    };

    loadParticlesScript();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe 
        id="equipo-iframe"
        src="/test-team-section/equipo-cards.html" 
        className="w-full h-screen border-none"
        title="Equipo Dental Pro"
      />
    </div>
  );
};

export default EquipoDental; 