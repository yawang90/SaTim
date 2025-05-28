import React from 'react';
import {Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar} from '@mui/material';

const drawerWidth = 240;

const Sidebar = ({ items }) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    top: '79px'
                },
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                {items.map(({ label, icon, onClick }, index) => (
                    <ListItemButton key={index} onClick={onClick}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
