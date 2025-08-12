import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {useTranslation} from "react-i18next";
import {getProjectMembers, removeProjectMember} from "../../services/ProjectService";
import {enqueueSnackbar} from "notistack";

const MemberPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {projectId} = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);

    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];

    const fetchMembers = async () => {
        try {
            const data = await getProjectMembers({projectId});
            setMembers(data);
        } catch (err) {
            enqueueSnackbar(t("error.service"), { variant: "warning" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [projectId]);

    const handleRemoveClick = (memberId) => {
        setSelectedMemberId(memberId);
        setOpenDialog(true);
    };

    const confirmRemove = async () => {
        try {
            setLoading(true);
            await removeProjectMember(selectedMemberId, projectId);
            enqueueSnackbar(t("member.memberRemoved"), { variant: "success" });
            fetchMembers();
        } catch (err) {
            enqueueSnackbar(t("error.service"), { variant: "warning" });
        } finally {
            setOpenDialog(false);
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={sidebarItems}/>
                <Box component="main"
                     sx={{flexGrow: 1, height: 'calc(100vh - 79px)', mt: '79px', p: 4, backgroundColor: '#f5f5f5',}}>
                    <Typography variant="h5" gutterBottom>
                        {t('project.member')}
                    </Typography>
                    <Box sx={{pb: 5}}></Box>
                    {loading ? (    <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200,}}>
                        <CircularProgress />
                    </Box>) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{fontWeight: 'bold', fontSize: '0.8rem',}}>{t('user.name')}</TableCell>
                                        <TableCell
                                            sx={{fontWeight: 'bold', fontSize: '0.8rem',}}>{t('user.email')}</TableCell>
                                        <TableCell sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                        }}>{t('project.role')}</TableCell>
                                        <TableCell sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                        }}>{t('project.action')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {members.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                {member.firstName} {member.lastName}
                                            </TableCell>
                                            <TableCell>{member.email}</TableCell>
                                            <TableCell>{member.role}</TableCell>
                                            <TableCell>
                                                {member.role !== 'admin' && (
                                                    <Button
                                                    onClick={() => handleRemoveClick(member.id)}
                                                    sx={{textTransform: 'none', fontWeight: 'bold', pl: 0, pr: 0}}>
                                                    {t('remove')}
                                                </Button>)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>{t('confirm')}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {t('member.confirmRemoveMember')}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={() => setOpenDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={confirmRemove} autoFocus>
                                {t('remove')}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default MemberPage;
