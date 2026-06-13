const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please provide a valid email address",
        ],
    },

    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* ======================================= */
/* MIDDLEWARE: NORMALIZE EMAIL STRINGS     */
/* ======================================= */
contactSchema.pre("save", function (next) {
    if (this.email) {
        this.email = this.email.trim().toLowerCase();
    }
    next();
});

module.exports = mongoose.model("Contact", contactSchema);