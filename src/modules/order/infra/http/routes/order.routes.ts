import { Router } from 'express';
import multer from 'multer';
import uploadConfig from 'config/upload';
import { OrdersController } from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const upload = multer(uploadConfig.multer);


  // Rotas de busca específicas e por período (rotas estáticas devem vir primeiro)
ordersRouter.get('/numero/:numeroPedido', ordersController.showByNumeroPedido);
ordersRouter.get('/celular/:celular', ordersController.showByCelular);
ordersRouter.patch('/verificacao-pagamento/:id', ordersController.updatePagamentoVerificado);
ordersRouter.get('/event-date-range', ordersController.listByEventDateRange);
ordersRouter.get('/', ordersController.list);
ordersRouter.patch('/update-status', ordersController.updateStatus);

// Rotas básicas CRUD
ordersRouter.post('/', upload.single('imagemPedido'), ordersController.create);
ordersRouter.get('/:id', ordersController.show);
ordersRouter.patch('/:id', upload.single('imagemPedido'), ordersController.update);
ordersRouter.delete('/:id', ordersController.delete);

export default ordersRouter;
