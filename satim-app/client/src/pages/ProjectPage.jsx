import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainLayout from "../layouts/MainLayout";
import ProjectCard from "../components/ProjectCard";
import AddIcon from "@mui/icons-material/Add";

const ProjectPage = () => {
    const [members, setMembers] = useState([
        {id: 1, name: 'Peter Steiner'},
        {id: 2, name: 'Peter Haus'},
        {id: 3, name: 'Petra Banane'},
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [evaluations, setevaluations] = useState([
        // Example initial state
        // { id: 1, name: 'Projekt A' },
        // { id: 2, name: 'Projekt B' },
    ]);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const gridItems = evaluations.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard project={project} onClick={() => console.log("asd")}/>
        </Grid>
    ));

    gridItems.push(
        <Grid item xs={12} sm={6} md={4} key="add">
            <ProjectCard isAddCard addCardText="Evaluierung erstellen" onAdd={handleOpenDialog}/>
        </Grid>
    );

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
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2, bgcolor: 'primary.light', color: 'white'}}>
                        <Typography variant="h5" gutterBottom>Mitarbeitende</Typography>
                        <Container>
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
                                    <Avatar sx={{width: 64, height: 64, mb: 1, backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.200' }}}>
                                        <AddIcon sx={{ fontSize: 32, color: 'grey'}} />
                                    </Avatar>
                                    <Typography variant="body2" align="center">
                                        Hinzufügen
                                    </Typography>
                                </Box>

                            </Box>
                        </Container>
                    </Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2}}>
                        <Typography variant="h5" gutterBottom>Prerequisites Evaluierungen</Typography>
                        <Container>
                            <Grid container spacing={3}>
                                {gridItems}
                            </Grid>
                        </Container>
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
        </MainLayout>
    );
};

export default ProjectPage;
