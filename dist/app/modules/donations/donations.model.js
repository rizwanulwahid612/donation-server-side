"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donations = void 0;
const mongoose_1 = require("mongoose");
const DonationsSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Donations = (0, mongoose_1.model)('Donations', DonationsSchema);
