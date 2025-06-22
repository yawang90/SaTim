import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Toolbar,
    Typography,
} from "@mui/material";
import {GetApp, Visibility} from "@mui/icons-material";
import Sidebar from "../../../components/Sidebar";
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";
import MainLayout from "../../../layouts/MainLayout";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../../components/SidebarConfig";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    getAllSurveysByProject,
    getEnrichedResponse,
    getResponsesBySurvey,
    getSurveyById
} from "../../../services/SurveyService";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ResultsPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {surveyId} = useParams();
    const [sidebarItems, setSidebarItems] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSurveys, setLoadingSurveys] = useState(false);
    const [loadingResponses, setLoadingResponses] = useState(false);
    const [projectId, setProjectId] = useState(false);
    const [responses, setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = async (response) => {
        const enrichedResponse = await getEnrichedResponse(response.surveyId, response.id);
        setSelectedResponse(enrichedResponse);
        setDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedResponse(null);
    };

    useEffect(() => {
        if (surveyId) {
          setLoading(true);
            getSurveyById(surveyId).then(data => {
                setProjectId(data.projectId);
                setSurvey(data)
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

    useEffect(() => {
        setSidebarItems([
            ...dashboardSidebar(t, navigate),
            ...projectHomeSidebar(t, navigate, projectId),
            ...settingsSidebar(t, navigate, projectId),
            ...membersSidebar(t, navigate, projectId),
        ]);
    }, [projectId]);

    useEffect(() => {
        if (surveyId) {
            setLoadingResponses(true);
            getResponsesBySurvey(surveyId).then(data => {
                setResponses(data);
            }).finally(() => setLoadingResponses(false));
        }
    }, [surveyId]);

    if (loading || loadingSurveys || loadingResponses) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <MainLayout>
            <Box sx={{display: 'flex', height: '100vh'}}>
                <Sidebar items={sidebarItems} surveySection={
                    <SurveySidebarSection
                        t={t}
                        navigate={navigate}
                        surveys={surveys}
                    />
                }/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Box sx={{px: 3, mb: 4}}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box>
                                    <Typography variant="h4" fontWeight={600}>{t('survey.result')} {survey.title}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">{t("survey.results")}</Typography>
                                        <Typography variant="h5">{responses.length}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            {responses.map(response => (
                                <Grid item xs={12} key={response.id}  sx={{ width: '100%' }}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                }}
                                            >
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="h6">Ergebnis</Typography>
                                                    <Typography variant="body2">User Id: {response?.userId}</Typography>
                                                    <Typography variant="body2">Anzahl Fragen beantwortet: {response?.questions?.length}</Typography>
                                                    <Typography variant="body2">Status: Abgeschlossen</Typography>
                                                </Box>
                                                <Box display="flex" gap={1}>
                                                    <Button variant="outlined" startIcon={<Visibility />} onClick={() => handleOpenDialog(response)}>{t("survey.view")}</Button>
                                                    <Button variant="outlined" startIcon={<GetApp />}>{t("survey.export")}</Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{t("survey.result")}</DialogTitle>
                <DialogContent dividers>
                    <IconButton aria-label="close" onClick={() => handleCloseDialog()} sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}} size="large"><CloseIcon/></IconButton>
                    <Typography variant="body1" gutterBottom>
                        Fragen beantwortet: {selectedResponse?.length}
                    </Typography>
                    {selectedResponse?.map((quest, i) => (
                        <Box key={i} mb={2}>
                            <Typography variant="subtitle2">Frage {i + 1}:</Typography>
                            <Typography variant="body2">Kompetenz A: {quest.competencesFrom}</Typography>
                            <Typography variant="body2">Kompetenz B: {quest.competencesTo}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Antwort: {quest.answer}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}
export default ResultsPage;
