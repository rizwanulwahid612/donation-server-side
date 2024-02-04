/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IinventoryProduct,
  IinventoryProductFilterRequest,
} from './addIntoInventory.interface';
import { InventoryproductSearchableFields } from './addIntoInventory.constant';
import { InventoryProducts } from './addIntoInventory.model';
import { Products } from '../products/products.model';
//import { ICategory, ICategoryFilterRequest } from './category.interface';
//import { Category } from './category.model';
//import { categorySearchableFields } from './category.constant';
// import { IProduct, IProductFilterRequest } from './products.interface';
// import { productSearchableFields } from './products.constant';
// import { Products } from './products.model';
type IUserInfo = {
  userName: string;
  userEmail: string;
  userImage: string;
};
const getAllInventoryProducts = async (
  filters: IinventoryProductFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IinventoryProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: InventoryproductSearchableFields.map(field => ({
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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await InventoryProducts.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await InventoryProducts.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const addSingleEnventoryProduct = async (
  id: string,
  userInfo: IUserInfo,
): Promise<any> => {
  // Find the product by ID
  const product = await Products.findOne({ _id: new Types.ObjectId(id) });

  if (product) {
    const existingProduct = await InventoryProducts.findOne({
      'userInfo.userEmail': userInfo.userEmail,
      name: product.name,
    });

    if (existingProduct) {
      // Product already exists, update quantity
      const updatedProduct = {
        ...existingProduct.toObject(),
        quantity: existingProduct.quantity! + 1,
      };

      const result = await InventoryProducts.findOneAndUpdate(
        { _id: existingProduct._id },
        updatedProduct,
        { new: true },
      );

      console.log('Updated product:', result);
      return result;
    } else {
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

      const result = await InventoryProducts.create(newProduct);
      console.log('Added new product:', result);
      return result;
    }
  }

  return null; // Product not found
};
const deleteAllEnventoryProduct = async (): Promise<void> => {
  await InventoryProducts.deleteMany();
};
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

const getSingleEnventoryProduct = async (
  id: string,
): Promise<IinventoryProduct | null> => {
  const result = await InventoryProducts.findOne({ _id: id });
  return result;
};
const updateSingleEnventoryProduct = async (
  id: string,
  payload: Partial<IinventoryProduct>,
): Promise<IinventoryProduct | null> => {
  const result = await InventoryProducts.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const deleteSingleEnventoryProduct = async (
  id: string,
): Promise<IinventoryProduct | null> => {
  const service = await InventoryProducts.findOneAndDelete({ _id: id });
  return service;
};

export const InventoryProductsService = {
  getAllInventoryProducts,
  getSingleEnventoryProduct,
  addSingleEnventoryProduct,
  updateSingleEnventoryProduct,
  deleteSingleEnventoryProduct,
  deleteAllEnventoryProduct,
};
