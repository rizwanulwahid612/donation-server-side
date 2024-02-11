/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

//import { IDonation, IDonationFilterRequest } from './donations.interface';
//import { donationSearchableFields } from './donations.constant';
//import { Donations } from './donations.model';
//import ApiError from '../../../errors/ApiError';
//import httpStatus from 'http-status';
import {
  IPostDonation,
  IPostDonationFilterRequest,
} from './postDonate.interface';
import { postdonationSearchableFields } from './postDonate.constant';
import { PostDonations } from './postDonate.model';
import { Donations } from '../donations/donations.model';
type IUserInfo = {
  userName: string;
  userEmail: string;
  userImage: string;
};
const addSinglePostDonate = async (
  id: string,
  userInfo: IUserInfo,
): Promise<any> => {
  // Find the product by ID
  const donate = await Donations.findOne({ _id: new Types.ObjectId(id) });

  if (donate) {
    const existingDonation = await PostDonations.findOne({
      'userInfo.userEmail': userInfo.userEmail,
      category: donate.category,
    });

    if (existingDonation) {
      // Product already exists, update quantity
      // const updatedProduct = {
      //   ...existingDonation.toObject(),
      //   quantity: existingDonation.quantity! + 1,
      // };

      // const result = await InventoryProducts.findOneAndUpdate(
      //   { _id: existingProduct._id },
      //   updatedProduct,
      //   { new: true },
      // );

      console.log('Already Donateded');
      //return result;
    } else {
      // Product doesn't exist, add a new one
      const newDonate = {
        userInfo,
        image: donate.image,
        title: donate.title,
        price: donate.price,
        description: donate.description,
        category: donate.category,
      };

      const result = await PostDonations.create(newDonate);
      console.log('Added new Donation:', result);
      return result;
    }
  }

  return null; // Product not found
};

const getAllPostDonations = async (
  filters: IPostDonationFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IPostDonation[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: postdonationSearchableFields.map(field => ({
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

  const result = await PostDonations.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await PostDonations.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const PostDonationsService = {
  getAllPostDonations,
  addSinglePostDonate,
};
