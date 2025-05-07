import React from 'react';
import {Typography} from "@mui/material";
import RegistrationButton from "../components/registrationButton";
import LoginButton from "../components/loginButton";

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
                <p></p>
                <RegistrationButton></RegistrationButton>
                <p></p>
                <LoginButton></LoginButton>
            </div>
        </div>
    );
};

export default WelcomePage;

