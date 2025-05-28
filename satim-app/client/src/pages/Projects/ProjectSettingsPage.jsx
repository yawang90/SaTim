import React from 'react';
import {Box} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate} from "react-router-dom";
import {dashboardSidebar, settingsSidebar} from "../../components/SidebarConfig";

const ProjectSettingsPage = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={[...dashboardSidebar(navigate), ...settingsSidebar(navigate)]} />
            </Box>
        </MainLayout>
    );
};

export default ProjectSettingsPage;
