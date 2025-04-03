"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "../ui/Modal";

// Colores de marca - Actualizados a la nueva paleta dental
const brandColors = {
  primaryTurquoise: "#00A4BE", // Azul turquesa principal
  darkTurquoise: "#007A8D", // Azul turquesa oscuro
  lightTurquoise: "#7DD2E3", // Azul turquesa claro
  mintGreen: "#00B29C", // Verde menta
  deepBlack: "#0F0F0F", // Negro profundo
  goldAmber: "#F59E0B", // Dorado/ámbar
  darkGreen: "#008E71", // Verde oscuro
};

// Gradientes para tarjetas
const cardGradients = [
  "linear-gradient(135deg, rgba(0,164,190,0.9) 0%, rgba(0,122,141,1) 100%)", // Azul turquesa a oscuro
  "linear-gradient(135deg, rgba(0,178,156,0.9) 0%, rgba(0,142,113,1) 100%)", // Verde menta a verde oscuro
  "linear-gradient(135deg, rgba(245,158,11,0.9) 0%, rgba(194,120,3,1) 100%)" // Dorado a dorado oscuro
];

// Servicios con ilustraciones profesionales
const servicios = [
  {
    id: 1,
    title: "Captación de Pacientes",
    description: "Marketing dental puntero con Funnels y embudos en redes sociales",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V7C2 8.10457 2.89543 9 4 9H20C21.1046 9 22 8.10457 22 7V6C22 4.89543 21.1046 4 20 4Z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M18 9H6C4.89543 9 4 9.89543 4 11V12C4 13.1046 4.89543 14 6 14H18C19.1046 14 20 13.1046 20 12V11C20 9.89543 19.1046 9 18 9Z" fill="currentColor" fill-opacity="0.4"/>
      <path d="M16 14H8C6.89543 14 6 14.8954 6 16V17C6 18.1046 6.89543 19 8 19H16C17.1046 19 18 18.1046 18 17V16C18 14.8954 17.1046 14 16 14Z" fill="currentColor" fill-opacity="0.8"/>
      <path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7V6Z" stroke="currentColor" stroke-linecap="round"/>
      <path d="M5 11C5 10.4477 5.44772 10 6 10H18C18.5523 10 19 10.4477 19 11V12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12V11Z" stroke="currentColor" stroke-linecap="round"/>
      <path d="M7 16C7 15.4477 7.44772 15 8 15H16C16.5523 15 17 15.4477 17 16V17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17V16Z" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12 8V10M12 13V15" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    color: "#00A4BE",
    detalle: "Implementamos estrategias de marketing digital especializadas para clínicas dentales que incluyen embudos de conversión y campañas en redes sociales. Nuestro enfoque genera un flujo constante de pacientes cualificados, mejorando la tasa de conversión y optimizando el costo de adquisición de nuevos pacientes."
  },
  {
    id: 2,
    title: "Auditoría Comercial",
    description: "Desde pre-venta telefónica hasta cierre de tratamientos de alto valor",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 8H21" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 6H7" stroke="currentColor" stroke-linecap="round"/>
      <path d="M10 6H11" stroke="currentColor" stroke-linecap="round"/>
      <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <path d="M7 19V14" stroke="currentColor" stroke-linecap="round"/>
      <path d="M10 19V11" stroke="currentColor" stroke-linecap="round"/>
      <path d="M13 19V14" stroke="currentColor" stroke-linecap="round"/>
      <path d="M17 19V10" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    color: "#F59E0B",
    detalle: "Optimizamos tus protocolos comerciales desde la pre-venta telefónica hasta el cierre de tratamientos. Desarrollamos estrategias personalizadas para mejorar la conversión en cada etapa del proceso, con especial énfasis en los tratamientos de alto valor."
  },
  {
    id: 3,
    title: "Optimización de Procesos",
    description: "Auditoría de gastos, optimización de recursos y organización de proveedores",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M19 9C19.7956 9 20.5587 8.68393 21.1213 8.12132C21.6839 7.55871 22 6.79565 22 6C22 5.20435 21.6839 4.44129 21.1213 3.87868C20.5587 3.31607 19.7956 3 19 3C18.2044 3 17.4413 3.31607 16.8787 3.87868C16.3161 4.44129 16 5.20435 16 6C16 6.08 16.0059 6.1575 16.0094 6.2369C16.0238 6.57656 16.0309 6.74639 15.9344 6.87955C15.8379 7.01271 15.6758 7.08334 15.3516 7.2246L9.964 9.7385C9.83281 9.80401 9.76722 9.83677 9.69878 9.85306C9.63642 9.8678 9.57203 9.87462 9.50766 9.87334C9.4378 9.87192 9.36734 9.85775 9.2264 9.8294C8.9404 9.7615 8.7974 9.7276 8.6913 9.8C8.5852 9.87236 8.54 10.026 8.44959 10.3334L7.4166 13.4668C7.35661 13.6468 7.32661 13.7368 7.3256 13.8313C7.32471 13.9151 7.33833 13.9982 7.3657 14.0768C7.3959 14.1639 7.4497 14.2379 7.5573 14.386L7.83341 14.7668C7.93011 14.8995 7.97846 14.9658 8.04311 15.016C8.10101 15.0608 8.16713 15.0945 8.2384 15.1154C8.31781 15.1386 8.4057 15.1386 8.5814 15.1386H9.71059C9.8814 15.1386 9.967 15.1386 10.0419 15.1613C10.1093 15.1814 10.1712 15.214 10.2244 15.2573C10.2841 15.3062 10.3286 15.3714 10.4176 15.5018L11.1674 16.6266C11.24 16.7323 11.2763 16.7852 11.326 16.823C11.3705 16.8566 11.4224 16.8799 11.4774 16.8909C11.539 16.9034 11.604 16.8998 11.734 16.8926L13.39 16.7874C13.6425 16.7736 13.7688 16.7668 13.8501 16.7039C13.9315 16.641 13.9706 16.5311 14.049 16.3112L14.5024 14.9514C14.5808 14.7315 14.62 14.6216 14.6874 14.5469C14.7548 14.4722 14.8465 14.4366 15.03 14.3654L15.6136 14.1546C15.7916 14.086 15.8806 14.0517 15.944 13.9822C16.0074 13.9127 16.0338 13.8216 16.0867 13.6394L16.5864 11.6394C16.6393 11.4571 16.6658 11.366 16.64 11.2828C16.6142 11.1996 16.544 11.1366 16.4037 11.0106L15.7824 10.5106C15.6421 10.3845 15.5719 10.3215 15.484 10.2999C15.3961 10.2784 15.3028 10.3003 15.1164 10.3441L13.7104 10.6986C13.5239 10.7425 13.4307 10.7644 13.3518 10.8137C13.2728 10.863 13.2169 10.9359 13.105 11.0816L12.0596 12.4264C11.9477 12.5722 11.8918 12.645 11.8627 12.7328C11.8336 12.8206 11.8336 12.9142 11.8336 13.1014C11.8336 13.2886 11.8336 13.3822 11.7859 13.4542C11.7382 13.5261 11.6535 13.5711 11.484 13.661L10.6096 14.078C10.4401 14.1679 10.3553 14.2129 10.2698 14.2184C10.1844 14.2238 10.0963 14.1892 9.92021 14.1198L9.04541 13.7198C8.86931 13.6505 8.78131 13.6158 8.71121 13.6346C8.64111 13.6533 8.59239 13.7212 8.4949 13.857L7.91341 14.601" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12" stroke="currentColor" stroke-linecap="round"/>
      <path d="M15 12C15 13.6569 16.3431 15 18 15C19.6569 15 21 13.6569 21 12C21 10.3431 19.6569 9 18 9" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12 15C12 16.6569 10.6569 18 9 18C7.34315 18 6 16.6569 6 15C6 13.3431 7.34315 12 9 12" stroke="currentColor" stroke-linecap="round"/>
      <path d="M15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    color: "#00B29C",
    detalle: "Realizamos un análisis exhaustivo de los procesos internos y costos operativos de tu clínica. Implementamos mejoras en la gestión de recursos, negociación con proveedores y organización de procesos para maximizar la rentabilidad y eficiencia operativa."
  },
  {
    id: 4,
    title: "Implementación Tecnológica",
    description: "CRMs personalizados para productividad empresarial",
    detalle: "Desarrollamos e implementamos soluciones tecnológicas personalizadas que automatizan y optimizan la gestión de la clínica. Nuestros sistemas CRM específicos para el sector dental mejoran la productividad, el seguimiento de pacientes y la gestión comercial.",
    beneficios: [
      "Automatización de procesos administrativos y comerciales",
      "Seguimiento detallado del ciclo de vida del paciente",
      "Análisis de datos en tiempo real para toma de decisiones",
      "Integración con sistemas de gestión clínica existentes"
    ],
    headline: "Automatiza el 85% de tus procesos con tecnología dental inteligente",
    color: "#008E71",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#008E71" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="#008E71" fill="#008E71" fill-opacity="0.1"/>
      <path d="M2 10H22" stroke="#008E71" stroke-width="1.2"/>
      <path d="M10 21.0001L10 10" stroke="#008E71" stroke-width="1.2"/>
    </svg>`
  },
  {
    id: 5,
    title: "Recursos Humanos",
    description: "Formación, entrenamiento y motivación del equipo",
    detalle: "Desarrollamos programas de formación y motivación específicos para equipos dentales. Creamos culturas organizativas orientadas a la excelencia, con sistemas de incentivos, evaluación del desempeño y planes de carrera adaptados al sector dental.",
    beneficios: [
      "Reducción de la rotación de personal",
      "Aumento de la productividad por empleado",
      "Mejora del clima laboral y trabajo en equipo",
      "Desarrollo de liderazgo en mandos intermedios"
    ],
    headline: "Transforma tu equipo en un activo que multiplica tu facturación",
    color: "#00B29C",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00B29C" stroke-width="0.7">
      <circle cx="9" cy="7" r="3" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <circle cx="15" cy="9" r="2" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <circle cx="19" cy="11" r="1.5" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <circle cx="5" cy="9" r="2" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <path d="M5.75737 13.1213C5.07534 13.8033 4.39331 14.4854 4.39331 15.1674C4.39331 15.8495 4.39331 16.5315 4.93097 16.9605C5.46863 17.3895 6.00629 17.4142 6.8517 17.4142C7.69711 17.4142 8.82383 17.4142 9.5 17.4142" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M12.5 18C12.5 17.1716 13.1716 16.5 14 16.5H16C16.8284 16.5 17.5 17.1716 17.5 18V20H12.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M17.5 18C17.5 17.1716 18.1716 16.5 19 16.5H20C20.8284 16.5 21.5 17.1716 21.5 18V20H17.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M7.5 18C7.5 17.1716 8.17157 16.5 9 16.5H11C11.8284 16.5 12.5 17.1716 12.5 18V20H7.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M2.5 18C2.5 17.1716 3.17157 16.5 4 16.5H5C5.82843 16.5 6.5 17.1716 6.5 18V20H2.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M14 13L14 14.5" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M19 13L19 14.5" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M9 13L9 14.5" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M5 13L5 14.5" stroke="#00B29C" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 6,
    title: "Control y Seguimiento",
    description: "Dashboards con KPIs y roadmaps para control exhaustivo",
    detalle: "Implementamos sistemas de monitorización y seguimiento con KPIs específicos para clínicas dentales. Desarrollamos dashboards personalizados que permiten visualizar en tiempo real el rendimiento de la clínica en todas sus áreas operativas y comerciales.",
    beneficios: [
      "Visualización en tiempo real de KPIs clave",
      "Identificación temprana de desviaciones en objetivos",
      "Toma de decisiones basada en datos",
      "Seguimiento de la evolución del negocio"
    ],
    headline: "Controla cada métrica de tu clínica con dashboards en tiempo real",
    color: "#007A8D",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#007A8D" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="#007A8D" fill="#007A8D" fill-opacity="0.1"/>
      <path d="M21 9H3" stroke="#007A8D" stroke-linecap="round"/>
      <path d="M6 7H7" stroke="#007A8D" stroke-linecap="round"/>
      <path d="M9 7H10" stroke="#007A8D" stroke-linecap="round"/>
      <rect x="4" y="12" width="4" height="6" rx="0.5" fill="#007A8D" fill-opacity="0.4" stroke="#007A8D"/>
      <rect x="10" y="12" width="4" height="6" rx="0.5" fill="#007A8D" fill-opacity="0.6" stroke="#007A8D"/>
      <rect x="16" y="12" width="4" height="6" rx="0.5" fill="#007A8D" fill-opacity="0.8" stroke="#007A8D"/>
      <path d="M6 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M8 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M12 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M14 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M18 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M20 12V18" stroke="#007A8D" stroke-width="0.7"/>
    </svg>`
  },
];

