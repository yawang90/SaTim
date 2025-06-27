import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Paper, Stack, Typography} from '@mui/material';
import SurveyPageSidebar from './SurveyPageSidebar';
import SurveyPageForm from './SurveyPageForm';
import {getOrCreateResponse} from "../../services/SurveyService";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import RegistrationButton from "../../components/RegistrationButton";
import LoginButton from "../../components/LoginButton";

export default function SurveyPage() {
    const {surveyId} = useParams();
    const {t} = useTranslation();
    const userId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [response, setResponse] = useState([]);
    const maxQuestions = 20;

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const goToNextQuestion = () => {
        getResponse();
    }

    useEffect(() => {
        if (userId && surveyId) {
            getResponse();
        }
    }, [userId, surveyId]);


    const getResponse = async () => {
        const responseData = await getOrCreateResponse(surveyId, userId);
        responseData.questions.push({"id": "test", "answer": "Aktuelle Frage"});
        setResponse(responseData);
        if (responseData.questions.length === 0) {
            setCurrentQuestionIndex(0)
        } else {
            setCurrentQuestionIndex(responseData.questions.length - 1)
        }
        setIsCompleted(responseData.questions.length >= maxQuestions);
    }

    if (!userId) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.default">
                <Paper elevation={3} sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        {t("survey.registerTitle")}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        {t("survey.register")}
                    </Typography>

                    <Stack spacing={2} direction="column" alignItems="center">
                        <RegistrationButton redirectTo={`/survey/form/${surveyId}`}/>
                        <LoginButton redirectTo={`/survey/form/${surveyId}`}/>
                    </Stack>
                </Paper>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default',}}>
            {isCompleted ? (
                <Box textAlign="center" mt={10}>
                    <Typography variant="h4" gutterBottom>
                        {t("surveyForm.thanksTitle")}
                    </Typography>
                    <Typography variant="subtitle1">
                        {t("surveyForm.thanksSubtitle")}
                    </Typography>
                </Box>
            ) : (
                <Box sx={{display: 'flex'}}>
                    <SurveyPageSidebar
                        goToQuestion={goToQuestion}
                        questions={response.questions}
                        currentQuestionIndex={currentQuestionIndex}
                    />
                    <Box sx={{flex: 1}}>
                        <SurveyPageForm
                            response={response}
                            currentQuestionIndex={currentQuestionIndex}
                            goToQuestion={goToQuestion}
                            goToNextQuestion={goToNextQuestion}
                        />
                    </Box>
                </Box>)}
        </Box>
    );
}
