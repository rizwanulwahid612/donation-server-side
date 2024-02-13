'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require('express'));
const products_controller_1 = require('./products.controller');
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
// import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';
const router = express_1.default.Router();
// router.post(
//   '/create-category',
//  // validateRequest(CategoryValidation.postCategory),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   CategoryController.createCategory,
// );
// router.get(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.CUSTOMER,
//   // ),
//   ProductsController.getSingleCategory,
// );
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  products_controller_1.ProductsController.getAllProducts,
);
// router.patch(
//   '/:id',
//   validateRequest(CategoryValidation.updateCategory),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   CategoryController.updateCategory,
// );
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   CategoryController.deleteCategory,
// );
exports.ProductsRoutes = router;
