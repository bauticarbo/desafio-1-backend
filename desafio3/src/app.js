const express = require("express");
const app = express();

const ProductManager = require("../ProductManager");
const manager = new ProductManager("products.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  let { limit } = req.query;
  let products = await manager.getProducts();
  res.send(products.slice(0, limit));
});

app.get("/products", async (req, res) => {
  res.send(await manager.getProducts());
});

app.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  let productId = await manager.getProdctById(id);
  if (!productId) {
    res.send("404 - ID not found");
  } else {
    res.send(productId);
  }
});

const server = app.listen(8080, () =>
  console.log("Server listening on port 8080")
);
server.on("error", (err) => console.log("Server error: " + err));
