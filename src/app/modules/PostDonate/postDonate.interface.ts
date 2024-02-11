import { Model } from 'mongoose';

type IUserInfo = {
  userName: string;
  userEmail: string;
  userImage: string;
};
export type IPostDonation = {
  userInfo?: IUserInfo;
  id?: string;
  title: string;
  category: string;
  image: string;
  price?: string;
  description: string;
};

export type PostDonationsModel = Model<IPostDonation, Record<string, unknown>>;

export type IPostDonationFilterRequest = {
  searchTerm?: string | undefined;
  category?: string;
};
