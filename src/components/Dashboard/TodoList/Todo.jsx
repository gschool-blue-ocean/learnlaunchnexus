import { useState, useEffect } from 'react';
import "./Todo.css"

function TodoList({USER_ID}) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  useEffect( () => {
    const getTodoData = async () => {

          try {
                const res = await fetch(`${import.meta.env.VITE_API}/todos/user/${USER_ID}`, {
                  method: "GET",
                });
        
                const parseData = await res.json();
                if(res.status === 200) {
                  let arr = []
                  parseData.map((todos) => { return (arr.push({id: todos.id, text: todos.todo_item, isCompleted: false}) )})
                  setTasks(arr);
                }
                
              } catch (err) {
                console.error(err.message);
              }
      }
      getTodoData()
  }, []);
  
  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
          const body = {user_id: USER_ID, "todo_item": newTask }
          const res = await fetch(`${import.meta.env.VITE_API}/todos`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
          });
  
          const parseData = await res.json();
          if(res.status === 200){
            setTasks([{ text: parseData.todo_item, isCompleted: false, id: parseData.id }, ...tasks ]);
          }
        } catch (err) {
          console.error(err.message);
      }
      setNewTask('');
    }
  };

  const toggleTaskCompletion = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = async (index, id) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/todos/${id}`, {
        method: "DELETE",
      });
      
    } catch (err) {
      console.error(err.message);
    }
    
    
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={(e) => {if(e.key === 'Enter') {addTask()} }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {(tasks.length > 0) && tasks.map((task, index) => (
          <li key={index} id={task.id}>
            <span
              style={{
                textDecoration: task.isCompleted ? 'line-through' : '',
              }}
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index, task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
