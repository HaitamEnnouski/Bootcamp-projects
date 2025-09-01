const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://ennouskihaitam:2fHaxeyPtVQUyk3G@cluster0.km7fwo0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.log("❌ Error connecting:", err);
    }
}


// Schema + Model
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: [0, "must be a positive number"], required: true },
    description: { type: String },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    expirationDate: { type: Date },
    category: { type: String, default: "General" } // Added category field
}, { timestamps: { createdAt: true } });

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

// ------------------- Part 1: Basic Operations -------------------

// Insert Sample Products
async function createProducts() {
    try {
        const existing = await ProductModel.countDocuments();
        if (existing > 0) {
            console.log("⚠️ Products already exist, skipping insertion.");
            return;
        }

        const newProducts = await ProductModel.insertMany([
            { name: "Laptop", price: 1200, description: "High-performance laptop", category: "Electronics" },
            { name: "Phone", price: 800, description: "Latest smartphone", category: "Electronics" },
            { name: "Headphones", price: 150, description: "Noise-cancelling headphones", category: "Accessories" },
            { name: "Camera", price: 500, description: "DSLR camera with 24MP", category: "Electronics" },
            { name: "Smartwatch", price: 200, description: "Fitness tracking smartwatch", category: "Accessories" }
        ]);
        console.log("✅ Products inserted:", newProducts);
    } catch (err) {
        console.error("❌ Error inserting products:", err.message);
    }
}

// Sort by Price (Descending)
async function sortByPrice() {
    const products = await ProductModel.find().sort({ price: -1 });
    console.log("📌 Products sorted by price:", products);
}

// Pagination - Limit to 5
async function firstPageLimit5() {
    const products = await ProductModel.find().limit(5);
    console.log("📌 First page (limit 5):", products);
}

// Custom Pagination
async function customPagination(pageSize, pageNumber) {
    const products = await ProductModel.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    console.log(`📌 Page ${pageNumber} (size ${pageSize}):`, products);
}

// Count Products In Stock
async function countInStock() {
    const result = await ProductModel.aggregate([
        { $match: { inStock: true } },
        { $count: "TotalInStock" }
    ]);
    console.log("📌 Products in stock count:", result);
}

// Average Price
async function averagePrice() {
    const result = await ProductModel.aggregate([
        { $group: { _id: null, averagePrice: { $avg: "$price" } } }
    ]);
    console.log("📌 Average product price:", result);
}

// Sort by Name (Ascending)
async function sortByName() {
    const products = await ProductModel.find().sort({ name: 1 });
    console.log("📌 Products sorted by name:", products);
}

// Dynamic Pagination
async function dynamicPagination(dynamicPageSize) {
    const products = await ProductModel.find().limit(dynamicPageSize);
    console.log(`📌 Dynamic pagination (page size ${dynamicPageSize}):`, products);
}

// Dynamic Page Number + Size
async function dynamicPage(pageSize, pageNumber) {
    const products = await ProductModel.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    console.log(`📌 Dynamic Page ${pageNumber} (size ${pageSize}):`, products);
}

// ------------------- Part 2: Advanced Operations -------------------

// Update Product Price by Name
async function updateByName(productName, newPrice) {
    const result = await ProductModel.findOneAndUpdate(
        { name: productName },
        { price: newPrice },
        { new: true }
    );
    if (result) console.log("✅ Updated product:", result);
    else console.log(`❌ Product "${productName}" not found`);
}

// Soft Delete Product
async function softDeleteProduct(productName) {
    const result = await ProductModel.findOneAndUpdate(
        { name: productName },
        { isDeleted: true },
        { new: true }
    );
    if (result) console.log("🗑️ Soft Deleted:", result);
    else console.log(`❌ Product "${productName}" not found`);
}

// Hard Delete Expired Products
async function HardDeleteExpiredProducts() {
    const result = await ProductModel.deleteMany({
        expirationDate: { $lt: new Date() }
    });
    if (result.deletedCount > 0) console.log(`🗑️ Hard Deleted ${result.deletedCount} expired product(s).`);
    else console.log("✅ No expired products found.");
}

// Bulk Update Description for In-Stock Products
async function bulkUpdateInStock(newDesc) {
    const result = await ProductModel.updateMany(
        { inStock: true },
        { $set: { description: newDesc } }
    );
    console.log(`✅ Updated ${result.modifiedCount} product(s) in stock.`);
}

// Delete Out-of-Stock Products
async function DeleteOutOfStock() {
    const result = await ProductModel.deleteMany({ inStock: false });
    if (result.deletedCount > 0) console.log(`🗑️ Deleted ${result.deletedCount} out-of-stock product(s).`);
    else console.log("✅ No out-of-stock products found.");
}

// Group Products by Category
async function groupByCategory() {
    const result = await ProductModel.aggregate([
        { $group: { _id: "$category", products: { $push: "$$ROOT" }, count: { $sum: 1 } } }
    ]);
    console.log("📌 Products grouped by category:", result);
}

// ------------------- Run Everything -------------------
(async () => {
    await connectDB();

    // Part 1
    await createProducts();
    await sortByPrice();
    await firstPageLimit5();
    await customPagination(2, 2);
    await countInStock();
    await averagePrice();
    await sortByName();
    await dynamicPagination(3);
    await dynamicPage(2, 2);

    // Part 2
    await updateByName("Laptop", 1500);
    await softDeleteProduct("Phone");
    await HardDeleteExpiredProducts();
    await bulkUpdateInStock("Updated description");
    await DeleteOutOfStock();
    await groupByCategory(); // grouping by category

    // Close connection
    mongoose.connection.close();
})();
