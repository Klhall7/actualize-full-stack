import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/BasicForm.module.css";
import logo from "../images/actualize-logo-g-transp.png"

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
            localStorage.clear(); //precaution
            localStorage.setItem("accessToken", accessToken);
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
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" id="logo-clickable">
                        <img src={logo} alt="clickable Logo to homepage" />
                    </Link>
                    <Link to="/">
                        <p className={styles.homeLink}>Back to Home</p>
                    </Link>
                    {/* Replace with logo img path once saved */}
                </div>

                <Form method="POST" className={styles.form}>
                    <h4>Create An Account</h4>
                    <label>
                        <input
                            className={styles.email}
                            type="text"
                            name="email"
                            placeholder="email"
                            required
                        />
                    </label>
                    <label>
                        <input
                            className={styles.password}
                            type={showPassword ? "text" : "password"} //set type based on checkbox
                            name="password"
                            placeholder="password - 6 character minimum"
                            required
                        />
                    </label>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            onChange={togglePassVisibility}
                        />
                        Show Password?
                    </label>
                    <button className={styles.btn} type="submit">
                        Register
                    </button>
                    <p>
                        Already Registered?{" "}
                        <Link className={styles.link} to="/login">
                            Sign In
                        </Link>
                    </p>
                </Form>
            </div>
        </>
    );
};
export default Register;
