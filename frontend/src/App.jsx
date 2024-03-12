import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";

import Login, { action as loginAuth } from "./routes/Login";

const router = createBrowserRouter([
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
        element: <Login/>,
        action: loginAuth,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
