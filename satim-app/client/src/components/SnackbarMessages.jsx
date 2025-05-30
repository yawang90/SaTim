import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarMessages = ({ open, onClose, severity = 'info', message, autoHideDuration = 3000, anchorOrigin }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarMessages;
