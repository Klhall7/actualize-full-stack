import DashNav from "../components/dashNav";
import { Link } from "react-router-dom";

const DashboardPage = () => {
    return (
        <>
            <header>
                <DashNav />
            </header>
            <div>
                <Link to="/dashboard" id="logo-clickable">
                    <img src="" alt="clickable Logo to my dashboard" />
                    <p>My Dashboard</p>
                </Link>
                {/* Replace with logo img path once saved */}
            </div>
            <h1>Dashboard</h1>
            <p>user default homepage at login</p>
            {/* need to set up menu for tasks */}
            {/* need to set up task component to fetch from Tasks db table */}
        </>
    );
};
export default DashboardPage;
