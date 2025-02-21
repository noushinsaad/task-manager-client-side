/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";

const DroppableColumn = ({ id, title, tasks, inputValue, setInputValue, handleAddTask }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`p-6 rounded-lg shadow-md min-h-[400px] ${id === "todo" ? "bg-green-50" : id === "in-progress" ? "bg-yellow-50" : "bg-blue-50"}`}
        >
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask(id, inputValue)}
                placeholder={`Add a ${title} task...`}
                className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <DraggableTask key={task._id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default DroppableColumn;
