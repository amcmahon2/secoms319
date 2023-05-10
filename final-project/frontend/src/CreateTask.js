import React, { useState } from "react";
import "./App.css";


function CreateTask() {
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: {
      day: 0,
      month: 0,
      year: 0,
    },
    description: "",
    category: "",
    color: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      console.log("Task added!");
      console.log(data);
      if (data) {
        const value = Object.values(data);
        alert(value);
      }
      setNewTask({
        title: "",
        dueDate: {
          day: 0,
          month: 0,
          year: 0,
        },
        description: "",
        category: "",
        color: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
    function handleChange(evt) {
      const value = evt.target.value; // trim ends of input
      if (value !== "") {
        // check if the value is not empty
        if (evt.target.name === "title") {
          setNewTask({ ...newTask, title: value });
        } else if (evt.target.name === "description") {
          setNewTask({ ...newTask, description: value });
        } else if (evt.target.name === "category") {
          setNewTask({ ...newTask, category: value });
        } else if (evt.target.name === "color") {
          setNewTask({ ...newTask, color: value });
        } else if (evt.target.name === "day") {
          setNewTask({
            ...newTask,
            dueDate: { ...newTask.dueDate, day: parseInt(value) },
          });
        } else if (evt.target.name === "month") {
          setNewTask({
            ...newTask,
            dueDate: { ...newTask.dueDate, month: parseInt(value) },
          });
        } else if (evt.target.name === "year") {
          setNewTask({
            ...newTask,
            dueDate: { ...newTask.dueDate, year: parseInt(value) },
          });
        }
      }
    }
    return (
      <div>
        <h1 className = "task-head for-create">create task</h1>
        <div className = "creater-card">
        <div className="create-form">
          <div className="card" style = {{width: "90%", backgroundColor: "skyblue"}}>
            <div className="card-body">
              <form className="form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    className = "form-input"
                    required = "true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    className = "form-input"
                    required = "true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newTask.category}
                    onChange={handleChange}
                    className = "form-input"
                    required = "true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color:</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={newTask.color}
                    onChange={handleChange}
                    className = "form-input"
                    required = "true"
                    placeholder = "Like #FFFFFF"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate.day">Due Date - Day:</label>
                  <input
                    type="number"
                    id="dueDate.day"
                    name="day"
                    value={newTask.dueDate.day}
                    onChange={handleChange}
                    className = "form-day"
                    required = "true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate.month">Due Date - Month:</label>
                  <input
                    type="number"
                    id="dueDate.month"
                    name="month"
                    value={newTask.dueDate.month}
                    onChange={handleChange}
                    className = "form-day"
                    required = "true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate.year">Due Date - Year:</label>
                  <input
                    type="number"
                    id="dueDate.year"
                    name="year"
                    value={newTask.dueDate.year}
                    onChange={handleChange}
                    className = "form-day"
                    required = "true"
                  />
                </div>
                <button type="submit" className = "card-button" >create</button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
}
    
export default CreateTask;