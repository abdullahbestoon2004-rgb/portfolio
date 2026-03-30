import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setAdmin(null);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const res = await axios.get('/api/auth/me');
                    setAdmin(res.data);
                } catch (error) {
                    console.error("Token invalid", error);
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            const { token, ...userData } = res.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAdmin(userData);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
