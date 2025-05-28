import React, {useEffect, useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {dashboardSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {useTranslation} from "react-i18next";
import {getProjectById} from "../../services/ProjectService";

const SettingsPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);


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

    if (loading) return <p>Loading...</p>; // TODO
    if (!project) return <p>Project not found.</p>; // TODO

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={[...dashboardSidebar(t, navigate), ...settingsSidebar(t, navigate)]}/>
                <Box component="main" sx={{
                    flexGrow: 1,
                    height: 'calc(100vh - 79px)',
                    mt: '79px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',}}>
                    <Paper elevation={3} sx={{p: 4, width: 400}}>
                        <Typography variant="h5" gutterBottom>
                            {t("project.settings")}
                        </Typography>
                        <TextField
                            fullWidth
                            label={t("project.name")}
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label={t("project.description")}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                            <Button variant="contained" color="primary" onClick={() => {}}>{t("save")}</Button>
                            <Button variant="outlined" color="error" onClick={() => {}}>{t("project.delete")}</Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default SettingsPage;
