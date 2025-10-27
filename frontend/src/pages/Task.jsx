import { useEffect, useState } from "react";
import { getTasks } from "../api/task";
import TaskTable from "../components/task/TaskTable";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-base-900 tracking-tight mb-2">
          Tasks
        </h1>
        <p className="text-base-600">
          Keep track of your work and manage your priorities.
        </p>
      </div>

      <div className="w-full max-w-6xl bg-base-50 rounded-xl shadow p-4 sm:p-6">
        <TaskTable data={tasks} />
      </div>
    </div>
  );
};

export default Task;
