/* eslint-disable react/prop-types */
import { createContext } from "react";
// import { Route, Navigate } from "react-router-dom";
import useAccessToken from "./useAccessToken.js";

const AuthContext = createContext(); // null until value is available and used

export function AuthProvider({ children }) {
    const accessToken = useAccessToken("");

    return (
        <AuthContext.Provider value={accessToken}>
            {children}
        </AuthContext.Provider>
    );
}

// export default function Auth({ children, isProtected, action }) {
//     const accessToken = useContext(AuthContext);

//     return (
//         <Route
//             {...children.props}
//             render={() => {
//                 if (action) {
//                     // Check if action prop exists (login/register)
//                     // Handle login/register functionality using action prop
//                     const handleAction = async () => {
//                         const result = await action();
//                         // Call the action function (loginAuth or registerAuth)
//                         if (result && typeof result !== "string") {
//                             // Check for successful action (redirect object)
//                             // Set access token in local storage, redirect after success (login or register)
//                             localStorage.setItem(
//                                 "accessToken",
//                                 result.session?.access_token
//                             );
//                             return result; // Return redirect object for Auth component
//                         } else {
//                             console.error("Action Error:", result);
//                             return result; // Return error message for Auth component
//                         }
//                     };
//                     const actionResult = handleAction();
//                     if (typeof actionResult === "string") {
//                         return <p>{actionResult}</p>; // Display error message if string returned
//                     } else {
//                         return null; // Prevent rendering while action is processing
//                     }
//                 } else {
//                     if (!accessToken && isProtected) {
//                         return <Navigate to="/login" replace={true} />; // Redirect to login
//                     }
//                     return children;
//                 }
//             }}
//         />
//     );
// }
