import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Paper, Stack, Typography, Pagination } from '@mui/material';
import { useTranslation } from "react-i18next";

const QUESTIONS_PER_PAGE = 8;

export default function SurveyPageSidebar({ goToQuestion, currentQuestionIndex, questions }) {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(questions?.length / QUESTIONS_PER_PAGE);
    const startIndex = (page - 1) * QUESTIONS_PER_PAGE;
    const paginatedQuestions = questions?.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const setNextQuestion = (index) => {
        goToQuestion(index);
    };

    return (
        <Paper elevation={1} sx={{width: 320, borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper', px: 3, py: 3, display: 'flex', flexDirection: 'column',}}>
            <Box mb={3}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    {t("survey.overview")}
                </Typography>
            </Box>

            <Box flexGrow={1}>
                <Typography variant="subtitle2" fontWeight="600" mb={1}>
                    {t("survey.questions")}
                </Typography>

                <Stack spacing={1}>
                    {paginatedQuestions?.map((question, indexOnPage) => {
                        const actualIndex = startIndex + indexOnPage;
                        const isCurrentQuestion = actualIndex === currentQuestionIndex;
                        const isClickable = actualIndex >= questions.length - 1;

                        return (
                            <Button
                                key={question.id}
                                onClick={() => isClickable && setNextQuestion(actualIndex)}
                                variant={isCurrentQuestion ? 'contained' : 'outlined'}
                                color={isClickable ? (isCurrentQuestion ? 'primary' : 'inherit') : 'inherit'}
                                disabled={!isClickable}
                                sx={{justifyContent: 'flex-start', textTransform: 'none', borderRadius: 2, py: 1.25, px: 2, boxShadow: isCurrentQuestion ? 3 : 'none', opacity: isClickable ? 1 : 0.5, pointerEvents: isClickable ? 'auto' : 'none', '&:hover': {boxShadow: isClickable ? 3 : 'none', borderColor: isClickable ? 'primary.main' : 'divider',},}}
                                endIcon={isCurrentQuestion && isClickable ? <ChevronRightIcon color="primary" /> : null}>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1, overflow: 'hidden',}}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        {t("survey.question") + actualIndex}
                                    </Typography>
                                    <Box component="span" mt={0.5} px={1} py={0.25} borderRadius={1} fontSize="0.75rem" fontWeight={600} sx={{userSelect: 'none', bgcolor: question.answer ? 'primary.light' : 'grey.300', color: question.answer ? 'primary.dark' : 'grey.800',}}>
                                        {question.answer || t("survey.current")}
                                    </Box>
                                </Box>
                            </Button>
                        );
                    })}
                </Stack>
            </Box>

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination count={totalPages} page={page} onChange={handleChangePage} size="small" color="primary"/>
            </Box>
        </Paper>
    );
}
