import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Banner = () => {
    const { user } = useAuth();

    const handleGetStarted = () => {
        if (!user) {
            Swal.fire({
                icon: "info",
                title: "Login Required",
                text: "Please login or register to access the dashboard.",
                confirmButtonText: "Go to Login",
                confirmButtonColor: "#10B981", // Green color to match the theme
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to the login page
                    window.location.href = "/login";
                }
            });
        }
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-blue-50">
            {/* Banner Content */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center px-4"
            >
                <h1 className="text-5xl font-bold mb-6 text-gray-800">
                    Organize Your Tasks Effortlessly
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Manage your tasks with ease using our drag-and-drop interface. Categorize tasks into To-Do, In Progress, and Done. All changes are saved instantly!
                </p>
                {user ? (
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary btn-lg bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Go to Dashboard
                        </motion.button>
                    </Link>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGetStarted}
                        className="btn btn-primary btn-lg bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                    >
                        Get Started
                    </motion.button>
                )}
            </motion.div>

            {/* Mockup of Task Management Interface */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-16 w-full max-w-6xl px-4"
            >
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* To-Do Column */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-green-50 p-6 rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-green-800">To-Do</h2>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <p>Task 1</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <p>Task 2</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* In Progress Column */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-yellow-50 p-6 rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-yellow-800">In Progress</h2>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <p>Task 3</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Done Column */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-blue-50 p-6 rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-blue-800">Done</h2>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <p>Task 4</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Banner;