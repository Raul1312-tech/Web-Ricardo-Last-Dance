"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "../ui/Modal";

// Colores de marca
const brandColors = {
  primaryPurple: "#8B5CF6", // Morado principal
  darkPurple: "#6D28D9",    // Morado oscuro
  lightPurple: "#A78BFA",   // Morado claro
  neonGreen: "#4ADE80",     // Verde chicle
  darkNeonGreen: "#10B981", // Verde chicle oscuro
};

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
    </svg>`
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
    </svg>`
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
    </svg>`
  },
  {
    id: 4,
    title: "Implementación Tecnológica",
    description: "CRMs personalizados para productividad empresarial",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M2 10H22" stroke="currentColor" stroke-width="1.2"/>
      <path d="M10 21.0001L10 10" stroke="currentColor" stroke-width="1.2"/>
      <path d="M16.5 16.5H13.5V13.5H16.5V16.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M6.5 16.5H3.5V13.5H6.5V16.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M16.5 7.5H13.5V4.5H16.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M6.5 7.5H3.5V4.5H6.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M20.5 7.5H17.5V4.5H20.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M12.5 7.5H7.5V4.5H12.5V7.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M12.5 16.5H7.5V13.5H12.5V16.5Z" fill="currentColor" stroke="currentColor"/>
      <path d="M20.5 16.5H17.5V13.5H20.5V16.5Z" fill="currentColor" stroke="currentColor"/>
    </svg>`
  },
  {
    id: 5,
    title: "Recursos Humanos",
    description: "Formación, entrenamiento y motivación del equipo",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <circle cx="9" cy="7" r="3" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="15" cy="9" r="2" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="19" cy="11" r="1.5" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="5" cy="9" r="2" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <path d="M5.75737 13.1213C5.07534 13.8033 4.39331 14.4854 4.39331 15.1674C4.39331 15.8495 4.39331 16.5315 4.93097 16.9605C5.46863 17.3895 6.00629 17.4142 6.8517 17.4142C7.69711 17.4142 8.82383 17.4142 9.5 17.4142" stroke="currentColor" stroke-linecap="round"/>
      <path d="M12.5 18C12.5 17.1716 13.1716 16.5 14 16.5H16C16.8284 16.5 17.5 17.1716 17.5 18V20H12.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M17.5 18C17.5 17.1716 18.1716 16.5 19 16.5H20C20.8284 16.5 21.5 17.1716 21.5 18V20H17.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M7.5 18C7.5 17.1716 8.17157 16.5 9 16.5H11C11.8284 16.5 12.5 17.1716 12.5 18V20H7.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M2.5 18C2.5 17.1716 3.17157 16.5 4 16.5H5C5.82843 16.5 6.5 17.1716 6.5 18V20H2.5V18Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M14 13L14 14.5" stroke="currentColor" stroke-linecap="round"/>
      <path d="M19 13L19 14.5" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 13L9 14.5" stroke="currentColor" stroke-linecap="round"/>
      <path d="M5 13L5 14.5" stroke="currentColor" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 6,
    title: "Control y Seguimiento",
    description: "Dashboards con KPIs y roadmaps para control exhaustivo",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M21 9H3" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 7H7" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 7H10" stroke="currentColor" stroke-linecap="round"/>
      <rect x="4" y="12" width="4" height="6" rx="0.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <rect x="10" y="12" width="4" height="6" rx="0.5" fill="currentColor" fill-opacity="0.6" stroke="currentColor"/>
      <rect x="16" y="12" width="4" height="6" rx="0.5" fill="currentColor" fill-opacity="0.8" stroke="currentColor"/>
      <path d="M6 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M8 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M12 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M14 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M18 12V18" stroke="currentColor" stroke-width="0.7"/>
      <path d="M20 12V18" stroke="currentColor" stroke-width="0.7"/>
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
    color: "#8B5CF6"
  },
  {
    id: 2,
    title: "Auditoría Comercial",
    description: "Desde pre-venta telefónica hasta cierre de tratamientos de alto valor",
    detalle: "Analizamos y optimizamos todo el proceso comercial de la clínica, desde la atención telefónica inicial hasta el cierre de tratamientos complejos. Implementamos protocolos de venta consultiva adaptados al sector dental que mejoran significativamente las tasas de conversión.",
    beneficios: [
      "Incremento en la tasa de conversión de presupuestos",
      "Aumento del ticket medio por paciente",
      "Mejora en la experiencia del paciente",
      "Protocolos estandarizados para tratamientos de alto valor"
    ],
    headline: "Convierte el 80% de tus presupuestos en tratamientos aceptados",
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
    color: "#EC4899"
  },
  {
    id: 3,
    title: "Optimización de Procesos",
    description: "Auditoría de gastos, optimización de recursos y organización de proveedores",
    detalle: "Realizamos una auditoría exhaustiva de los procesos internos de la clínica para identificar ineficiencias y optimizar recursos. Analizamos gastos, proveedores y flujos de trabajo para maximizar la rentabilidad sin comprometer la calidad asistencial.",
    beneficios: [
      "Reducción de costes operativos entre un 15-25%",
      "Optimización de compras y gestión de proveedores",
      "Mejora de la eficiencia en procesos clínicos",
      "Sistemas de control de gastos e inventario"
    ],
    headline: "Aumenta tu rentabilidad neta en un 23% optimizando procesos internos",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"/>
      <path d="M19 9C19.7956 9 20.5587 8.68393 21.1213 8.12132C21.6839 7.55871 22 6.79565 22 6C22 5.20435 21.6839 4.44129 21.1213 3.87868C20.5587 3.31607 19.7956 3 19 3C18.2044 3 17.4413 3.31607 16.8787 3.87868C16.3161 4.44129 16 5.20435 16 6C16 6.08 16.0059 6.1575 16.0094 6.2369C16.0238 6.57656 16.0309 6.74639 15.9344 6.87955C15.8379 7.01271 15.6758 7.08334 15.3516 7.2246L9.964 9.7385C9.83281 9.80401 9.76722 9.83677 9.69878 9.85306C9.63642 9.8678 9.57203 9.87462 9.50766 9.87334C9.4378 9.87192 9.36734 9.85775 9.2264 9.8294C8.9404 9.7615 8.7974 9.7276 8.6913 9.8C8.5852 9.87236 8.54 10.026 8.44959 10.3334L7.4166 13.4668C7.35661 13.6468 7.32661 13.7368 7.3256 13.8313C7.32471 13.9151 7.33833 13.9982 7.3657 14.0768C7.3959 14.1639 7.4497 14.2379 7.5573 14.386L7.83341 14.7668C7.93011 14.8995 7.97846 14.9658 8.04311 15.016C8.10101 15.0608 8.16713 15.0945 8.2384 15.1154C8.31781 15.1386 8.4057 15.1386 8.5814 15.1386H9.71059C9.8814 15.1386 9.967 15.1386 10.0419 15.1613C10.1093 15.1814 10.1712 15.214 10.2244 15.2573C10.2841 15.3062 10.3286 15.3714 10.4176 15.5018L11.1674 16.6266C11.24 16.7323 11.2763 16.7852 11.326 16.823C11.3705 16.8566 11.4224 16.8799 11.4774 16.8909C11.539 16.9034 11.604 16.8998 11.734 16.8926L13.39 16.7874C13.6425 16.7736 13.7688 16.7668 13.8501 16.7039C13.9315 16.641 13.9706 16.5311 14.049 16.3112L14.5024 14.9514C14.5808 14.7315 14.62 14.6216 14.6874 14.5469C14.7548 14.4722 14.8465 14.4366 15.03 14.3654L15.6136 14.1546C15.7916 14.086 15.8806 14.0517 15.944 13.9822C16.0074 13.9127 16.0338 13.8216 16.0867 13.6394L16.5864 11.6394C16.6393 11.4571 16.6658 11.366 16.64 11.2828C16.6142 11.1996 16.544 11.1366 16.4037 11.0106L15.7824 10.5106C15.6421 10.3845 15.5719 10.3215 15.484 10.2999C15.3961 10.2784 15.3028 10.3003 15.1164 10.3441L13.7104 10.6986C13.5239 10.7425 13.4307 10.7644 13.3518 10.8137C13.2728 10.863 13.2169 10.9359 13.105 11.0816L12.0596 12.4264C11.9477 12.5722 11.8918 12.645 11.8627 12.7328C11.8336 12.8206 11.8336 12.9142 11.8336 13.1014C11.8336 13.2886 11.8336 13.3822 11.7859 13.4542C11.7382 13.5261 11.6535 13.5711 11.484 13.661L10.6096 14.078C10.4401 14.1679 10.3553 14.2129 10.2698 14.2184C10.1844 14.2238 10.0963 14.1892 9.92021 14.1198L9.04541 13.7198C8.86931 13.6505 8.78131 13.6158 8.71121 13.6346C8.64111 13.6533 8.59239 13.7212 8.4949 13.857L7.91341 14.601" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    estadisticas: [
      { valor: "23%", descripcion: "Aumento promedio en rentabilidad" },
      { valor: "37%", descripcion: "Reducción de tiempo en gestiones" },
      { valor: "17K€", descripcion: "Ahorro anual promedio en gastos" }
    ],
    testimonios: [
      {
        texto: "Conseguimos reducir 42.000€ anuales en gastos mientras aumentamos nuestra productividad.",
        autor: "Dr. Miguel Álvarez, Instituto Dental Barcelona"
      },
      {
        texto: "La reorganización de procesos nos permitió atender un 27% más de pacientes con el mismo personal.",
        autor: "Dra. Elena Torres, Clínica Dental Familiar"
      },
      {
        texto: "Optimizamos la gestión de inventario y ahorramos más de 2.300€ mensuales en material fungible.",
        autor: "Dr. Alejandro Soto, Clínica Odontológica Central"
      }
    ],
    roadmap: [
      { title: "Auditoría completa", description: "Analizamos cada proceso, gasto y recurso de tu clínica para identificar ineficiencias." },
      { title: "Rediseño de flujos de trabajo", description: "Optimizamos protocolos y asignación de recursos para máxima eficiencia." },
      { title: "Implementación de sistemas de control", description: "Establecemos KPIs y herramientas para monitorizar la eficiencia operativa." }
    ],
    color: "#10B981"
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
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M2 10H22" stroke="currentColor" stroke-width="1.2"/>
      <path d="M10 21.0001L10 10" stroke="currentColor" stroke-width="1.2"/>
    </svg>`,
    estadisticas: [
      { valor: "72%", descripcion: "Reducción de tareas administrativas" },
      { valor: "56%", descripcion: "Mejora en seguimiento de pacientes" },
      { valor: "41%", descripcion: "Aumento en productividad" }
    ],
    testimonios: [
      {
        texto: "La implementación del CRM nos permitió triplicar nuestra capacidad de gestión sin aumentar el personal.",
        autor: "Dra. Laura González, Clínica Dental Elite"
      },
      {
        texto: "La automatización de citas y recordatorios redujo nuestras cancelaciones en un 68% desde el primer mes.",
        autor: "Dr. Gabriel Martín, Centro Implantológico Dental"
      },
      {
        texto: "Gracias a la tecnología implementada, nuestras auxiliares ahorran 12 horas semanales en tareas administrativas.",
        autor: "Dra. Sofía Navarro, Clínica Dental Premium"
      }
    ],
    roadmap: [
      { title: "Análisis de necesidades tecnológicas", description: "Evaluamos tu infraestructura actual y definimos objetivos de digitalización." },
      { title: "Implementación de soluciones", description: "Instalamos y configuramos sistemas CRM, agendas digitales y automatizaciones." },
      { title: "Entrenamiento y optimización", description: "Capacitamos a tu equipo y refinamos los sistemas para maximizar resultados." }
    ],
    color: "#3B82F6"
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
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <circle cx="9" cy="7" r="3" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="15" cy="9" r="2" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="19" cy="11" r="1.5" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="5" cy="9" r="2" stroke="currentColor" fill="currentColor" fill-opacity="0.2"/>
    </svg>`,
    estadisticas: [
      { valor: "68%", descripcion: "Reducción en rotación de personal" },
      { valor: "47%", descripcion: "Aumento en productividad por empleado" },
      { valor: "92%", descripcion: "Satisfacción del equipo" }
    ],
    testimonios: [
      {
        texto: "Pasamos de una rotación del 40% anual a solo un 8% y la productividad del equipo aumentó un 62%.",
        autor: "Dr. Carlos Ruiz, Clínicas Dentales Innovación"
      },
      {
        texto: "El programa de incentivos transformó por completo la motivación del equipo. Ahora todos reman en la misma dirección.",
        autor: "Dra. Patricia Vega, Clínica Dental Integral"
      },
      {
        texto: "Las formaciones en liderazgo para mandos intermedios han sido clave para escalar nuestro negocio a tres clínicas.",
        autor: "Dr. Javier Méndez, Grupo Dental Avanzado"
      }
    ],
    roadmap: [
      { title: "Diagnóstico de cultura y equipo", description: "Evaluamos el clima laboral, las competencias y necesidades del personal." },
      { title: "Diseño de planes de incentivos", description: "Creamos sistemas de remuneración variable vinculados a objetivos claros." },
      { title: "Programas de desarrollo y liderazgo", description: "Implementamos formaciones específicas para cada rol en la clínica." }
    ],
    color: "#F59E0B"
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
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.7">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" fill="currentColor" fill-opacity="0.1"/>
      <path d="M21 9H3" stroke="currentColor" stroke-linecap="round"/>
      <path d="M6 7H7" stroke="currentColor" stroke-linecap="round"/>
      <path d="M9 7H10" stroke="currentColor" stroke-linecap="round"/>
    </svg>`,
    estadisticas: [
      { valor: "87%", descripcion: "Mejora en toma de decisiones" },
      { valor: "53%", descripcion: "Aumento en cumplimiento de objetivos" },
      { valor: "94%", descripcion: "Detección temprana de desviaciones" }
    ],
    testimonios: [
      {
        texto: "Por fin tenemos total claridad sobre el rendimiento de cada área y podemos anticiparnos a los problemas.",
        autor: "Dra. Patricia Gómez, Centro Odontológico Avanzado"
      },
      {
        texto: "Los dashboards nos permiten tomar decisiones basadas en datos en tiempo real, lo que ha mejorado nuestra rentabilidad en un 34%.",
        autor: "Dr. Manuel Herrera, Clínica Dental Tecnológica"
      },
      {
        texto: "El seguimiento detallado nos ha permitido identificar oportunidades de mejora que estaban ocultas durante años.",
        autor: "Dra. Carmen Sanz, Instituto Dental Científico"
      }
    ],
    roadmap: [
      { title: "Definición de métricas clave", description: "Identificamos los KPIs más relevantes para tu modelo de negocio." },
      { title: "Implementación de dashboards", description: "Desarrollamos paneles de control visuales adaptados a tus necesidades." },
      { title: "Formación en análisis de datos", description: "Capacitamos a tu equipo directivo en el uso estratégico de la información." }
    ],
    color: "#6366F1"
  },
];

const ServiciosDentalAlt = () => {
  return (
    <div className="py-20" id="servicios">
      <h2 className="text-4xl font-bold text-center mb-4">
        Nuestros <span className="text-purple">Servicios</span>
      </h2>
      
      <h3 className="text-2xl font-bold text-center mb-6 text-gradient-primary">
        Las claves del método Dental Pro
      </h3>
      
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
        Aplicamos metodologías específicas para aumentar la facturación de clínicas dentales a través de estrategias especializadas en cada área del negocio.
      </p>
      
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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Centro de la tarjeta
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcular rotación (máximo 40 grados - más pronunciado)
    const rotateX = ((y - centerY) / centerY) * -20; // Reducido a la mitad para menor inclinación
    const rotateY = ((x - centerX) / centerX) * 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // Función para abrir el modal
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Obtener datos detallados del servicio
  const getServicioDetallado = () => {
    return serviciosDetallados.find(servicio => servicio.id === id);
  };

  const servicioDetallado = getServicioDetallado();

  // Patrones gráficos según ID
  const getPatternStyle = () => {
    const patterns = [
      `radial-gradient(circle at 15% 85%, ${brandColors.darkPurple}20 0%, transparent 35%)`,
      `linear-gradient(135deg, ${brandColors.darkPurple}20 0%, transparent 50%)`,
      `repeating-linear-gradient(45deg, ${brandColors.darkPurple}10 0%, ${brandColors.darkPurple}10 10px, transparent 10px, transparent 20px)`,
      `radial-gradient(circle at 85% 15%, ${brandColors.darkPurple}20 0%, transparent 35%)`,
      `linear-gradient(45deg, ${brandColors.darkPurple}20 0%, transparent 50%)`,
      `repeating-radial-gradient(circle at 50% 50%, ${brandColors.darkPurple}10 0%, ${brandColors.darkPurple}10 10px, transparent 10px, transparent 20px)`,
    ];
    return patterns[(id - 1) % patterns.length];
  };
  
  // Renderizar el icono animado con efectos visuales mejorados
  const renderEnhancedIcon = () => {
    return (
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1.1 : 1, 
            opacity: 1,
            rotate: isHovered ? 5 : 0
          }}
          transition={{
            scale: { 
              duration: 0.3,
              ease: "easeOut"
            },
            opacity: { duration: 0.3 },
            rotate: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
        >
          {/* Círculo exterior con glow */}
          <motion.div 
            className={`absolute w-[110px] h-[110px] rounded-full`}
            animate={{
              scale: isHovered ? [1, 1.05, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full rounded-full" 
              style={{ 
                backgroundImage: `radial-gradient(circle, ${brandColors.primaryPurple}20 0%, transparent 70%)`,
                boxShadow: `0 0 15px ${brandColors.primaryPurple}33, inset 0 0 10px ${brandColors.primaryPurple}40`
              }}
            />
          </motion.div>
          
          {/* Círculo principal */}
          <motion.div 
            className="absolute w-[95px] h-[95px] rounded-full"
            animate={{
              scale: isHovered ? [1, 1.03, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full rounded-full" 
              style={{ 
                backgroundImage: `linear-gradient(145deg, ${brandColors.darkPurple}30, ${brandColors.primaryPurple}10)`,
                boxShadow: `0 0 10px ${brandColors.darkPurple}33, inset 0 0 8px ${brandColors.primaryPurple}30` 
              }}
            />
          </motion.div>
          
          {/* Círculo interior */}
          <motion.div 
            className="absolute w-[80px] h-[80px] rounded-full"
            animate={{
              scale: isHovered ? [1, 1.02, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full rounded-full" 
              style={{ 
                backgroundImage: `radial-gradient(circle, ${brandColors.primaryPurple}40 0%, ${brandColors.darkPurple}10 70%)`,
                boxShadow: `inset 0 0 8px ${brandColors.darkPurple}30` 
              }}
            />
          </motion.div>
          
          {/* Icono SVG */}
          <motion.div 
            className="relative z-10 w-[64px] h-[64px] flex items-center justify-center"
            animate={{
              scale: isHovered ? [1, 1.08, 1] : 1,
              rotate: isHovered ? [0, -2, 0, 2, 0] : 0,
            }}
            transition={{
              scale: {
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              },
              rotate: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <div 
              className="w-full h-full flex items-center justify-center" 
              style={{ color: brandColors.neonGreen }}
              dangerouslySetInnerHTML={{ __html: icon }} 
            />
          </motion.div>
          
          {/* Partículas decorativas */}
          {isHovered && (
            <>
              <motion.div 
                className="absolute w-1.5 h-1.5 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, 30, 20], 
                  y: [0, -20, -40],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: brandColors.neonGreen, boxShadow: `0 0 5px ${brandColors.neonGreen}` }} 
                />
              </motion.div>
              <motion.div 
                className="absolute w-2 h-2 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, -35, -25], 
                  y: [0, -10, -30],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: brandColors.neonGreen, boxShadow: `0 0 5px ${brandColors.neonGreen}` }} 
                />
              </motion.div>
              <motion.div 
                className="absolute w-1 h-1 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, 25, 40], 
                  y: [0, 25, 10],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: brandColors.neonGreen, boxShadow: `0 0 5px ${brandColors.neonGreen}` }} 
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    );
  };
  
  return (
    <div 
      className="h-[450px] w-full perspective"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className={cn(
          "h-full w-full rounded-xl bg-black/90 border border-gray-800 p-6 flex flex-col shadow-xl overflow-hidden tilt-card",
          isHovered ? "shadow-2xl" : "shadow-md"
        )}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{
          type: "spring", 
          stiffness: 400, 
          damping: 10
        }}
      >
        <div 
          className="absolute inset-0 z-0" 
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, ${brandColors.darkPurple}40 100%)`
          }}
        />
        
        {/* Elemento decorativo - círculos */}
        <div className="absolute right-4 top-1/3 w-20 h-20 rounded-full opacity-10" 
          style={{ background: brandColors.primaryPurple, filter: "blur(20px)" }} 
        />
        <div className="absolute left-2 bottom-1/4 w-12 h-12 rounded-full opacity-10" 
          style={{ background: brandColors.neonGreen, filter: "blur(15px)" }} 
        />
        
        {/* Patrón decorativo basado en el ID */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: getPatternStyle() }}
        />
        
        {/* Contenido de la tarjeta */}
        <div className="relative z-10 h-full flex flex-col tilt-card-content">
          {/* Icono animado y mejorado - Centrado */}
          {renderEnhancedIcon()}
          
          {/* Contenido de texto - Bajado aún más */}
          <div className="mt-[220px]">
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-300 text-sm mb-6">{description}</p>
            
            <button 
              className="text-sm font-medium flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300 mt-auto mx-auto group"
              style={{ color: brandColors.neonGreen }}
              onClick={handleOpenModal}
            >
              <span>Descubre más</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
        
        {/* Barra de color en la parte superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: brandColors.neonGreen }}
        />
        
        {/* Efecto de brillo */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${rotation.y > 0 ? '80%' : '20%'} ${rotation.x > 0 ? '80%' : '20%'}, rgba(255,255,255,0.8), transparent 40%)`,
            opacity: isHovered ? 0.4 : 0,
            transition: "opacity 0.2s ease"
          }}
        />
        
        {/* Luz pequeña que sigue al cursor */}
        {isHovered && (
          <div
            className="absolute w-6 h-6 rounded-full pointer-events-none z-30"
            style={{
              background: `radial-gradient(circle, ${brandColors.neonGreen}aa, transparent 70%)`,
              left: `${50 + rotation.y * 0.5}%`,
              top: `${50 + rotation.x * -0.5}%`,
              transform: "translate(-50%, -50%)",
              filter: "blur(5px)",
              boxShadow: `0 0 10px ${brandColors.neonGreen}`,
            }}
          />
        )}
      </motion.div>

      {/* Modal para mostrar detalles del servicio */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={servicioDetallado?.title || ""}
        >
          {/* Contenido del modal con diseño mejorado */}
          <div className="p-6 overflow-y-auto relative">
            {/* Elementos gráficos decorativos */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" 
              style={{ 
                background: `radial-gradient(circle, ${servicioDetallado?.color}99 0%, transparent 70%)`,
                filter: "blur(40px)"
              }}
            />
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full opacity-10"
              style={{ 
                background: `radial-gradient(circle, ${servicioDetallado?.color}99 0%, transparent 70%)`,
                filter: "blur(30px)"
              }}
            />
            
            {/* Headline principal persuasivo */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {servicioDetallado?.headline}
            </h2>
            
            {/* Descripción detallada */}
            <p className="text-gray-300 mb-8 text-lg border-l-4 pl-4" style={{ borderColor: servicioDetallado?.color }}>
              {servicioDetallado?.detalle}
            </p>
            
            {/* Estadísticas en tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {servicioDetallado?.estadisticas.map((stat, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm"
                  style={{ boxShadow: `0 0 20px ${servicioDetallado.color}20` }}
                >
                  <p className="text-3xl font-bold mb-2" style={{ color: servicioDetallado?.color }}>
                    {stat.valor}
                  </p>
                  <p className="text-gray-300 text-center">
                    {stat.descripcion}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Sección de beneficios */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                <span className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ background: servicioDetallado?.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                Beneficios
              </h3>
              <ul className="space-y-3 pl-6">
                {servicioDetallado?.beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full" style={{ background: `${servicioDetallado.color}30` }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" style={{ color: servicioDetallado?.color }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-gray-300">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Roadmap simplificado */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                <span className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ background: servicioDetallado?.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </span>
                Nuestro Proceso
              </h3>
              
              <div className="relative pl-12 border-l border-dashed" style={{ borderColor: `${servicioDetallado?.color}50` }}>
                {servicioDetallado?.roadmap.map((paso, index) => (
                  <div key={index} className="mb-8 relative">
                    <div className="absolute -left-6 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: index === 0 ? servicioDetallado?.color : `${servicioDetallado?.color}40` }}>
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="pl-4">
                      <h4 className="text-lg font-bold mb-2" style={{ color: index === 0 ? servicioDetallado?.color : 'white' }}>
                        {paso.title}
                      </h4>
                      <p className="text-gray-300">
                        {paso.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonios con grid para mostrar múltiples testimonios */}
            {servicioDetallado?.testimonios && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ background: servicioDetallado?.color }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                  Testimonios
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {servicioDetallado.testimonios.map((testimonio, index) => (
                    <div 
                      key={index}
                      className="p-5 rounded-lg border border-white/10 bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm"
                      style={{ boxShadow: `0 4px 20px ${servicioDetallado.color}20` }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50" style={{ color: servicioDetallado?.color }}>
                        <path d="M10,7L4,7L4,17L10,17L10,12L6,12L10,7Z"></path>
                        <path d="M20,7L14,7L14,17L20,17L20,12L16,12L20,7Z"></path>
                      </svg>
                      <blockquote className="text-gray-300 mb-4 italic text-sm">
                        "{testimonio.texto}"
                      </blockquote>
                      <p className="text-sm font-semibold" style={{ color: servicioDetallado?.color }}>
                        {testimonio.autor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Botón CTA */}
            <div className="mt-8 flex justify-center">
              <button
                className="px-8 py-3 rounded-full font-bold text-black transition-transform transform hover:scale-105 flex items-center gap-2"
                style={{ background: `linear-gradient(45deg, ${servicioDetallado?.color}, ${servicioDetallado?.color}cc)`, boxShadow: `0 5px 20px ${servicioDetallado?.color}50` }}
                onClick={handleCloseModal}
              >
                <span>Quiero implementar este servicio</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ServiciosDentalAlt; 