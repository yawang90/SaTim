import React, {useState} from 'react';
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Toolbar, Typography} from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainLayout from "../layouts/MainLayout";
import ProjectCard from "../components/ProjectCard";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const ProjectPage = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([
        {id: 1, name: 'Peter Steiner'},
        {id: 2, name: 'Peter Haus'},
        {id: 3, name: 'Petra Banane'},
    ]);
    const [openPREvalDialog, setOpenPREvalsDialog] = useState(false);
    const [prevals, setprevals] = useState([
        // Example initial state
        // { id: 1, name: 'Projekt A' },
        // { id: 2, name: 'Projekt B' },
    ]);
    const [newPREvalsName, setNewPREvalsName] = useState('');
    const [newPREvalsDescription, setNewPREvalsDescription] = useState('');
    const handleOpenPREvalsDialog = () => {
        setOpenPREvalsDialog(true);
    };
    const handleClosePREvalsDialog = () => {
        setOpenPREvalsDialog(false);
        setNewPREvalsName('');
        setNewPREvalsDescription('');
    };
    const handleSavePREvals = () => {
        if (newPREvalsName.trim()) {
            const newProject = {
                id: Date.now(),
                name: newPREvalsName,
                description: newPREvalsDescription,
            };
            setprevals(prev => [...prev, newProject]);
            handleClosePREvalsDialog();
        }
    };
    const gridItems = prevals.map((preval) => (
        <Grid item xs={12} sm={6} md={4} key={preval.id}>
            <ProjectCard project={preval} onClick={() => handleOpenPREvalPage(preval.id)}/>
        </Grid>
    ));
    gridItems.push(
        <Grid item xs={12} sm={6} md={4} key="add">
            <ProjectCard isAddCard addCardText="Evaluierung erstellen" onAdd={handleOpenPREvalsDialog}/>
        </Grid>
    );
    const handleOpenPREvalPage = (prevalId) => {
        navigate(`/preval/${prevalId}`)
    }
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');
    const handleOpenMemberDialog = () => setOpenMemberDialog(true);
    const handleCloseMemberDialog = () => {
        setOpenMemberDialog(false);
        setNewMemberName('');
    };
    const handleAddMember = () => {
        if (newMemberName.trim()) {
            setMembers(prev => [
                ...prev,
                {id: Date.now(), name: newMemberName.trim()}
            ]);
            handleCloseMemberDialog();
        }
    };

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>Mein Projekt</Typography>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2, bgcolor: 'primary.light1', color: 'white'}}>
                        <Typography variant="h5" gutterBottom>Mitarbeitende</Typography>
                        <Box sx={{display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-start',}}>
                            {members.map(member => (
                                <Box key={member.id}
                                     sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                                    <Avatar src={member.avatarUrl} alt={member.name}
                                            sx={{width: 64, height: 64, mb: 1}}>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                    <Typography variant="body2" align="center">
                                        {member.name}
                                    </Typography>
                                </Box>
                            ))}
                            <Box onClick={handleOpenMemberDialog} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 64,
                                cursor: 'pointer',
                                color: 'white',
                            }}>
                                <Avatar sx={{
                                    width: 64,
                                    height: 64,
                                    mb: 1,
                                    backgroundColor: 'white',
                                    '&:hover': {backgroundColor: 'grey.200'}
                                }}>
                                    <AddIcon sx={{fontSize: 32, color: 'grey'}}/>
                                </Avatar>
                                <Typography variant="body2" align="center">
                                    Hinzufügen
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2}}>
                        <Typography variant="h5" gutterBottom>Prerequisites Evaluierungen</Typography>
                            <Grid container spacing={3}>
                                {gridItems}
                            </Grid>
                    </Box>
                </Box>
            </Box>
            <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
                <DialogTitle>Neues Mitglied hinzufügen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name des Mitglieds"
                        type="text"
                        fullWidth
                        value={newMemberName}
                        onChange={e => setNewMemberName(e.target.value)}
                        helperText="Email des Benutzers suchen..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMemberDialog}>Abbrechen</Button>
                    <Button onClick={handleAddMember} variant="contained">
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openPREvalDialog} onClose={handleClosePREvalsDialog}>
                <DialogTitle>Neue PR Evaluierung erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name der PR Evaluierung"
                        fullWidth
                        value={newPREvalsName}
                        onChange={e => setNewPREvalsName(e.target.value)}
                        inputProps={{ maxLength: 40 }}
                        helperText={`${newPREvalsName.length}/40 Zeichen`}
                    />
                    <TextField
                        margin="dense"
                        label="Beschreibung"
                        fullWidth
                        multiline
                        rows={4}
                        value={newPREvalsDescription}
                        onChange={e => setNewPREvalsDescription(e.target.value)}
                        inputProps={{ maxLength: 255 }}
                        helperText={`${newPREvalsDescription.length}/255 Zeichen`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePREvalsDialog}>Abbrechen</Button>
                    <Button onClick={handleSavePREvals} variant="contained">Speichern</Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default ProjectPage;