// Contenido detallado de cada servicio
const serviciosDetallados = [
  {
    id: 1,
    title: "Captación de Pacientes",
    description: "Marketing dental puntero con Funnels y embudos en redes sociales",
    detalle: "Implementamos estrategias de marketing digital especializadas para clínicas dentales que incluyen embudos de conversión y campañas en redes sociales. Nuestro enfoque genera un flujo constante de pacientes cualificados, mejorando la tasa de conversión y optimizando el costo de adquisición de nuevos pacientes.",
    beneficios: [
      "Aumento del número de nuevos pacientes mensuales",
      "Generación de leads cualificados para tratamientos de alto valor",
      "Reducción del coste por adquisición de paciente",
      "Posicionamiento como referente en tu especialidad"
    ],
    headline: "Multiplica por 3 tus pacientes de alto valor en menos de 90 días",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V7C2 8.10457 2.89543 9 4 9H20C21.1046 9 22 8.10457 22 7V6C22 4.89543 21.1046 4 20 4Z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M18 9H6C4.89543 9 4 9.89543 4 11V12C4 13.1046 4.89543 14 6 14H18C19.1046 14 20 13.1046 20 12V11C20 9.89543 19.1046 9 18 9Z" fill="currentColor" fill-opacity="0.4"/>
      <path d="M16 14H8C6.89543 14 6 14.8954 6 16V17C6 18.1046 6.89543 19 8 19H16C17.1046 19 18 18.1046 18 17V16C18 14.8954 17.1046 14 16 14Z" fill="currentColor" fill-opacity="0.8"/>
      <path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7V6Z" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    estadisticas: [
      { valor: "67%", descripcion: "Aumento en leads cualificados" },
      { valor: "312%", descripcion: "ROI promedio en campañas digitales" },
      { valor: "-40%", descripcion: "Reducción en coste por adquisición" }
    ],
    testimonios: [
      {
        texto: "Pasamos de 20 a 78 primeras visitas mensuales en solo 3 meses.",
        autor: "Dr. Javier Sánchez, Clínica Dental Avanzada"
      },
      {
        texto: "Nuestros canales digitales generan ahora un 215% más de leads cualificados para implantes y ortodoncia.",
        autor: "Dra. María López, Clínica Estética Dental"
      },
      {
        texto: "El ROI de nuestras campañas se multiplicó por cuatro. La mejor inversión que hemos hecho.",
        autor: "Dr. Roberto Jiménez, Centro Odontológico Internacional"
      }
    ],
    roadmap: [
      { title: "Análisis inicial y estrategia", description: "Estudiamos tu mercado y definimos objetivos claros de captación." },
      { title: "Creación de embudos de conversión", description: "Diseñamos la estrategia de captación multi-canal para generar leads cualificados." },
      { title: "Optimización continua de campañas", description: "Ajustamos cada variable para maximizar resultados y ROI." }
    ],
    color: "#00A4BE"
  },
  {
    id: 2,
    title: "Auditoría Comercial",
    description: "Desde pre-venta telefónica hasta cierre de tratamientos de alto valor",
    detalle: "Optimizamos tus protocolos comerciales desde la pre-venta telefónica hasta el cierre de tratamientos. Desarrollamos estrategias personalizadas para mejorar la conversión en cada etapa del proceso, con especial énfasis en los tratamientos de alto valor.",
    beneficios: [
      "Aumento en la tasa de conversión de primera visita",
      "Incremento en el ticket medio por paciente",
      "Mejora de la experiencia del paciente",
      "Formación y desarrollo del equipo comercial"
    ],
    headline: "Duplica tu tasa de conversión y aumenta un 60% el ticket medio",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 8H21" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 6H7" stroke="currentColor" stroke-linecap="round"/>
      <path d="M10 6H11" stroke="currentColor" stroke-linecap="round"/>
      <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <path d="M7 19V14" stroke="currentColor" stroke-linecap="round"/>
      <path d="M10 19V11" stroke="currentColor" stroke-linecap="round"/>
      <path d="M13 19V14" stroke="currentColor" stroke-linecap="round"/>
      <path d="M17 19V10" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    estadisticas: [
      { valor: "83%", descripcion: "Aumento en la tasa de conversión" },
      { valor: "+62%", descripcion: "Incremento en el ticket medio" },
      { valor: "95%", descripcion: "Satisfacción del paciente" }
    ],
    testimonios: [
      {
        texto: "Nuestras conversiones de implantes pasaron del 31% al 76% en el primer trimestre.",
        autor: "Dra. Ana Martínez, Clínica Odontológica Sonrisa"
      },
      {
        texto: "El ticket medio de nuestros pacientes aumentó un 58% gracias a los nuevos protocolos de venta consultiva.",
        autor: "Dr. Carlos Fernández, Centro Dental Élite"
      },
      {
        texto: "Ahora convertimos 8 de cada 10 presupuestos en tratamientos aceptados. Increíble cambio en nuestra rentabilidad.",
        autor: "Dra. Lucía Ramírez, Instituto Dental Avanzado"
      }
    ],
    roadmap: [
      { title: "Diagnóstico inicial", description: "Evaluamos tu proceso comercial actual para detectar áreas de mejora." },
      { title: "Implementación de protocolos", description: "Desarrollamos scripts y procesos optimizados para cada fase del embudo comercial." },
      { title: "Formación del equipo", description: "Entrenamos a tu personal en técnicas avanzadas de venta consultiva dental." }
    ],
    color: "#F59E0B"
  },
  {
    id: 3,
    title: "Optimización de Procesos",
    description: "Auditoría de gastos, optimización de recursos y organización de proveedores",
    detalle: "Realizamos un análisis exhaustivo de los procesos internos y costos operativos de tu clínica. Implementamos mejoras en la gestión de recursos, negociación con proveedores y organización de procesos para maximizar la rentabilidad y eficiencia operativa.",
    beneficios: [
      "Reducción de costes operativos",
      "Mejora de la eficiencia en uso de recursos",
      "Optimización de relaciones con proveedores",
      "Perfeccionamiento de flujos de trabajo"
    ],
    headline: "Reduce hasta un 25% tus costes operativos manteniendo la calidad",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M19 9C19.7956 9 20.5587 8.68393 21.1213 8.12132C21.6839 7.55871 22 6.79565 22 6C22 5.20435 21.6839 4.44129 21.1213 3.87868C20.5587 3.31607 19.7956 3 19 3C18.2044 3 17.4413 3.31607 16.8787 3.87868C16.3161 4.44129 16 5.20435 16 6C16 6.08 16.0059 6.1575 16.0094 6.2369C16.0238 6.57656 16.0309 6.74639 15.9344 6.87955C15.8379 7.01271 15.6758 7.08334 15.3516 7.2246L9.964 9.7385C9.83281 9.80401 9.76722 9.83677 9.69878 9.85306C9.63642 9.8678 9.57203 9.87462 9.50766 9.87334C9.4378 9.87192 9.36734 9.85775 9.2264 9.8294C8.9404 9.7615 8.7974 9.7276 8.6913 9.8C8.5852 9.87236 8.54 10.026 8.44959 10.3334L7.4166 13.4668C7.35661 13.6468 7.32661 13.7368 7.3256 13.8313C7.32471 13.9151 7.33833 13.9982 7.3657 14.0768C7.3959 14.1639 7.4497 14.2379 7.5573 14.386L7.83341 14.7668C7.93011 14.8995 7.97846 14.9658 8.04311 15.016C8.10101 15.0608 8.16713 15.0945 8.2384 15.1154C8.31781 15.1386 8.4057 15.1386 8.5814 15.1386H9.71059C9.8814 15.1386 9.967 15.1386 10.0419 15.1613C10.1093 15.1814 10.1712 15.214 10.2244 15.2573C10.2841 15.3062 10.3286 15.3714 10.4176 15.5018L11.1674 16.6266C11.24 16.7323 11.2763 16.7852 11.326 16.823C11.3705 16.8566 11.4224 16.8799 11.4774 16.8909C11.539 16.9034 11.604 16.8998 11.734 16.8926L13.39 16.7874C13.6425 16.7736 13.7688 16.7668 13.8501 16.7039C13.9315 16.641 13.9706 16.5311 14.049 16.3112L14.5024 14.9514C14.5808 14.7315 14.62 14.6216 14.6874 14.5469C14.7548 14.4722 14.8465 14.4366 15.03 14.3654L15.6136 14.1546C15.7916 14.086 15.8806 14.0517 15.944 13.9822C16.0074 13.9127 16.0338 13.8216 16.0867 13.6394L16.5864 11.6394C16.6393 11.4571 16.6658 11.366 16.64 11.2828C16.6142 11.1996 16.544 11.1366 16.4037 11.0106L15.7824 10.5106C15.6421 10.3845 15.5719 10.3215 15.484 10.2999C15.3961 10.2784 15.3028 10.3003 15.1164 10.3441L13.7104 10.6986C13.5239 10.7425 13.4307 10.7644 13.3518 10.8137C13.2728 10.863 13.2169 10.9359 13.105 11.0816L12.0596 12.4264C11.9477 12.5722 11.8918 12.645 11.8627 12.7328C11.8336 12.8206 11.8336 12.9142 11.8336 13.1014C11.8336 13.2886 11.8336 13.3822 11.7859 13.4542C11.7382 13.5261 11.6535 13.5711 11.484 13.661L10.6096 14.078C10.4401 14.1679 10.3553 14.2129 10.2698 14.2184C10.1844 14.2238 10.0963 14.1892 9.92021 14.1198L9.04541 13.7198C8.86931 13.6505 8.78131 13.6158 8.71121 13.6346C8.64111 13.6533 8.59239 13.7212 8.4949 13.857L7.91341 14.601" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12" stroke="currentColor" stroke-linecap="round"/>
      <path d="M15 12C15 13.6569 16.3431 15 18 15C19.6569 15 21 13.6569 21 12C21 10.3431 19.6569 9 18 9" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12 15C12 16.6569 10.6569 18 9 18C7.34315 18 6 16.6569 6 15C6 13.3431 7.34315 12 9 12" stroke="currentColor" stroke-linecap="round"/>
      <path d="M15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    estadisticas: [
      { valor: "15-25%", descripcion: "Reducción de costes operativos" },
      { valor: "+62%", descripcion: "Incremento en el ticket medio" },
      { valor: "95%", descripcion: "Satisfacción del paciente" }
    ],
    testimonios: [
      {
        texto: "La reducción de costes operativos fue notable desde el primer mes. La eficiencia en el uso de recursos mejoró significativamente.",
        autor: "Dr. Carlos Fernández, Centro Dental Élite"
      },
      {
        texto: "El incremento en el ticket medio de nuestros pacientes fue un resultado positivo. Los nuevos protocolos de venta consultiva han mejorado significativamente la experiencia del paciente.",
        autor: "Dra. Lucía Ramírez, Instituto Dental Avanzado"
      },
      {
        texto: "La mejora en la satisfacción del paciente ha sido notable. Los nuevos protocolos de venta consultiva han mejorado significativamente la experiencia del paciente.",
        autor: "Dr. Roberto Jiménez, Centro Odontológico Internacional"
      }
    ],
    roadmap: [
      { title: "Análisis inicial", description: "Identificamos áreas de mejora en los procesos actuales y definimos objetivos claros." },
      { title: "Implementación de protocolos", description: "Desarrollamos y aplicamos protocolos de optimización para cada área clave de la clínica." },
      { title: "Seguimiento y ajuste", description: "Monitorizamos el rendimiento y realizamos ajustes continuos para mantener la mejora." }
    ],
    color: "#00B29C"
  },
  {
    id: 4,
    title: "Implementación Tecnológica",
    description: "CRMs personalizados para productividad empresarial",
    detalle: "Desarrollamos e implementamos soluciones tecnológicas personalizadas que automatizan y optimizan la gestión de la clínica. Nuestros sistemas CRM específicos para el sector dental mejoran la productividad, el seguimiento de pacientes y la gestión comercial.",
    beneficios: [
      "Automatización de procesos administrativos y comerciales",
      "Seguimiento detallado del ciclo de vida del paciente",
      "Análisis de datos en tiempo real para toma de decisiones",
      "Integración con sistemas de gestión clínica existentes"
    ],
    headline: "Automatiza el 85% de tus procesos con tecnología dental inteligente",
    color: "#008E71",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#008E71" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="#008E71" fill="#008E71" fill-opacity="0.1"/>
      <path d="M2 10H22" stroke="#008E71" stroke-width="1.2"/>
      <path d="M10 21.0001L10 10" stroke="#008E71" stroke-width="1.2"/>
    </svg>`
  },
  {
    id: 5,
    title: "Recursos Humanos",
    description: "Formación, entrenamiento y motivación del equipo",
    detalle: "Desarrollamos programas de formación y motivación específicos para equipos dentales. Creamos culturas organizativas orientadas a la excelencia, con sistemas de incentivos, evaluación del desempeño y planes de carrera adaptados al sector dental.",
    beneficios: [
      "Reducción de la rotación de personal",
      "Aumento de la productividad por empleado",
      "Mejora del clima laboral y trabajo en equipo",
      "Desarrollo de liderazgo en mandos intermedios"
    ],
    headline: "Transforma tu equipo en un activo que multiplica tu facturación",
    color: "#00B29C",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00B29C" stroke-width="0.7">
      <circle cx="9" cy="7" r="3" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <circle cx="15" cy="9" r="2" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <circle cx="19" cy="11" r="1.5" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <circle cx="5" cy="9" r="2" stroke="#00B29C" fill="#00B29C" fill-opacity="0.2"/>
      <path d="M5.75737 13.1213C5.07534 13.8033 4.39331 14.4854 4.39331 15.1674C4.39331 15.8495 4.39331 16.5315 4.93097 16.9605C5.46863 17.3895 6.00629 17.4142 6.8517 17.4142C7.69711 17.4142 8.82383 17.4142 9.5 17.4142" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M12.5 18C12.5 17.1716 13.1716 16.5 14 16.5H16C16.8284 16.5 17.5 17.1716 17.5 18V20H12.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M17.5 18C17.5 17.1716 18.1716 16.5 19 16.5H20C20.8284 16.5 21.5 17.1716 21.5 18V20H17.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M7.5 18C7.5 17.1716 8.17157 16.5 9 16.5H11C11.8284 16.5 12.5 17.1716 12.5 18V20H7.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M2.5 18C2.5 17.1716 3.17157 16.5 4 16.5H5C5.82843 16.5 6.5 17.1716 6.5 18V20H2.5V18Z" fill="#00B29C" fill-opacity="0.4" stroke="#00B29C"/>
      <path d="M14 13L14 14.5" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M19 13L19 14.5" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M9 13L9 14.5" stroke="#00B29C" stroke-linecap="round"/>
      <path d="M5 13L5 14.5" stroke="#00B29C" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 6,
    title: "Control y Seguimiento",
    description: "Dashboards con KPIs y roadmaps para control exhaustivo",
    detalle: "Implementamos sistemas de monitorización y seguimiento con KPIs específicos para clínicas dentales. Desarrollamos dashboards personalizados que permiten visualizar en tiempo real el rendimiento de la clínica en todas sus áreas operativas y comerciales.",
    beneficios: [
      "Visualización en tiempo real de KPIs clave",
      "Identificación temprana de desviaciones en objetivos",
      "Toma de decisiones basada en datos",
      "Seguimiento de la evolución del negocio"
    ],
    headline: "Controla cada métrica de tu clínica con dashboards en tiempo real",
    color: "#007A8D",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#007A8D" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="#007A8D" fill="#007A8D" fill-opacity="0.1"/>
      <path d="M21 9H3" stroke="#007A8D" stroke-linecap="round"/>
      <path d="M6 7H7" stroke="#007A8D" stroke-linecap="round"/>
      <path d="M9 7H10" stroke="#007A8D" stroke-linecap="round"/>
      <rect x="4" y="12" width="4" height="6" rx="0.5" fill="#007A8D" fill-opacity="0.4" stroke="#007A8D"/>
      <rect x="10" y="12" width="4" height="6" rx="0.5" fill="#007A8D" fill-opacity="0.6" stroke="#007A8D"/>
      <rect x="16" y="12" width="4" height="6" rx="0.5" fill="#007A8D" fill-opacity="0.8" stroke="#007A8D"/>
      <path d="M6 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M8 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M12 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M14 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M18 12V18" stroke="#007A8D" stroke-width="0.7"/>
      <path d="M20 12V18" stroke="#007A8D" stroke-width="0.7"/>
    </svg>`
  },
];

