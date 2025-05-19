import React from 'react';
import {Box, Toolbar, Typography} from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainLayout from "../layouts/MainLayout";

const ProjectPage = () => {
    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>Mein Projekt</Typography>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default ProjectPage;
