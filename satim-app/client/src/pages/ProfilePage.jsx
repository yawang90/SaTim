import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Paper, TextField, Typography} from '@mui/material';
import {useTranslation} from "react-i18next";
import MainLayout from "../layouts/MainLayout";
import {getUserById} from "../services/UserService";

const ProfilePage = () => {
    const {t} = useTranslation();
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(userId);
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Box component="main" sx={{flexGrow: 1, height: 'calc(100vh - 79px)', mt: '79px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5',}}>
                    <Paper elevation={3} sx={{p: 4, width: 400}}>
                        <Typography variant="h5" gutterBottom>
                            {t("user.title")}
                        </Typography>
                        <TextField slotProps={{ input: { readOnly: true }}} fullWidth label={t("user.name")} variant="outlined" margin="normal" value={user?.first_name + " " + user?.last_name} />
                        <TextField slotProps={{ input: { readOnly: true }}} fullWidth label={t("user.email")} variant="outlined" margin="normal" value={user?.email + ""}/>
                    </Paper>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default ProfilePage;
