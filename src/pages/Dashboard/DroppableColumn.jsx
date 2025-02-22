/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";

const DroppableColumn = ({ id, title, tasks, handleAddTask, handleUpdateTask, handleDeleteTask }) => {
    const { setNodeRef } = useDroppable({ id });
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const submitTask = () => {
        if (!taskTitle.trim()) return;
        handleAddTask(id, taskTitle, taskDescription);
        setTaskTitle("");
        setTaskDescription("");
        setIsAddingTask(false);
    };

    return (
        <div
            ref={setNodeRef}
            className={`p-6 rounded-lg shadow-md min-h-[400px] ${id === "todo" ? "bg-green-50" : id === "in-progress" ? "bg-yellow-50" : "bg-blue-50"}`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button onClick={() => setIsAddingTask(true)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    + Add Task
                </button>
            </div>

            {isAddingTask && (
                <div className="mb-4 p-3 border rounded bg-white shadow">
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Task Title"
                        className="w-full mb-2 px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task Description"
                        rows="2"
                        className="w-full mb-2 px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setIsAddingTask(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button onClick={submitTask} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add Task</button>
                    </div>
                </div>
            )}

            <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <DraggableTask
                            key={task._id}
                            task={task}
                            handleUpdateTask={handleUpdateTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default DroppableColumn;