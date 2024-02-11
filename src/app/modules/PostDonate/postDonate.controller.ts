import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
//import { DonationsService } from './donations.service';
//import { IDonation } from './donations.interface';
//import { donationFilterableFields } from './donations.constant';
import { PostDonationsService } from './postDonate.service';
import { postdonationFilterableFields } from './postDonate.constant';
import { IPostDonation } from './postDonate.interface';

// const getSingleDonation = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await DonationsService.getSingleDonation(id);

//   sendResponse<IDonation>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Donation fetched successfully !',
//     data: result,
//   });
// });

const getAllPostDonations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postdonationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PostDonationsService.getAllPostDonations(
    filters,
    paginationOptions,
  );

  sendResponse<IPostDonation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Donations fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const addSinglePostDonation = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await PostDonationsService.addSinglePostDonate(id, data);

    sendResponse<IPostDonation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Post Donation Added successfully !',
      data: result,
    });
  },
);
// const updateDonation = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   const result = await DonationsService.updateDonation(id, updatedData);

//   sendResponse<IDonation>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Donation updated successfully !',
//     data: result,
//   });
// });

// const deleteDonation = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await DonationsService.deleteDonation(id);

//   sendResponse<IDonation>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Donation deleted successfully !',
//     data: result,
//   });
// });

export const PostDonationsController = {
  //createDonation,
  getAllPostDonations,
  addSinglePostDonation,
  //getSingleDonation,
  //updateDonation,
  //deleteDonation,
};
