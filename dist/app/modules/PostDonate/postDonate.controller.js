"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDonationsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
//import { DonationsService } from './donations.service';
//import { IDonation } from './donations.interface';
//import { donationFilterableFields } from './donations.constant';
const postDonate_service_1 = require("./postDonate.service");
const postDonate_constant_1 = require("./postDonate.constant");
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
const getAllPostDonations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, postDonate_constant_1.postdonationFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield postDonate_service_1.PostDonationsService.getAllPostDonations(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Post Donations fetched successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const addSinglePostDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield postDonate_service_1.PostDonationsService.addSinglePostDonate(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Post Donation Added successfully !',
        data: result,
    });
}));
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
exports.PostDonationsController = {
    //createDonation,
    getAllPostDonations,
    addSinglePostDonation,
    //getSingleDonation,
    //updateDonation,
    //deleteDonation,
};
