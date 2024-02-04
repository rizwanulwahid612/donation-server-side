"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { email: userEmail, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        email,
        role,
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userEmail } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // // checking is user exist
    //alternative way
    const isUserExist = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.userEmail }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    // // hash password before saving
    // const newHashedPassword = await bcrypt.hash(
    //   newPassword,
    //   Number(config.bycrypt_salt_rounds)
    // );
    // const query = { id: user?.userId };
    // const updatedData = {
    //   password: newHashedPassword,  //
    //   needsPasswordChange: false,
    //   passwordChangedAt: new Date(), //
    // };
    // await User.findOneAndUpdate(query, updatedData);
    // data update
    isUserExist.password = newPassword;
    isUserExist.needsPasswordChange = false;
    // updating using save()
    isUserExist.save();
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
// import httpStatus from 'http-status';
// //import { Secret } from 'jsonwebtoken';
// import { JwtPayload, Secret } from 'jsonwebtoken';
// import config from '../../../config';
// import ApiError from '../../../errors/ApiError';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
// import { User } from '../user/user.model';
// import {
//   IChangePassword,
//   ILoginUser,
//   ILoginUserResponse,
//   IRefreshTokenResponse,
// } from './auth.interface';
// const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;
//   const isUserExist = await User.isUserExist(email);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(password, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }
//   //create access token & refresh token
//   const {
//     id: userId,
//     email: userEmail,
//     role,
//     needsPasswordChange,
//   } = isUserExist;
//   const accessToken = jwtHelpers.createToken(
//     { userId, userEmail, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { userId, userEmail, role },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string,
//   );
//   return {
//     email,
//     role,
//     accessToken,
//     refreshToken,
//     needsPasswordChange,
//   };
// };
// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret,
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }
//   const { userEmail } = verifiedToken;
//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token
//   const isUserExist = await User.isUserExist(userEmail);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       email: isUserExist.email,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );
//   return {
//     accessToken: newAccessToken,
//   };
// };
// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IChangePassword,
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;
//   // // checking is user exist
//   //alternative way
//   const isUserExist = await User.findOne({ email: user?.userEmail }).select(
//     '+password',
//   );
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   // checking old password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
//   }
//   isUserExist.password = newPassword;
//   isUserExist.needsPasswordChange = false;
//   // updating using save()
//   isUserExist.save();
// };
// export const AuthService = {
//   loginUser,
//   refreshToken,
//   changePassword,
// };
