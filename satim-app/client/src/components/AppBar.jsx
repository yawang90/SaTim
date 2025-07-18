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

const AppBarWithUserIcon = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const { isLoggedIn, logout } = useAuth();
    const open = Boolean(anchorElement);
    const navigate = useNavigate();

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
                            Meine Projekte
                        </Typography>
                    </Button>
                </Box>
                <Box>
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
                                <MenuItem onClick={handleProfile}>Profil</MenuItem>
                                <MenuItem onClick={handleLogout}>Ausloggen</MenuItem>
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
