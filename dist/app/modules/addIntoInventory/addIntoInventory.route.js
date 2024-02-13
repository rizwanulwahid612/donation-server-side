'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.InventoryProductsRoutes = void 0;
const express_1 = __importDefault(require('express'));
//import { ProductsController } from './products.controller';
const addIntoInventory_controller_1 = require('./addIntoInventory.controller');
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
// import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';
const router = express_1.default.Router();
router.post(
  '/:id',
  // validateRequest(CategoryValidation.postCategory),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  addIntoInventory_controller_1.InventoryProductsController.addSingleInventory,
);
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  addIntoInventory_controller_1.InventoryProductsController
    .getSingleEnventoryProduct,
);
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  addIntoInventory_controller_1.InventoryProductsController
    .getAllInventoryProducts,
);
router.patch(
  '/:id',
  //validateRequest(CategoryValidation.updateCategory),
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  addIntoInventory_controller_1.InventoryProductsController
    .updateSingleEnventoryProduct,
);
router.delete(
  '/:id',
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  addIntoInventory_controller_1.InventoryProductsController
    .deleteSingleEnventoryProduct,
);
router.delete(
  '/',
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  addIntoInventory_controller_1.InventoryProductsController
    .deleteAllEnventoryProduct,
);
exports.InventoryProductsRoutes = router;
