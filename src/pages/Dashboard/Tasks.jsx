const Tasks = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* To-Do Column */}
                <div className="bg-green-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">To-Do</h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p>Task 1</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p>Task 2</p>
                        </div>
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4">In Progress</h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p>Task 3</p>
                        </div>
                    </div>
                </div>

                {/* Done Column */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Done</h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p>Task 4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;