import React from 'react';
import {Box, Toolbar, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import MainLayout from "../../../layouts/MainLayout";
import Sidebar from "../../../components/Sidebar";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../../components/SidebarConfig";
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";

const CompetencesPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {projectId, surveyId} = useParams();
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const surveys = [
        { id: 'survey1', name: 'Erhebung 1' },
        { id: 'survey2', name: 'Erhebung 2' },
    ];

    return (
        <MainLayout>
            <Box sx={{display: 'flex', height: '100vh'}}>
                <Sidebar items={sidebarItems}   surveySection={
                    <SurveySidebarSection
                        t={t}
                        navigate={navigate}
                        projectId={projectId}
                        surveys={surveys}
                    />
                }/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Box sx={{ px: 4 }}>
                        <Typography variant="h4" gutterBottom>{"Übersicht der Kompetenzen"}</Typography>
                        <Typography variant="h6" gutterBottom>{"Beschreibung"}</Typography>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default CompetencesPage;
