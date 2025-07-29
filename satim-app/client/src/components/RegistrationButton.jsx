import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import {loginUser, registerUser} from '../services/UserService';
import {LoadingButton} from "@mui/lab";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {enqueueSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

const modalStyle = {position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '12px', boxShadow: 24, p: 4,
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegistrationButton = ({ redirectTo = "/dashboard" }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const [registrationFormData, setRegistrationFormData] = useState({last_name: '', first_name: '', email: '', password: '', confirmPassword: ''});
    const {t} = useTranslation();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!registrationFormData.last_name.trim() || !registrationFormData.email.trim() || !registrationFormData.password.trim() || !registrationFormData.confirmPassword.trim()) {
            enqueueSnackbar(t("registration.missing"), { variant: "warning" });
            return;
        }
        if (registrationFormData.password !== registrationFormData.confirmPassword) {
            enqueueSnackbar(t("registration.mismatch"), { variant: "warning" });
            return;
        }
        if (!emailRegex.test(registrationFormData.email)) {
            enqueueSnackbar(t("registration.email"), { variant: "warning" });
            return;
        }
        if (registrationFormData.password.length < 6) {
            enqueueSnackbar(t("registration.password"), { variant: "warning" });
            return;
        }
        setLoading(true);
        try {
            await registerUser(registrationFormData);
            await loginUser(registrationFormData.email, registrationFormData.password)
            login();
            navigate(redirectTo);
            handleClose();
        } catch (err) {
            enqueueSnackbar(t("registration.error"), { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setRegistrationFormData({...registrationFormData, [e.target.name]: e.target.value,});
    };

    return (
        <>
            <Button color="primary" variant="contained" sx={{paddingX: 4, paddingY: 1.5, width: "15rem"}} onClick={handleOpen}>
                {t("registration.description")}
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle} component="form">
                    <Typography variant="h6" mb={2}>{t("registration.description")}</Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField name="first_name" label="Vorname" variant="outlined" value={registrationFormData.first_name} onChange={handleInputChange} fullWidth />
                        <TextField name="last_name" label="Nachname" variant="outlined" value={registrationFormData.last_name} onChange={handleInputChange} fullWidth required/>
                        <TextField name ="email" label="Email" variant="outlined" value={registrationFormData.email} onChange={handleInputChange} fullWidth required />
                        <TextField name="password" label="Passwort" type="password" variant="outlined" value={registrationFormData.password} onChange={handleInputChange} fullWidth required/>
                        <TextField name="confirmPassword" label="Passwort wiederholen" type="password" variant="outlined" value={registrationFormData.confirmPassword} onChange={handleInputChange} required fullWidth />
                        <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSubmit}>{t("registration.create")}</LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RegistrationButton;
