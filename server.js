const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const products = [
  {
    id: 1,
    name: "iphone",
  },
  {
    id: 2,
    name: "mi",
  },
  {
    id: 3,
    name: "realme",
  },
];
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const newData = products.filter(
    (item) => item.id.toString() == req.params.id
  );
  return res.json(newData);
});

app.post("/addproducts", (req, res) => {
  const { id, name } = req.body;
  console.log(id, name);
  const newProduct = {
    id,
    name,
  };

  products.push(newProduct);
  return res.send("Data Saved Successfully!!!");
});

app.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { name } = req.body;
  const product = products.find((item) => item.id.toString() === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  product.name = name;
  return res.send("Data Updated Successfully");
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  const index = products.findIndex((item) => item.id.toString() === productId);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  return res.send("Data Deleted Successfully");
});

app.listen(5000, () => console.log("Server is Running......."));
