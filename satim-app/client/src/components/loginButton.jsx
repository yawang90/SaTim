import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                sx={{ width: '200px', height: '50px' }}
                onClick={handleOpen}
            >
                Anmelden
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>Anmelden</Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Email" variant="outlined" fullWidth />
                        <TextField label="Passwort" type="password" variant="outlined" fullWidth />
                        <Button variant="contained" color="primary">Anmelden</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default LoginButton;
