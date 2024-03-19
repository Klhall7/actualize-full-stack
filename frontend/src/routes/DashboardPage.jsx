import { Outlet, useEffect } from "react-router-dom";
import { useAuth } from "../AuthContext"

import DashNav from "../components/dashNav";
import AsideMenu from "../components/AsideMenu";
import ContentContainer from "../components/ContentContainer";


const DashboardPage = () => {
    //check if token needs refresh before loading
    const { refreshSession } = useAuth();

    useEffect(() => {
        refreshSession()
    }, [refreshSession])

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
