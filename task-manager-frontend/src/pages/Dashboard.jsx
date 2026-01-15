import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Statistics from "../components/Statistics";
import { Plus, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= FETCH TASKS ================= */

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= CRUD HANDLERS ================= */

  const handleCreateTask = async (data) => {
    setFormLoading(true);
    try {
      const res = await api.post("/tasks/", data);
      setTasks((prev) => [res.data, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create task", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (data) => {
    if (!editingTask) return;

    setFormLoading(true);
    try {
      const res = await api.put(`/tasks/${editingTask.id}/`, data);
      setTasks((prev) =>
        prev.map((t) => (t.id === res.data.id ? res.data : t))
      );
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to update task", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}/`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.patch(`/tasks/${id}/`, { status });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 px-4 py-8 mx-auto max-w-7xl lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* New Task */}
          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={18} />
            New Task
          </button>

          {/* Search */}
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="relative">
              <Search
                className="absolute text-gray-400 left-3 top-3"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 border rounded-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow">
            {["all", "pending", "in_progress", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {f === "all" ? "All" : f.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="p-6 bg-white rounded-lg shadow">
            <TaskList
              tasks={tasks}
              loading={loading}
              filter={filter}
              searchQuery={searchQuery}
              onEdit={(task) => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <Statistics tasks={tasks} />
        </div>
      </main>

      {/* Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          loading={formLoading}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;