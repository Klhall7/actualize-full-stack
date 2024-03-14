import { Outlet } from "react-router-dom";
import FooterMenu from "../components/FooterMenu"

const Layout = () => {
    return (
        <>
            <Outlet id="outlet" />
            {/* need to add global styling */}
            <FooterMenu/>
        </>
    );
};

export default Layout;

// import useAccessToken from "../components/useAccessToken";
// import { Navigate } from "react-router-dom";

// return isProtected ? <Outlet /> : <Navigate to="/login" />;
