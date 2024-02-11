"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDonationsService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const postDonate_constant_1 = require("./postDonate.constant");
const postDonate_model_1 = require("./postDonate.model");
const donations_model_1 = require("../donations/donations.model");
const addSinglePostDonate = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the product by ID
    const donate = yield donations_model_1.Donations.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
    if (donate) {
        const existingDonation = yield postDonate_model_1.PostDonations.findOne({
            'userInfo.userEmail': userInfo.userEmail,
            category: donate.category,
        });
        if (existingDonation) {
            // Product already exists, update quantity
            // const updatedProduct = {
            //   ...existingDonation.toObject(),
            //   quantity: existingDonation.quantity! + 1,
            // };
            // const result = await InventoryProducts.findOneAndUpdate(
            //   { _id: existingProduct._id },
            //   updatedProduct,
            //   { new: true },
            // );
            console.log('Already Donateded');
            //return result;
        }
        else {
            // Product doesn't exist, add a new one
            const newDonate = {
                userInfo,
                image: donate.image,
                title: donate.title,
                price: donate.price,
                description: donate.description,
                category: donate.category,
            };
            const result = yield postDonate_model_1.PostDonations.create(newDonate);
            console.log('Added new Donation:', result);
            return result;
        }
    }
    return null; // Product not found
});
const getAllPostDonations = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: postDonate_constant_1.postdonationSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield postDonate_model_1.PostDonations.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield postDonate_model_1.PostDonations.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.PostDonationsService = {
    getAllPostDonations,
    addSinglePostDonate,
};
