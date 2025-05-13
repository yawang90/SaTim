import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
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

const LoginButton = (width) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {login } = useAuth();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
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
            await login(loginFormData.email, loginFormData.password);
            login();
            navigate('/dashboard');
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
