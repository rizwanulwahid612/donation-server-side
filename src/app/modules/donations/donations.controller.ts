import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { DonationsService } from './donations.service';
import { IDonation } from './donations.interface';
import { donationFilterableFields } from './donations.constant';

const createDonation = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await DonationsService.createDonation(data);

  sendResponse<IDonation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation created successfully',
    data: result,
  });
});
const getSingleDonation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DonationsService.getSingleDonation(id);

  sendResponse<IDonation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation fetched successfully !',
    data: result,
  });
});

const getAllDonations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, donationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DonationsService.getAllDonations(
    filters,
    paginationOptions,
  );

  sendResponse<IDonation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donations fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateDonation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await DonationsService.updateDonation(id, updatedData);

  sendResponse<IDonation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation updated successfully !',
    data: result,
  });
});

const deleteDonation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DonationsService.deleteDonation(id);

  sendResponse<IDonation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation deleted successfully !',
    data: result,
  });
});

export const DonationsController = {
  createDonation,
  getAllDonations,
  getSingleDonation,
  updateDonation,
  deleteDonation,
};
