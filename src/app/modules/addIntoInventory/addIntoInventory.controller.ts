import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { InventoryproductFilterableFields } from './addIntoInventory.constant';
import { InventoryProductsService } from './addIntoInventory.service';
import { IinventoryProduct } from './addIntoInventory.interface';

const addSingleInventory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await InventoryProductsService.addSingleEnventoryProduct(
    id,
    data,
  );

  sendResponse<IinventoryProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SingleInventory Added successfully !',
    data: result,
  });
});
const getSingleEnventoryProduct = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await InventoryProductsService.getSingleEnventoryProduct(id);

    sendResponse<IinventoryProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single inventory product fetched successfully !',
      data: result,
    });
  },
);
const getAllInventoryProducts = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, InventoryproductFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await InventoryProductsService.getAllInventoryProducts(
      filters,
      paginationOptions,
    );

    sendResponse<IinventoryProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Inventory Products fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  },
);
const updateSingleEnventoryProduct = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await InventoryProductsService.updateSingleEnventoryProduct(
      id,
      updatedData,
    );

    sendResponse<IinventoryProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'updated successfully !',
      data: result,
    });
  },
);

const deleteSingleEnventoryProduct = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await InventoryProductsService.deleteSingleEnventoryProduct(id);

    sendResponse<IinventoryProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'deleted successfully !',
      data: result,
    });
  },
);
const deleteAllEnventoryProduct = catchAsync(
  async (req: Request, res: Response) => {
    await InventoryProductsService.deleteAllEnventoryProduct();
    sendResponse<IinventoryProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'deleted successfully !',
    });
  },
);

export const InventoryProductsController = {
  getAllInventoryProducts,
  getSingleEnventoryProduct,
  addSingleInventory,
  updateSingleEnventoryProduct,
  deleteSingleEnventoryProduct,
  deleteAllEnventoryProduct,
};
