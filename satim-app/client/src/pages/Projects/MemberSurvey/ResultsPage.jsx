import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Toolbar, Typography,} from "@mui/material";
import {GetApp, Timeline, Visibility} from "@mui/icons-material";
import Sidebar from "../../../components/Sidebar";
import {SurveySidebarSection} from "../../../components/SurveySidebarSection";
import MainLayout from "../../../layouts/MainLayout";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../../components/SidebarConfig";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    getAllSurveysByProject,
    getEnrichedResponse,
    getResponseExcel,
    getResponsesBySurvey,
    getSurveyById
} from "../../../services/SurveyService";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {ReactFlow, ReactFlowProvider} from "reactflow";
import 'reactflow/dist/style.css';
import {getTreeLayoutedElements} from "../../../components/GraphLayout";
import {CustomNode} from "../../../components/Node";

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
    const [graphOpen, setGraphOpen] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const nodeTypes = {custom: CustomNode};
    const handleOpenDialog = async (response) => {
        setLoadingResponses(true);
        const enrichedResponse = await getEnrichedResponse(response.surveyId, response.id);
        setSelectedResponse(enrichedResponse);
        setLoadingResponses(false);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedResponse(null);
    };

    const handleOpenGraph = async (response) => {
        setLoadingResponses(true);
        const enrichedResponse = await getEnrichedResponse(response.surveyId, response.id);
        setLoadingResponses(false);
        transformToGraph(enrichedResponse)
        setGraphOpen(true);
    }

    const handleCloseGraph = () => {
        setGraphOpen(false);
        setNodes([]);
        setEdges([]);
    };

    const exportResponse = async(response) => {
        try {
            const excelResult = await getResponseExcel(response.id);
            const url = window.URL.createObjectURL(excelResult);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'qmatrix.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }
    const transformToGraph = (data ) => {
            const nodeMap = new Map();
            const edges = [];
            let nodeCounter = 0;

            data.forEach(item => {
                const fromId = item.competencesFromId[0];
                const toId = item.competencesToId[0];

                if (item.answer === 'Ja') {
                    if (!nodeMap.has(fromId)) {
                        nodeMap.set(fromId, {
                            id: fromId,
                            type: 'custom',
                            data: { label: item.competencesFrom },
                            position: { x: 0, y: 0 }
                        });
                        nodeCounter = nodeCounter + 1;
                    }
                    if (!nodeMap.has(toId)) {
                        nodeMap.set(toId, {
                            id: toId,
                            type: 'custom',
                            data: { label: item.competencesTo },
                            position: { x: 0, y: 0}
                        });
                        nodeCounter = nodeCounter + 1;
                    }
                    edges.push({
                        id: `${fromId}-${toId}`,
                        source: fromId,
                        target: toId,
                        animated: true,
                    });
                }
            });
        const { nodes: layoutedNodes, edges: layoutedEdges } = getTreeLayoutedElements(Array.from(nodeMap.values()), edges, 'TB');
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
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
                                                    <Button variant="outlined" startIcon={<GetApp />} onClick={() => exportResponse(response)}>{t("survey.export")}</Button>
                                                    <Button variant="outlined" startIcon={<Timeline />} onClick={() => handleOpenGraph(response)}>{t("survey.analysis")}</Button>
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
            <Dialog open={graphOpen} onClose={handleCloseGraph} maxWidth="sm" fullScreen>
                <DialogTitle>{t("survey.analysis")}</DialogTitle>
                <DialogContent dividers sx={{ p: 0 }}>
                    <IconButton aria-label="close" onClick={() => handleCloseGraph()} sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}} size="large"><CloseIcon/></IconButton>
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <ReactFlowProvider><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView /></ReactFlowProvider>
                    </div>
                </DialogContent>
            </Dialog>

        </MainLayout>
    );
}
export default ResultsPage;
