import React, { useState } from "react";

function UpdateProduct() {
  const [newProduct, setNewProduct] = useState({
    _id: "",
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0.0, count: 0 },
    });

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:4000/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        console.log("POST completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
        setNewProduct({
          _id: "",
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
          rating: {
            rate: "",
            count: "",
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    

    function handleChange(evt) {
      const value = evt.target.value;
      if (evt.target.name === "_id") {
        setNewProduct({ ...newProduct, _id: value });
      } else if (evt.target.name === "title") {
        setNewProduct({ ...newProduct, title: value });
      } else if (evt.target.name === "price") {
        setNewProduct({ ...newProduct, price: value });
      } else if (evt.target.name === "description") {
        setNewProduct({ ...newProduct, description: value });
      } else if (evt.target.name === "category") {
        setNewProduct({ ...newProduct, category: value });
      } else if (evt.target.name === "image") {
        setNewProduct({ ...newProduct, image: value });
      } else if (evt.target.name === "rate") {
        setNewProduct({ ...newProduct, rating: { rate: value } });
      } else if (evt.target.name === "count") {
        const temp = newProduct.rating.rate;
        const count = value === '' ? newProduct.rating.count : value;
        setNewProduct({
          ...newProduct,
          rating: { rate: temp, count: count },
        });
      }
    }
    
    



  return (
    <div>
      <h1>Update Product</h1>
      <form className = "form-data" onSubmit={handleSubmit}>
      
      <label htmlFor="_id">ID to update:</label>
        <input
          type="text"
          id="_id"
          name="_id"
          value={newProduct._id}
          onChange={handleChange}
        />
        <br /> 
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={newProduct.category}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="category">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="rating.rate">Rating:</label>
        <input
          type="number"
          id="rating.rate"
          name="rate"
          value={newProduct.rating.rate}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="rating.count">Rating Count:</label>
        <input
          type="number"
          id="rating.count"
          name="count"
          value={newProduct.rating.count}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
