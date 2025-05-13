import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import RegistrationButton from "../components/RegistrationButton";

const WelcomePage = () => {
    return (
        <MainLayout>
            <Box sx={{
                minHeight: '60vh',
                alignItems: 'center',
                display: 'flex'
            }}>
                <Container>
                    <Typography variant="h3" gutterBottom>
                        Willkommen bei SaTim
                    </Typography>
                    <Typography variant="h3" color="primary" gutterBottom>
                        Willkommen bei SaTiM
                    </Typography>
                    <RegistrationButton></RegistrationButton>
                </Container>
            </Box>

            <Box sx={{bgcolor: 'primary.light', color: 'white', py: 8}}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Jetzt starten
                    </Typography>
                    <Typography variant="body1">
                        Verwalten Sie Ihre Projekte und Evaluierungen.
                    </Typography>
                </Container>
            </Box>
            <Box sx={{bgcolor: 'grey.200', py: 8}}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Funktionen
                    </Typography>
                    <Typography variant="body1">
                        Verwalten Sie Ihre Projekte und Evaluierungen.
                    </Typography>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default WelcomePage;

