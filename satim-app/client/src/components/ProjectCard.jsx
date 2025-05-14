import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ProjectCard = ({ project, isAddCard, onAdd }) => {
    return (
        <Card
            onClick={isAddCard ? onAdd : undefined}
            sx={{
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isAddCard ? 'pointer' : 'default',
                backgroundColor: isAddCard ? 'grey.100' : 'white',
                border: isAddCard ? '2px dashed #ccc' : '1px solid #eee',
                '&:hover': isAddCard ? { backgroundColor: 'grey.200' } : {},
            }}
        >
            <CardContent>
                {isAddCard ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <AddIcon fontSize="large" />
                        <Typography variant="body1">Projekt hinzufügen</Typography>
                    </Box>
                ) : (
                    <Typography variant="h6" textAlign="center">
                        {project.name}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
