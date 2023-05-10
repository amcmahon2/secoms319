const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require('./dataSchema');

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/SE_319",
{
dbName: "SE_319",
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
  const allProducts = await Product.find(query);
  console.log(allProducts);
  res.send(allProducts);
});

app.get("/get/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneProduct = await Product.findOne(query);
  console.log(oneProduct);
  resp.send(oneProduct);
  });

  app.put("/put", async function (req, res) {
    console.log(req.body);
      const product = new Product({
        _id: req.body._id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        rating: {
          rate: req.body.rating.rate,
          count: req.body.rating.count
        }
      });
    
      try {
        await Product.updateOne(product);
        const messageResponse = { message: `Product ${product._id} updated correctly` };
        res.send(JSON.stringify(messageResponse));
      } catch (err) {
        console.log("Error while updating product:" + err);
        res.status(500).send({ message: "Error while updating product" });
      }
    });
    
      

    app.post("/post", async function (req, res) {
      console.log(req.body);
      const product = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        rating: {
          rate: req.body.rating.rate,
          count: req.body.rating.count
        }
      };
    
      try {
        const existingProduct = await Product.findOne({ _id: req.body._id });
    
        if (existingProduct) {
          // update existing product
          //forgot to mention, i use POST to both update and create, so my /put endpoint isnt actually used
          await Product.findOneAndUpdate({ _id: req.body._id }, product);
          const messageResponse = { message: `Product ${req.body._id} updated correctly` };
          res.send(JSON.stringify(messageResponse));
        } else {
          // create new product
          product._id = req.body._id;
          await Product.create(product);
          const messageResponse = { message: `Product ${product._id} added correctly` };
          res.send(JSON.stringify(messageResponse));
        }
      } catch (err) {
        console.log("Error while adding/updating a product:" + err);
        res.status(500).send({ message: "Error while adding/updating a product" });
      }
    });
    
    
    

    app.delete("/delete", async (req, res) => {
      console.log("Delete :", req.body);
      try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
        message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
      } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
      }
      });
    