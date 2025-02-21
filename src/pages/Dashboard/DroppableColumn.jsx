/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Dialog } from "@headlessui/react";
import DraggableTask from "./DraggableTask";

const DroppableColumn = ({ id, title, tasks, handleAddTask }) => {
    const { setNodeRef } = useDroppable({ id });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const submitTask = () => {
        if (!taskTitle.trim()) return;
        handleAddTask(id, taskTitle, taskDescription);
        setTaskTitle("");
        setTaskDescription("");
        setIsModalOpen(false);
    };

    return (
        <div
            ref={setNodeRef}
            className={`p-6 rounded-lg shadow-md min-h-[400px] ${id === "todo" ? "bg-green-50" : id === "in-progress" ? "bg-yellow-50" : "bg-blue-50"
                }`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                    + Add Task
                </button>
            </div>

            <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <DraggableTask key={task._id} task={task} />
                    ))}
                </div>
            </SortableContext>

            {/* Modal for adding a task */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50">
                <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
                    <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <Dialog.Title className="text-2xl font-semibold mb-4">Add New Task</Dialog.Title>

                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Task Title"
                            className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                            onKeyDown={(e) => e.key === "Enter" && document.getElementById("taskDescription").focus()}
                        />

                        <textarea
                            id="taskDescription"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Task Description"
                            rows="4"
                            className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitTask}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Add Task
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default DroppableColumn;
