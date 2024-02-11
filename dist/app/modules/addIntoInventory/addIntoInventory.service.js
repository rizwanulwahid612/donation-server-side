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
    // Find the product by ID
    const product = yield products_model_1.Products.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
    if (product) {
        const existingProduct = yield addIntoInventory_model_1.InventoryProducts.findOne({
            'userInfo.userEmail': userInfo.userEmail,
            name: product.name,
        });
        if (existingProduct) {
            // Product already exists, update quantity
            const updatedProduct = Object.assign(Object.assign({}, existingProduct.toObject()), { quantity: existingProduct.quantity + 1 });
            const result = yield addIntoInventory_model_1.InventoryProducts.findOneAndUpdate({ _id: existingProduct._id }, updatedProduct, { new: true });
            console.log('Updated product:', result);
            return result;
        }
        else {
            // Product doesn't exist, add a new one
            const newProduct = {
                userInfo,
                image: product.image,
                name: product.name,
                price: product.price,
                occation: product.occation,
                recipient: product.recipient,
                category: product.category,
                theme: product.theme,
                brand: product.brand,
                color: product.color,
                quantity: 1,
            };
            const result = yield addIntoInventory_model_1.InventoryProducts.create(newProduct);
            console.log('Added new product:', result);
            return result;
        }
    }
    return null; // Product not found
});
const deleteAllEnventoryProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    yield addIntoInventory_model_1.InventoryProducts.deleteMany();
});
// const addSingleEnventoryProduct = async (
//   id: string,
//   userInfo: IUserInfo,
// ): Promise<any> => {
//   // Find the booking by ID
//   const Product = await Products.findOne({ _id: new Types.ObjectId(id) });
//   //console.log('product:', Product);
//   if (Product) {
//     const newProduct = {
//       userInfo,
//       image: Product.image,
//       name: Product.name,
//       price: Product.price,
//       occation: Product.occation,
//       recipient: Product.recipient,
//       category: Product.category,
//       theme: Product.theme,
//       brand: Product.brand,
//       color: Product.color,
//       quantity: 1,
//     };
//     const existingAddInventoryProducts = await InventoryProducts.findOne({
//       name: newProduct?.name,
//     });
//     console.log(existingAddInventoryProducts?.name);
//     if (
//       existingAddInventoryProducts?.userInfo?.userEmail ===
//         newProduct?.userInfo?.userEmail &&
//       existingAddInventoryProducts?.name === newProduct?.name
//     ) {
//       const newExistProduct = {
//         userInfo: existingAddInventoryProducts.userInfo,
//         image: existingAddInventoryProducts.image,
//         name: existingAddInventoryProducts.name,
//         price: existingAddInventoryProducts.price,
//         occation: existingAddInventoryProducts.occation,
//         recipient: existingAddInventoryProducts.recipient,
//         category: existingAddInventoryProducts.category,
//         theme: existingAddInventoryProducts.theme,
//         brand: existingAddInventoryProducts.brand,
//         color: existingAddInventoryProducts.color,
//         quantity: existingAddInventoryProducts.quantity! + 1,
//       };
//       //if(){}
//       const result = await InventoryProducts.findOneAndUpdate(
//         { name: existingAddInventoryProducts?.name },
//         newExistProduct as any,
//         {
//           new: true,
//         },
//       );
//       console.log('result:', result);
//       return result;
//     }
//     if (
//       (existingAddInventoryProducts?.name !== newProduct.name &&
//         existingAddInventoryProducts?.userInfo.userEmail !==
//           newProduct.userInfo.userEmail) ||
//       (existingAddInventoryProducts?.name !== newProduct.name &&
//         existingAddInventoryProducts?.userInfo?.userEmail ===
//           newProduct?.userInfo?.userEmail) ||
//       (existingAddInventoryProducts?.name === newProduct.name &&
//         existingAddInventoryProducts?.userInfo.userEmail !==
//           newProduct.userInfo.userEmail)
//     ) {
//       const result = await InventoryProducts.create(newProduct);
//       console.log(result);
//       return result;
//     }
//   }
//   return Product;
// };
// const addSingleEnventoryProduct = async (
//   id: string,
//   userInfo: IUserInfo,
// ): Promise<any> => {
//   try {
//     const product = await Products.findOne({ _id: new Types.ObjectId(id) });
//     if (product) {
//       const newProduct = {
//         userInfo,
//         image: product.image,
//         name: product.name,
//         price: product.price,
//         occation: product.occation,
//         recipient: product.recipient,
//         category: product.category,
//         theme: product.theme,
//         brand: product.brand,
//         color: product.color,
//         quantity: 1,
//       };
//       const existingInventoryProduct = await InventoryProducts.findOne({
//         name: newProduct?.name,
//         'userInfo.userEmail': newProduct?.userInfo?.userEmail,
//       });
//       if (existingInventoryProduct) {
//         // Check if userEmail remains the same
//         if (
//           existingInventoryProduct.userInfo.userEmail === userInfo.userEmail
//         ) {
//           const updatedProduct = {
//             ...existingInventoryProduct.toObject(),
//             quantity: existingInventoryProduct.quantity! + 1,
//           };
//           const result = await InventoryProducts.findOneAndUpdate(
//             { name: existingInventoryProduct.name },
//             updatedProduct,
//             { new: true },
//           );
//           console.log('result:', result);
//           return result;
//         }
//       } else {
//         const result = await InventoryProducts.create(newProduct);
//         console.log(result);
//         return result;
//       }
//     }
//     return product;
//   } catch (error) {
//     console.error('Error adding inventory product:', error);
//     throw error; // Handle or log the error as needed
//   }
// };
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
exports.InventoryProductsService = {
    getAllInventoryProducts,
    getSingleEnventoryProduct,
    addSingleEnventoryProduct,
    updateSingleEnventoryProduct,
    deleteSingleEnventoryProduct,
    deleteAllEnventoryProduct,
};
