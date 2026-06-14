const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "https://portfolio-gilt-delta-96.vercel.app" // 👈 Replace with your actual live Vercel URL
}));
app.use(express.json());



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend is working");
});
// POST API
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message saved successfully"
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});