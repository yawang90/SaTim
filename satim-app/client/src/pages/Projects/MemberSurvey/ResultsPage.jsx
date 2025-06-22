import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Grid, Toolbar, Typography,} from "@mui/material";
import {GetApp, Search, Visibility} from "@mui/icons-material";
import Sidebar from "../../../components/Sidebar";
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";
import MainLayout from "../../../layouts/MainLayout";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../../components/SidebarConfig";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getAllSurveysByProject} from "../../../services/SurveyService";

const ResultsPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {surveyId, projectId} = useParams();
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const [surveys, setSurveys] = useState([]);
    const mockSurveys = [
        {
            id: 1,
            title: "Customer Satisfaction Survey Q4 2024",
            type: "Customer Feedback",
            status: "completed",
            submissionDate: "2024-01-15",
            responses: 247,
            category: "Customer Service"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "success.main";
            case "active":
                return "info.main";
            case "draft":
                return "text.secondary";
            default:
                return "text.secondary";
        }
    };

    useEffect(() => {
        if (projectId) {
           // setLoadingSurveys(true);
            getAllSurveysByProject({ projectId }).then(data => {
                setSurveys(data);
            })
                //.finally(() => setLoadingSurveys(false));
        }
    }, [projectId]);

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
                    <Box sx={{px: 3, mb: 4}}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box>
                                    <Typography variant="h4" fontWeight={600}>My Surveys</Typography>
                                    <Typography variant="body2" color="text.secondary">Track and manage your survey
                                        submissions</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Stats */}
                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Total Surveys</Typography>
                                        <Typography variant="h5">{mockSurveys.length}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Active Surveys</Typography>
                                        <Typography variant="h5"
                                                    color="info.main">{mockSurveys.filter(s => s.status === "active").length}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Completed</Typography>
                                        <Typography variant="h5"
                                                    color="success.main">{mockSurveys.filter(s => s.status === "completed").length}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">Total Responses</Typography>
                                        <Typography variant="h5"
                                                    color="primary.main">{mockSurveys.reduce((acc, s) => acc + s.responses, 0)}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Survey List */}
                        <Grid container spacing={2}>
                            {mockSurveys.map(survey => (
                                <Grid item xs={12} key={survey.id}>
                                    <Card>
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography variant="h6">{survey.title}</Typography>
                                                    <Typography variant="body2"
                                                                color={getStatusColor(survey.status)}>{survey.status}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {new Date(survey.submissionDate).toLocaleDateString()} • {survey.type} • {survey.category} • {survey.responses} responses
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" gap={1}>
                                                    <Button variant="outlined" startIcon={<Visibility/>}>View</Button>
                                                    <Button variant="outlined" startIcon={<GetApp/>}>Export</Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}

                            {mockSurveys.length === 0 && (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent sx={{textAlign: 'center', py: 8}}>
                                            <Search fontSize="large" color="disabled"/>
                                            <Typography variant="h6" mt={2}>No surveys found</Typography>
                                            <Typography color="text.secondary">Try changing filters or
                                                keywords.</Typography>
                                            <Button variant="contained" sx={{mt: 2}}>Create New Survey</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
}
export default ResultsPage;
