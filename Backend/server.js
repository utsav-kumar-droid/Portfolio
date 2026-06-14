const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ CORS (allow frontend + local testing)
app.use(cors({
    origin: [
        "https://portfolio-gilt-delta-96.vercel.app",
        "http://localhost:3000"
    ]
}));

// ✅ MongoDB connection (better logging)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// ✅ TEST ROUTE (IMPORTANT for Render debugging)
app.get("/", (req, res) => {
    res.status(200).send("Backend is working 🚀");
});

// ✅ HEALTH CHECK ROUTE (very useful on Render)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server running fine" });
});

// ✅ POST API
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

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

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});