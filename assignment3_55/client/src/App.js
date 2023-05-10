import React from 'react';
import "./App.css"
//here you can see I have a file per each view, i found it easier to debug like this
import GetAllProducts from "./GetProduct";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import MyInfo from "./myInfo";


function App() {
  const [selectedOperation, setSelectedOperation] = React.useState("");

  const handleOperationSelection = (operation) => {
    setSelectedOperation(operation);
  };

  return (
    <div>
      <h1 className = "banner">A Rather CRUD Product Catalog</h1>
      <button onClick={() => handleOperationSelection("get")}>Get all products in my catalog</button>
      <button onClick={() => handleOperationSelection("create")}>Create a new product</button>
      <button onClick={() => handleOperationSelection("update")}>Update an existing product</button>
      <button onClick={() => handleOperationSelection("delete")}>Delete a product :/</button>
      <button onClick={() => handleOperationSelection("info")}>My info 💯</button>


      {selectedOperation === "get" && <GetAllProducts />}
      {selectedOperation === "create" && <CreateProduct />}
      {selectedOperation === "update" && <UpdateProduct />}
      {selectedOperation === "delete" && <DeleteProduct />}
      {selectedOperation === "info" && <MyInfo />}

    </div>
  );
}

export default App;
