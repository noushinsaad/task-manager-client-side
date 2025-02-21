/* eslint-disable react/prop-types */
import { useDraggable } from "@dnd-kit/core";

const DraggableTask = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id });
    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    };

    const formattedDate = new Date(task.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition space-y-2"
        >
            <p className="text-xl font-bold">{task.title}</p>
            <p className="text-sm">{task.description}</p>
            <p className="text-xs text-gray-500 mt-1">Created: {formattedDate}</p>
        </div>
    );
};

export default DraggableTask;
