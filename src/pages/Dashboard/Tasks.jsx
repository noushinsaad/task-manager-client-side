import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DroppableColumn from "./DroppableColumn";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Tasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
    );

    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => (await axiosSecure.get(`tasks/${user.email}`)).data,
    });

    const { data: activityLogs = [] } = useQuery({
        queryKey: ["activityLogs", user?.email],
        queryFn: async () => (await axiosSecure.get(`activityLogs/${user.email}`)).data,
        enabled: !!user?.email, // Ensures the query runs only when user email is available
    });


    const addTaskMutation = useMutation({
        mutationFn: (task) => axiosSecure.post("/tasks", task),
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });

    const updateTaskMutation = useMutation({
        mutationFn: ({ taskId, data }) => axiosSecure.patch(`/tasks/${taskId}`, data),
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (taskId) => axiosSecure.delete(`/tasks/${taskId}`),
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });

    const handleAddTask = (status, title, description) => {
        addTaskMutation.mutate({ title, description, status, createdBy: user.email });
    };

    const handleUpdateTask = (taskId, data) => {
        updateTaskMutation.mutate({ taskId, data });
    };


    const handleDeleteTask = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This task will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskMutation.mutate(taskId, {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "The task has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete the task.", "error");
                    },
                });
            }
        });
    };


    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;
        const draggedTask = tasks.find((task) => task._id === active.id);
        if (draggedTask && draggedTask.status !== over.id) {
            handleUpdateTask(active.id, { status: over.id });
            console.log(active.id)
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["todo", "in-progress", "done"].map((id) => (
                        <DroppableColumn
                            key={id}
                            id={id}
                            title={id === "todo" ? "To-Do" : id === "in-progress" ? "In Progress" : "Done"}
                            tasks={tasks.filter((task) => task.status === id)}
                            handleAddTask={handleAddTask}
                            handleUpdateTask={handleUpdateTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            </DndContext>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">Activity Logs</h3>
                <ul className="mt-2 space-y-2">
                    {activityLogs.length > 0 ? (
                        activityLogs.map((log, index) => (
                            <li key={index} className="p-2 bg-white shadow rounded-md">
                                <div>
                                    <p>{log.message}</p>
                                    <p className="text-sm opacity-80">{
                                        new Date(log.updatedAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                    }</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No recent activity.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Tasks;