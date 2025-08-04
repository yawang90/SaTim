import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import MainLayout from "../../layouts/MainLayout";
import ProjectCard from "../../components/ProjectCard";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {dashboardSidebar, membersSidebar, projectHomeSidebar, settingsSidebar} from "../../components/SidebarConfig";
import {addProjectMember, getProjectById, getProjectMembers, sendInviteEmail} from "../../services/ProjectService";
import {getAllSurveysByProject} from "../../services/SurveyService";
import {enqueueSnackbar} from "notistack";
import {findUsersByNameOrEmail} from "../../services/UserService";

const ProjectPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSurveys, setLoadingSurveys] = useState(false);
    const [loadingAddMember, setLoadingAddMember] = useState(false);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [loadingInvite, setLoadingInvite] = useState(false);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const sidebarItems = [
        ...dashboardSidebar(t, navigate),
        ...projectHomeSidebar(t, navigate, projectId),
        ...settingsSidebar(t, navigate, projectId),
        ...membersSidebar(t, navigate, projectId),
    ];
    const [surveys, setSurveys] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const [searchMember, setSearchMember] = useState('');
    const [inviteEmail, setInviteEmail] = useState("");
    const navigateSurveyCreation = () => {
        navigate(`/survey/creation/${projectId}`)
    }
    const navigateSurveyDashboard = (surveyId) => {
        navigate(`/survey/dashboard/${surveyId}/${projectId}`)
    }

    const gridItems = surveys.map((survey) => (
        <Grid item xs={12} sm={6} md={4} key={survey.id}>
            <ProjectCard project={survey} displayName={survey.title} onClick={() => navigateSurveyDashboard(survey.id)}/>
        </Grid>
    ));

    gridItems.push(
        <Grid item xs={12} sm={6} md={4} key="add">
            <ProjectCard isAddCard addCardText={t("survey.create")}  displayName={""} onAdd={() => navigateSurveyCreation()}/>
        </Grid>
    );

    const handleOpenMemberDialog = () => setOpenMemberDialog(true);
    const handleCloseMemberDialog = () => {
        setOpenMemberDialog(false);
        setSearchMember('');
        setSelectedMember(null);
    };

    const addMember = async (member) => {
            setLoadingAddMember(true);
            try {
                await addProjectMember({member, projectId});
            } catch (err) {
                enqueueSnackbar(t("error.membersAdd"), { variant: "warning" });
            } finally {
                setLoadingAddMember(false);
                handleCloseMemberDialog();
                await fetchMembers();
            }
    }

    const fetchMembers = async () => {
        setLoadingMembers(true);
        try {
            const data = await getProjectMembers({projectId});
            setMembers(data);
        } catch (err) {
            enqueueSnackbar(t("error.members"), { variant: "warning" });
        } finally {
            setLoadingMembers(false);
        }
    };

    const sendInvite = async (inviteEmail) => {
        setLoadingInvite(true);
        try {
            await sendInviteEmail({inviteEmail, projectId});
        } catch (err) {
            enqueueSnackbar(t("error.invite"), { variant: "warning" });
        } finally {
            setLoadingInvite(false);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, [projectId]);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const data = await getProjectById({projectId});
                setProject(data);
            } catch (error) {
                setError(t("error.service"));
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                setLoadingSurveys(true);
                const data = await getAllSurveysByProject({projectId});
                setSurveys(data);
            } catch (error) {
                enqueueSnackbar(t("error.surveys"), { variant: "warning" });
            } finally {
                setLoadingSurveys(false);
            }
        };
        fetchSurveys();
    }, [projectId]);

    useEffect(() => {
        if (!searchMember.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                setSearchLoading(true);
                const members = await findUsersByNameOrEmail(searchMember, projectId);
                setSearchResults(members);
            } catch (err) {
                enqueueSnackbar(t("error.membersSearch"), { variant: "warning" });
            } finally {
                setSearchLoading(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchMember]);

    if (error || !project?.projects) {
        return (
            <MainLayout><Box sx={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                <Typography variant="h4" gutterBottom>{t("error.title", "Something went wrong")}</Typography>
                <Typography variant="body1" gutterBottom>{error}</Typography>
                <Button variant="contained" onClick={() => window.location.reload()}>
                    {t("error.reload")}
                </Button>
            </Box></MainLayout>
        );
    }

    if (loading || loadingSurveys || loadingMembers || loadingAddMember) {
        return (
            <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <MainLayout>
            <Box sx={{display: 'flex'}}>
                <Sidebar items={sidebarItems}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>{project.projects.name}</Typography>
                    <Typography variant="h6" gutterBottom>{project.projects.description}</Typography>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4, pl: 2, bgcolor: 'primary.light1', color: 'white'}}>
                        <Typography variant="h5" gutterBottom>{t("project.member")}</Typography>
                        <Box sx={{display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-start',}}>
                            {members?.length > 0 ? (
                                members.map(member => (
                                    <Box key={member.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar src={member.avatarUrl} sx={{ width: 64, height: 64, mb: 1 }}>
                                            {member.firstName?.[0] ?? '?'}
                                        </Avatar>
                                        <Typography variant="body2" align="center">
                                            {member.firstName} {member.lastName}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    {t('project.noMembers')}
                                </Typography>
                            )}
                            <Box onClick={handleOpenMemberDialog} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64, cursor: 'pointer', color: 'white',}}>
                                <Avatar sx={{width: 64, height: 64, mb: 1, backgroundColor: 'white', '&:hover': {backgroundColor: 'grey.200'}}}>
                                    <AddIcon sx={{fontSize: 32, color: 'grey'}}/>
                                </Avatar>
                                <Typography variant="body2" align="center">
                                    {t('project.addMembers')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{pb: 5}}></Box>
                    <Box component="main" sx={{pt: 2, pb: 4}}>
                        <Typography variant="h5" gutterBottom>{t("survey.title")}</Typography>
                            <Grid container spacing={3}>
                                {gridItems}
                            </Grid>
                    </Box>
                </Box>
            </Box>
            <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog} fullWidth>
                <DialogTitle>{t("project.addMember")}</DialogTitle>
                <DialogContent sx={{ mt: 3, mb: 2 }}>
                    <Autocomplete
                        options={searchResults}
                        filterOptions={(options) => options}
                        getOptionLabel={(option) =>
                            `${option.firstName ?? option.first_name ?? ""} ${option.lastName ?? option.last_name ?? ""} (${option.email ?? ""})`
                        }
                        loading={searchLoading}
                        value={selectedMember}
                        noOptionsText={`${t("member.noResults")} — ${t("member.enterEmailBelow")}`}
                        onChange={(event, newValue) => {
                            setSelectedMember(newValue);
                            if (newValue) setInviteEmail("");
                        }}
                        inputValue={searchMember}
                        onInputChange={(event, newInputValue) => {
                            setSearchMember(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={t("member.label")}
                                helperText={t("member.email")}
                                fullWidth
                            />
                        )}
                        renderOption={(props, option) => {
                            const { key, ...rest } = props;
                            return (
                                <Box key={key} component="li" {...rest} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Avatar src={option.avatarUrl} sx={{ width: 32, height: 32 }}>
                                        {(option.firstName ?? option.first_name ?? "?")[0]}
                                    </Avatar>
                                    <span>{option.firstName ?? option.first_name} {option.lastName ?? option.last_name}</span>
                                    <Typography variant="body2" color="text.secondary">
                                        {option.email}
                                    </Typography>
                                </Box>
                            );
                        }}
                    />
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            label={t("member.inviteEmail")}
                            placeholder="example@email.com"
                            fullWidth
                            value={inviteEmail}
                            onChange={(e) => {
                                setInviteEmail(e.target.value);
                                setSelectedMember(null);
                            }}
                            helperText={t("member.inviteHelper")}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseMemberDialog}>{t("cancel")}</Button>
                    <Button
                        onClick={() => {
                            if (selectedMember) {
                                addMember(selectedMember);
                            } else if (inviteEmail.trim()) {
                                sendInvite(inviteEmail.trim())
                            }
                            handleCloseMemberDialog();
                        }}
                        variant="contained"
                        disabled={!selectedMember && !(inviteEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail))}>
                        {selectedMember ? t("project.addMember") : t("member.sendInvite")}
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default ProjectPage;
