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
    const response = await fetch(`${API_URL}/api/projects/update`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, name, description, userId })
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update project');
    }
    return data;
}

export const deleteProject = async ({ projectId }) => {
    const response = await fetch(`${API_URL}/api/projects/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to delete project');
    }
    return data;
};

export const getProjectMembers = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("Missing projectId");
    }

    const response = await fetch(`${API_URL}/api/projects/members?projectId=${projectId}`);

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch project members');
    }

    return response.json();
};

export const addProjectMember = async ({ member, projectId }) => {
    if (!projectId) throw new Error("Missing projectId");
    if (!member) throw new Error("Missing member");

    const response = await fetch(`${API_URL}/api/projects/addMember?projectId=${projectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: member.id ?? null
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add project member");
    }

    return data;
};

export const removeProjectMember = async (memberId, projectId) => {
    if (!projectId) throw new Error("Missing projectId");
    if (!memberId) throw new Error("Missing memberId");
    const response = await fetch(`${API_URL}/api/projects/removeMember?projectId=${projectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: memberId ?? null
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to remove project member");
    }

    return data;
}

export const sendInviteEmail = async ({email, projectId}) => {
    if (!email) throw new Error("Missing email");

    const response = await fetch(`${API_URL}/api/projects/invite?email=${email}&projectId=${projectId}`)
    if (!response.ok) throw new Error("Sending email failed");
    return response.json()
}