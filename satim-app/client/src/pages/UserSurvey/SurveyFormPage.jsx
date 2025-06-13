import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ComparisonCard from '../../components/ComparisonCard';

export default function SurveyFormPage() {
    const questions = [
        {
            id: 'q1',
            title: 'What is your favorite color?',
            leftOption: { title: 'Blue', description: 'Cool and calm color.' },
            rightOption: { title: 'Red', description: 'Bold and energetic color.' },
        },
        {
            id: 'q2',
            title: 'Do you prefer cats or dogs?',
            leftOption: { title: 'Cats', description: 'Independent and curious.' },
            rightOption: { title: 'Dogs', description: 'Loyal and friendly.' },
        },
        {
            id: 'q3',
            title: 'Are you a morning or evening person?',
            leftOption: { title: 'Morning', description: 'Early riser and fresh.' },
            rightOption: { title: 'Evening', description: 'Night owl and relaxed.' },
        },
    ];

    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const isCompleted = answers.length === questions.length;

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

    if (!currentQuestion) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    No questions available
                </Typography>
            </Box>
        );
    }

    const answerQuestion = (questionId, choice) => {
        setAnswers((prev) => {
            const existingIndex = prev.findIndex((a) => a.questionId === questionId);
            if (existingIndex >= 0) {
                const copy = [...prev];
                copy[existingIndex] = { questionId, choice };
                return copy;
            }
            return [...prev, { questionId, choice }];
        });
    };

    const handleAnswer = (choice) => {
        answerQuestion(currentQuestion.id, choice);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((i) => i + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((i) => i - 1);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Paper
                elevation={1}
                sx={{ borderBottom: 1, borderColor: 'divider', px: 4, py: 3, bgcolor: 'background.paper' }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                            Choose your preferred option
                        </Typography>
                    </Box>

                    {isCompleted && (
                        <Stack direction="row" spacing={1} alignItems="center" color="success.main" fontWeight="medium">
                            <CheckCircleIcon />
                            <Typography>Survey Complete!</Typography>
                        </Stack>
                    )}
                </Box>
            </Paper>

            <Box
                sx={{
                    flex: 1,
                    bgcolor: 'grey.100',
                    px: { xs: 2, md: 6 },
                    py: { xs: 4, md: 8 },
                    overflowY: 'auto',
                }}
            >
                <Box maxWidth="900px" mx="auto">
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {currentQuestion.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Click on your preferred option below
                        </Typography>
                    </Box>

                    <Grid container spacing={4} mb={6}>
                        <Grid item xs={12} md={6}>
                            <ComparisonCard
                                side="left"
                                title={currentQuestion.leftOption.title}
                                description={currentQuestion.leftOption.description}
                                onSelect={() => handleAnswer('left')}
                                isSelected={currentAnswer?.choice === 'left'}
                                isAnswered={!!currentAnswer}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ComparisonCard
                                side="right"
                                title={currentQuestion.rightOption.title}
                                description={currentQuestion.rightOption.description}
                                onSelect={() => handleAnswer('right')}
                                isSelected={currentAnswer?.choice === 'right'}
                                isAnswered={!!currentAnswer}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<ChevronLeftIcon />}
                            onClick={previousQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </Button>

                        <Typography variant="body2" color="text.secondary">
                            {currentAnswer ? 'Answer saved' : 'Select an option to continue'}
                        </Typography>

                        <Button
                            variant="contained"
                            endIcon={<ChevronRightIcon />}
                            onClick={nextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
