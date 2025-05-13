import React from 'react';
import {Typography} from "@mui/material";
import RegistrationButton from "../components/RegistrationButton";
import MainLayout from "../layouts/MainLayout";

const WelcomePage = () => {
    return (
        <MainLayout>
                <div className="content">
                    <Typography variant="h2" style={{color: 'var(--color-primary)'}} gutterBottom>
                        Willkommen bei SaTiM
                    </Typography>
                    <p></p>
                    <RegistrationButton></RegistrationButton>
                </div>
        </MainLayout>
    );
};

export default WelcomePage;

