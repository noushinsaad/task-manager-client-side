import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../layouts/Home";
import Register from "../pages/loginAndRegister/Register";
import Login from "../pages/loginAndRegister/Login";
import LandingPage from "../pages/LandingPage/LandingPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        errorElement: <h2>Error</h2>,
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
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
    }
])

export default Routes;