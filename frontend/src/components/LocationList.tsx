import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid2, Typography } from '@mui/material';

// Define la interfaz para una ubicación (location)
interface Location {
    code: number;
    name: string;
    image: string;
    creationDate: string;
}

const LocationList: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]); // Especificamos que es un array de 'Location'
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:85/api/locations', {
                    method: 'GET',
                    headers: {
                        'x-api-key': 'pf1dzmic348jub4qxcww'
                    },
                });

                const result = await response.json();

                // Acceder a result.data, verificando que sea un array de Location
                if (Array.isArray(result.data)) {
                    setLocations(result.data);
                } else {
                    console.error('La respuesta no es un array:', result);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    // Mostrar un mensaje mientras los datos están cargando
    if (loading) {
        return <Typography variant="h6">Cargando sedes...</Typography>;
    }

    // Mostrar un mensaje si no hay sedes
    if (locations.length === 0) {
        return <Typography variant="h6">No se encontraron sedes.</Typography>;
    }

    return (
      <Grid2 container spacing={2}> 
      {locations.map((location) => (
          <Grid2 size={{ xs: 12, sm:6, md: 4 }}> 
              <Card>
                  <CardContent>
                      <img src={location.image} alt={location.name} style={{ width: '100%' }} />
                      <Typography variant="h5">{location.name}</Typography>
                      <Typography variant="subtitle1">{location.code}</Typography>
                      <Typography variant="body2">{new Date(location.creationDate).toLocaleDateString()}</Typography>
                  </CardContent>
              </Card>
          </Grid2>
      ))}
  </Grid2>
    );
};

export default LocationList;
