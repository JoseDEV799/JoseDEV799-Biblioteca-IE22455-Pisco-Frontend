import { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom"
import { loginRequest, logoutRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // const navigate = useNavigate()

    //* Method SignUp and SignIn
    const signup = async (user) => {
        try {
            const res = await loginRequest(user);
            Cookies.set('token', res.data.token, { expires: 7 });
            console.log('Token saved:', res.data.token); // Verifica que el token se guarde
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            // Guarda el token en cookies al iniciar sesión
            Cookies.set('token', res.data.token, { expires: 7 });
            localStorage.setItem('token', res.data.token); // Guarda el token en localStorage
            setUser(res.data);
            setIsAuthenticated(true);
            console.log('Signed in user:', res.data); // Verifica el usuario firmado
        } catch (error) {
            console.error('Signin error:', error);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest(Cookies.get('token')); // Pasa el token correcto al logout
            Cookies.remove('token'); // Elimina la cookie al cerrar sesión
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        const checkLogin = async () => { // Obtiene el token directamente
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                // navigate('/')
                return;
            } else {
                Cookies.set('token', token);
            }

            try {
                const res = await verifyTokenRequest(token);
                if (!res.data) {
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                    setUser(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Token verification error:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Asegúrate de que la carga se complete
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signin, logout, user, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
