import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export async function action({ request }) {
    const credentials = await request.formData();
    const email = credentials.get("email");
    const password = credentials.get("password");
    const requestData = { email, password };
    console.log("check form credentials:", requestData);

    try {
        const url = `${import.meta.env.VITE_SOURCE_URL}/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        console.log(response); //check true

        if (response) {
            const authResponse = await response.json();
            console.log("login auth response:", authResponse); //view jwt and session
            const accessToken = authResponse.session.access_token;
            const userId = authResponse.user.id;
            const sessionExpire = authResponse.session.expires_in;
            const refreshToken = authResponse.session.refresh_token;
            localStorage.clear(); //precaution
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("loginId", userId);
            localStorage.setItem("session_expires_in", sessionExpire);
            localStorage.setItem("session_refresh_token", refreshToken);
            return "success";
        } else {
            const errorText = await response.text();
            const errorDetail = JSON.parse(errorText);
            console.log(errorDetail.detail);
            return errorDetail.detail;
        }
    } catch (error) {
        console.error("ERROR: ", error);
        return "Sorry, something went wrong.";
    }
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const response = useActionData();
    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useAuth();

    useEffect(() => {
        if (isAuth) {
            navigate("/dashboard");
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        const checkAuth = () => {
            if (typeof response !== "undefined") {
                setIsAuth(response);
                return response && navigate("/dashboard");
            }
        };
        checkAuth();
    }, [response, setIsAuth, navigate]);

    const togglePassVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div>
                <Link to="/" id="logo-clickable">
                    <img src="" alt="clickable Logo to homepage" />
                    <p>Back to Home</p>
                </Link>
                {/* Replace with logo img path once saved */}
            </div>
            <Form
                method="POST"
                style={{ display: "flex", flexDirection: "column" }}
            >
                Login
                <label>
                    email:
                    <input
                        type="text"
                        name="email"
                        placeholder="enter your email"
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="enter your password"
                        required
                    />
                </label>
                <label>
                    <input type="checkbox" onChange={togglePassVisibility} />
                    Show Password?
                </label>
                <button type="submit">login</button>
                <p>
                    Don&apos;t have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </Form>
            {/* manual redirect workaround */}
            {localStorage.getItem("accessToken") && ( // Check for access token
                <p>
                    Login successful, if you are not automatically redirected{" "}
                    <Link to="/dashboard">
                        <span>click here</span>
                    </Link>
                </p>
            )}
        </>
    );
};
export default Login;
