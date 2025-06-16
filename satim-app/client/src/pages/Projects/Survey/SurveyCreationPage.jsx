import React, {useRef, useState} from 'react';
import {Alert, Box, Button, Collapse, Paper, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography} from '@mui/material';
import Sidebar from '../../../components/Sidebar';
import MainLayout from '../../../layouts/MainLayout';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {parseExcelFile} from '../../../services/ExcelParser';
import {dashboardSidebar} from '../../../components/SidebarConfig';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {createSurvey} from "../../../services/SurveyService";

const steps = ['Datei hochladen', 'Datei bestätigen'];

const SurveyCreationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileRows, setFileRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null);

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
                setActiveStep(1);
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
            await createSurvey(file, 'Meine PR Erhebung');

            setUploadStatus({ type: 'success', message: 'Datei erfolgreich hochgeladen!' });

            setTimeout(() => {
                const projectId = 2;
                const surveyId = 3;
                navigate(`/survey/dashboard/${projectId}/${surveyId}`);
            }, 1500);
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus({ type: 'error', message: 'Fehler beim Hochladen der Datei.' });
        }
    };

    return (
        <MainLayout>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Sidebar items={dashboardSidebar(t, navigate)} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Typography variant="h4" gutterBottom>
                        Meine PR Erhebung
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <Paper
                            elevation={3}
                            onClick={handleBoxClick}
                            sx={{width: 280, p: 4, m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}}>
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
                    )}

                    {activeStep === 1 && (
                        <>
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="contained" onClick={handleSave}>
                                    Daten übernehmen
                                </Button>
                            </Box>

                            {uploadStatus && (
                                <Alert severity={uploadStatus.type} sx={{ mt: 2 }}>
                                    {uploadStatus.message}
                                </Alert>
                            )}

                            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                                Vorschau der hochgeladenen Datei:
                            </Typography>

                            <Collapse in={fileRows.length > 0}>
                                <Box
                                    sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: 1,
                                        overflowX: 'auto',
                                        overflowY: 'hidden',
                                        width: '100%',
                                    }}
                                >
                                    <Table sx={{ minWidth: 1000 }} aria-label="excel data table">
                                        <TableHead>
                                            <TableRow>
                                                {headers.map((header) => (
                                                    <TableCell key={header}>{header}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {fileRows.map((row, index) => (
                                                <TableRow key={index}>
                                                    {headers.map((header) => (
                                                        <TableCell key={header}>
                                                            {row[header] !== undefined ? row[header].toString() : ''}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </>
                    )}
                </Box>
            </Box>
        </MainLayout>
    );
};

export default SurveyCreationPage;
