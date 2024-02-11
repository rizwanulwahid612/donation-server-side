"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
//import validateRequest from '../../middlewares/validateRequest';
//import { UserValidation } from './user.validation';
const user_controller_1 = require("./user.controller");
//import auth from '../../middlewares/auth';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
const router = express_1.default.Router();
router.post('/create-user', 
//validateRequest(UserValidation.createUserZodSchema),
//auth(ENUM_USER_ROLE.USER),
user_controller_1.UserController.createUser);
router.post('/create-admin', 
//validateRequest(UserValidation.createUserZodSchema),
//auth(ENUM_USER_ROLE.USER),
user_controller_1.UserController.createAdmin);
router.get('/', 
//auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
