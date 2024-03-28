import { Link, useLoaderData } from "react-router-dom";
import logo from "../images/actualize-logo-g-transp.png"
//need to create and import styling

//need logic for displaying data, to allow user to add a username for greeting on login

export async function loader() {
    try {
        const id = localStorage.getItem("loginId");
        const url = `${import.meta.env.VITE_SOURCE_URL}/profile/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        const dataArray = await response.json();
        const userData = dataArray.data[0]
        console.log("loader result:", userData)
        return userData;

    } catch (error) {
        console.error("ERROR: ", error);
        return false;
    }
}

const ViewUserProfile = () => {
const info = useLoaderData()
console.log(info)

    return (
        <>
            <Link to="/dashboard" id="logo-clickable">
                <img src={logo} alt="clickable Logo to my dashboard" />
                <p id="dashboard-link">Back to My Dashboard</p>
            </Link>

            <h1>Profile Info</h1>
        </>
    );
};
export default ViewUserProfile;

//FUTURE IMPROVEMENT- Allow auth table editing 
//Edit button should target rendered profile data and change the type to input fields (allow edit). Toggle visibility of a submit changes button based on edit button click. The submit changes button should open modal form to enter password to verify authorization and confirm changes. Once user email and password is verified, clicking the confirm changes should trigger action to send post request for to auth.users.table in order to save the changes requested by the user.
