const API_URL = import.meta.env.VITE_API_URL;

export const createSurvey = async (projectId, file, title, description) => {
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        const response = await fetch(`${API_URL}/api/surveys/create`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to create Survey');
        }
        return response.json();
    };

export const getSurveyById = async (surveyId) => {
    const response = await fetch(`${API_URL}/api/surveys/get?surveyId=${surveyId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch survey');
    }
    return response.json();
}

export const getAllSurveysByProject = async ({projectId}) => {
    const response = await fetch(`${API_URL}/api/surveys/getAll?projectId=${projectId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch surveys');
    }
    return response.json();
};

export const getOrCreateResponse = async (surveyId, userId) => {
    const response = await fetch(`${API_URL}/api/surveys/response/getOrCreate?surveyId=${surveyId}&userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to get response');
    }
    return response.json();
}

export const getCompetences = async (surveyId) => {
    const response = await fetch(`${API_URL}/api/surveys/competences/get?surveyId=${surveyId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch competences');
    }
    return response.json();
}

export const saveAnswerToResponse = async (responseId, answer, competenceFrom, competenceTo) => {
    const response = await fetch(`${API_URL}/api/surveys/response/saveAnswer`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            responseId,
            answer,
            competencesFrom: competenceFrom,
            competencesTo: competenceTo,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Failed to save answer: ${err}`);
    }

    return response.json();
};

