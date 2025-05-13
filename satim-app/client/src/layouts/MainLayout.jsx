import React from 'react';
import AppBar from '../components/AppBar';

const MainLayout = ({ children }) => {
    return (
        <>
            <AppBar/>
            <main style={{ padding: '2rem' }}>
                {children}
            </main>
        </>
    );
};

export default MainLayout;
