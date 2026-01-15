import { useState, useEffect } from "react";
import { X } from "lucide-react";

const getInitialState = (task) => ({
  title: task?.title ?? "",
  description: task?.description ?? "",
  status: task?.status ?? "pending",
  priority: task?.priority ?? "medium",
  dueDate: task?.due_date ?? "",
});

const TaskForm = ({ task, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(getInitialState(task));

  // ✅ Correct way to sync form when task changes
  useEffect(() => {
    setForm(getInitialState(task));
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: form.title,
      description: form.description || "",
      status: form.status,
      priority: form.priority,
      // ✅ DateField-safe format
      due_date: form.dueDate || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 transition rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date */}
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;