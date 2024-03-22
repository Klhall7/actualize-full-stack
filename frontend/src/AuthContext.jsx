import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);

    // We'll be able to call this just in case our access token has expired
    const refreshSession = async () => {
        const expiration = Number(localStorage.getItem("session_expires_at"));
        const now = Math.floor(Date.now() / 1000);

        if (now > expiration) {
            console.log(
                `session expired ${now} > ${expiration}.Attempting refresh`
            );
            const refresh_token = localStorage.getItem("session_refresh_token");
            console.log("CURRENT REFRESH TOKEN", refresh_token);

            const url = `${import.meta.env.VITE_SOURCE_URL}/refresh`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh_token }),
            });

            if (response.status === 200) {
                const data = await response.json();
                const { session, user } = data;
                localStorage.clear();
                console.log(
                    "refresh response successful. Storage cleared and being replaced new data"
                );
                localStorage.setItem("loginId", user.id);
                localStorage.setItem("accessToken", session.access_token);
                localStorage.setItem(
                    "session_refresh_token",
                    session.refresh_token
                );
                localStorage.setItem("session_expires_at", session.expires_at);

                const new_token = localStorage.getItem("session_refresh_token");
                console.log("NEW REFRESH TOKEN", new_token);
            } else {
                // Handle fetch errors
                const error = await response.json();
                console.error("SERVER RESPONSE ERROR:", error);
                if (error.error_code === 409) {
                    alert(
                        "A session refresh conflict occurred.You need to login again."
                    );
                    return; //add redirect here
                } else if (error.error_code === 401) {
                    alert(`401 Unauthorized Detail: ${error.detail}`);
                    return;
                } else if (error.error_code === 500) {
                    alert(`500 Internal Detail - ${error.detail}`);
                    return;
                } else {
                    console.error("Server Error Detail:", error.detail);
                    return;
                }
            }
        } else {
            // If the token hasn't expired, no need to do anything
            // console.info("Access Token still valid");
            return;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, refreshSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
