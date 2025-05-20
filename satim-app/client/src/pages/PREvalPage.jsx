import React, {useRef} from 'react';
import {Box, Paper, Toolbar, Typography} from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainLayout from "../layouts/MainLayout";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const PREvalPage = () => {
    const fileInputRef = useRef(null);
    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.name.match(/\.(xls|xlsx)$/)) {
            console.log('Excel file selected:', file.name);
        } else {
            alert('Please upload a valid Excel file (.xls or .xlsx)');
        }
    };
    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>Meine PR Evaluierung</Typography>
                    <Paper elevation={3} onClick={handleBoxClick} sx={{width: 280, mt: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}}>
                        <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="body1" mt={2}>
                            Klicken Sie hier, um eine Excel-Datei hochzuladen
                        </Typography>
                        <input
                            type="file"
                            accept=".xls,.xlsx"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </Paper>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default PREvalPage;
