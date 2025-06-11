import React from 'react';
import {Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText,} from '@mui/material';

const drawerWidth = 240;

const Sidebar = ({ items, surveySection }) => {
    const [firstItem, ...restItems] = items;

    return (
        <Drawer variant="permanent" sx={{width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box', top: '79px',},}}>
            {firstItem && (
                <List>
                    <ListItemButton onClick={firstItem.onClick}>
                        <ListItemIcon>{firstItem.icon}</ListItemIcon>
                        <ListItemText primary={firstItem.label} />
                    </ListItemButton>
                </List>
            )}
            <Divider />

            <List>
                {restItems.map(({ label, icon, onClick }, index) => (
                    <ListItemButton key={index} onClick={onClick}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
            </List>

            {surveySection && (
                <>
                    <Divider />
                    <List>{surveySection}</List>
                </>
            )}
        </Drawer>
    );
};

export default Sidebar;
