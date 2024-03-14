import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";

export async function action({ request }) {
    const credentials = await request.formData();
    const email = credentials.get("email");
    const password = credentials.get("password");
    const requestData = { email, password };
    console.log("added credentials:", requestData); //form data entry check

    try {
        const url = `${import.meta.env.VITE_SOURCE_URL}/register`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        console.log(response); //check proper request sent

        if (response.ok) {
            const authResponse = await response.json();
            console.log("register auth response:", authResponse); //view jwt and session
            const accessToken = authResponse.session.access_token;
            localStorage.setItem('accessToken', accessToken)
            return redirect("/login");
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

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <Form
                method="POST"
                style={{ display: "flex", flexDirection: "column" }}
            >
                Create An Account
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
                        type={showPassword ? "text" : "password"} //set type based on checkbox
                        name="password"
                        placeholder="must be at least 6 characters"
                        required
                    />
                </label>
                <label>
                    <input type="checkbox" onChange={togglePassVisibility} />
                    Show Password?
                </label>
                <button type="submit">Register</button>
                <p>
                    Already Registered? <Link to="/login">Login</Link>
                </p>
            </Form>
        </>
    );
};
export default Register;
