import React from 'react';
import {Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar,} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer variant="permanent" sx={{width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',  top: '79px'},}}>
            <Toolbar />
            <Divider />
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projekt Übersicht" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;
