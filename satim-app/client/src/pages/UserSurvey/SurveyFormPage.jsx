import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ComparisonCard from '../../components/ComparisonCard';
import {useTranslation} from "react-i18next";
import {getCompetences, getOrCreateResponse} from "../../services/SurveyService";
import {useParams} from "react-router-dom";

export default function SurveyFormPage() {
    const {t} = useTranslation();
    const { surveyId } = useParams();
    const questions = [
        {
            id: 'q1',
            title: 'Nehmen Sie an, dass ein/eine Schüler:in nicht über Kompetenz a verfügt. Ist es dann sehr wahrscheinlich, dass er/sie auch nicht über Kompetenz b verfügt?',
            leftOption: {title: 'Ja'},
            rightOption: {title: 'Nein'},
        }
    ];

    const [answers, setAnswers] = useState([]);
    const [competences, setCompetences] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

    const answerQuestion = (questionId, choice) => {
        setAnswers((prev) => {
            const existingIndex = prev.findIndex((a) => a.questionId === questionId);
            if (existingIndex >= 0) {
                const copy = [...prev];
                copy[existingIndex] = {questionId, choice};
                return copy;
            }
            return [...prev, {questionId, choice}];
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

    useEffect(() => {
        const getResponse = async () => {
            await getOrCreateResponse();
        }
        getResponse();
    }, []);

    useEffect(() => {
        const fetchCompetences = async () => {
            const competencesData = await getCompetences(surveyId);
            const competencesKeys = Object.keys(competencesData);
            const column1 = competencesData[competencesKeys[0]];
            const column2 = competencesData[competencesKeys[1]];
            const column3 = competencesData[competencesKeys[2]];
            const column4 = competencesData[competencesKeys[3]];
            setCompetences(column3);
        }
        fetchCompetences();
    }, [competences]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default',}}>
            <Box sx={{flex: 1, bgcolor: 'grey.100', px: {xs: 2, md: 6}, py: {xs: 4, md: 8}, overflowY: 'auto',}}>
                <Box maxWidth="900px" mx="auto">
                    <Box textAlign="left" mb={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {t("surveyForm.competenceA")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {competences[0]}
                        </Typography>
                    </Box>
                    <Box textAlign="left" mb={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {t("surveyForm.competenceB")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {competences[1]}
                        </Typography>
                    </Box>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {currentQuestion.title}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 6}}>
                        <Grid container spacing={4} mb={6}>
                            <Grid item xs={12} md={6}>
                                <ComparisonCard
                                    side="left"
                                    title={currentQuestion.leftOption.title}
                                    onSelect={() => handleAnswer('left')}
                                    isSelected={currentAnswer?.choice === 'left'}
                                    isAnswered={!!currentAnswer}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ComparisonCard
                                    side="right"
                                    title={currentQuestion.rightOption.title}
                                    onSelect={() => handleAnswer('right')}
                                    isSelected={currentAnswer?.choice === 'right'}
                                    isAnswered={!!currentAnswer}
                                />
                            </Grid>
                        </Grid></Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button variant="outlined" startIcon={<ChevronLeftIcon/>} onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
                            {t("surveyForm.back")}
                        </Button>
                        <Button variant="contained" endIcon={<ChevronRightIcon/>} onClick={nextQuestion} disabled={!currentAnswer}>
                            {t("surveyForm.next")}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
