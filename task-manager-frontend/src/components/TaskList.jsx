import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  loading,
  filter = "all",
  searchQuery = "",
}) => {
  let filtered = tasks;

  // Filter by status
  if (filter !== "all") {
    filtered = filtered.filter(task => task.status === filter);
  }

  // Search by title or description
  if (searchQuery) {
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  // Empty state
  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-400 mb-2">No tasks found</div>
        <p className="text-sm text-gray-500">
          {searchQuery
            ? "Try a different search"
            : "Create your first task to get started"}
        </p>
      </div>
    );
  }

  // Task list
  return (
    <div className="space-y-3">
      {filtered.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
