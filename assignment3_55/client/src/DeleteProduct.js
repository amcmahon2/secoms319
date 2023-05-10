import React, { useState } from "react";
function DeleteProduct() {
  const [productId, setProductId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Product to delete:", productId);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: productId }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
  };

  return (
    <div>
      <h1>Delete Product</h1>
      <form className = "form-data" onSubmit={handleSubmit} onClick={() => window.confirm('Are you sure you want to delete a product?')}>
        <label htmlFor="productId">Product ID:</label>
        <input
          type="text"
          id="productId"
          name="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <br />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
}

export default DeleteProduct;
