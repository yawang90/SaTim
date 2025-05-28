import React from 'react';
import {Box} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {useTranslation} from "react-i18next";

const MemberPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {projectId} = useParams();

    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={sidebarItems} />
            </Box>
        </MainLayout>
    );
};

export default MemberPage;
