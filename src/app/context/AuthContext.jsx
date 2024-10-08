import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, logoutRequest, verifyTokenRequest } from "../api/auth"
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);

    //* Method SignUp and SignIn
    const signup = async (user) => {
        try {
            const res = await loginRequest(user)
            Cookies.set('token', res.data.token, { expires: 7 })
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            // console.log(res.data)
            Cookies.set('token', res.data.token, { expires: 7 })
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await logoutRequest(Cookies.get())
            setIsAuthenticated(false)
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                // console.log(res);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup, signin, logout, user, isAuthenticated, loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}