import { Schema, model } from 'mongoose';
import { IPostDonation, PostDonationsModel } from './postDonate.interface';

const PostDonationsSchema = new Schema<IPostDonation, PostDonationsModel>(
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
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PostDonations = model<IPostDonation, PostDonationsModel>(
  'PostDonations',
  PostDonationsSchema,
);
