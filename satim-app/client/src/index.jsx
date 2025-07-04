import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from './styles/theme';
import {AuthProvider} from "./contexts/AuthContext";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
);