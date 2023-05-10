import React from 'react';
import "./App.css";
//here you can see I have a file per each view, i found it easier to debug like this
import GetAllTasks from "./GetTask";
import CreateTask from "./CreateTask";
import MyInfo from "./myInfo";


function App() {
  const [selectedOperation, setSelectedOperation] = React.useState("");

  const handleOperationSelection = (operation) => {
    setSelectedOperation(operation);
  };

  return (
    <div>
      <h1 className = "banner">&nbsp;andrew's task catalog</h1>
      <button onClick={() => handleOperationSelection("get")}>my tasks</button>
      <button onClick={() => handleOperationSelection("create")}>new task</button>
      <button onClick={() => handleOperationSelection("info")}>my info 💯</button>


      {selectedOperation === "get" && <GetAllTasks />}
      {selectedOperation === "create" && <CreateTask />}
      {selectedOperation === "info" && <MyInfo />}

    </div>
  );
}

export default App;
