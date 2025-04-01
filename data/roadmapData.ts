export interface RoadmapStep {
  title: string;
  description: string;
  hasIllustration?: boolean;
  illustrationType?: string;
}

export interface ServiceRoadmap {
  id: number;
  title: string;
  introduction: string;
  steps: RoadmapStep[];
}

export const roadmapData: ServiceRoadmap[] = [
  {
    id: 1,
    title: "Captación de Pacientes",
    introduction: "En Dental Pro nos encargamos de planificar y ejecutar estrategias de marketing digital, funnels de conversión y embudos en redes sociales para atraer a los pacientes adecuados para tu clínica.",
    steps: [
      {
        title: "Análisis inicial de la clínica",
        description: "Estudiamos a fondo la estrategia actual y definimos objetivos claros de captación.",
      },
      {
        title: "Diseño de la escalera de valor",
        description: "Definición de servicios y 'tratamiento cebo' con foco a high-ticket para maximizar el valor del cliente.",
        hasIllustration: true,
        illustrationType: "diagram"
      },
      {
        title: "Creación de contenido audiovisual",
        description: "Producimos videos, testimonios y material fotográfico profesional para generar confianza y diferenciación.",
        hasIllustration: true,
      },
      {
        title: "Segmentación de campañas",
        description: "Definimos estrategias específicas para redes sociales y buscadores según el público objetivo.",
      },
      {
        title: "Selección del paciente ideal",
        description: "Creamos el perfil detallado de buyer persona para enfocar correctamente los esfuerzos de marketing.",
      },
      {
        title: "Configuración de software y CRM",
        description: "Implementamos herramientas para la programación y automatización de campañas efectivas.",
      },
      {
        title: "Optimización y seguimiento de resultados",
        description: "Monitorizamos KPIs de leads, conversiones y ROI para mejorar continuamente los resultados.",
        hasIllustration: true,
        illustrationType: "chart"
      },
    ],
  },
  {
    id: 2,
    title: "Auditoría Comercial",
    introduction: "Auditamos todo el proceso comercial de tu clínica, desde la preventa telefónica hasta el cierre de tratamientos y la fidelización, para maximizar las conversiones.",
    steps: [
      {
        title: "Auditoría de la preventa telefónica",
        description: "Analizamos scripts, tono, manejo de objeciones y efectividad en las llamadas entrantes.",
      },
      {
        title: "Revisión del equipo de recepción",
        description: "Evaluamos cómo atienden a los pacientes, protocolos de registro y calidad de la primera impresión.",
      },
      {
        title: "Primera visita",
        description: "Optimizamos el protocolo de bienvenida y la experiencia inicial del paciente en la clínica.",
      },
      {
        title: "Diagnóstico integral",
        description: "Mejoramos la forma en que se realizan y comunican los hallazgos clínicos al paciente.",
      },
      {
        title: "Cierre comercial",
        description: "Perfeccionamos la presentación de planes de tratamiento, gestión de objeciones y técnicas de cierre.",
      },
      {
        title: "Seguimiento y fidelización",
        description: "Implementamos sistemas de llamadas de control y ofertas de mantenimiento para retener pacientes.",
      },
      {
        title: "Optimización continua",
        description: "Establecemos reportes periódicos y planes de acción para mejorar constantemente el proceso comercial.",
        hasIllustration: true,
        illustrationType: "process"
      },
    ],
  },
  {
    id: 3,
    title: "Optimización de Procesos",
    introduction: "Nos enfocamos en la reorganización de recursos y tareas para hacer tu clínica más eficiente, reducir costes y aumentar la productividad en todos los departamentos.",
    steps: [
      {
        title: "Mapeo de procesos internos",
        description: "Analizamos todo el recorrido desde la llegada del paciente hasta la facturación para identificar ineficiencias.",
      },
      {
        title: "Roles y responsabilidades",
        description: "Clarificamos quién hace qué y establecemos protocolos claros para cada posición en la clínica.",
        hasIllustration: true,
        illustrationType: "team"
      },
      {
        title: "Integración de pruebas radiológicas",
        description: "Optimizamos el flujo de trabajo para maximizar la eficiencia en la toma y análisis de pruebas diagnósticas.",
      },
      {
        title: "Estandarización de procedimientos",
        description: "Creamos checklists y guías detalladas para cada proceso clínico y administrativo.",
      },
      {
        title: "Implementación de mejoras tecnológicas",
        description: "Incorporamos equipos, software y automatizaciones que agilizan el trabajo diario.",
      },
      {
        title: "Evaluación de resultados",
        description: "Medimos indicadores de tiempo, costes y satisfacción para verificar la eficacia de las optimizaciones.",
        hasIllustration: true,
        illustrationType: "process"
      },
    ],
  },
  {
    id: 4,
    title: "Implementación Tecnológica",
    introduction: "Incorporamos CRM, software de gestión de pacientes y herramientas de IA para digitalizar y automatizar procesos en tu clínica dental.",
    steps: [
      {
        title: "Evaluación de necesidades tecnológicas",
        description: "Analizamos qué soluciones de CRM, sistemas de facturación y herramientas digitales necesita tu clínica.",
      },
      {
        title: "Selección e instalación de software",
        description: "Realizamos una comparativa de proveedores e implementamos las soluciones más adecuadas.",
      },
      {
        title: "Configuración de IA y automatizaciones",
        description: "Implementamos chatbots, recordatorios automáticos y sistemas de analítica avanzada.",
        hasIllustration: true,
      },
      {
        title: "Migración de datos",
        description: "Transferimos el historial de pacientes y expedientes a los nuevos sistemas de forma segura.",
      },
      {
        title: "Capacitación del equipo",
        description: "Formamos a todo el personal para utilizar eficientemente las nuevas tecnologías.",
        hasIllustration: true,
        illustrationType: "team"
      },
      {
        title: "Mantenimiento y soporte",
        description: "Proporcionamos resolución de incidencias y actualizaciones periódicas de los sistemas.",
      },
      {
        title: "Medición de ROI tecnológico",
        description: "Cuantificamos el ahorro de costes y la mejora de productividad gracias a la tecnología.",
        hasIllustration: true,
        illustrationType: "chart"
      },
    ],
  },
  {
    id: 5,
    title: "Recursos Humanos",
    introduction: "Nos enfocamos en motivar, formar e incentivar a tu equipo para que alcancen su máximo rendimiento y contribuyan al crecimiento de la clínica.",
    steps: [
      {
        title: "Diagnóstico de clima laboral",
        description: "Realizamos encuestas y entrevistas para conocer el estado actual del ambiente de trabajo.",
      },
      {
        title: "Definición de roles y plan de incentivos",
        description: "Establecemos bonos, comisiones y objetivos claros para cada miembro del equipo.",
        hasIllustration: true,
        illustrationType: "diagram"
      },
      {
        title: "Formación continua",
        description: "Implementamos programas de capacitación en técnicas de venta, atención al cliente y liderazgo.",
      },
      {
        title: "Planes de carrera y crecimiento interno",
        description: "Diseñamos trayectorias profesionales para cada posición dentro de la clínica.",
      },
      {
        title: "Team building y motivación",
        description: "Organizamos dinámicas y reuniones de retroalimentación para fortalecer el espíritu de equipo.",
        hasIllustration: true,
        illustrationType: "team"
      },
      {
        title: "Evaluación de desempeño",
        description: "Establecemos KPIs y revisiones periódicas para medir el rendimiento de cada empleado.",
      },
      {
        title: "Retención del talento",
        description: "Creamos beneficios y una cultura empresarial que fomente la permanencia del personal valioso.",
      },
    ],
  },
  {
    id: 6,
    title: "Control y Seguimiento",
    introduction: "Definimos los KPIs y unidades de control para medir el éxito de cada implementación y garantizar resultados tangibles para tu clínica.",
    steps: [
      {
        title: "Establecimiento de objetivos",
        description: "Definimos metas claras y medibles para cada área de la clínica.",
      },
      {
        title: "Definición de KPIs",
        description: "Seleccionamos indicadores clave como facturación mensual, leads generados y tasa de conversión.",
        hasIllustration: true,
        illustrationType: "dashboard"
      },
      {
        title: "Creación de dashboards",
        description: "Implementamos reportes visuales en tiempo real o semanales para monitorizar resultados.",
      },
      {
        title: "Herramientas de trazabilidad",
        description: "Integramos software de reporting con los CRM y sistemas de gestión de la clínica.",
      },
      {
        title: "Reuniones de revisión",
        description: "Establecemos sesiones semanales, quincenales o mensuales para analizar avances.",
        hasIllustration: true,
        illustrationType: "timeline"
      },
      {
        title: "Acciones correctivas",
        description: "Diseñamos protocolos para iterar y ajustar rápidamente lo que no funciona según lo esperado.",
      },
      {
        title: "Garantía de éxito",
        description: "Implementamos un sistema donde todo se mide y controla, haciendo que el éxito sea inevitable.",
      },
    ],
  },
]; 