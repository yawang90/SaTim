import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import {loginUser, registerUser} from '../services/UserService';
import {LoadingButton} from "@mui/lab";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

const RegistrationButton = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const [registrationFormData, setRegistrationFormData] = useState({
        nachname: '',
        vorname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(registrationFormData);
            await loginUser(registrationFormData.email, registrationFormData.password)
            login();
            navigate('/dashboard');
            handleClose();
        } catch (err) {
            alert(`Bitte überprüfen Sie ihre Email und ihr Passwort: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setRegistrationFormData({...registrationFormData, [e.target.name]: e.target.value,});
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                sx={{
                    paddingX: 4,
                    paddingY: 1.5,
                    width: "15rem"
                }}
                onClick={handleOpen}>
                Registrieren
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle} component="form">
                    <Typography variant="h6" mb={2}>Registrieren</Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField name="vorname" label="Vorname" variant="outlined" value={registrationFormData.vorname} onChange={handleInputChange} fullWidth />
                        <TextField name="nachname" label="Nachname" variant="outlined" value={registrationFormData.nachname} onChange={handleInputChange} fullWidth required/>
                        <TextField name ="email" label="Email" variant="outlined" value={registrationFormData.email} onChange={handleInputChange} fullWidth required />
                        <TextField name="password" label="Passwort" type="password" variant="outlined" value={registrationFormData.password} onChange={handleInputChange} fullWidth required/>
                        <TextField name="confirmPassword" label="Passwort wiederholen" type="password" variant="outlined" value={registrationFormData.confirmPassword} onChange={handleInputChange} required fullWidth />
                        <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSubmit}>Konto erstellen</LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RegistrationButton;
