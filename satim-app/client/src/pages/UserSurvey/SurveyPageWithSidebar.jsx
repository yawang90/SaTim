import React, { useState } from 'react';
import { Box } from '@mui/material';
import SurveySidebar from './SurveySidebar';
import SurveyFormPage from './SurveyFormPage';

export default function SurveyPageWithSidebar() {
    const questions = [ /* same hardcoded questions */ ];
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const isCompleted = answers.length === questions.length;

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SurveySidebar
                questions={questions}
                answers={answers}
                currentQuestionIndex={currentQuestionIndex}
                goToQuestion={goToQuestion}
                isCompleted={isCompleted}
            />
            <Box sx={{ flex: 1 }}>
                <SurveyFormPage
                    questions={questions}
                    answers={answers}
                    currentQuestionIndex={currentQuestionIndex}
                    setAnswers={setAnswers}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    isCompleted={isCompleted}
                />
            </Box>
        </Box>
    );
}
