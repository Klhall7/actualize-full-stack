import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Outlet id="outlet" />
            {/* need to add global styling */}
            {/* need to create footer that will load on every route */}
        </>
    );
};

export default Layout;

// import useAccessToken from "../components/useAccessToken";
// import { Navigate } from "react-router-dom";

// return isProtected ? <Outlet /> : <Navigate to="/login" />;
