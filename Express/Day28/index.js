const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydb")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ Error connecting:", err));

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: [0, "must be a positive number"], required: true },
    description: { type: String },
    inStock: { type: Boolean, default: true }
}, { timestamps: { createdAt: true } });

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

// Insert Sample Products
async function createProducts() {
    try {
        const newProducts = await ProductModel.insertMany([
            { name: "Laptop", price: 1200, description: "High-performance laptop" },
            { name: "Phone", price: 800, description: "Latest smartphone" },
            { name: "Headphones", price: 150, description: "Noise-cancelling headphones" },
            { name: "Camera", price: 500, description: "DSLR camera with 24MP" },
            { name: "Smartwatch", price: 200, description: "Fitness tracking smartwatch" }
        ]);

        console.log("✅ Products inserted:", newProducts);
    } catch (err) {
        console.error("❌ Error inserting products:", err.message);
    }
}

// (4) Sort by Price (Descending)
ProductModel.find()
    .sort({ price: -1 })
    .then((products) => console.log("📌 Products sorted by price:", products));

// (5) Pagination - Limit to 5
ProductModel.find()
    .limit(5)
    .then((products) => console.log("📌 First page (limit 5):", products));

// (6) Custom Pagination
const pageSize = 2;
const pageNumber = 3;
ProductModel.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((products) => console.log(`📌 Page ${pageNumber} (size ${pageSize}):`, products));

// (7) Count Products In Stock
ProductModel.aggregate([
    { $match: { inStock: true } },
    { $count: "TotalInStock" }
]).then((products) => console.log("📌 Products in stock count:", products));

// (8) Average Price
ProductModel.aggregate([
    {
        $group: {
            _id: null,
            averagePrice: { $avg: "$price" }
        }
    }
]).then((products) => console.log("📌 Average product price:", products));

// (9) Sort by Name (Ascending)
ProductModel.find()
    .sort({ name: 1 })
    .then((products) => console.log("📌 Products sorted by name:", products));

// (11) Pagination with Dynamic Page Size
async function dynamicPagination(dynamicPageSize) {
    try {
        const products = await ProductModel.find().limit(dynamicPageSize);
        console.log(`📌 Dynamic pagination (page size ${dynamicPageSize}):`, products);
    } catch (err) {
        console.error("❌ Error in dynamic pagination:", err);
    }
}

// (12) Pagination with Dynamic Page Number + Size
async function dynamicPage(pageSize, pageNumber) {
    try {
        const products = await ProductModel.find()
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
        console.log(`📌 Dynamic Page ${pageNumber} (size ${pageSize}):`, products);
    } catch (err) {
        console.error("❌ Error in dynamic page:", err);
    }
}

// Example calls:
dynamicPagination(4); // (11) get 4 products
dynamicPage(2, 3);    // (12) get page 3 with 2 per page