const ServiciosDentalAlt = () => {
  return (
    <div className="py-20" id="servicios">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      
      <div className="relative z-10 mb-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          Nuestros <span className="text-purple">Servicios</span>
        </h2>
        
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-8">
          Las claves del método Dental Pro
        </p>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto">
          Aplicamos metodologías específicas para aumentar la facturación de clínicas dentales a través de estrategias especializadas en cada área del negocio.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {servicios.map((servicio) => (
          <TiltCard 
            key={servicio.id} 
            id={servicio.id}
            title={servicio.title}
            description={servicio.description}
            icon={servicio.icon}
          />
        ))}
      </div>
    </div>
  );
};

interface TiltCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const TiltCard = ({ id, title, description, icon }: TiltCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const shine = shineRef.current;

    if (shine) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 80%)`;
      shine.style.opacity = '1';
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (shineRef.current) {
      shineRef.current.style.opacity = '0';
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Obtener el servicio detallado correspondiente
  const getServicioDetallado = () => {
    return serviciosDetallados.find(servicio => servicio.id === id);
  };

  // Obtener el color del servicio o usar un color predeterminado
  const getServiceColor = () => {
    const servicioDetallado = getServicioDetallado();
    if (servicioDetallado) {
      return servicioDetallado.color;
    }
    return brandColors.primaryTurquoise; // Cambiado de primaryPurple a primaryTurquoise
  };

  // Obtener el color para la barra superior y el "Descubre más"
  const getAccentColor = () => {
    const servicioDetallado = getServicioDetallado();
    if (servicioDetallado) {
      return servicioDetallado.color;
    }
    return brandColors.primaryTurquoise; // Cambiado de primaryPurple a primaryTurquoise
  };

  const getPatternStyle = (): React.CSSProperties => {
    const pattern = id % 3;
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${getAccentColor()}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
    };
  };

  // Función para renderizar un icono SVG mejorado
  const renderEnhancedIcon = () => {
    // Devolver el icono SVG con un ambiente para color
    return (
      <div
        className="w-12 h-12 flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  };

  // Obtener el servicio detallado
  const servicioDetallado = getServicioDetallado();

  return (
    <>
      <div
        className="flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm h-full w-full shadow-md"
        style={{
          background: "rgba(13, 16, 25, 0.7)",
          border: `1px solid ${getAccentColor()}20`,
          boxShadow: `0 4px 30px ${getAccentColor()}20`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
        ref={cardRef}
      >
        <div className="flex flex-col items-center w-full h-full">
          {/* Icono del servicio */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
            style={{
              background: `linear-gradient(135deg, ${brandColors.darkTurquoise}30 0%, ${brandColors.primaryTurquoise}60 100%)` // Cambiado
            }}
          >
            {renderEnhancedIcon()}
          </div>

          {/* Título del servicio */}
          <h3 className="text-xl font-bold text-center mb-2">
            {title}
          </h3>

          {/* Descripción del servicio */}
          <p className="text-white/60 text-center text-sm md:text-md" style={{ color: `${brandColors.lightTurquoise}cc` }}> {/* Cambiado */}
            {description}
          </p>
        </div>

        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none" ref={shineRef} />
      </div>

      {/* Modal para detalles del servicio */}
      {isModalOpen && servicioDetallado && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={servicioDetallado.title}
        >
          <div className="p-6 overflow-y-auto">
            {/* Contenido del modal */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {servicioDetallado.headline}
            </h2>
            <p className="text-gray-300 mb-8 text-lg border-l-4 pl-4" style={{ borderColor: servicioDetallado.color }}>
              {servicioDetallado.detalle}
            </p>
            {/* Resto del contenido modal... */}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ServiciosDentalAlt; 