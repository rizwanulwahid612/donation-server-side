/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { IDonation, IDonationFilterRequest } from './donations.interface';
import { donationSearchableFields } from './donations.constant';
import { Donations } from './donations.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createDonation = async (post: IDonation): Promise<IDonation | null> => {
  const result = await Donations.create(post);
  return result;
};

const getSingleDonation = async (id: string): Promise<IDonation | null> => {
  const result = await Donations.findOne({ _id: new Types.ObjectId(id) });

  return result;
};
const deleteDonation = async (id: string): Promise<IDonation | null> => {
  // Check if the admin exists
  const isExist = await Donations.findOne({ _id: new Types.ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation was not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const result = await Donations.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return result;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
const updateDonation = async (
  id: string,
  payload: Partial<IDonation>,
): Promise<IDonation | null> => {
  const result = await Donations.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    payload,
    {
      new: true,
    },
  );
  return result;
};
const getAllDonations = async (
  filters: IDonationFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDonation[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: donationSearchableFields.map(field => ({
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

  const result = await Donations.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Donations.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const DonationsService = {
  createDonation,
  getSingleDonation,
  getAllDonations,
  updateDonation,
  deleteDonation,
};
