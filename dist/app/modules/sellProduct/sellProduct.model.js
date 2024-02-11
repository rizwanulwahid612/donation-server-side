"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellProducts = void 0;
const mongoose_1 = require("mongoose");
const SellProductsSchema = new mongoose_1.Schema({
    userInfo: {
        type: {
            userName: {
                type: String,
                required: false,
            },
            userEmail: {
                type: String,
                required: false,
            },
            userImage: {
                type: String,
                required: false,
            },
        },
        required: false,
    },
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
    quantity: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.SellProducts = (0, mongoose_1.model)('SellProducts', SellProductsSchema);
