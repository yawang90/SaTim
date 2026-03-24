import React from 'react';
import {Box, Paper, Toolbar, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import MainLayout from "../../../layouts/MainLayout";
import Sidebar from "../../../components/Sidebar";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../../components/SidebarConfig";
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";
import {getCompetencesExcel} from "../../../services/SurveyService";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const CompetencesPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {surveyId, projectId} = useParams();
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

    const handleDownloadExcel = async () => {
        try {
            const blob = await getCompetencesExcel(surveyId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `competences-${surveyId}.xlsx`;

            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <MainLayout>
            <Box sx={{display: 'flex', height: '100vh'}}>
                <Sidebar items={sidebarItems}   surveySection={
                    <SurveySidebarSection
                        t={t}
                        navigate={navigate}
                        surveys={surveys}
                    />
                }/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Box sx={{ px: 4 }}>
                        <Typography variant="h4" gutterBottom>{t("competences.title")}</Typography>
                        <Typography variant="h6" gutterBottom>{t("competences.description")}
                        </Typography>
                    </Box>
                    <Box sx={{ px: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <Paper elevation={3} sx={{width: 280, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}} onClick={handleDownloadExcel}>
                            <FileDownloadIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                            <Typography variant="body1" mt={2}>
                                {t("competences.downloadExcel") || "Download Excel"}
                            </Typography>
                        </Paper>
            {/*            <Paper elevation={3} sx={{width: 280, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}} onClick={handleDownloadExcel}>
                            <FileDownloadIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                            <Typography variant="body1" mt={2}>
                                {t("competences.downloadExcel") || "Download Excel"}
                            </Typography>
                        </Paper>*/}
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default CompetencesPage;
