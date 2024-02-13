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
exports.SellProductsController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const sellProduct_service_1 = require('./sellProduct.service');
const sellProduct_constant_1 = require('./sellProduct.constant');
// import { InventoryproductFilterableFields } from './addIntoInventory.constant';
// import { InventoryProductsService } from './addIntoInventory.service';
// import { IinventoryProduct } from './addIntoInventory.interface';
const addSingleSell = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result =
      yield sellProduct_service_1.SellProductsService.addSingleSellProduct(
        id,
        data,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single Sell Added successfully !',
      data: result,
    });
  }),
);
const addSingleDuplicateProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result =
      yield sellProduct_service_1.SellProductsService.addSingleDuplicateProduct(
        id,
        data,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single Duplicate Added successfully !',
      data: result,
    });
  }),
);
const getSingleSellProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield sellProduct_service_1.SellProductsService.getSingleSellProduct(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single Sell product fetched successfully !',
      data: result,
    });
  }),
);
const getAllSellProducts = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      sellProduct_constant_1.SellproductFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result =
      yield sellProduct_service_1.SellProductsService.getAllSellProducts(
        filters,
        paginationOptions,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Sell Products fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  }),
);
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
exports.SellProductsController = {
  addSingleSell,
  getSingleSellProduct,
  getAllSellProducts,
  addSingleDuplicateProduct,
};
