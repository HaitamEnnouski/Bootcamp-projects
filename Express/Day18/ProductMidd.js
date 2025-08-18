const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function logger(req, res, next) {
    const now = new Date();
    console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
    next();
}
app.use(logger);

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (token === 'secret123') {
        next();
    } else {
        const err = new Error("Forbidden - Invalid token");
        err.status = 403;
        next(err);
    }
}

// Routes
app.get('/products/search', (req, res) => {
    let { q, minPrice, maxPrice } = req.query;
    let filteredProducts = products;

    if (q) {
        q = q.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(q)
        );
    }
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    res.json(filteredProducts);
});
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res, next) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
    }
    res.json(product);
});


app.post('/products', auth, (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', auth, (req, res, next) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
    }
    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

app.delete('/products/:id', auth, (req, res, next) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
    }
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
});

// 🔹 Error Handling Middleware (must be last)
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong! Please try again later."
    });
}
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/products`);
});
