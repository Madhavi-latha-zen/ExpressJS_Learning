const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/productsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const productSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Product = mongoose.model("Product", productSchema);

app.post("/products", async (req, res) => {
  try {
    const { name, age } = req.body;
    const product = new Product({ name, age });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Product.insertMany([
  { name: "madhavi", age: 20 },
  { name: "latha", age: 23 },
  { name: "madhu", age: 28 },
  { name: "chandrakala", age: 29 }
])
  .then(() => console.log("Sample Products Added Successfully!!!"))
  .catch((error) => console.error("Error adding sample products:", error));

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}.......`));

