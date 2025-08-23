import { createContext, useContext, useEffect, useState } from "react";


const authContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        fetchUser();
    }, [])

    const login = (username, userRole) => {
        const newUser = { name: username, role: userRole };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
        loading,
    };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuth = () => useContext(authContext);
export { AuthProvider, useAuth };