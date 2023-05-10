const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Task = require('./dataSchema');

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/SE_319_final",
{
dbName: "SE_319_final",
useNewUrlParser: true,
useUnifiedTopology: true,
}
);  
const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
console.log(`App listening at http://%s:%s`, host, port);
});

    
app.get("/get", async (req, res) => {
  const query = {};
  const allTasks = await Task.find(query);
  res.send(allTasks);
});

app.get("/get/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneTask = await Task.findOne(query);
  console.log(oneTask);
  resp.send(oneTask);
  });

  app.put("/put", async function (req, res) {
    console.log("Editing...");
    const query = { _id: req.body._id };
    const oldTask = await Task.findById(query);
    const task = {
    title: req.body.title ? req.body.title : oldTask.title,
    dueDate: {
      day: req.body.dueDate.day ? req.body.dueDate.day : oldTask.dueDate.day,
      month: req.body.dueDate.month ? req.body.dueDate.month : oldTask.dueDate.month,
      year: req.body.dueDate.year ? req.body.dueDate.year : oldTask.dueDate.year,
    },
    description: req.body.description ? req.body.description : oldTask.description,
    category: req.body.category ? req.body.category : oldTask.category,
    color: req.body.color ? req.body.color : oldTask.color
    };
    console.log(task.title);
      try {    
          // update existing Task
          await Task.updateOne({ _id: req.body._id }, { $set: task });
          const messageResponse = { message: `Task "${task.title}" updated correctly` };
          res.send(JSON.stringify(messageResponse));
        
      } catch (err) {
        console.log("Error while adding/updating a Task:" + err);
        res.status(500).send({ message: "Error while adding/updating a Task" });
      }
    });

    
      

    app.post("/post", async function (req, res) {
      console.log(req.body);
      const task = {
        title: req.body.title,
        dueDate: {
          day: req.body.dueDate.day,
          month: req.body.dueDate.month,
          year: req.body.dueDate.year,
        },
        description: req.body.description,
        category: req.body.category,
        color: req.body.color
      };
    
      try {  
          // create new Task
          await Task.create(task);
          const messageResponse = { message: `Task "${task.title}" added correctly` };
          res.send(JSON.stringify(messageResponse));
        
      } catch (err) {
        console.log("Error while adding/updating a Task:" + err);
        res.status(500).send({ message: "Error while adding/updating a Task" });
      }
    });
    
    
    

    app.delete("/delete", async (req, res) => {
      console.log("Delete :", req.body);
      try {
        const query = { _id: req.body._id };
        await Task.deleteOne(query);
        const messageResponse = {
        message: `task deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
      } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
      }
      });
    