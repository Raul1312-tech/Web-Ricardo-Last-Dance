import { useEffect } from 'react';

export default function EquipoTest() {
    useEffect(() => {
        // Redirigir al archivo HTML estático
        window.location.href = '/test-team-section/equipo-test.html';
    }, []);

    return (
        <div style={{
            backgroundColor: '#0a0a1a',
            color: 'white',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            Cargando vista de prueba...
        </div>
    );
} 