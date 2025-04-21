import { createAbsoluteUrl, handleHTTPError, handleHTTPSuccess, sendGETRequest } from "../lib/httpRequest";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = () => {
        window.open(createAbsoluteUrl(`${import.meta.env.VITE_API_URL}`, '/auth/google'), '_self');
    }

    const logout = async () => {
        sendGETRequest('/auth/logout')
        .then(res => {
            handleHTTPSuccess(res);
            localStorage.removeItem('token');
            setUser(null);
        })
        .catch(error => {
            handleHTTPError(error);
        })
    }

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        sendGETRequest('/auth/current-user')
        .then(res => {
            handleHTTPSuccess(res);
            setUser(res.data.user);
        })
        .catch(error => {
            handleHTTPError(error);
            localStorage.removeItem('token');
        })
        
        setLoading(false);
    };

    useEffect(()=> {
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user, 
            loading, 
            loginWithGoogle, 
            logout, 
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
