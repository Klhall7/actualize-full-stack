import { useState } from "react";
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

    console.log("Server SignOut Response", response);
    return response.ok;
}

const Logout = () => {
    const response = useLoaderData();
    console.log("SignOut Loader Return:", response);
    const { setIsAuth } = useAuth();
    const [errorShown, setErrorShown] = useState(false);

    if (response) {
        // If response is truthy, logout was successful
        localStorage.clear();
        setTimeout(() => {
            setIsAuth(false); // Update state asynchronously after it is rendered
        }, 0);
        return <Navigate to="/login" />;
    } else {
        if (!errorShown) {
            const error = response.json();
            setErrorShown(true); //try to prevent double alert
            alert(`Error processing logout: ${error.error_detail}`);
            return <Navigate to="/dashboard" />;
        }
    }
};

export default Logout;
