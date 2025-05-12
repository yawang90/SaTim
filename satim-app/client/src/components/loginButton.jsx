import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import {login} from "../services/userService";

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

const LoginButton = () => {
    const [open, setOpen] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        setLoginFormData({...loginFormData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginFormData.email, loginFormData.password);
            alert('Logged in!');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                sx={{ width: '200px', height: '50px' }}
                onClick={handleOpen}>
                Anmelden
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>Anmelden</Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField name="email" label="Email" variant="outlined" value={loginFormData.email} onChange={handleInputChange} fullWidth />
                        <TextField name="password" label="Passwort" type="password" variant="outlined" value={loginFormData.password} onChange={handleInputChange} fullWidth />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Anmelden</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default LoginButton;
