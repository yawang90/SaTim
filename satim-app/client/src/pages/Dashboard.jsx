import React from 'react';
import {Box, Toolbar, Typography} from '@mui/material';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h4">Dashboard</Typography>
                <Typography>Willkommen eingeloggter User!</Typography>
            </Box>
        </Box>
    );
};

export default DashboardPage;
