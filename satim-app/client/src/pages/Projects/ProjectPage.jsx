import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Toolbar, Typography} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import ProjectCard from "../../components/ProjectCard";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {getProjectById, getProjectMembers} from "../../services/ProjectService";

const ProjectPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const [surveys, setSurveys] = useState([]);
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');
    const navigateSurveyCreation = () => {
        navigate(`/survey/creation/${projectId}`)
    }
    const navigateSurveyDashboard = (surveyId) => {
        navigate(`/survey/dashboard/${surveyId}`)
    }

    const gridItems = surveys.map((survey) => (
        <Grid item xs={12} sm={6} md={4} key={survey.id}>
            <ProjectCard project={survey} displayName={survey.name} onClick={() => navigateSurveyDashboard(survey.id)}/>
        </Grid>
    ));

    gridItems.push(
        <Grid item xs={12} sm={6} md={4} key="add">
            <ProjectCard isAddCard addCardText={t("survey.create")}  displayName={""} onAdd={() => navigateSurveyCreation()}/>
        </Grid>
    );

    const handleOpenMemberDialog = () => setOpenMemberDialog(true);
    const handleCloseMemberDialog = () => {
        setOpenMemberDialog(false);
        setNewMemberName('');
    };
    const handleAddMember = () => {
        if (newMemberName.trim()) {
            setMembers(prev => [
                ...prev,
                {id: Date.now(), name: newMemberName.trim()}
            ]);
            handleCloseMemberDialog();
        }
    };

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getProjectMembers({projectId});
                setMembers(data);
            } catch (err) {
                console.error("Failed to fetch project members:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [projectId]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectById({projectId});
                setProject(data);
            } catch (error) {
                console.error("Failed to fetch project:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <CircularProgress />
            </Box>
        );
    }
    if (!project?.projects) {
        return null;
    }

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={sidebarItems}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>{project.projects.name}</Typography>
                    <Typography variant="h6" gutterBottom>{project.projects.description}</Typography>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2, bgcolor: 'primary.light1', color: 'white'}}>
                        <Typography variant="h5" gutterBottom>{t("project.member")}</Typography>
                        <Box sx={{display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-start',}}>
                            {members?.length > 0 ? (
                                members.map(member => (
                                    <Box key={member.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar src={member.avatarUrl} sx={{ width: 64, height: 64, mb: 1 }}>
                                            {member.firstName?.[0] ?? '?'}
                                        </Avatar>
                                        <Typography variant="body2" align="center">
                                            {member.firstName} {member.lastName}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    {t('project.noMembers')}
                                </Typography>
                            )}
                            <Box onClick={handleOpenMemberDialog} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64, cursor: 'pointer', color: 'white',}}>
                                <Avatar sx={{width: 64, height: 64, mb: 1, backgroundColor: 'white', '&:hover': {backgroundColor: 'grey.200'}}}>
                                    <AddIcon sx={{fontSize: 32, color: 'grey'}}/>
                                </Avatar>
                                <Typography variant="body2" align="center">
                                    Hinzufügen
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2}}>
                        <Typography variant="h5" gutterBottom>{t("survey.title")}</Typography>
                            <Grid container spacing={3}>
                                {gridItems}
                            </Grid>
                    </Box>
                </Box>
            </Box>
            <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
                <DialogTitle>{t(project.addMember)}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name des Mitglieds" type="text" fullWidth value={newMemberName} onChange={e => setNewMemberName(e.target.value)} helperText="Email des Benutzers suchen..."/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMemberDialog}>Abbrechen</Button>
                    <Button onClick={handleAddMember} variant="contained">
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default ProjectPage;
