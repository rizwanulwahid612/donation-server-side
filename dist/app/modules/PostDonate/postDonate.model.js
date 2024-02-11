"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDonations = void 0;
const mongoose_1 = require("mongoose");
const PostDonationsSchema = new mongoose_1.Schema({
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
exports.PostDonations = (0, mongoose_1.model)('PostDonations', PostDonationsSchema);
