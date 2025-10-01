import { useState } from "react";
import API from "../api";

export default function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/task", task);
      setTask({ title: "", description: "", priority: "Low", dueDate: "" });
      onTaskAdded();
    } catch (err) {
      alert("Error adding task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow flex gap-2 flex-wrap"
    >
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="border p-2 rounded flex-1"
      />
      <input
        type="text"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border p-2 rounded flex-1"
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="border p-2 rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        className="border p-2 rounded"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
