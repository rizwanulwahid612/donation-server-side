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
exports.InventoryProductsService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const addIntoInventory_constant_1 = require("./addIntoInventory.constant");
const addIntoInventory_model_1 = require("./addIntoInventory.model");
const products_model_1 = require("../products/products.model");
const getAllInventoryProducts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: addIntoInventory_constant_1.InventoryproductSearchableFields.map(field => ({
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
    const result = yield addIntoInventory_model_1.InventoryProducts.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield addIntoInventory_model_1.InventoryProducts.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const addSingleEnventoryProduct = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the booking by ID
    const Product = yield products_model_1.Products.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
    console.log('product:', Product);
    if (Product) {
        const newProduct = {
            userInfo,
            image: Product.image,
            name: Product.name,
            price: Product.price,
            occation: Product.occation,
            recipient: Product.recipient,
            category: Product.category,
            theme: Product.theme,
            brand: Product.brand,
            color: Product.color,
            quantity: 1,
        };
        const existingAddInventoryProducts = yield addIntoInventory_model_1.InventoryProducts.findOne({
            name: newProduct === null || newProduct === void 0 ? void 0 : newProduct.name,
        });
        if (existingAddInventoryProducts) {
            const newExistProduct = {
                userInfo: existingAddInventoryProducts.userInfo,
                image: existingAddInventoryProducts.image,
                name: existingAddInventoryProducts.name,
                price: existingAddInventoryProducts.price,
                occation: existingAddInventoryProducts.occation,
                recipient: existingAddInventoryProducts.recipient,
                category: existingAddInventoryProducts.category,
                theme: existingAddInventoryProducts.theme,
                brand: existingAddInventoryProducts.brand,
                color: existingAddInventoryProducts.color,
                quantity: existingAddInventoryProducts.quantity + 1,
            };
            const result = yield addIntoInventory_model_1.InventoryProducts.findOneAndUpdate({ name: newProduct === null || newProduct === void 0 ? void 0 : newProduct.name }, newExistProduct, {
                new: true,
            });
            console.log('result:', result);
            return result;
        }
        else {
            const result = yield addIntoInventory_model_1.InventoryProducts.create(newProduct);
            return result;
        }
    }
    return Product;
});
const getSingleEnventoryProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield addIntoInventory_model_1.InventoryProducts.findOne({ _id: id });
    return result;
});
const updateSingleEnventoryProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield addIntoInventory_model_1.InventoryProducts.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingleEnventoryProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield addIntoInventory_model_1.InventoryProducts.findOneAndDelete({ _id: id });
    return service;
});
const deleteAllEnventoryProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    yield addIntoInventory_model_1.InventoryProducts.deleteMany();
});
exports.InventoryProductsService = {
    getAllInventoryProducts,
    getSingleEnventoryProduct,
    addSingleEnventoryProduct,
    updateSingleEnventoryProduct,
    deleteSingleEnventoryProduct,
    deleteAllEnventoryProduct,
};
