import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);
    
    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            setUser(res.data);
        } catch (err) {
            logout();
        }
    };
    
    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };
    
    const register = async (username, email, password) => {
        const res = await axios.post('/api/auth/register', { username, email, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };
    
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };
    
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;