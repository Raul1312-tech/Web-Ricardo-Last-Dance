'use client';

import React, { useState, useEffect } from 'react';
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { motion } from 'framer-motion';
import TeamMember from './TeamMember';
import TeamModal from './TeamModal';
import { teamMembers } from './teamData';
import './TeamSection.css';

const TeamSection = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Inicializar partículas
    const particlesInit = async (engine) => {
        await loadFull(engine);
    };

    const handleOpenModal = (memberId) => {
        const member = teamMembers.find(m => m.id === memberId);
        if (member) {
            setSelectedMember(member);
            setIsModalOpen(true);
            // Prevenir scroll en el body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Restaurar scroll en el body
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        // Marcar como cargado después de un breve retraso para permitir animaciones
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="team-section">
            <Particles
                id="particles-bg"
                init={particlesInit}
                options={{
                    particles: {
                        number: {
                            value: 80,
                            density: { enable: true, value_area: 800 }
                        },
                        color: { value: "#d3d3d3" }, // Color plateado
                        opacity: {
                            value: 0.5,
                            random: false
                        },
                        size: {
                            value: 3,
                            random: true
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#d3d3d3", // Color plateado
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: false,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: { enable: false, rotateX: 600, rotateY: 1200 }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: true, mode: "grab" },
                            onclick: { enable: true, mode: "push" },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 140, line_linked: { opacity: 1 } },
                            push: { particles_nb: 4 },
                            remove: { particles_nb: 2 }
                        }
                    },
                    retina_detect: true
                }}
            />

            <div className="team-container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="title-text">Nuestro</span>
                    <span className="highlighted">Equipo</span>
                </motion.h2>

                <div className="hexagon-grid">
                    {teamMembers.map((member, index) => (
                        <TeamMember
                            key={member.id}
                            member={member}
                            onClick={() => handleOpenModal(member.id)}
                            index={index}
                            isLoaded={isLoaded}
                        />
                    ))}
                </div>
            </div>

            <TeamModal
                isOpen={isModalOpen}
                member={selectedMember}
                onClose={handleCloseModal}
            />
        </section>
    );
};

export default TeamSection; 