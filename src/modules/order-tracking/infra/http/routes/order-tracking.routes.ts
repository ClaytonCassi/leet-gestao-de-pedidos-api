import { Router } from 'express';
import OrderTrackingController from '../controllers/OrderTrackingController';

const orderTrackingRouter = Router();
const orderTrackingController = new OrderTrackingController();

orderTrackingRouter.post('/', orderTrackingController.create);
orderTrackingRouter.get('/', orderTrackingController.list);
orderTrackingRouter.get('/:id', orderTrackingController.show)
orderTrackingRouter.put('/:id', orderTrackingController.update);
orderTrackingRouter.delete('/:id', orderTrackingController.delete);

export default orderTrackingRouter;
