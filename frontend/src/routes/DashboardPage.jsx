import { Outlet } from "react-router-dom";

import DashNav from "../components/dashNav";
import AsideMenu from "../components/AsideMenu";
import ContentContainer from "../components/ContentContainer";

const DashboardPage = () => {
    return (
        <>
            <header>
                <DashNav />
            </header>
            <div className="dashboard-container" style={{ display: "flex" }}>
                <AsideMenu/> 
                <ContentContainer>
                    <Outlet/>  {/* child component rendering */}
                </ContentContainer>
            </div>
        </>
    );
};
export default DashboardPage;
