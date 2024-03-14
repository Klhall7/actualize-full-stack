import { useLoaderData, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export async function loader() {
    const url = `${import.meta.env.VITE_SOURCE_URL}/logout`;
    const access_token = localStorage.getItem("accessToken");

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
    const statusCode = response.status;
    return statusCode === 200 ? true : false;
}

const Logout = () => {
    const response = useLoaderData();
    const { setIsAuth } = useAuth();

    if (response) {
        localStorage.clear();
        setIsAuth(false);
        return <Navigate to="/" />;
    } else {
        alert("Error processing logout");
        return <Navigate to="/" />;
    }
};

export default Logout;
