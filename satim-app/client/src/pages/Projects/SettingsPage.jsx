import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {useTranslation} from "react-i18next";
import {deleteProject, getProjectById, updateProject} from "../../services/ProjectService";
import {LoadingButton} from "@mui/lab";
import SnackbarMessages from "../../components/SnackbarMessages";

const SettingsPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectById({projectId});
                setProject(data);
                setName(data.projects.name);
                setDescription(data.projects.description);
            } catch (error) {
                console.error("Failed to fetch project:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleSave = async () => {
        setUpdateLoading(true);
        try {
            await updateProject({
                projectId,
                name,
                description,
                userId: project.projects.owner_id,
            });
            showSnackbar(t('updateSuccess'), 'success');
        } catch (error) {
            showSnackbar(t('updateFailure'), 'warning');
            console.error("Failed to update project:", error);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteProject({projectId});
            showSnackbar(t('deleteSuccess'), 'success');
        } catch (error) {
            showSnackbar(t('deleteFailure'), 'warning');
            console.error("Failed to update project:", error);
        } finally {
            setDeleteLoading(false);
        }
    }

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMsg(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    if (loading) {
        return (
            <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (!project) {
        navigate('/dashboard'); // TODO
    }

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={sidebarItems}/>
                <Box component="main" sx={{flexGrow: 1, height: 'calc(100vh - 79px)', mt: '79px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5',}}>
                    <Paper elevation={3} sx={{p: 4, width: 400}}>
                        <Typography variant="h5" gutterBottom>
                            {t("project.settings")}
                        </Typography>
                        <TextField fullWidth label={t("project.name")} variant="outlined" margin="normal" value={name} required onChange={(e) => setName(e.target.value)}/>
                        <TextField fullWidth label={t("project.description")} variant="outlined" margin="normal" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                            <LoadingButton variant="contained" color="primary" onClick={handleSave} loading={updateLoading}>{t("save")}</LoadingButton>
                            <Button variant="outlined" color="error" onClick={() => {setDeleteDialogOpen(true);setDeleteInput('');}}>{t("project.delete")}</Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>{t("project.delete")}</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2 }}>
                        {t("project.deleteConfirmation", {
                            name: project?.projects?.name || 'the project'
                        }) + project.projects.name}
                    </Typography>
                    <TextField autoFocus margin="dense" label={project.projects.name} fullWidth variant="outlined" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>{t("cancel")}</Button>
                    <LoadingButton color="error" onClick={handleDelete} disabled={deleteInput !== project?.projects?.name} loading={deleteLoading}>{t("confirm")}</LoadingButton>
                </DialogActions>
            </Dialog>

            <SnackbarMessages open={snackbarOpen} onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} message={snackbarMsg}/>
        </MainLayout>

    );
};

export default SettingsPage;
