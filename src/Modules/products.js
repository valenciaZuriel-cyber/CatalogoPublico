const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // <-- Cambiado de Integer a Number
        required: true,
    },
    quantity: {
        type: Number, // <-- Cambiado de Integer a Number
        required: true,
    },
    CreationDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", ProductSchema);