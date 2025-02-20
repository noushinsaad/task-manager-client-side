import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import logo from "../../assets/logo/icons8-reminders-50.png";

const Dashboard = () => {
    const { user, logOut } = useAuth();

    const links = <>
        <NavLink
            to="/dashboard"
            className="text-gray-700 hover:text-green-600 transition-colors duration-300"
        >
            Overview
        </NavLink>
        <NavLink
            to="/dashboard/tasks"
            className="text-gray-700 hover:text-green-600 transition-colors duration-300"
        >
            Tasks
        </NavLink>
        <NavLink
            to="/dashboard/projects"
            className="text-gray-700 hover:text-green-600 transition-colors duration-300"
        >
            Projects
        </NavLink>
        <NavLink
            to="/dashboard/settings"
            className="text-gray-700 hover:text-green-600 transition-colors duration-300"
        >
            Settings
        </NavLink>
    </>

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user?.displayName} logged out successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-green-100 to-green-200">
            {/* Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-64 bg-white shadow-lg p-6"
            >
                <div className="flex flex-col space-y-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="w-8 h-8" />
                        <span className="text-xl font-bold text-green-800">TickTack</span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex flex-col space-y-4">
                        {links}
                    </nav>

                    {/* Logout Button */}
                    <button
                        onClick={handleSignOut}
                        className="mt-6 text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    >
                        Log Out
                    </button>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white shadow-sm px-6 py-4"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.displayName}!</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">{user?.email}</span>
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </motion.header>

                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-gradient-to-r from-green-400 to-green-600 p-8 mx-6 my-4 rounded-lg shadow-lg"
                >
                    <div className="text-white">
                        <h2 className="text-3xl font-bold mb-4">Welcome Back, {user?.displayName}!</h2>
                        <p className="text-lg mb-6">
                            You have <span className="font-semibold">3 pending tasks</span> and{" "}
                            <span className="font-semibold">2 ongoing projects</span>. Keep up the great work!
                        </p>
                        <Link to="/dashboard/tasks">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-green-600 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                            >
                                View Tasks
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.main
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex-1 p-8 overflow-y-auto"
                >
                    <Outlet /> {/* This will render nested routes */}
                </motion.main>
            </div>
        </div>
    );
};

export default Dashboard;