/* eslint-disable react/prop-types */
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import logo from "../../assets/logo/icons8-reminders-50.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Dashboard = ({ title }) => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Fetch tasks using polling
    const { data: tasks = [] } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`tasks/${user.email}`);
            return response.data;
        },
    });

    // Polling logic
    useEffect(() => {
        const pollingInterval = setInterval(async () => {
            try {
                const response = await axiosSecure.get(`tasks/${user.email}`);
                queryClient.setQueryData(["tasks", user?.email], response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(pollingInterval);
    }, [axiosSecure, queryClient, user?.email]);

    const pendingTasksCount = tasks.filter((task) => task.status === "todo").length;
    const ongoingTasksCount = tasks.filter((task) => task.status === "in-progress").length;

    const links = (
        <>
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
    );

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
            <Helmet>
                <title>{title || "Dashboard | TickTack"}</title>
            </Helmet>

            {/* Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-64 bg-white shadow-lg p-6 fixed top-0 left-0 h-full z-50 md:block ${sidebarOpen ? "block" : "hidden"} md:flex md:flex-col`}
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
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white shadow-sm px-6 py-4"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg md:text-2xl  font-bold text-gray-800">Welcome, {user?.displayName}!</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 hidden md:block">{user?.email}</span>
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
                            You have <span className="font-semibold">{pendingTasksCount} pending tasks</span> and{" "}
                            <span className="font-semibold">{ongoingTasksCount} ongoing tasks</span>. Keep up the great work!
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
                    <Outlet />
                </motion.main>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 text-gray-700 bg-white p-3 rounded-full shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    );
};

export default Dashboard;
