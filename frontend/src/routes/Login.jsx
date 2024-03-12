import { Form, Link } from "react-router-dom";

export async function action({ request }) {
    const credentials = await request.formData();
    const email = credentials.get("email");
    const password = credentials.get("password");
    const requestData = { email, password };
    console.log("form credentials:", requestData) //form data check for devtools

    const url = `${import.meta.env.VITE_SUPABASE_URL}/login`;
    const authResponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    }).then((response) => response.json());

    console.log("authorization response:", authResponse); //type check for devtools

    return authResponse
}

const Login = () => {
    // const showpass = document.getElementById("showpass");
    // showpass.addEventListener("click", () => {
    //     console.log("clicked");
    //     const field = document.getElementById("field");
    //     field.type = "text";
    //     field.value = "";
    // });

    return (
        <>
            <Form method="POST" style={{display:"flex", flexDirection:"column"}}>
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
                        id="field"
                        type="password"
                        name="password"
                        placeholder="enter your password"
                        required
                    />
                </label>
                {/* <button id="showpass" type="button">
                    show password
                </button>
                need to style show pass button to an eye within input */}
                <button type="submit">login</button>
            </Form>
            <p>
                Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
        </>
    );
};
export default Login;
