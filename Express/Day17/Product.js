const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Dummy product list
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

// GET all products
app.get('/products', (req, res) => {
    res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// SEARCH products
app.get('/products/search', (req, res) => {
    let { q, minPrice, maxPrice } = req.query;

    let filteredProducts = products;

    if (q) {
        q = q.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(q)
        );
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= parseFloat(minPrice)
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseFloat(maxPrice)
        );
    }

    res.json(filteredProducts);
});

// CREATE new product
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// UPDATE product
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');

    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
