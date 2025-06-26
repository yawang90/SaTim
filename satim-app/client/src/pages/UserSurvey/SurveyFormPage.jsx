import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ComparisonCard from '../../components/ComparisonCard';
import {useTranslation} from "react-i18next";
import {getCompetences, getOrCreateResponse, saveAnswerToResponse} from "../../services/SurveyService";
import {useParams} from "react-router-dom";

export default function SurveyFormPage() {
    const {t} = useTranslation();
    const {surveyId} = useParams();
    const userId = localStorage.getItem('userId');
    const questionLayout =
        {
            id: 'q1',
            title: 'Nehmen Sie an, dass ein/eine Schüler:in nicht über Kompetenz a verfügt. Ist es dann sehr wahrscheinlich, dass er/sie auch nicht über Kompetenz b verfügt?',
            leftOption: {title: 'Ja'},
            rightOption: {title: 'Nein'},
        };
    const [response, setResponse] = useState([]);
    const [competences, setCompetences] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentChoice, setCurrentChoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [competenceFrom, setCompetenceFrom] = useState(null);
    const [competenceTo, setCompetenceTo] = useState(null);
    const maxQuestions = 5;

    const handleAnswer = (choice) => {
        setCurrentChoice(choice);
    };

    const saveAnswer = async () => {
        try {
            setLoading(true);
            await saveAnswerToResponse(response.id, currentChoice, competenceFrom.col1, competenceTo.col1);
            nextQuestion();
        } finally {
            setLoading(false);
        }
    }

    const nextQuestion = () => {
        const randomIndexA = Math.floor(Math.random() * competences.length);
        let randomIndexB = Math.floor(Math.random() * competences.length);
        while (randomIndexB === randomIndexA && competences.length > 1) {
            randomIndexB = Math.floor(Math.random() * competences.length);
        }
        setCompetenceFrom(competences[randomIndexA]);
        setCompetenceTo(competences[randomIndexB]);
        setCurrentChoice(null);
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((i) => i - 1);
        }
    };

    useEffect(() => {
        const setFromToCompetences = async () => {
            if (!competenceFrom && !competenceTo) {
                nextQuestion();
            }
        }
        setFromToCompetences();
    }, [competences]);

    useEffect(() => {
        const getResponse = async () => {
            const responseData = await getOrCreateResponse(surveyId, userId);
            setResponse(responseData);
            if (responseData.questions.length === 0) {
                // TODO
            } else {
                setCurrentQuestionIndex(responseData.questions.length - 1)
            }
        }
        getResponse();
    }, []);

    useEffect(() => {
        const fetchCompetences = async () => {
            try {
                setLoading(true);
                const competencesData = await getCompetences(surveyId);
                setCompetences(competencesData);
            } finally {
                setLoading(false)
            }
        }
        fetchCompetences();
    }, []);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default',}}>
            {response?.questions?.length >= maxQuestions ? (
                <Box textAlign="center" mt={10}>
                    <Typography variant="h4" gutterBottom>
                        {t("surveyForm.thanksTitle")}
                    </Typography>
                    <Typography variant="subtitle1">
                        {t("surveyForm.thanksSubtitle")}
                    </Typography>
                </Box>
            ) : (
            <Box sx={{flex: 1, bgcolor: 'grey.100', px: {xs: 2, md: 6}, py: {xs: 4, md: 8}, overflowY: 'auto',}}>
                <Box maxWidth="900px" mx="auto">
                    <Box textAlign="left" mb={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {t("surveyForm.competenceA")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {competenceFrom?.col3}
                        </Typography>
                    </Box>
                    <Box textAlign="left" mb={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {t("surveyForm.competenceB")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {competenceTo?.col3}
                        </Typography>
                    </Box>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {questionLayout.title}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 6}}>
                        <Grid container spacing={4} mb={6}>
                            <Grid item xs={12} md={6}>
                                <ComparisonCard
                                    title={questionLayout.leftOption.title}
                                    onSelect={() => handleAnswer('Ja')}
                                    isSelected={currentChoice === 'Ja'}
                                    isAnswered={!!currentChoice}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ComparisonCard
                                    title={questionLayout.rightOption.title}
                                    onSelect={() => handleAnswer('Nein')}
                                    isSelected={currentChoice === 'Nein'}
                                    isAnswered={!!currentChoice}
                                />
                            </Grid>
                        </Grid></Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button variant="outlined" startIcon={<ChevronLeftIcon/>} onClick={previousQuestion}
                                disabled={currentQuestionIndex === 0}>
                            {t("surveyForm.back")}
                        </Button>
                        <Button variant="contained" endIcon={<ChevronRightIcon/>} onClick={saveAnswer} disabled={!currentChoice}>
                            {t("surveyForm.next")}
                        </Button>
                    </Box>
                </Box>
            </Box>
            )}
        </Box>
    );
}
