import React from 'react';
import {Button, Typography} from "@mui/material";

const WelcomePage = () => {
    return (
        <div className="landing-container">
            <header className="header">
                <img src="/resources/phsg-logo.png" alt="phsg logo" className="logo"/>
                <div className="banner-space"></div>
            </header>
            <div className="content">
                <Typography variant="h2" style={{color: 'var(--color-primary)'}} gutterBottom>
                    Willkommen bei SaTim
                </Typography>
                <Button variant="contained" size="large" color="primary">
                    Registrieren
                </Button>
                <p></p>
                <Button variant="contained" size="large" color="primary">
                    Einloggen
                </Button>
            </div>
        </div>
    );
};

export default WelcomePage;

