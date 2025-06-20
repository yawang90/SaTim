import React from 'react';
import {Box, Typography} from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import RegistrationButton from "../components/RegistrationButton";
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
    const {isLoggedIn} = useAuth();
    const { t } = useTranslation();

    if (isLoggedIn) {
        return <Navigate to="/dashboard"/>;
    }

    return (
        <MainLayout>
            <Box sx={{
                minHeight: '60vh',
                alignItems: 'center',
                display: 'flex',
                pl: 16
            }}>
                <Box>
                    <Typography variant="h3" gutterBottom>
                        {t("welcome")}
                    </Typography>
                    <Typography variant="h4" color="accent.greyNeutral" gutterBottom>
                        Verwalten Sie Ihre Projekte.
                    </Typography>
                    <Box sx={{pb: 4}}/>
                    <RegistrationButton></RegistrationButton>
                </Box>
            </Box>
            <Box sx={{bgcolor: 'primary.light1', color: 'white', py: 8, pl: 16}}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Jetzt starten
                    </Typography>
                    <Typography variant="body1">
                        Verwalten Sie Ihre Projekte und Erhebungen.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{py: 8, pl: 16}}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Funktionen
                    </Typography>
                    <Typography variant="body1">
                        Verwalten Sie Ihre Projekte und Erhebungen.
                    </Typography>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default WelcomePage;

