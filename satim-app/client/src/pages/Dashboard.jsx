import React, {useState} from 'react';
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

const DashboardPage = () => {
    const { t } = useTranslation();

    const [projects, setProjects] = useState([
        // Example initial state
        // { id: 1, name: 'Projekt A' },
        // { id: 2, name: 'Projekt B' },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewProjectName('');
        setNewProjectDescription('');
    };

    const handleSaveProject = () => {
        if (newProjectName.trim()) {
            const newProject = {
                id: Date.now(),
                name: newProjectName,
                description: newProjectDescription,
            };
            setProjects(prev => [...prev, newProject]);
            handleCloseDialog();
        }
    };

    const handleOpenProjectPage = (projectId) => {
        navigate(`/project/${projectId}`)
    }

    const gridItems = projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard project={project} onClick={() => handleOpenProjectPage(project.id)}/>
        </Grid>
    ));

    gridItems.push(
        <Grid item xs={12} sm={6} md={4} key="add">
            <ProjectCard addCardText="Projekt erstellen" isAddCard onAdd={handleOpenDialog} />
        </Grid>
    );

    return ( <MainLayout>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Typography variant="h4" gutterBottom>{t("project.overview")}</Typography>
                    <Box sx={{pb: 5}}></Box>
                    <Grid container spacing={3}>
                        {gridItems}
                    </Grid>
                </Box>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Neues Projekt erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Projektname"
                        fullWidth
                        value={newProjectName}
                        onChange={e => setNewProjectName(e.target.value)}
                        inputProps={{ maxLength: 40 }}
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
                        inputProps={{ maxLength: 255 }}
                        helperText={`${newProjectDescription.length}/255 Zeichen`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Abbrechen</Button>
                    <Button onClick={handleSaveProject} variant="contained">Speichern</Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default DashboardPage;
