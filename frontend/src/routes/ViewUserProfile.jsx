import { Link } from "react-router-dom";
//need to create and import styling

//need logic for loader for Get Profile to view user's profile data
//need logic to allow user to add a username for greeting on login

const ViewUserProfile = () => {
    return (
        <>
            <Link to="/dashboard" id="logo-clickable">
                <img src="" alt="clickable Logo to my dashboard" />
                <p id="dashboard-link">Back to My Dashboard</p>
            </Link>

            <h1>user profile data here </h1>
        </>
    );
};
export default ViewUserProfile;

//FUTURE IMPROVEMENT- Allow editing
//Edit button should target specified profile data and change the type to input fields (allow edit). Toggle visibility of a submit changes button based on edit button click. The submit changes button should open modal form to enter password to verify authorization and confirm changes. Once user email and password is verified, clicking the confirm changes should trigger action to send post request for to auth.users.table in order to save the changes requested by the user.
