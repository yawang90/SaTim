import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import { registerUser } from '../services/userService';
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
    const [registrationFormData, setRegistrationFormData] = useState({
        nachname: '',
        vorname: '',
        email: '',
        passwort: '',
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(registrationFormData);
            alert('Erfolgreich registriert!');
            handleClose();
        } catch (err) {
            alert(`Fehler: ${err.message}`);
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
                sx={{ width: '200px', height: '50px' }}
                onClick={handleOpen}
                onSubmit={handleSubmit}>
                Registrieren
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle} component="form">
                    <Typography variant="h6" mb={2}>Registrieren</Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField name="vorname" label="Vorname" variant="outlined" value={registrationFormData.vorname} onChange={handleInputChange} fullWidth />
                        <TextField name="nachname" label="Nachname" variant="outlined" value={registrationFormData.nachname} onChange={handleInputChange} fullWidth />
                        <TextField name ="email" label="Email" variant="outlined" value={registrationFormData.email} onChange={handleInputChange} fullWidth />
                        <TextField name="passwort" label="Passwort" type="password" variant="outlined" value={registrationFormData.passwort} onChange={handleInputChange} fullWidth />
                        <TextField label="Passwort wiederholen" type="password" variant="outlined" fullWidth />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Konto erstellen</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RegistrationButton;
