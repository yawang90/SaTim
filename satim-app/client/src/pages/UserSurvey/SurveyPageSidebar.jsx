import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Box, Button, Paper, Stack, Typography,} from '@mui/material';
import {useTranslation} from "react-i18next";

export default function SurveyPageSidebar({goToQuestion, currentQuestionIndex, questions}) {
    const { t } = useTranslation();

    const setNextQuestion = (index) => {
        goToQuestion(index);
    };

    return (
        <Paper elevation={1} sx={{width: 320, overflowY: 'auto', borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper', px: 3, py: 3, display: 'flex', flexDirection: 'column',}}>
            <Box mb={3}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    {t("survey.overview")}
                </Typography>
            </Box>

            <Box flexGrow={1} overflow="auto" sx={{ pr: 1 }}>
                <Typography variant="subtitle2" fontWeight="600" mb={1}>
                    {t("survey.questions")}
                </Typography>

                <Stack spacing={1}>
                    {questions?.map((question, index) => {
                        const isCurrentQuestion = index === currentQuestionIndex;
                        return (
                            <Button key={question.id} onClick={() => setNextQuestion(index)} variant={isCurrentQuestion ? 'contained' : 'outlined'} color={isCurrentQuestion ? 'primary' : 'inherit'} sx={{justifyContent: 'flex-start', textTransform: 'none', borderRadius: 2, py: 1.25, px: 2, boxShadow: isCurrentQuestion ? 3 : 'none', '&:hover': {boxShadow: 3, borderColor: 'primary.main',},}} endIcon={isCurrentQuestion ? <ChevronRightIcon color="primary" /> : null}>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1, overflow: 'hidden',}}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        {t("survey.question")+ index}
                                    </Typography>
                                        <Box component="span" mt={0.5} px={1} py={0.25} bgcolor="primary.light" color="primary.dark" borderRadius={1} fontSize="0.75rem" fontWeight={600} sx={{ userSelect: 'none' }}>
                                            {question.answer}
                                        </Box>
                                </Box>
                            </Button>
                        );
                    })}
                </Stack>
            </Box>
        </Paper>
    );
}
