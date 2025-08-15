import MainLayout from "../layouts/MainLayout";
import {Box, Typography} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import React from "react";
import RegistrationButton from "../components/RegistrationButton";
import LoginButton from "../components/LoginButton";
import {useTranslation} from "react-i18next";

const LoginPage = () => {
    const {isLoggedIn} = useAuth();
    const { t } = useTranslation();

    if (isLoggedIn) {
        return <Navigate to="/dashboard"/>;
    }

    return (
        <MainLayout>
            <Box sx={{width: 600, mx: 'auto', mt: 12, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2,}}>
                <Typography variant="h5" gutterBottom>
                    {t("welcome")}
                </Typography>
                <Typography variant="body1" align="center" sx={{mb: 3}}>
                    {t("loginPrompt")}
                </Typography>
                <RegistrationButton fullWidth></RegistrationButton>
                <p></p>
                <LoginButton></LoginButton>
            </Box>
        </MainLayout>
    );
};

export default LoginPage;
