import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
function AdminRoute() {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user?.role !== "Admin") {
            navigate("/courses");
        }
    }, [navigate, user]);
    if (user?.role !== "Admin") {
        return <LoadingSpinner />;
    }
    return (
        <Outlet />
    )
}

export default AdminRoute
