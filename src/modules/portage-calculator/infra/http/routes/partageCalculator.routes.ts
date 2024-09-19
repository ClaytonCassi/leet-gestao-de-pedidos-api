import { Router } from 'express';
import  PartageCalculatorController  from '../controllers/PartageCalculatorController';

const partageCalculatorRouter = Router();
const partageCalculatorController = new PartageCalculatorController();

partageCalculatorRouter.post('/', partageCalculatorController.calcularFrete);


export default partageCalculatorRouter;
