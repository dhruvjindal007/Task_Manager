import { Trash2, Edit2, CheckCircle2, Circle, Clock } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-50 border-yellow-200",
  in_progress: "bg-blue-50 border-blue-200",
  completed: "bg-green-50 border-green-200",
};

const statusIcons = {
  pending: <Circle className="text-yellow-500" size={18} />,
  in_progress: <Clock className="text-blue-500" size={18} />,
  completed: <CheckCircle2 className="text-green-500" size={18} />,
};

const priorityColors = {
  low: "text-gray-500",
  medium: "text-orange-500",
  high: "text-red-500",
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const isOverdue =
    dueDate && dueDate < new Date() && task.status !== "completed";

  const handleStatusClick = () => {
    const statuses = ["pending", "in_progress", "completed"];
    const currentIndex = statuses.indexOf(task.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div
      className={`border rounded-lg p-4 transition hover:shadow-md ${statusColors[task.status]}`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleStatusClick}
              className="flex-shrink-0 p-1 hover:bg-white rounded transition"
              title="Click to change status"
            >
              {statusIcons[task.status]}
            </button>

            <h3
              className={`font-medium text-gray-900 ${
                task.status === "completed"
                  ? "line-through text-gray-500"
                  : ""
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-3">
            {/* Priority */}
            <span
              className={`text-xs font-medium px-2 py-1 rounded bg-white ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>

            {/* Due Date */}
            {dueDate && (
              <span
                className={`text-xs flex items-center gap-1 ${
                  isOverdue
                    ? "text-red-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {dueDate.toLocaleDateString()}
                {isOverdue && " (Overdue)"}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-600 hover:bg-white rounded transition"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-600 hover:bg-white hover:text-red-600 rounded transition"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
