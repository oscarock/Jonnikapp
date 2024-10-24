import React from 'react';
import LocationList from './components/LocationList'; // Importa tu componente LocationList
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                Lista de Sedes
            </Typography>
            {/* Renderiza el componente LocationList */}
            <LocationList />
        </Container>
    );
};

export default App;