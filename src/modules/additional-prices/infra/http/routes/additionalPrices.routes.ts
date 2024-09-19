import { Router } from 'express';
import { AdditionalPricesController } from '../controllers/AdditionalPricesController';

const additionalPricesRouter = Router();
const additionalPricesController = new AdditionalPricesController();

additionalPricesRouter.post('/', additionalPricesController.create);
additionalPricesRouter.get('/', additionalPricesController.list);
additionalPricesRouter.put('/:id', additionalPricesController.update);
additionalPricesRouter.get('/:id', additionalPricesController.show);
additionalPricesRouter.delete('/:id', additionalPricesController.delete);
additionalPricesRouter.get('/additional/:additionalId', additionalPricesController.listByAdditional); 


export default additionalPricesRouter;
