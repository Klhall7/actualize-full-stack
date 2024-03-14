import { Link } from "react-router-dom";

const AccountProfile = () => {
    return (
        <>
            <Link to="/" id="logo-clickable">
                <img src="" alt="clickable Logo to my dashboard" />
                <p>My Dashboard</p>
            </Link>
            <p>user profile settings here </p>
            {/* user can view login details and edit email/password/username */}
            {/* need to fetch get_user for current login profile */}
        </>
    );
};
export default AccountProfile;
