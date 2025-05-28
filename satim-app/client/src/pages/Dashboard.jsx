import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainLayout from "../layouts/MainLayout";
import ProjectCard from "../components/ProjectCard";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createProject, fetchUserProjects} from "../services/ProjectService";
import {LoadingButton} from "@mui/lab";

const DashboardPage = () => {
    const {t} = useTranslation();
    const userId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [fetchingProjects, setFetchingProjects] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const loadProjects = async () => {
        try {
            const data = await fetchUserProjects({ userId });
            setProjects(data);
        } catch (err) {
            console.log("Failed to load projects", err);
        } finally {
            setFetchingProjects(false);
        }
    };
    useEffect(() => {
        loadProjects();
    }, [userId]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewProjectName('');
        setNewProjectDescription('');
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const projectData = {
                name: newProjectName.trim(),
                description: newProjectDescription.trim() || '',
                userId,
            };
            const savedProject = await createProject(projectData);
            setProjects(prev => [...prev, {project_id: savedProject.id, projects : {id: savedProject.id, name: savedProject.name}}]);
            handleCloseDialog();
        } catch (err) {
            console.error("Failed to save projects", err);
        } finally {
            setLoading(false);
        }
    };


    const handleOpenProjectPage = (projectId) => {
        navigate(`/project/${projectId}`)
    }

    const gridItems = projects.map((project) => (
        <Grid xs={12} sm={6} md={4} key={project.project_id}>
            <ProjectCard project={project} onClick={() => handleOpenProjectPage(project.project_id)}/>
        </Grid>
    ));

    gridItems.push(
        <Grid xs={12} sm={6} md={4} key="add">
            <ProjectCard addCardText={t("project.create")} isAddCard onAdd={handleOpenDialog}/>
        </Grid>
    );

    return (<MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>{t("project.overview")}</Typography>
                    <Box sx={{pb: 5}}></Box>
                    {fetchingProjects ? (<Typography>{t("loading")}...</Typography>) : (
                        <Grid container spacing={3}>{gridItems}</Grid>)}
                </Box>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{t("project.create")}</DialogTitle>
                <Box component="form" onSubmit={handleSaveProject}>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        label="Projektname"
                        fullWidth
                        value={newProjectName}
                        onChange={e => setNewProjectName(e.target.value)}
                        inputProps={{maxLength: 40}}
                        helperText={`${newProjectName.length}/40 Zeichen`}
                    />
                    <TextField
                        margin="dense"
                        label="Beschreibung"
                        fullWidth
                        multiline
                        rows={4}
                        value={newProjectDescription}
                        onChange={e => setNewProjectDescription(e.target.value)}
                        inputProps={{maxLength: 255}}
                        helperText={`${newProjectDescription.length}/255 Zeichen`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} disabled={loading}>{t("cancel")}</Button>
                    <LoadingButton variant="contained" type="submit" loading={loading}>{t("save")}</LoadingButton>
                </DialogActions>
                </Box>
            </Dialog>
        </MainLayout>
    );
};

export default DashboardPage;
