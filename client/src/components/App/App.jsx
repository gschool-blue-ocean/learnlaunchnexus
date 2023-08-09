import React, { useEffect, useState } from "react";
import Counter from "../Counter/Counter.jsx";
import c from "./App.module.css";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    axios.get("/api/tasks").then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(getTasks, []);

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    return getTasks();
  };

  return (
    <main>
      <h2>Tasks</h2>
      <div className={c.tasks}>
        {tasks.length > 0 ? (
          tasks.map(({ id, description }) => (
            <div key={id}>
              <button onClick={() => deleteTask(id)}>X</button>
              <span>{description}</span>
            </div>
          ))
        ) : (
          <span>No Tasks Remaining</span>
        )}
      </div>
      <h2>Counter</h2>
      <Counter />
    </main>
  );
};

export default App;
