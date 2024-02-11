import express from 'express';
//import { DonationsController } from './donations.controller';
import { PostDonationsController } from './postDonate.controller';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
// import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';

const router = express.Router();
router.post(
  '/:id',
  // validateRequest(CategoryValidation.postCategory),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PostDonationsController.addSinglePostDonation,
);
// router.get(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.CUSTOMER,
//   // ),
//   DonationsController.getSingleDonation,
// );
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  PostDonationsController.getAllPostDonations,
);

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

export const PostDonationsRoutes = router;
