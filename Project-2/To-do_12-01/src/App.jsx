import { useEffect, useReducer, useState } from 'react'
import './App.css'

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "add":
      if(action.value.length >2){
        return [...tasks, { hasDone: false, task: action.value, id: Date.now() }]
      }

    case "update":
      return action.value

    case "toggleDone":
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, hasDone: !task.hasDone }
        }
        return task;
      })

  }
}
const initValue = JSON.parse(localStorage.getItem("tasks")) || [];

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initValue);
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("all")

  function handleAdd() {
    dispatch({ type: "add", value: input });
    setInput("");
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  function handleEdit(task){
    setInput(task.task)
    let updatedTasks = tasks.filter(t => t.id !== task.id);
    console.log(updatedTasks);
    dispatch({type: "update", value: updatedTasks})
  }

  function handleDelete(id){
    let updatedTasks = tasks.filter(task=> task.id !== id);
    dispatch({type: "update", value: updatedTasks})
  }

  return (
    <>
      <h1>To-Do Task Planner</h1>

      <div className="container">
        <div className="adding-section">
          <input type="text" placeholder='Add new task' value={input} onKeyDown={(e) => {
            if (e.key == "Enter") {
              console.log(e.key);
              handleAdd();
            }
          }} onChange={(e) => setInput(e.target.value)} />
          <button className='add-btn' onClick={handleAdd}>Add Task</button>
        </div>
        <div className="filter">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="all">All</option>
            <option value="remaining">Remaining</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="lists">
          {tasks.length > 0 ? tasks?.map(task => (
            sort == "all" ?
              <div key={task.id} className="list">
                <div className="left-side">
                  <input type="checkbox" name="list" id={task.id} checked={task.hasDone} onChange={() => dispatch({ type: "toggleDone", id: task.id })} />
                  <div className="task" style={{
                    textDecoration: task.hasDone ? "line-through" : "",
                  }}>{task.task}</div>
                </div>
                <div className="right-side">
                  <button onClick={()=>handleEdit(task)}>Edit</button>
                  <button className='dlt-btn' onClick={()=>handleDelete(task.id)}>Delete</button>
                </div>
              </div>
              :
              (sort == "remaining" && task.hasDone === false) ?
                <div key={task.id} className="list">
                  <div className="left-side">
                    <input type="checkbox" name="list" id={task.id} checked={task.hasDone} onChange={() => dispatch({ type: "toggleDone", id: task.id })} />
                    <div className="task" style={{
                      textDecoration: task.hasDone ? "line-through" : "",
                    }}>{task.task}</div>
                  </div>
                  <div className="right-side">
                    <button onClick={()=>handleEdit(task)}>Edit</button>
                    <button className='dlt-btn' onClick={()=>handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
                :
                (sort == "completed" && task.hasDone === true) &&
                <div key={task.id} className="list">
                  <div className="left-side">
                    <input type="checkbox" name="list" id={task.id} checked={task.hasDone} onChange={() => dispatch({ type: "toggleDone", id: task.id })} />
                    <div className="task" style={{
                      textDecoration: task.hasDone ? "line-through" : "",
                    }}>{task.task}</div>
                  </div>
                  <div className="right-side">
                    <button onClick={()=>handleEdit(task)}>Edit</button>
                    <button className='dlt-btn' onClick={()=>handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
          ))
        :
        <p className='desc'>To-do list is empty</p>
        }
        </div>
      </div>
    </>
  )
}

export default App
