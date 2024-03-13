import { Form, Link } from "react-router-dom";

export async function action({ request }) {
    const credentials = await request.formData();
    const email = credentials.get("email");
    const password = credentials.get("password");
    const requestData = { email, password };
    console.log("added credentials:", requestData) //form data entry check

    try {
    const url = `${import.meta.env.VITE_SOURCE_URL}/register`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    });

    const authResponse = response.json()
    console.log("authorization response:", authResponse); //type check for testing
    return authResponse

    } catch (error) {
        console.error("ERROR: ", error);
        return false;
    }
}

const Register = () => {

    return (
        <>
            <Form method="POST" style={{display:"flex", flexDirection:"column"}}>
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
                        type="password"
                        name="password"
                        placeholder="create a password - must be at least 6 characters"
                        required
                    />
                </label>
                <button type="submit">Register</button>
            </Form>
            <p>
                Already Registered? <Link to="/login">Login</Link>
            </p>
        </>
    );
};
export default Register;
