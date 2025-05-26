const API_URL = import.meta.env.VITE_API_URL;

const checkResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Request failed');
    }
    return data;
};

export const registerUser = async (formData) => {
    const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return checkResponse(res);
};

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await checkResponse(res);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    return data;
};

