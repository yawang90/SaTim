import React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';

function ComparisonCard({title, onSelect, isSelected, isAnswered}) {
    return (
        <Card
            onClick={onSelect}
            elevation={isSelected && isAnswered ? 6 : 2}
            sx={{width: 100, height: 100, cursor: 'pointer', transition: 'all 0.3s ease', border: isSelected && isAnswered ? '2px solid #4caf50' : '1px solid #e0e0e0', backgroundColor: isSelected && isAnswered ? '#e8f5e9' : 'white', '&:hover': {transform: 'scale(1.02)', boxShadow: 4,},}}>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                        <Typography variant="h6" fontWeight="bold" textAlign="center">
                            {title}
                        </Typography>
                    </Box>
                }
                sx={{ pb: 0 }}
            />
            <CardContent sx={{ pt: 1 }} />
        </Card>
    );
}

export default ComparisonCard;
