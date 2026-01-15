const TaskFilter = ({ setFilter }) => {
  return (
    <div className="flex gap-4 mb-4">
      <select onChange={(e) => setFilter(e.target.value)}
        className="border p-2">
        <option value="">All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
