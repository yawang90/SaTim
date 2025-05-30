const API_URL = import.meta.env.VITE_API_URL;

export const createProject = async ({ name, description, userId }) => {
    if (!name || !userId) {
        throw new Error("Missing required fields.");
    }
    const response = await fetch(`${API_URL}/api/projects/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, userId }),
    });
    const data = await response.json();
    if (!response.ok) {
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

export const updateProject = async ({projectId, name, description, userId}) => {
    const response = await fetch(`${API_URL}/api/projects/update?projectId=${projectId}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, userId })
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update project');
    }
    return response.json();
}
