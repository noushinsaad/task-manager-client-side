import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../layouts/Home";
import Register from "../pages/loginAndRegister/Register";
import Login from "../pages/loginAndRegister/Login";
import LandingPage from "../pages/LandingPage/LandingPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Tasks from "../pages/Dashboard/Tasks";
import Projects from "../pages/Dashboard/Projects";
import Settings from "../pages/Dashboard/Settintgs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <LandingPage></LandingPage>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: 'tasks',
                element: <Tasks></Tasks>
            },
            {
                path: 'projects',
                element: <Projects></Projects>
            },
            {
                path: 'settings',
                element: <Settings></Settings>
            }
        ]
    }
])

export default Routes;