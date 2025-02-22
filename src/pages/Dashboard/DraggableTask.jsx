/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { FiX } from "react-icons/fi";

const DraggableTask = ({ task, handleUpdateTask, handleDeleteTask }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id });
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        touchAction: "none",
    };

    const formattedDate = new Date(task.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            handleUpdateTask(task._id, { title, description });
            setIsEditing(false);
        }
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition space-y-2 cursor-grab active:cursor-grabbing relative"
        >
            <button
                onClick={() => handleDeleteTask(task._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label="Delete Task"
            >
                <FiX size={18} />
            </button>

            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-2 p-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-2 py-1 border rounded focus:ring focus:ring-blue-400 outline-none"
                        placeholder="Task Title"
                        autoFocus
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-2 py-1 border rounded focus:ring focus:ring-blue-400 outline-none"
                        rows="2"
                        placeholder="Task Description"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <div onClick={() => setIsEditing(true)} className="space-y-1">
                    <p className="text-xl font-bold break-words">{task.title}</p>
                    <p className="text-sm break-words">{task.description}</p>
                    <p className="text-xs text-gray-500">Created: {formattedDate}</p>
                </div>
            )}
        </div>
    );
};

export default DraggableTask;