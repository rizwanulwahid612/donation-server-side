import { Model } from 'mongoose';
export type IUserInfo = {
  userName: string;
  userEmail: string;
  userImage: string;
};

export type ISellProduct = {
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
  quantity?: number | undefined;
};

export type ISellProductsModel = Model<ISellProduct, Record<string, unknown>>;

export type ISellProductFilterRequest = {
  searchTerm?: string | undefined;
  name?: string;
  category?: string;
};
