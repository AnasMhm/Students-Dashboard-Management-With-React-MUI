import { createContext, useContext, useEffect, useState } from "react";
import { removeItemFromStorage, setItemInStorage } from "../lib/storage";
import { getCourses, getStudents } from "../lib/seed";
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
        if (userRole === "Student") {
            const students = getStudents();
            const student = students.find(student => `${student.firstName} ${student.lastName}`.toLowerCase() === username.trim().toLowerCase());
            if (student) {
                setItemInStorage("user", student);
                setUser(student);
                return
            }
            else {
                return "Student not found";
            }
        }
        const newUser = { id: crypto.randomUUID(), firstName: username.split(" ")[0], lastName: username.split(" ")[1], email: "default@example.com", phone: "0555555555", role: userRole, createdAt: new Date().toISOString() };
        if (userRole === "Instructor") {
            const courses = getCourses();
            const instructors = courses.map(course => course.instructor.toLowerCase())
            if (instructors.includes(username.toLowerCase())) {
                setItemInStorage("user", newUser);
                setUser(newUser);
            }
            else {
                return "Instructor not found";
            }
        }
        else {
            setUser(newUser);
            setItemInStorage("user", newUser);
        }
    };

    const logout = () => {
        setUser(null);
        removeItemFromStorage("user");
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