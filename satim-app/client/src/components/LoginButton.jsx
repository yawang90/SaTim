import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import {LoadingButton} from "@mui/lab";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../services/UserService";
import {enqueueSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

const modalStyle = {position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '12px', boxShadow: 24, p: 4,};

const LoginButton = ({width='400', redirectTo = "/dashboard"}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        setLoginFormData({...loginFormData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginUser(loginFormData.email, loginFormData.password);
            login();
            navigate(redirectTo);
        } catch (err) {
            enqueueSnackbar(t("login.error"), { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button sx={{paddingX: 4, paddingY: 1.5, width: width}} color="primary" variant="contained" onClick={handleOpen}>
                {t("login.description")}
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}> {t("login.description")}</Typography>
                    <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField name="email" label="Email" variant="outlined" value={loginFormData.email}
                                   onChange={handleInputChange} fullWidth/>
                        <TextField name="password" label="Passwort" type="password" variant="outlined"
                                   value={loginFormData.password} onChange={handleInputChange} fullWidth/>
                        <LoadingButton loading={loading} variant="contained" color="primary"
                                       onClick={handleSubmit}>{t("login.description")}</LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default LoginButton;
