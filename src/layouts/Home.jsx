/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import { Helmet } from "react-helmet";

const Home = ({ title }) => {
    const location = useLocation();
    const hideNavFooter = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            <Helmet>
                <title>{title || "Home | TickTack"}</title>
            </Helmet>
            {
                !hideNavFooter &&
                <NavBar></NavBar>
            }
            <Outlet></Outlet>
        </div>
    );
};

export default Home;