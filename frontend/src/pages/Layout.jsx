import { Outlet } from "react-router-dom";
import FooterMenu from "../components/FooterMenu"

const Layout = () => {
    return (
        <>
            <Outlet/>
            <footer>
                <FooterMenu />
            </footer>
        </>
    );
};

export default Layout;


