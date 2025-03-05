import * as Express from 'express'
const router = Express.Router();

import eventController from '../controllers/eventsController';

import { authenticateJWT, authorizeOnlyAdmin, authorizeClientAndAdmin } from '../controllers/middlewares';

router.get('/get/events', eventController.getEvents);
router.get('/get/event/byId', eventController.getEventById);
router.post('/create/event', authenticateJWT, authorizeOnlyAdmin, eventController.createEvent);
router.put('/modify/event', authenticateJWT, authorizeOnlyAdmin, eventController.modifyEvent);
router.delete('/delete/event', authenticateJWT, authorizeOnlyAdmin, eventController.deleteEvent);

export default router;