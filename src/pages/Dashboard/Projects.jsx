import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Projects = () => {
    // Sample project data
    const projects = [
        {
            id: 1,
            title: "Website Redesign",
            description: "Redesign the company website to improve user experience and modernize the look.",
            progress: 75,
        },
        {
            id: 2,
            title: "Mobile App Development",
            description: "Develop a cross-platform mobile app for iOS and Android.",
            progress: 45,
        },
        {
            id: 3,
            title: "Marketing Campaign",
            description: "Launch a new marketing campaign to increase brand awareness.",
            progress: 90,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Your Projects</h2>
                <Link to="/dashboard/projects/new">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        + New Project
                    </motion.button>
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>

                        <p className="text-sm text-gray-600">{project.progress}% completed</p>

                        {/* View Details Button */}
                        <Link to={`/dashboard/projects/${project.id}`}>
                            <button className="mt-4 text-green-500 hover:text-green-600 font-semibold transition-colors duration-300">
                                View Details →
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;