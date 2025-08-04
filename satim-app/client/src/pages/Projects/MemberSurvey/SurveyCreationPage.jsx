import React, {useRef, useState} from 'react';
import {Alert, Backdrop, Box, Button, Dialog, DialogContent, DialogTitle, Paper, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography} from '@mui/material';
import Sidebar from '../../../components/Sidebar';
import MainLayout from '../../../layouts/MainLayout';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {parseExcelFile} from '../../../services/ExcelParser';
import {dashboardSidebar} from '../../../components/SidebarConfig';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {createSurvey} from "../../../services/SurveyService";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

const SurveyCreationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {projectId} = useParams();
    const steps = [t('survey.details'), t('survey.upload'), t('survey.confirm')];
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileRows, setFileRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [tableOpen, setTableOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (!selectedFile.name.match(/\.(xls|xlsx)$/)) {
            alert('Bitte eine gültige Excel-Datei hochladen (.xls oder .xlsx)');
            return;
        }

        try {
            const parsedRows = await parseExcelFile(selectedFile);
            if (parsedRows.length > 0) {
                setHeaders(Object.keys(parsedRows[0]));
                setFileRows(parsedRows);
                setFile(selectedFile);
                setActiveStep(2);
            } else {
                setHeaders([]);
                setFileRows([]);
                alert('Die Datei enthält keine Daten.');
            }
        } catch (error) {
            console.error('Fehler beim Verarbeiten der Datei:', error);
            alert('Fehler beim Verarbeiten der Datei.');
        }
    };

    const handleSave = async () => {
        if (!file) {
            setUploadStatus({ type: 'error', message: 'Keine Datei ausgewählt.' });
            return;
        }
        try {
            setIsSaving(true);
            const survey = await createSurvey(projectId, file, title, description);
            setUploadStatus({ type: 'success', message: 'Datei erfolgreich hochgeladen!' });
            navigate(`/survey/dashboard/${survey.id}/${projectId}`);
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus({ type: 'error', message: 'Fehler beim Hochladen der Datei.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleNextFromInfo = () => {
        if (!title.trim()) {
            alert('Bitte geben Sie einen Titel für die Umfrage ein.');
            return;
        }
        setActiveStep(1);
    };

    const handleBack = () => {
        setUploadStatus(null);
        if (activeStep === 2) {
            setActiveStep(1);
        } else if (activeStep === 1) {
            setActiveStep(0);
        }
    };

    return (
        <MainLayout>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSaving}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ display: 'flex', width: '100%'}}>
                <Sidebar items={dashboardSidebar(t, navigate)} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Typography variant="h4" gutterBottom>
                        {activeStep !== 0 ? title || t('survey.create') : t('survey.create')}
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                            <TextField label="Titel der Umfrage" variant="outlined" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                            <TextField label="Beschreibung (optional)" variant="outlined" fullWidth margin="normal" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)}/>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" onClick={handleNextFromInfo}>
                                    {t('continue')}
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <>
                            <Button variant="outlined" onClick={handleBack}>
                                {t('back')}
                            </Button>
                            <Paper elevation={3} onClick={handleBoxClick} sx={{width: 280, p: 4, m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}}>
                                <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                                <Typography variant="body1" mt={2}>
                                    Klicken Sie hier, um eine Excel-Datei hochzuladen
                                </Typography>
                                <input type="file" accept=".xls,.xlsx" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
                            </Paper>
                        </>
                    )}

                    {activeStep === 2 && (
                        <>
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={handleBack}>
                                    {t('back')}
                                </Button>
                                <Button variant="contained" onClick={handleSave} disabled={isSaving}>
                                    {t('survey.confirm')}
                                </Button>
                            </Box>

                            {uploadStatus && (
                                <Alert severity={uploadStatus.type} sx={{ mt: 2 }}>
                                    {uploadStatus.message}
                                </Alert>
                            )}
                            <Box sx={{pb: 5}}></Box>
                            <Paper elevation={3} sx={{width: 500, pt: 8, p: 4, m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, textAlign: 'center',}}>
                                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                                        {t('survey.preview')}
                                    </Typography>
                                    <Button variant="contained" size="large" startIcon={<FileOpenIcon />} onClick={() => setTableOpen(true)} sx={{ alignSelf: "center" }}>
                                        {t('survey.open')}
                                    </Button>
                            </Paper>
                            <Dialog open={tableOpen} onClose={() => setTableOpen(false)} maxWidth="lg" fullWidth>
                                <DialogTitle>{t('survey.preview')}</DialogTitle>
                                <IconButton aria-label="close" onClick={() => setTableOpen(false)} sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}} size="large">
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent dividers>
                                        <Box>
                                            <Table size="small">
                                                <TableHead sx={{ bgcolor: 'action.selected' }}>
                                                    <TableRow>
                                                        {headers.map(header => (<TableCell key={header}>{header}</TableCell>))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {fileRows.map((row, i) => (
                                                        <TableRow key={i}>
                                                            {headers.map(header => (<TableCell key={header}>{row[header]}</TableCell>))}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </Box>
            </Box>
        </MainLayout>
    );
};

export default SurveyCreationPage;
