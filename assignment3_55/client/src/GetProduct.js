import React, { useState, useEffect } from "react";
import axios from "axios";

function GetAllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/get").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <ul className = "form-data">
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllProducts;
