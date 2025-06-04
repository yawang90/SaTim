import React, { useRef, useState } from 'react';
import {
    Box, Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from '@mui/material';
import Sidebar from '../../../components/Sidebar';
import MainLayout from '../../../layouts/MainLayout';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { parseExcelFile } from '../../../services/ExcelParser';
import { dashboardSidebar } from '../../../components/SidebarConfig';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SurveyCreationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [fileRows, setFileRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [tableOpen, setTableOpen] = useState(false);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = () => {
        const projectId = 2
        const surveyId = 3
        navigate(`/surveyDashboard/${projectId}/${surveyId}`)
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.(xls|xlsx)$/)) {
            alert('Please upload a valid Excel file (.xls or .xlsx)');
            return;
        }

        try {
            const parsedRows = await parseExcelFile(file);
            if (parsedRows.length > 0) {
                setHeaders(Object.keys(parsedRows[0])); // Get column headers from the first row
                setFileRows(parsedRows);
            } else {
                setHeaders([]);
                setFileRows([]);
            }
        } catch (error) {
            console.error('Failed to parse Excel file:', error);
            alert('Fehler beim Verarbeiten der Datei.');
        }
    };

    return (
        <MainLayout>
            <Box sx={{ display: 'flex' }}>
                <Sidebar items={dashboardSidebar(t, navigate)} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Typography variant="h4" gutterBottom>Meine PR Erhebung</Typography>
                    <Box sx={{ pb: 5 }}></Box>
                    <Paper
                        elevation={3}
                        onClick={handleBoxClick}
                        sx={{width: 280, mt: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}}>
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
                    <Box sx={{ pb: 5 }}></Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" onClick={() => setTableOpen((prev) => !prev)} sx={{ cursor: 'pointer', color: 'primary.main' }}>
                            {tableOpen ? '⬆️ Tabelle ausblenden' : '⬇️ Tabelle anzeigen'}
                        </Typography>
                    </Box>
                    <Collapse in={tableOpen}>
                    {fileRows.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="excel data table">
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
                        </TableContainer>
                    )}
                    </Collapse>
                    <Button onClick={handleSave}>Daten übernehmen</Button>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default SurveyCreationPage;
