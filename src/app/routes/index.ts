import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { DonationsRoutes } from '../modules/donations/donations.route';
import { PostDonationsRoutes } from '../modules/PostDonate/postDonate.route';

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
    path: '/donations',
    route: DonationsRoutes,
  },
  {
    path: '/postdonations',
    route: PostDonationsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
