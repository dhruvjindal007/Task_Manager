import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskFilter from "../components/TaskFilter";

const Tasks = ({ refreshStats }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch {
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (refreshStats) refreshStats();
    } catch {
      alert("Failed to delete task");
    }
  };

  // ✅ FILTER + SEARCH combined
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filter ? task.status === filter : true;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Search */}
      <input
        className="border p-2 mb-4 w-full rounded"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <TaskFilter setFilter={setFilter} />

      {filteredTasks.length === 0 && (
        <p className="text-gray-500 mt-4">No tasks available.</p>
      )}

      <div className="space-y-4 mt-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-500">
                {task.category} • {task.priority}
              </p>
              <p className="text-sm mt-1">{task.status}</p>
            </div>

            <button
              onClick={() => {
                if (confirm("Delete this task?")) {
                  deleteTask(task.id);
                }
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;