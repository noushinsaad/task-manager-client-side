import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../layouts/Home";
import Register from "../pages/loginAndRegister/Register";
import Login from "../pages/loginAndRegister/Login";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        errorElement: <h2>Error</h2>,
        children: [
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ]
    }
])

export default Routes;