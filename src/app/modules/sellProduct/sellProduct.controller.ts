import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SellProductsService } from './sellProduct.service';
import { ISellProduct } from './sellProduct.interface';
import { SellproductFilterableFields } from './sellProduct.constant';
// import { InventoryproductFilterableFields } from './addIntoInventory.constant';
// import { InventoryProductsService } from './addIntoInventory.service';
// import { IinventoryProduct } from './addIntoInventory.interface';

const addSingleSell = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await SellProductsService.addSingleSellProduct(id, data);

  sendResponse<ISellProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Sell Added successfully !',
    data: result,
  });
});
const addSingleDuplicateProduct = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await SellProductsService.addSingleDuplicateProduct(
      id,
      data,
    );

    sendResponse<ISellProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Duplicate Added successfully !',
      data: result,
    });
  },
);
const getSingleSellProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SellProductsService.getSingleSellProduct(id);

  sendResponse<ISellProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Sell product fetched successfully !',
    data: result,
  });
});
const getAllSellProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SellproductFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SellProductsService.getAllSellProducts(
    filters,
    paginationOptions,
  );

  sendResponse<ISellProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sell Products fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// const deleteSingleSellProduct = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result =
//       await SellProductsService.deleteSingleSell(id);

//     sendResponse<IinventoryProduct>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'deleted successfully !',
//       data: result,
//     });
//   },
// );
// const deleteAllEnventoryProduct = catchAsync(
//   async (req: Request, res: Response) => {
//     await InventoryProductsService.deleteAllEnventoryProduct();
//     sendResponse<IinventoryProduct>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'deleted successfully !',
//     });
//   },
// );

export const SellProductsController = {
  addSingleSell,
  getSingleSellProduct,
  getAllSellProducts,
  addSingleDuplicateProduct,
};
