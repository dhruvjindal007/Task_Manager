import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const Statistics = ({ tasks = [] }) => {
  // Safe even when tasks not loaded yet
  const completed = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "in_progress"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "pending"
  ).length;

  const highPriority = tasks.filter(
    (t) => t.priority === "high" && t.status !== "completed"
  ).length;

  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      color: "bg-blue-50 text-blue-700",
      icon: <Clock size={20} />,
    },
    {
      label: "Completed",
      value: completed,
      color: "bg-green-50 text-green-700",
      icon: <CheckCircle2 size={20} />,
    },
    {
      label: "In Progress",
      value: inProgress,
      color: "bg-orange-50 text-orange-700",
      icon: <Clock size={20} />,
    },
    {
      label: "Pending",
      value: pending,
      color: "bg-yellow-50 text-yellow-700",
      icon: <AlertCircle size={20} />,
    },
    {
      label: "High Priority",
      value: highPriority,
      color: "bg-red-50 text-red-700",
      icon: <AlertCircle size={20} />,
    },
  ];

  const completionRate =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded-lg p-4 ${stat.color}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium opacity-75">
                {stat.label}
              </span>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Completion Rate
          </span>
          <span className="text-2xl font-bold text-indigo-600">
            {completionRate}%
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 transition-all bg-indigo-600 rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;