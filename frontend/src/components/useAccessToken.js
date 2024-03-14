import { useState, useEffect } from "react";

function useAccessToken() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        setAccessToken(storedToken);
    }, []);

    return accessToken;
}

export default useAccessToken;
