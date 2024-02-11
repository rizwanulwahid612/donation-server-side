"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
const auth_controller_1 = require("./auth.controller");
//import { AuthValidation } from './auth.validation';
const router = express_1.default.Router();
router.post('/login', 
//validateRequest(AuthValidation.loginZodSchema),
auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', 
//validateRequest(AuthValidation.refreshTokenZodSchema),
auth_controller_1.AuthController.refreshToken);
router.post('/change-password', 
//validateRequest(AuthValidation.changePasswordZodSchema),
//auth(ENUM_USER_ROLE.ADMIN),
auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
