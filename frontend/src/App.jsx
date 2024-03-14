import { AuthProvider } from "./AuthContext";
import Routes from "./routes/Routes";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ErrorPage from "./pages/ErrorPage";
// import Layout from "./pages/Layout";
// import HomePage from "./pages/HomePage";

// import Login, { action as loginAuth } from "./routes/Login";
// import Register, { action as registerAuth } from "./routes/Register";
// import DashboardPage from "./routes/DashboardPage";
// import AccountProfile from "./routes/AccountProfile";

// const router = createBrowserRouter([
//     {
//         element: <Layout />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: "/",
//                 element: <HomePage />,
//             },
//             {
//                 path: "/profile",
//                 element: <AccountProfile />,
//             },
//             {
//                 path: "/dashboard",
//                 element: <DashboardPage />,
//             },
//             {
//                 path: "/login",
//                 element: <Login />,
//                 action: loginAuth,
//             },
//             {
//                 path: "/register",
//                 element: <Register />,
//                 action: registerAuth,
//             },
//         ],
//     },
// ]);

// function App() {
//     return <RouterProvider router={router} />;
// }

// export default App;
