'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TeamMember = ({ member, onClick, index, isLoaded }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, index * 150); // Animación escalonada

            return () => clearTimeout(timer);
        }
    }, [isLoaded, index]);

    return (
        <motion.div
            className={`hexagon-container ${isVisible ? 'visible' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={onClick}
        >
            <div className="hexagon">
                <div className="hexagon-inner">
                    <div
                        className="hexagon-photo"
                        style={{ backgroundImage: `url(${member.photo})` }}
                    />
                </div>
            </div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="preview">{member.preview}</p>
        </motion.div>
    );
};

export default TeamMember; 