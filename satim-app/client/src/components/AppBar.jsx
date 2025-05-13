import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginButton from "./LoginButton";
import {Button} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";

const AppBarWithUserIcon = () => {
    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <img src="/resources/phsg-logo.png" alt="phsg logo" className="logo"
                     style={{height: 40, marginRight: 16}}/>
                <Box sx={{width: 32}}/>
                <Box sx={{flexGrow: 1}}>
                    <Button
                        key="Meine Projekte"
                        onClick={() => {}}
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Typography variant="h6" sx={{ color: 'inherit', textTransform: 'none' }}>
                            Meine Projekte
                        </Typography>
                    </Button>
                </Box>
                <Box>
                    {useAuth() ? (
                        <IconButton color="inherit" onClick={() => {
                        }}><AccountCircle fontSize="large"/></IconButton>) : (<LoginButton/>)}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWithUserIcon;
