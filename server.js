import express from 'express';
import Product from './models/product.js';
import 'dotenv/config';
import connectionDB from './db/index.js';
import cors from 'cors'
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors());

connectionDB(); 

app.post('/product', async (req, res) => {
  const {name,price}= req.body
  try {
    if (!name || !price) {
      res.status(400).json({ message: 'All fields are required' });
    }
    const newProduct = new Product({
      name,
      price
    })
    await newProduct.save()
    res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
     res.status(500).json({ message: 'Error creating product', error });
  }
 });

app.get('/product/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error });
  }
});
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});



app.listen(port, () =>
  console.log(`Server is working at http://127.0.0.1:${port}`)
);







