import React from 'react';
import {Box, Button, Paper, Stack, Toolbar, Tooltip, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import MainLayout from "../../../layouts/MainLayout";
import Sidebar from "../../../components/Sidebar";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../../components/SidebarConfig";
import {useSnackbar} from 'notistack';
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import BrushIcon from '@mui/icons-material/Brush';
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";

const SurveyDashboardPage = () => {
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
    const {enqueueSnackbar} = useSnackbar();
    const generatedLink = 'https://satim.onrender.com/dashboard'; // Replace with dynamic value if needed
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        enqueueSnackbar('Link copied to clipboard!', {variant: 'success'});
    };
    const buttons = [
        {
            title: 'Kompetenzen ',
            description: 'Ansicht der initialen Kompetenzen',
            icon: <ListIcon fontSize="medium" />,
            onClick: () => navigate(`/survey/dashboard/${projectId}/${surveyId}/competences`)
        },
        {
            title: 'Layout anpassen',
            description: 'Ansicht der Umfrage anpassen',
            icon: <BrushIcon fontSize="medium" />,
            onClick: () => alert('Link clicked'),
        },
        {
            title: 'Umfrage Resultate',
            description: 'Übersicht der Befragungen',
            icon: <BarChartIcon fontSize="medium" />,
            onClick: () => alert('View clicked'),
        },
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
                        <Typography variant="h4" gutterBottom>{"Meine Erhebung"}</Typography>
                        <Typography variant="h6" gutterBottom>{"Beschreibung"}</Typography>
                    </Box>
                    <Box sx={{pb: 5}}></Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
                        <Paper elevation={3} sx={{padding: 4, maxWidth: 600, width: '100%', borderRadius: 2, textAlign: 'center',}}>
                            <Typography variant="h5" gutterBottom>
                                Teile diesen Link für deine Erhebung
                            </Typography>
                            <Box sx={{mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: 1, px: 2, py: 1, backgroundColor: '#fafafa', wordBreak: 'break-all',}}>
                                <Typography
                                    variant="body2"
                                    sx={{flexGrow: 1, mr: 2, fontFamily: 'monospace', color: 'text.secondary',}}>
                                    {generatedLink}
                                </Typography>
                                <Tooltip title="Copy to clipboard">
                                    <IconButton onClick={handleCopy} color="primary">
                                        <ContentCopyIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Typography variant="body2" sx={{mt: 2, color: 'text.secondary'}}>
                                Teile den Link um Ergebnisse zu deiner Erhebung zu erhalten.
                            </Typography>
                        </Paper>
                    </Box>
                    <Box sx={{pb: 5}}></Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
                        <Stack direction="row" spacing={4}>
                            {buttons.map((btn, idx) => (
                                <Button key={idx} onClick={btn.onClick} variant="outlined" sx={{width: 300, height: 120, flexDirection: 'column', gap: 1, p: 2, textTransform: 'none', bgcolor: 'white', borderRadius: 2, boxShadow: 1, '&:hover': {bgcolor: '#e3f2fd',},}}>
                                    {btn.icon}
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {btn.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" textAlign="center">
                                        {btn.description}
                                    </Typography>
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default SurveyDashboardPage;
