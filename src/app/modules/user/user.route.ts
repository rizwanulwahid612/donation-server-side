import express from 'express';
//import validateRequest from '../../middlewares/validateRequest';
//import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
//import auth from '../../middlewares/auth';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-user',
  //validateRequest(UserValidation.createUserZodSchema),
  //auth(ENUM_USER_ROLE.USER),
  UserController.createUser,
);
router.post(
  '/create-admin',
  //validateRequest(UserValidation.createUserZodSchema),
  //auth(ENUM_USER_ROLE.USER),
  UserController.createAdmin,
);
router.get(
  '/',
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
export const UserRoutes = router;
