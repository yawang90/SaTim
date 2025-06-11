import PollIcon from "@mui/icons-material/Poll";
import {ListItemButton, ListItemIcon, ListItemText, Collapse, List} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

export const SurveySidebarSection = ({ t, navigate, projectId, surveys }) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <PollIcon />
                </ListItemIcon>
                <ListItemText primary={t("survey.sidebarTitle")} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {surveys.map((survey) => (
                        <ListItemButton
                            key={survey.id}
                            sx={{ pl: 4 }}
                            onClick={() =>
                                navigate(`/surveyDashboard/${projectId}/${survey.id}`)
                            }
                        >
                            <ListItemText primary={survey.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
};