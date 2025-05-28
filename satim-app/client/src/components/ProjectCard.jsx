import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const ProjectCard = ({ displayName, isAddCard, onAdd, onClick, addCardText}) => {
    return (
        <Card
            onClick={isAddCard ? onAdd : onClick}
            sx={{
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: isAddCard ? 'grey.100' : 'white',
                border: isAddCard ? '2px dashed #ccc' : '1px solid #eee',
                '&:hover': { backgroundColor: 'grey.200' },
            }}
        >
            <CardContent>
                {isAddCard ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <AddIcon fontSize="large" />
                        <Typography variant="body1">{addCardText}</Typography>
                    </Box>
                ) : (
                    <Typography variant="h6" textAlign="center">
                        {displayName}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
