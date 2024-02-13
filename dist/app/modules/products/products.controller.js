'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductsController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const products_service_1 = require('./products.service');
const products_constant_1 = require('./products.constant');
// import { CategoryService } from './category.service';
// import { ICategory } from './category.interface';
// import { categoryFilterableFields } from './category.constant';
// const createCategory = catchAsync(async (req: Request, res: Response) => {
//   const { ...categoryData } = req.body;
//   const result = await CategoryService.createCategory(categoryData);
//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category created successfully',
//     data: result,
//   });
// });
// const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await CategoryService.getSingleCategory(id);
//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category fetched successfully !',
//     data: result,
//   });
// });
const getAllProducts = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      products_constant_1.productFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield products_service_1.ProductsService.getAllProducts(
      filters,
      paginationOptions,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Products fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  }),
);
// const updateCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   const result = await CategoryService.updateCategory(id, updatedData);
//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category updated successfully !',
//     data: result,
//   });
// });
// const deleteCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await CategoryService.deletecategory(id);
//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category deleted successfully !',
//     data: result,
//   });
// });
exports.ProductsController = {
  //createCategory,
  //getSingleCategory,
  getAllProducts,
  //updateCategory,
  //deleteCategory,
};
