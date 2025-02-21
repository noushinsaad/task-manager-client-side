import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndContext, closestCenter } from "@dnd-kit/core";
import DroppableColumn from "./DroppableColumn";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const socket = io("http://localhost:5000", { withCredentials: true });
// const socket = io("https://task-management-server-site-pvonlwphr-saads-projects-002d07dd.vercel.app", { withCredentials: true });

const Tasks = () => {
    const { user } = useAuth();
    const [taskInputs, setTaskInputs] = useState({ todo: "", "in-progress": "", done: "" });
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`tasks/${user.email}`);
            return response.data;
        },
    });

    const addTaskMutation = useMutation({
        mutationFn: (task) => axiosSecure.post("/tasks", task),
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });

    const updateTaskStatusMutation = useMutation({
        mutationFn: ({ taskId, newStatus }) => axiosSecure.patch(`/tasks/${taskId}`, { status: newStatus }),
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });

    useEffect(() => {
        socket.on("tasksUpdated", (updatedTasks) => {
            queryClient.setQueryData(["tasks"], updatedTasks);
        });
        return () => socket.off("tasksUpdated");
    }, [queryClient]);

    const handleAddTask = (status, value) => {
        if (!value.trim()) return;
        addTaskMutation.mutate({ title: value.trim(), status, createdBy: user.email });
        setTaskInputs((prev) => ({ ...prev, [status]: "" }));
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;
        const draggedTask = tasks.find((task) => task._id === active.id);
        if (draggedTask && draggedTask.status !== over.id) {
            updateTaskStatusMutation.mutate({ taskId: active.id, newStatus: over.id });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: "todo", title: "To-Do" },
                        { id: "in-progress", title: "In Progress" },
                        { id: "done", title: "Done" },
                    ].map(({ id, title }) => (
                        <DroppableColumn
                            key={id}
                            id={id}
                            title={title}
                            tasks={getTasksByStatus(id)}
                            inputValue={taskInputs[id]}
                            setInputValue={(value) => setTaskInputs((prev) => ({ ...prev, [id]: value }))}
                            handleAddTask={handleAddTask}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default Tasks;