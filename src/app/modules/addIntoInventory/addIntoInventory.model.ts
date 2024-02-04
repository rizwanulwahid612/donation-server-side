import { Schema, model } from 'mongoose';
import {
  IinventoryProduct,
  IinventoryProductsModel,
} from './addIntoInventory.interface';

const InventoryProductsSchema = new Schema<
  IinventoryProduct,
  IinventoryProductsModel
>(
  {
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
  },
  {
    timestamps: true,
  },
);

export const InventoryProducts = model<
  IinventoryProduct,
  IinventoryProductsModel
>('InventoryProducts', InventoryProductsSchema);
