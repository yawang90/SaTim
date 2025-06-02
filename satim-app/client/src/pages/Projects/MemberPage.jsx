import React, {useEffect, useState} from 'react';
import {
    Box,
    CircularProgress,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {
    dashboardSidebar,
    membersSidebar,
    projectHomeSidebar,
    settingsSidebar
} from "../../components/SidebarConfig";
import {useTranslation} from "react-i18next";
import {getProjectMembers} from "../../services/ProjectService";

const MemberPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {projectId} = useParams();

    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getProjectMembers({projectId});
                console.log(data)
                setMembers(data);
            } catch (err) {
                console.error("Failed to fetch project members:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [projectId]);

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
                                                <Button
                                                    onClick={() => handleRemove(member.id)}
                                                    sx={{textTransform: 'none', fontWeight: 'bold', pl: 0, pr: 0}}>
                                                    {t('remove')}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </MainLayout>
    );
};

export default MemberPage;
