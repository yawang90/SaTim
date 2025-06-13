import React, {useState} from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Box, Button, LinearProgress, Paper, Stack, Tooltip, Typography,} from '@mui/material';

export default function SurveySidebar() {
    const questions = [
        {
            id: 'q1',
            title: 'What is your favorite color?',
            leftOption: { title: 'Blue' },
            rightOption: { title: 'Red' },
        },
        {
            id: 'q2',
            title: 'Do you prefer cats or dogs?',
            leftOption: { title: 'Cats' },
            rightOption: { title: 'Dogs' },
        },
        {
            id: 'q3',
            title: 'Morning or evening person?',
            leftOption: { title: 'Morning' },
            rightOption: { title: 'Evening' },
        },
    ];

    const [answers, setAnswers] = useState([
        { questionId: 'q1', choice: 'left' }, // answered Blue
        // q2 unanswered
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const isCompleted = false;

    const getAnswerForQuestion = (questionId) => {
        return answers.find((answer) => answer.questionId === questionId);
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const completedCount = answers.length;
    const progressPercentage = (completedCount / questions.length) * 100;

    return (
        <Paper elevation={1} sx={{width: 320, height: '100vh', overflowY: 'auto', borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper', px: 3, py: 3, display: 'flex', flexDirection: 'column',}}>
            <Box mb={3}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    Survey Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {completedCount} of {questions.length} questions completed
                </Typography>

                <Box mt={1}>
                    <LinearProgress
                        variant="determinate"
                        value={progressPercentage}
                        sx={{height: 8, borderRadius: 5, backgroundColor: 'grey.300', '& .MuiLinearProgress-bar': {backgroundColor: 'primary.main',},}}
                    />
                </Box>

                {isCompleted && (
                    <Paper
                        variant="outlined"
                        sx={{mt: 2, p: 1.5, bgcolor: 'success.light', borderColor: 'success.main',}}>
                        <Stack direction="row" spacing={1} alignItems="center" color="success.main" fontWeight="medium" fontSize="0.875rem">
                            <CheckCircleIcon fontSize="small" />
                            <Typography>Survey Completed!</Typography>
                        </Stack>
                    </Paper>
                )}
            </Box>

            <Box flexGrow={1} overflow="auto" sx={{ pr: 1 }}>
                <Typography variant="subtitle2" fontWeight="600" mb={1}>
                    Questions
                </Typography>

                <Stack spacing={1}>
                    {questions.map((question, index) => {
                        const answer = getAnswerForQuestion(question.id);
                        const isCurrentQuestion = index === currentQuestionIndex;
                        const isAnswered = !!answer;

                        return (
                            <Button key={question.id} onClick={() => goToQuestion(index)} variant={isCurrentQuestion ? 'contained' : 'outlined'} color={isCurrentQuestion ? 'primary' : 'inherit'} sx={{justifyContent: 'flex-start', textTransform: 'none', borderRadius: 2, py: 1.25, px: 2, boxShadow: isCurrentQuestion ? 3 : 'none', '&:hover': {boxShadow: 3, borderColor: 'primary.main',},}} startIcon={
                                isAnswered ? (
                                    <CheckCircleIcon color="success" />
                                ) : (
                                    <RadioButtonUncheckedIcon color="disabled" />
                                )
                            } endIcon={
                                isCurrentQuestion ? <ChevronRightIcon color="primary" /> : null
                            }>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1, overflow: 'hidden',}}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Question {index + 1}
                                    </Typography>
                                    <Tooltip title={question.title}>
                                        <Typography variant="body2" noWrap sx={{ maxWidth: '220px', fontWeight: 500 }}>
                                            {question.title}
                                        </Typography>
                                    </Tooltip>
                                    {answer && (
                                        <Box component="span" mt={0.5} px={1} py={0.25} bgcolor="primary.light" color="primary.dark" borderRadius={1} fontSize="0.75rem" fontWeight={600} sx={{ userSelect: 'none' }}>
                                            {answer.choice === 'left'
                                                ? question.leftOption.title
                                                : question.rightOption.title}
                                        </Box>
                                    )}
                                </Box>
                            </Button>
                        );
                    })}
                </Stack>
            </Box>
        </Paper>
    );
}
