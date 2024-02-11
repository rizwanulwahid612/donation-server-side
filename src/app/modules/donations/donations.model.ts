import { Schema, model } from 'mongoose';
import { DonationsModel, IDonation } from './donations.interface';

const DonationsSchema = new Schema<IDonation, DonationsModel>(
  {
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

export const Donations = model<IDonation, DonationsModel>(
  'Donations',
  DonationsSchema,
);
