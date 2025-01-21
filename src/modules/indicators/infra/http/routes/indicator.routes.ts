// indicator.routes.ts
import { Router } from 'express';
import IndicatorsController from '../controllers/IndicatorsController';

const indicatorsRouter = Router();
const indicatorsController = new IndicatorsController();

indicatorsRouter.get('/', indicatorsController.getBaseIndicators);
indicatorsRouter.get('/products', indicatorsController.getProductIndicators);
indicatorsRouter.get('/additionals', indicatorsController.getAdditionalIndicators);

export default indicatorsRouter;
