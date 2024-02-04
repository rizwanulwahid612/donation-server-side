import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { ProductsRoutes } from '../modules/products/products.route';
import { InventoryProductsRoutes } from '../modules/addIntoInventory/addIntoInventory.route';
import { SellProductsRoutes } from '../modules/sellProduct/sellProduct.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/inventoryproduct',
    route: InventoryProductsRoutes,
  },
  {
    path: '/sellproduct',
    route: SellProductsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
