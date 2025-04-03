import { useEffect, useState } from "react";

const EquipoDental = () => {
  const [iframeHeight, setIframeHeight] = useState<number>(600);
  
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
    };

    loadParticlesScript();
    
    // Escuchar mensajes del iframe para ajustar la altura
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'resize') {
        setIframeHeight(event.data.height);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="w-full" style={{ marginBottom: '0', overflow: 'hidden' }}>
      <iframe 
        id="equipo-iframe"
        src="/test-team-section/equipo-cards.html" 
        className="w-full border-none"
        style={{ 
          height: `${iframeHeight}px`,
          display: 'block',
          marginBottom: '0'
        }}
        title="Equipo Dental Pro"
      />
    </div>
  );
};

export default EquipoDental; 