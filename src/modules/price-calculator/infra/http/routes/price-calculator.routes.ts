import { Router } from 'express';
import { CalculatePriceController } from '@modules/price-calculator/infra/http/controllers/CalculatePriceController';

const priceCalculatorRouter = Router();
const calculatePriceController = new CalculatePriceController();

priceCalculatorRouter.post('/', calculatePriceController.calculate);

export default priceCalculatorRouter;
