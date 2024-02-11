"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDonationsRoutes = void 0;
const express_1 = __importDefault(require("express"));
//import { DonationsController } from './donations.controller';
const postDonate_controller_1 = require("./postDonate.controller");
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
// import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';
const router = express_1.default.Router();
router.post('/:id', 
// validateRequest(CategoryValidation.postCategory),
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
postDonate_controller_1.PostDonationsController.addSinglePostDonation);
// router.get(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.CUSTOMER,
//   // ),
//   DonationsController.getSingleDonation,
// );
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
postDonate_controller_1.PostDonationsController.getAllPostDonations);
// router.patch(
//   '/:id',
//   // validateRequest(CategoryValidation.updateCategory),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   DonationsController.updateDonation,
// );
// router.delete(
//   '/:id',
//   //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   DonationsController.deleteDonation,
// );
exports.PostDonationsRoutes = router;
