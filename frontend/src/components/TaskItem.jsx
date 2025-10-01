import API from "../api";

export default function TaskItem({ task, onChange }) {
  const toggleStatus = async () => {
    await API.put(`/task/${task._id}`, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    onChange();
  };

  const deleteTask = async () => {
    await API.delete(`/task/${task._id}`);
    onChange();
  };

  return (
    <div className="bg-white shadow p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-500">
          Priority: {task.priority} | Status: {task.status}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggleStatus}
          className={`px-3 py-1 rounded ${
            task.status === "Pending" ? "bg-blue-500" : "bg-green-500"
          } text-white`}
        >
          {task.status === "Pending" ? "Complete" : "Undo"}
        </button>
        <button
          onClick={deleteTask}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
