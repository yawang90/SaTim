import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createSurvey = async (file, title, description) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        const response = await axios.post(`${API_URL}/api/surveys/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    };
