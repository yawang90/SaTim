import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        if (Boolean(localStorage.getItem('token'))) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            // TODO what to do when login triggered, edge case (only hackable?)
        }
    }
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
