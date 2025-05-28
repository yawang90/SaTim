const API_URL = import.meta.env.VITE_API_URL;

export const createProject = async ({ name, description, userId }) => {
    if (!name || !userId) {
        throw new Error("Missing required fields.");
    }
    const res = await fetch(`${API_URL}/api/projects/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, userId }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to create project');
    }
    return data;
};

export const getAllProjectsByUser = async ({userId}) => {
    const response = await fetch(`${API_URL}/api/projects/getAll?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return response.json();
};

export const getProjectById = async ({projectId}) => {
    const response = await fetch(`${API_URL}/api/projects/get?projectId=${projectId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch project');
    }
    return response.json();
}
