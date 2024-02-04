import { Model } from 'mongoose';
export type IUserInfo = {
  userName: string;
  userEmail: string;
  userImage: string;
};
export type IinventoryProduct = {
  userInfo: IUserInfo;
  image: string;
  name: string;
  price: string;
  occation: string;
  recipient: string;
  category: string;
  theme: string;
  brand: string;
  color: string;
  quantity?: number;
};

export type IinventoryProductsModel = Model<
  IinventoryProduct,
  Record<string, unknown>
>;

export type IinventoryProductFilterRequest = {
  searchTerm?: string | undefined;
  name?: string;
  category?: string;
};
