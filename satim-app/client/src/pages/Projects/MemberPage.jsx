import React from 'react';
import {Box} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate} from "react-router-dom";
import {dashboardSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {useTranslation} from "react-i18next";

const MemberPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={[...dashboardSidebar(t, navigate), ...settingsSidebar(t, navigate)]} />
            </Box>
        </MainLayout>
    );
};

export default MemberPage;
