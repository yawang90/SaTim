import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import {login} from "../services/UserService";
import {LoadingButton} from "@mui/lab";

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

const LoginButton = (width) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        try {
            await login(loginFormData.email, loginFormData.password);
            alert('Logged in!');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                sx={{
                    borderRadius: '50px',
                    paddingX: 4,
                    paddingY: 1.5,
                    width: width
                }}
                color="primary"
                variant="contained"
                onClick={handleOpen}>
                Anmelden
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>Anmelden</Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField name="email" label="Email" variant="outlined" value={loginFormData.email} onChange={handleInputChange} fullWidth />
                        <TextField name="password" label="Passwort" type="password" variant="outlined" value={loginFormData.password} onChange={handleInputChange} fullWidth />
                        <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSubmit}>Anmelden</LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default LoginButton;
