"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const products_route_1 = require("../modules/products/products.route");
const addIntoInventory_route_1 = require("../modules/addIntoInventory/addIntoInventory.route");
const sellProduct_route_1 = require("../modules/sellProduct/sellProduct.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/products',
        route: products_route_1.ProductsRoutes,
    },
    {
        path: '/inventoryproduct',
        route: addIntoInventory_route_1.InventoryProductsRoutes,
    },
    {
        path: '/sellproduct',
        route: sellProduct_route_1.SellProductsRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
