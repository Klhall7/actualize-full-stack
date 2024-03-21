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
import ViewUserProfile, {loader as profileLoader }from "./ViewUserProfile";

import ProgressAndUrgentTasks from "../child-components/ProgressAndUrgentTasks";
import ViewTasksByUser, { loader as taskLoader } from "../child-components/ViewTasksByUser";

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
                    path: "/dashboard", //parent route
                    element: <DashboardPage />,
                    children: [
                        // Nested routes within dashboard to be rendered in outlet
                        {
                            path: "/dashboard/", 
                            element: <ProgressAndUrgentTasks />,
                        },
                        {
                            path: "/dashboard/view-tasks-by-user",
                            element: <ViewTasksByUser />,
                            loader: taskLoader,
                        },
                        // need to add other child component routes here as created
                    ],
                },
                {
                    path: "/profile",
                    element: <ViewUserProfile />,
                    loader: profileLoader,
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
