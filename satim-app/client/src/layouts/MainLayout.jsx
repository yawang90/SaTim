import React from 'react';
import AppBar from '../components/AppBar';
import {SnackbarProvider} from "notistack";

const MainLayout = ({ children }) => {
    return (
        <>
            <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
            <AppBar/>
            <main style={{ padding: '2rem' }}>
                {children}
            </main>
            </SnackbarProvider>
        </>
    );
};

export default MainLayout;
