import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Toolbar, Typography} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import ProjectCard from "../../components/ProjectCard";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {getProjectById} from "../../services/ProjectService";

const ProjectPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([
        {id: 1, name: 'Peter Steiner'},
        {id: 2, name: 'Peter Haus'},
        {id: 3, name: 'Petra Banane'},
    ]);
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const [openPREvalDialog, setOpenPREvalsDialog] = useState(false);
    const [prevals, setprevals] = useState([]);
    const [newPREvalsName, setNewPREvalsName] = useState('');
    const [newPREvalsDescription, setNewPREvalsDescription] = useState('');
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');
    const handleOpenPREvalsDialog = () => {
        setOpenPREvalsDialog(true);
    };
    const handleClosePREvalsDialog = () => {
        setOpenPREvalsDialog(false);
        setNewPREvalsName('');
        setNewPREvalsDescription('');
    };
    const handleSavePREvals = () => {
        if (newPREvalsName.trim()) {
            const newProject = {
                id: Date.now(),
                name: newPREvalsName,
                description: newPREvalsDescription,
            };
            setprevals(prev => [...prev, newProject]);
            handleClosePREvalsDialog();
        }
    };
    const gridItems = prevals.map((preval) => (
        <Grid item xs={12} sm={6} md={4} key={preval.id}>
            <ProjectCard project={preval} displayName={preval.name} onClick={() => handleOpenPREvalPage(preval.id)}/>
        </Grid>
    ));
    gridItems.push(
        <Grid item xs={12} sm={6} md={4} key="add">
            <ProjectCard isAddCard addCardText={t("project.evaluation")}  displayName={""} onAdd={handleOpenPREvalsDialog}/>
        </Grid>
    );
    const handleOpenPREvalPage = (prevalId) => {
        navigate(`/preval/${prevalId}`)
    }
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

    if (loading) return <p>Loading...</p>; // TODO
    if (!project) return <p>Project not found.</p>; // TODO

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={sidebarItems} />
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>{project.projects.name}</Typography>
                    <Typography variant="h6" gutterBottom>{project.projects.description}</Typography>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2, bgcolor: 'primary.light1', color: 'white'}}>
                        <Typography variant="h5" gutterBottom>{t("project.member")}</Typography>
                        <Box sx={{display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-start',}}>
                            {members.map(member => (
                                <Box key={member.id}
                                     sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                                    <Avatar src={member.avatarUrl} alt={member.name}
                                            sx={{width: 64, height: 64, mb: 1}}>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                    <Typography variant="body2" align="center">
                                        {member.name}
                                    </Typography>
                                </Box>
                            ))}
                            <Box onClick={handleOpenMemberDialog} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 64,
                                cursor: 'pointer',
                                color: 'white',
                            }}>
                                <Avatar sx={{
                                    width: 64,
                                    height: 64,
                                    mb: 1,
                                    backgroundColor: 'white',
                                    '&:hover': {backgroundColor: 'grey.200'}
                                }}>
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
                        <Typography variant="h5" gutterBottom>{t(project.prevaluation)}</Typography>
                            <Grid container spacing={3}>
                                {gridItems}
                            </Grid>
                    </Box>
                </Box>
            </Box>
            <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
                <DialogTitle>{t(project.addmember)}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name des Mitglieds"
                        type="text"
                        fullWidth
                        value={newMemberName}
                        onChange={e => setNewMemberName(e.target.value)}
                        helperText="Email des Benutzers suchen..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMemberDialog}>Abbrechen</Button>
                    <Button onClick={handleAddMember} variant="contained">
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openPREvalDialog} onClose={handleClosePREvalsDialog}>
                <DialogTitle>Neue PR Evaluierung erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name der PR Evaluierung"
                        fullWidth
                        value={newPREvalsName}
                        onChange={e => setNewPREvalsName(e.target.value)}
                        inputProps={{ maxLength: 40 }}
                        helperText={`${newPREvalsName.length}/40 Zeichen`}
                    />
                    <TextField
                        margin="dense"
                        label="Beschreibung"
                        fullWidth
                        multiline
                        rows={4}
                        value={newPREvalsDescription}
                        onChange={e => setNewPREvalsDescription(e.target.value)}
                        inputProps={{ maxLength: 255 }}
                        helperText={`${newPREvalsDescription.length}/255 Zeichen`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePREvalsDialog}>Abbrechen</Button>
                    <Button onClick={handleSavePREvals} variant="contained">Speichern</Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default ProjectPage;
