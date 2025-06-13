import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    CardHeader,
    Typography,
    Button,
    Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ComparisonCard({side, title, description, onSelect, isSelected, isAnswered}) {
    return (
        <Card
            onClick={onSelect}
            elevation={isSelected && isAnswered ? 6 : 2}
            sx={{height: '100%', cursor: 'pointer', transition: 'all 0.3s ease', border: isSelected && isAnswered ? '2px solid #4caf50' : '1px solid #e0e0e0', backgroundColor: isSelected && isAnswered ? '#e8f5e9' : 'white', '&:hover': {transform: 'scale(1.02)', boxShadow: 4,},}}>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                        {isSelected && isAnswered && (
                            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                        )}
                        <Typography variant="h6" fontWeight="bold" textAlign="center">
                            {title}
                        </Typography>
                    </Box>
                }
                subheader={
                    description && (
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            {description}
                        </Typography>
                    )
                }
                sx={{ pb: 0 }}
            />

            <CardContent sx={{ pt: 1 }} />

            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button fullWidth variant="contained" color={isSelected && isAnswered ? 'success' : 'primary'} onClick={(e) => {e.stopPropagation();onSelect();}}>
                    {isSelected && isAnswered ? 'Ausgewählt' : `Wähle ${side === 'left' ? 'Links' : 'Rechts'}`}
                </Button>
            </CardActions>
        </Card>
    );
}

export default ComparisonCard;
