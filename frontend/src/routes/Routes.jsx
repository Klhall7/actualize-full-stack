import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../AuthContext";

import ProtectedRouteLayout from "../pages/ProtectedRouteLayout";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";

import Login, { action as loginPass } from "./Login";
import Logout, { loader as logoutLoader } from "./Logout";
import Register, { action as registerSignUp } from "./Register";
import DashboardPage from "./DashboardPage";
import AccountProfile from "./AccountProfile";
import { loader as taskLoader }from "../components/DisplayTask";

const Routes = () => {
    const { isAuth } = useAuth();

    const publicRoutes = [
        // need to add routes/elements for Policies, FAQ and Contact
        {
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/login",
                    element: <Login />,
                    action: loginPass,
                },
                {
                    path: "/logout",
                    element: <Logout />,
                    loader: logoutLoader,
                },
                {
                    path: "/register",
                    element: <Register />,
                    action: registerSignUp,
                },
            ],
        },
    ];

    const protectedRoutes = [
        {
            errorElement: <ErrorPage />,
            element: <ProtectedRouteLayout />,
            children: [
                {
                    path: "/profile",
                    element: <AccountProfile />,
                },
                {
                    path: "/dashboard",
                    element: <DashboardPage />,
                    loader: taskLoader,
                },
            ],
        },
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!isAuth ? protectedRoutes : []),
        ...protectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
