import { Model } from 'mongoose';
export type IDonation = {
  id?: string;
  title: string;
  category: string;
  image: string;
  price?: string;
  description: string;
};

export type DonationsModel = Model<IDonation, Record<string, unknown>>;

export type IDonationFilterRequest = {
  searchTerm?: string | undefined;
  category?: string;
};
