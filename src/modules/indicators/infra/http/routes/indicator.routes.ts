import { Router } from 'express';
import IndicatorsController from '../controllers/IndicatorsController';

const indicatorsRouter = Router();
const indicatorsController = new IndicatorsController();

// Rota para obter os indicadores
indicatorsRouter.get('/', indicatorsController.show);

export default indicatorsRouter;
