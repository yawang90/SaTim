import React, {useRef, useState} from 'react';
import {
    Box,
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
import Sidebar from '../components/Sidebar';
import MainLayout from "../layouts/MainLayout";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {parseExcelFile} from "../services/ExcelParser";
import {dashboardSidebar} from "../components/SidebarConfig";
import {useNavigate} from "react-router-dom";

const PREvalPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const handleBoxClick = () => {
        fileInputRef.current.click();
    };
    const [fileRows, setFileRows] = useState([]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.(xls|xlsx)$/)) {
            alert('Please upload a valid Excel file (.xls or .xlsx)');
            return;
        }

        try {
            const parsedRows = await parseExcelFile(file);
            await setFileRows(parsedRows);
            console.log('Parsed Excel data:', fileRows);
            console.log('Parsed Excel data:', fileRows.at(0));
            console.log('Parsed Excel data:', fileRows.at(0)['Beispielaufgabe']);

            // await sendToBackend(rows);
        } catch (error) {
            console.error('Failed to parse Excel file:', error);
            alert('Fehler beim Verarbeiten der Datei.');
        }
    };

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={dashboardSidebar(navigate)} />
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>Meine PR Erhebung</Typography>
                    <Box sx={{pb: 5}}></Box>
                    <Paper elevation={3} onClick={handleBoxClick} sx={{width: 280, mt: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: 2, cursor: 'pointer', textAlign: 'center',}}>
                        <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="body1" mt={2}>
                            Klicken Sie hier, um eine Excel-Datei hochzuladen
                        </Typography>
                        <input type="file" accept=".xls,.xlsx" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
                    </Paper>
                    <Box sx={{pb: 5}}></Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Geladene Daten aus Excel</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fileRows.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {JSON.stringify(row)} {/* Or display specific fields like row.name */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default PREvalPage;
