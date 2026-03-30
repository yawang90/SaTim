import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ComparisonCard from '../../components/ComparisonCard';
import {Trans, useTranslation} from "react-i18next";
import {getCompetences, saveAnswerToResponse} from "../../services/SurveyService";
import {useParams} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SurveyPageForm({response, currentQuestionIndex, goToNextQuestion, goToQuestion}) {
    const {t} = useTranslation();
    const {surveyId} = useParams();
    const questionLayout =
        {
            id: 'q1',
            title: t("surveyForm.question1"),
            leftOption: {title: t("surveyForm.yes")},
            rightOption: {title: t("surveyForm.no")}
        };
    const [competences, setCompetences] = useState([]);
    const [currentChoice, setCurrentChoice] = useState(null);
    const [competenceFrom, setCompetenceFrom] = useState(null);
    const [competenceTo, setCompetenceTo] = useState(null);
    const [loading, setLoading] = useState(false);
    const competenceAColor = '#1976d2';
    const competenceBColor = '#9c27b0';

    const handleAnswer = (choice) => {
        setCurrentChoice(choice);
    };

    const saveAnswer = async () => {
        try {
            setLoading(true);
            await saveAnswerToResponse(currentChoice, response.questions[currentQuestionIndex].id);
            nextQuestion();
        } finally {
            setLoading(false);
        }
    }

    const nextQuestion = () => {
        setCurrentChoice(null);
        goToNextQuestion();
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            goToQuestion((i) => i - 1);
        }
    };

    const [isAExpanded, setIsAExpanded] = useState(true);
    const [isBExpanded, setIsBExpanded] = useState(true);
    const handleToggleA = () => {
        const next = !isAExpanded;
        setIsAExpanded(next);
        localStorage.setItem('competenceAExpanded', next);
    };

    const handleToggleB = () => {
        const next = !isBExpanded;
        setIsBExpanded(next);
        localStorage.setItem('competenceBExpanded', next);
    };

    useEffect(() => {
        const a = localStorage.getItem('competenceAExpanded') === 'true';
        const b = localStorage.getItem('competenceBExpanded') === 'true';
        setIsAExpanded(a);
        setIsBExpanded(b);
    }, []);

    useEffect(() => {
        const question = response?.questions?.[currentQuestionIndex];
        if (!question) return;
        const fromKey = question.competencesFrom?.[0];
        const toKey = question.competencesTo?.[0];

        const competenceFrom = competences.find(item => item.col1 === fromKey) || null;
        const competenceTo = competences.find(item => item.col1 === toKey) || null;

        setCompetenceFrom(competenceFrom);
        setCompetenceTo(competenceTo);
        setCurrentChoice(question.answer || null);
    }, [currentQuestionIndex, competences]);

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
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default'}}>
            <Box sx={{flex: 1, bgcolor: 'grey.100', px: {xs: 2, md: 6}, py: {xs: 4, md: 8}, overflowY: 'auto',}}>
                <Box maxWidth="900px" mx="auto">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" endIcon={<ChevronRightIcon/>} onClick={saveAnswer} disabled={!currentChoice}>{t("surveyForm.next")}</Button>
                    </Box>
                    <Box textAlign="left" mb={6} sx={{borderLeft: 6, borderColor: competenceAColor, bgcolor: 'background.paper', p: 2, borderRadius: 2}}>
                         <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: competenceAColor }}>
                            {t("surveyForm.competenceA")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {competenceFrom?.col3}
                        </Typography>
                        <Accordion expanded={isAExpanded} onChange={handleToggleA}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>{t("surveyForm.details")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="subtitle1">
                                    {competenceFrom?.col9 || "-"}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box textAlign="left" mb={6} sx={{borderLeft: 6, borderColor: competenceBColor, bgcolor: 'background.paper', p: 2, borderRadius: 2}}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: competenceBColor }}>
                            {t("surveyForm.competenceB")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {competenceTo?.col3}
                        </Typography>
                        <Accordion expanded={isBExpanded} onChange={handleToggleB}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>{t("surveyForm.details")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="subtitle1">
                                    {competenceTo?.col9 || "-"}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                                <Trans i18nKey="surveyForm.question1"
                                    values={{
                                        compA: `${t("surveyForm.competenceA")}`,
                                        compB: `${t("surveyForm.competenceB")}`}}
                                    components={{
                                        a: (<Box component="span" sx={{ color: competenceAColor, fontWeight: 700 }}/>),
                                        b: (<Box component="span" sx={{ color: competenceBColor, fontWeight: 700 }}/>)
                                }}/>
                            </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
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
                </Box>
            </Box>
        </Box>
    );
}
