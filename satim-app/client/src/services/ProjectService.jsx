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
