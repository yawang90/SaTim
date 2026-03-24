import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginButton from "./LoginButton";
import {Button, MenuItem} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import Menu from '@mui/material/Menu';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import i18n from "i18next";

const AppBarWithUserIcon = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const { isLoggedIn, logout } = useAuth();
    const open = Boolean(anchorElement);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [langAnchor, setLangAnchor] = useState(null);
    const langOpen = Boolean(langAnchor);

    const handleMenu = (event) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleProfile = () => {
        navigate('/profile')
        handleClose();
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/')
    };

    const handleNavigate = () => {
        navigate('/dashboard')
    }

    const handleLangMenu = (event) => {
        setLangAnchor(event.currentTarget);
    };

    const handleLangClose = () => {
        setLangAnchor(null);
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        handleLangClose();
    };
    return (
        <AppBar position="fixed" color="primary" elevation={2} sx={{ minHeight: 78}}>
            <Toolbar sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <img src="/resources/phsg-logo.png" alt="phsg logo" className="logo"
                     style={{height: 40, marginRight: 16}}/>
                <Box sx={{width: 32}}/>
                <Box sx={{flexGrow: 1}}>
                    <Button
                        key="Meine Projekte"
                        onClick={() => {handleNavigate()}}
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Typography variant="h6" sx={{ color: 'inherit', textTransform: 'none' }}>
                            {t("navigation.myProjects")}
                        </Typography>
                    </Button>
                </Box>
                <Box>
                    <IconButton color="inherit" onClick={handleLangMenu}>
                        <LanguageIcon />
                    </IconButton>
                    <Menu anchorEl={langAnchor} open={langOpen} onClose={handleLangClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} transformOrigin={{vertical: 'top', horizontal: 'right',}}>
                        <MenuItem onClick={() => changeLanguage('de')}>Deutsch</MenuItem>
                        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                    </Menu>
                    {isLoggedIn ? (
                        <>
                            <IconButton color="inherit" onClick={handleMenu}>
                                <AccountCircle fontSize="large" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElement}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}>
                                <MenuItem onClick={handleProfile}>{t("navigation.profile")}</MenuItem>
                                <MenuItem onClick={handleLogout}>{t("navigation.logout")}</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <LoginButton />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWithUserIcon;
