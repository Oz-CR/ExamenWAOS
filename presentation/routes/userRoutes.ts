import * as Express from 'express'
const router = Express.Router();

import userController from '../controllers/userController';
import { authenticateJWT, authorizeOnlyAdmin, authorizeClientAndAdmin } from '../controllers/middlewares';

router.post('/register/client', userController.registerClient);
router.post('/register/admin', authenticateJWT, authorizeOnlyAdmin, userController.registerAdmin);
router.post('/login', userController.login);
router.post('/sendSMS', authenticateJWT, authorizeClientAndAdmin, userController.sendCustomMessage);

export default router;