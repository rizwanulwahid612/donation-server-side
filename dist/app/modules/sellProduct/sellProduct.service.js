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
exports.SellProductsService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const sellProduct_constant_1 = require("./sellProduct.constant");
const sellProduct_model_1 = require("./sellProduct.model");
const addIntoInventory_model_1 = require("../addIntoInventory/addIntoInventory.model");
const getAllSellProducts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: sellProduct_constant_1.SellproductSearchableFields.map(field => ({
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
    const result = yield sellProduct_model_1.SellProducts.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield sellProduct_model_1.SellProducts.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const addSingleSellProduct = (id, dataInven) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the booking by ID
    const SellInventoryProduct = yield addIntoInventory_model_1.InventoryProducts.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
    });
    console.log('SellInventoryProduct:', SellInventoryProduct);
    //@ts-ignore
    if (SellInventoryProduct.quantity <= 1) {
        yield addIntoInventory_model_1.InventoryProducts.findOneAndDelete({ _id: id });
    }
    if (SellInventoryProduct) {
        const existingProduct = yield sellProduct_model_1.SellProducts.findOne({
            'userInfo.userEmail': SellInventoryProduct.userInfo.userEmail,
            name: SellInventoryProduct.name,
        });
        const updated2 = Object.assign(Object.assign({}, SellInventoryProduct === null || SellInventoryProduct === void 0 ? void 0 : SellInventoryProduct.toObject()), { quantity: SellInventoryProduct.quantity - 1 });
        if (existingProduct) {
            // Product already exists, update quantity
            const updatedProduct = Object.assign(Object.assign({}, existingProduct.toObject()), { quantity: existingProduct.quantity + 1 });
            const result = yield sellProduct_model_1.SellProducts.findOneAndUpdate({ _id: existingProduct._id }, updatedProduct, { new: true });
            yield addIntoInventory_model_1.InventoryProducts.findOneAndUpdate({ _id: SellInventoryProduct._id }, updated2, { new: true });
            console.log('Updated product:', result);
            return result;
        }
        else {
            const result = yield sellProduct_model_1.SellProducts.create(dataInven);
            console.log('Added new Sell product:', result);
            yield addIntoInventory_model_1.InventoryProducts.findOneAndUpdate({ _id: SellInventoryProduct._id }, updated2, { new: true });
            return result;
        }
    }
    // if (SellInventoryProduct) {
    //   const InventoryProduct = {
    //     userInfo: SellInventoryProduct.userInfo,
    //     image: SellInventoryProduct.image,
    //     name: SellInventoryProduct.name,
    //     price: SellInventoryProduct.price,
    //     occation: SellInventoryProduct.occation,
    //     recipient: SellInventoryProduct.recipient,
    //     category: SellInventoryProduct.category,
    //     theme: SellInventoryProduct.theme,
    //     brand: SellInventoryProduct.brand,
    //     color: SellInventoryProduct.color,
    //     quantity: SellInventoryProduct.quantity! - 1,
    //   };
    //   const newProduct = {
    //     userInfo: SellInventoryProduct.userInfo,
    //     image: SellInventoryProduct.image,
    //     name: SellInventoryProduct.name,
    //     price: SellInventoryProduct.price,
    //     occation: SellInventoryProduct.occation,
    //     recipient: SellInventoryProduct.recipient,
    //     category: SellInventoryProduct.category,
    //     theme: SellInventoryProduct.theme,
    //     brand: SellInventoryProduct.brand,
    //     color: SellInventoryProduct.color,
    //     quantity: 1,
    //   };
    //   console.log('newProducts:', newProduct);
    //   // const newInvenData = {
    //   //   dataInven,
    //   //   quantity: 1,
    //   // };
    //   //console.log('newInvalidate:', newInvenData);
    //   const existingSellProducts = await SellProducts.findOne({
    //     name: newProduct?.name,
    //   });
    //   if (existingSellProducts) {
    //     const newExistProduct = {
    //       userInfo: existingSellProducts.userInfo,
    //       image: existingSellProducts.image,
    //       name: existingSellProducts.name,
    //       price: existingSellProducts.price,
    //       occation: existingSellProducts.occation,
    //       recipient: existingSellProducts.recipient,
    //       category: existingSellProducts.category,
    //       theme: existingSellProducts.theme,
    //       brand: existingSellProducts.brand,
    //       color: existingSellProducts.color,
    //       quantity: existingSellProducts.quantity! + 1,
    //     };
    //     const result = await SellProducts.findOneAndUpdate(
    //       { name: newProduct?.name },
    //       newExistProduct as any,
    //       {
    //         new: true,
    //       },
    //     );
    //     await InventoryProducts.findOneAndUpdate(
    //       { name: InventoryProduct?.name },
    //       InventoryProduct as any,
    //       {
    //         new: true,
    //       },
    //     );
    //     console.log('result:', result);
    //     return result;
    //   } else {
    //     const result = await SellProducts.create(dataInven);
    //     await InventoryProducts.findOneAndUpdate(
    //       { name: InventoryProduct?.name },
    //       InventoryProduct as any,
    //       {
    //         new: true,
    //       },
    //     );
    //     return result;
    //   }
    // }
    // return SellInventoryProduct;
});
const addSingleDuplicateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the booking by ID
    const duplicateProduct = yield addIntoInventory_model_1.InventoryProducts.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
    });
    console.log('addSingleDuplicateProduct:', duplicateProduct);
    const result = yield addIntoInventory_model_1.InventoryProducts.create(data);
    return result;
});
const getSingleSellProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sellProduct_model_1.SellProducts.findOne({ _id: id });
    return result;
});
// const deleteSingleEnventoryProduct = async (
//   id: string,
// ): Promise<IinventoryProduct | null> => {
//   const service = await InventoryProducts.findOneAndDelete({ _id: id });
//   return service;
// };
exports.SellProductsService = {
    getAllSellProducts,
    getSingleSellProduct,
    addSingleSellProduct,
    addSingleDuplicateProduct,
    //deleteSingleEnventoryProduct,
};
