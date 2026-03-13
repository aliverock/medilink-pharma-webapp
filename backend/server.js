const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());


/* MongoDB Connection */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


/* Routes */

app.use("/api/products", productRoutes);


/* Test Route */

app.get("/", (req,res) => {
    res.send("MediLink Backend Running");
});


/* Server */

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
