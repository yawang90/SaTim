import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Paper, Stack, Toolbar, Tooltip, Typography} from '@mui/material';
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
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";
import SettingsIcon from '@mui/icons-material/Settings';
import {getAllSurveysByProject, getSurveyById} from "../../../services/SurveyService";

const APP_URL = import.meta.env.VITE_APP_URL;

const SurveyDashboardPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {surveyId, projectId} = useParams();
    const [survey, setSurvey] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSurveys, setLoadingSurveys] = useState(false);
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const {enqueueSnackbar} = useSnackbar();
    const generatedLink = APP_URL + '/survey/form/' + surveyId;
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        enqueueSnackbar('Link copied to clipboard!', {variant: 'success'});
    };
    const buttons = [
        {
            title:  t("survey.resultTitle"),
            description: t("survey.resultSubtitle"),
            icon: <BarChartIcon fontSize="medium" />,
            onClick: () => navigate(`/survey/dashboard/${surveyId}/${projectId}/results`)
        },
        {
            title: t("survey.competencesTitle"),
            description: t("survey.competences"),
            icon: <ListIcon fontSize="medium" />,
            onClick: () => navigate(`/survey/dashboard/${surveyId}/${projectId}/competences`)
        },
        {
            title: t("survey.settingsTitle"),
            description:  t("survey.settings"),
            icon: <SettingsIcon fontSize="medium" />,
            onClick: () => alert('Einstellungen anzeigen'),
        }
    ];

    useEffect(() => {
        if (surveyId) {
            setLoading(true);
            getSurveyById(surveyId).then(data => {
                setSurvey(data);
            }).catch(() => {
                enqueueSnackbar(t("survey.error"), { variant: 'error' });
            }).finally(() => setLoading(false));
        }
    }, [surveyId]);

    useEffect(() => {
        if (projectId) {
            setLoadingSurveys(true);
            getAllSurveysByProject({ projectId }).then(data => {
                setSurveys(data);
            }).finally(() => setLoadingSurveys(false));
        }
    }, [projectId]);

    if (loading || loadingSurveys) {
        return (
            <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <CircularProgress />
            </Box>
        );
    }

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
                        <Typography variant="h4" gutterBottom>{survey.title}</Typography>
                        <Typography variant="h6" gutterBottom>{survey.description}</Typography>
                    </Box>
                    <Box sx={{pb: 5}}></Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
                        <Paper elevation={3} sx={{padding: 4, maxWidth: 600, width: '100%', borderRadius: 2, textAlign: 'center',}}>
                            <Typography variant="h5" gutterBottom>{t("survey.link")}</Typography>
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
                            <Typography variant="body2" sx={{mt: 2, color: 'text.secondary'}}>{t("survey.link2")}</Typography>
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
