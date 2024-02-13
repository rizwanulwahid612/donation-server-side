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
exports.InventoryProductsController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const addIntoInventory_constant_1 = require('./addIntoInventory.constant');
const addIntoInventory_service_1 = require('./addIntoInventory.service');
const addSingleInventory = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result =
      yield addIntoInventory_service_1.InventoryProductsService.addSingleEnventoryProduct(
        id,
        data,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'SingleInventory Added successfully !',
      data: result,
    });
  }),
);
const getSingleEnventoryProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield addIntoInventory_service_1.InventoryProductsService.getSingleEnventoryProduct(
        id,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single inventory product fetched successfully !',
      data: result,
    });
  }),
);
const getAllInventoryProducts = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      addIntoInventory_constant_1.InventoryproductFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result =
      yield addIntoInventory_service_1.InventoryProductsService.getAllInventoryProducts(
        filters,
        paginationOptions,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Inventory Products fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  }),
);
const updateSingleEnventoryProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      yield addIntoInventory_service_1.InventoryProductsService.updateSingleEnventoryProduct(
        id,
        updatedData,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'updated successfully !',
      data: result,
    });
  }),
);
const deleteSingleEnventoryProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield addIntoInventory_service_1.InventoryProductsService.deleteSingleEnventoryProduct(
        id,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'deleted successfully !',
      data: result,
    });
  }),
);
const deleteAllEnventoryProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield addIntoInventory_service_1.InventoryProductsService.deleteAllEnventoryProduct();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'deleted successfully !',
    });
  }),
);
exports.InventoryProductsController = {
  getAllInventoryProducts,
  getSingleEnventoryProduct,
  addSingleInventory,
  updateSingleEnventoryProduct,
  deleteSingleEnventoryProduct,
  deleteAllEnventoryProduct,
};
