import { Router } from 'express';

import { OrdersController, upload } from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();



// Rota para criação de uma nova order
ordersRouter.post('/', upload.single('imagemPedido'), ordersController.create);
ordersRouter.get('/', ordersController.list);
ordersRouter.get('/:id', ordersController.show);
ordersRouter.patch('/:id', upload.single('imagemPedido'), ordersController.update);
ordersRouter.delete('/:id', ordersController.delete);
ordersRouter.get('/numero/:numeroPedido', ordersController.showByNumeroPedido);
ordersRouter.patch('/verificacao-pagamento/:id', ordersController.updatePagamentoVerificado);


export default ordersRouter;
