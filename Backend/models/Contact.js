const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },

    message: { type: String, required: true, trim: true },

    createdAt: { type: Date, default: Date.now }
});

// SAFE middleware (no next)
contactSchema.pre("save", function () {
    if (this.email) {
        this.email = this.email.trim().toLowerCase();
    }
});

module.exports = mongoose.model("Contact", contactSchema);