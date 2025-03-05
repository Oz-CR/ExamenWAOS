import * as Express from 'express'
const router = Express.Router();

import ordersController from '../controllers/ordersController';

import { authenticateJWT, authorizeOnlyAdmin, authorizeClientAndAdmin } from '../controllers/middlewares';

router.post('/create/order', authenticateJWT, authorizeClientAndAdmin, ordersController.makeOrder);
router.post('/cancel/order', authenticateJWT, authorizeClientAndAdmin, ordersController.cancelOrderAndGetRefund);

export default router;