import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isLoggedIn = true; // Replace with actual authentication logic (context api)
    return (
        <>
            {isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}
        </>
    )
}

export default ProtectedRoute
