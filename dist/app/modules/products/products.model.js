"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const ProductsSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    occation: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Products = (0, mongoose_1.model)('Products', ProductsSchema);
