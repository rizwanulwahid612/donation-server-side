/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
//import { IAdmin } from '../admin/admin.interface';
//import { Admin } from '../admin/admin.model';

import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateUserId } from './user.utils';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchableFields } from './user.constant';
import { sendEmail } from '../auth/sendResetMail';

type IContact = {
  name: string;
  email: string;
  description: string;
};
const createContact = async (contact: IContact) => {
  await sendEmail(
    contact.email,
    `
      <div>
        <p>User Name, ${contact.name}</p>
        <p>Userr Mail, ${contact.email}</p>
        <p>Description:, ${contact.description}</p>
        <p>Thank you</p>
      </div>
  `,
  );
};
const createlinkforUser = async (user: IUser) => {
  const resetLink: string =
    config.resetlink +
    `/register?email=${user.email}&image=${user.image}&name=${user.name}&password=${user.password}`;

  console.log('resetLink:', resetLink);
  await sendEmail(
    user.email,
    `
      <div>
        <p>Hi, ${user.name}</p>
        <p>Varification link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
  );
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User data is missing');
  }
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'user';

  // generate admin id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateUserId();
    user.id = id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0]._id;

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ email: newUserAllData.id });
  }

  return newUserAllData;
};
const getAllUsers = async (
  filters: IUser,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  //Extract searchTerm to implement search query
  //@ts-ignore
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const createAdmin = async (admin: IUser): Promise<IUser | null> => {
  if (!admin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin data is missing');
  }
  if (!admin.password) {
    admin.password = config.default_user_pass as string;
  }
  admin.role = 'admin';

  // generate admin id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    admin.id = id;

    const newUser = await User.create([admin], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }
    newUserAllData = newUser[0]._id;

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ email: newUserAllData.id });
  }
  return newUserAllData;
};

export const UserService = {
  createlinkforUser,
  createContact,
  createUser,
  getAllUsers,
  createAdmin,
};
