import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from "../../hooks/useAuth";

// const socket = io("https://task-management-server-site-sandy.vercel.app", {
//     withCredentials: true,
// });
const socket = io("http://localhost:5000", {
    withCredentials: true,
});

const Tasks = () => {
    const { user } = useAuth()
    const [modalOpen, setModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", status: "todo", createdBy: user?.email || "", });
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch tasks using TanStack Query
    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`tasks/${user.email}`);
            console.log(tasks)
            return response.data;
        },
    });

    // Mutation for adding a new task
    const addTaskMutation = useMutation({
        mutationFn: (task) => axiosSecure.post("/tasks", task),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            setNewTask({ title: "", status: "todo", createdBy: user.email });
            setModalOpen(false); // Close modal
        },
        onError: (error) => {
            console.error("Failed to add task:", error);
        },
    });

    // Handle real-time updates via WebSocket
    useEffect(() => {
        socket.on("tasksUpdated", (updatedTasks) => {
            queryClient.setQueryData(['tasks'], updatedTasks);
        });
        return () => {
            socket.off("tasksUpdated");
        };
    }, [queryClient]);

    const renderTasks = (status) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <div
                    key={task._id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <p>{task.title}</p>
                </div>
            ));
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    // Handle adding a new task
    const handleAddTask = (e) => {
        e.preventDefault();
        const taskWithCreator = { ...newTask, createdBy: user.email }; // Include createdBy
        addTaskMutation.mutate(taskWithCreator);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>
            {tasks.length === 0 ? (
                <div className="text-center">
                    <p className="mb-4 text-gray-600">No tasks found.</p>
                    <button
                        onClick={() => setModalOpen(true)} // Open modal on click
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Add Task
                    </button>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-green-800 mb-4">To-Do</h3>
                            <div className="space-y-4">{renderTasks("todo")}</div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-yellow-800 mb-4">In Progress</h3>
                            <div className="space-y-4">{renderTasks("in-progress")}</div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">Done</h3>
                            <div className="space-y-4">{renderTasks("done")}</div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => setModalOpen(true)} // Open modal on click
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Add More Task
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for adding a task */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-2xl font-semibold mb-4">Add New Task</h3>
                        <form onSubmit={handleAddTask}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newTask.title}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Task Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newTask.status}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="todo">To-Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Created By</label>
                                <input
                                    type="text"
                                    id="createdBy"
                                    name="createdBy"
                                    value={user?.email || ""}
                                    disabled
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;