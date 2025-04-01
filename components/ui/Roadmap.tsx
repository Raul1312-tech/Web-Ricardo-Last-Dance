"use client";
import React from "react";
import { motion } from "framer-motion";
import { RoadmapIllustration } from "./RoadmapIllustration";

interface Step {
  title: string;
  description: string;
  hasIllustration?: boolean;
  illustrationType?: string;
}

interface RoadmapProps {
  steps: Step[];
  color: string;
}

export const Roadmap = ({ steps, color }: RoadmapProps) => {
  const handleStepClick = (e: React.MouseEvent) => {
    // Prevenir que el clic se propague y cierre el modal
    e.stopPropagation();
  };

  return (
    <div className="py-8" onClick={handleStepClick}>
      <div className="relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="mb-12 relative"
            onClick={handleStepClick}
          >
            {/* Línea de conexión */}
            {index < steps.length - 1 && (
              <div
                className="absolute left-7 top-10 w-0.5 h-full -z-10"
                style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
              />
            )}

            <div className="flex items-start gap-6">
              {/* Círculo numerado */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0 text-white font-bold text-lg"
                style={{ background: color }}
              >
                {index + 1}
              </div>

              <div className="mt-1 flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>

                {/* Ilustración si el paso la tiene */}
                {step.hasIllustration && (
                  <div className="mt-6">
                    <RoadmapIllustration
                      type={step.illustrationType || "default"}
                      color={color}
                      step={index}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 