import React, { useState, useEffect } from "react";
import axios from "axios";
import chroma from 'chroma-js';
import "./styles.css";

function GetAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [oldID, setOldID] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    color: "",
    dueDate: { day: "", month: "", year: "" },
  });

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "title") {
      setNewTask({ ...newTask, title: value });
    } else if (evt.target.name === "description") {
      setNewTask({ ...newTask, description: value });
    } else if (evt.target.name === "category") {
      setNewTask({ ...newTask, category: value });
    } else if (evt.target.name === "color") {
      setNewTask({ ...newTask, color: value });
    } else if (evt.target.name === "dueDate") {
      const date = new Date(value);
      const day = date.getDate()+1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      setNewTask({ ...newTask, dueDate: { day, month, year } });
  }
}

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log("PUT in progress....");
    const response = await fetch("http://localhost:4000/put", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTask, _id: oldID }),
    });
    const data = await response.json();
    console.log("PUT completed");
    console.log(data);
    if (data) {
      const value = Object.values(data);
      alert(value);
      // Update the tasks state with the updated task
      setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
    }
    setIsFlipped(false);
    setShowUpdateForm(false);
  } catch (error) {
    console.error(error);
  }
};

const IDupdate = (oldTaskID) => {
  setShowUpdateForm(true);
  setOldID(oldTaskID);
  setIsFlipped(true);
}


  const deleteTask = (taskId) => {
    fetch("http://localhost:4000/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: taskId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
        setTasks(tasks.filter((task) => task._id !== taskId));
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/get").then((response) => {
      const sortedTasks = response.data.sort(
        (b, a) =>
          new Date(b.dueDate.year, b.dueDate.month, b.dueDate.day, 0, 0, 0) -
          new Date(a.dueDate.year, a.dueDate.month, a.dueDate.day, 0, 0, 0)
      );
      setTasks(sortedTasks);
    });
  }, []);

  return (
    <div>
      <h1 className="task-head">my to-do:</h1>
      <div className="cards">
        {tasks.map((task) => (
          <div key={task._id} className="card-container" data-task-id={task._id}>
          <div className={`card-container-fixed-width ${showUpdateForm && oldID === task._id ? "flipped" : ""}`} >
              {showUpdateForm && oldID === task._id ? (
                <div className="card" style = {{
                    backgroundColor: task.color
                }}>
                  <form onSubmit={handleSubmit} >
                        <label htmlFor="descriptionInput"></label>
                        <textarea
                        id="descriptionInput"
                        name="description"
                        value={newTask.description || task.description}
                        onChange={handleChange}
                        className="edit-field description-input"
                        style = {{
                            marginLeft: '0px'
                        }}
                        required
                        ></textarea>
                
                    <label htmlFor="titleInput" className = "title-label"></label>
                    <input
                      id="titleInput"
                      type="text"
                      name="title"
                      value={newTask.title || task.title}
                      onChange={handleChange}
                      className="edit-field"
                      required
                    />

                    <label htmlFor="categoryInput"></label>
                    <input
                      id="categoryInput"
                      type="text"
                      name="category"
                      value={newTask.category || task.category}
                      onChange={handleChange}
                      className="edit-field"
                      required
                    />

                    <label htmlFor="colorInput"></label>
                    <input
                      id="colorInput"
                      type="text"
                      name="color"
                      value={newTask.color || task.color}
                      onChange={handleChange}
                      className="edit-field"
                      required
                    />

                    <label htmlFor="dueDateInput"></label>
                    <input
                      id="dueDateInput"
                      type="date"
                      name="dueDate"
                      value={`${newTask.dueDate?.year || task.dueDate.year}-${String(
                        newTask.dueDate?.month || task.dueDate.month
                      ).padStart(2, "0")}-${String(newTask.dueDate?.day || task.dueDate.day).padStart(2, "0")}`}
                      onChange={handleChange}
                      className="edit-field"
                      required
                    />

                    <div className="form-buttons">
                      <button
                        type="submit"
                        
                      >
                        update
                      </button>
                      <button
                        className="card__button"
                        style={{
                          color: "white",
                          backgroundColor: "#FF3333"
                        }}
                        onClick={() => {
                          setShowUpdateForm(false)
                          const cardContainer = document.querySelector(`[data-task-id="${task._id}"]`);
                          cardContainer.classList.toggle("flipped");
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="card" style = {{
                    backgroundColor: task.color,
                    
                        color:
                          chroma(task.color).luminance() > 0.5
                            ? "#555555"
                            : "white",
                        backgroundColor: task.color,

                }}>
                  <div className="card-body" key={task._id}>
                    <h3 className="card__title">{task.title}</h3>
                    <div className="card__info">
                      <p>
                        {task.dueDate.month}/{task.dueDate.day}/
                        {task.dueDate.year}
                      </p>
                      <p className="card__category">{task.category}</p>
                    </div>
                    <p className="card__description">{task.description}</p>
                    <div
                      className="card__color"
                      style={{ backgroundColor: task.color }}
                    ></div>
                    <button
                      className="card__button"
                      style={{
                        backgroundColor: "#FF3333"
                      }}
                      onClick={() => IDupdate(task._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="card__button"
                      
                      onClick={() => deleteTask(task._id)}
                    >
                      completed
                    </button>
                  
                </div>
              </div>
            )}
          </div>
          </div>
        ))}
      </div>
      </div>
  );
}

export default GetAllTasks;
