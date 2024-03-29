import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import FooterMenu from "../components/FooterMenu";

const ProtectedRouteLayout = () => {
    const { isAuth } = useAuth();
    // Check if the user is authenticated
    if (!isAuth) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child routes
    return (
        <>
            <Outlet />
            <footer>
                <FooterMenu />
            </footer>
        </>
    );
};

export default ProtectedRouteLayout;
