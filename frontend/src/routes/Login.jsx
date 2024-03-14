import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";

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

        if (response.ok) {
            const authResponse = await response.json();
            console.log("login auth response:", authResponse); //view jwt and session
            const accessToken = authResponse.session.access_token;
            localStorage.setItem("accessToken", accessToken);
            return redirect("/dashboard");
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
        </>
    );
};
export default Login;
